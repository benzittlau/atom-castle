(function() {
  var CompositeDisposable, Emitter, ListView, TermView, Terminals, capitalize, config, getColors, keypather, path;

  path = require('path');

  TermView = require('./lib/term-view');

  ListView = require('./lib/build/list-view');

  Terminals = require('./lib/terminal-model');

  Emitter = require('event-kit').Emitter;

  keypather = require('keypather')();

  CompositeDisposable = require('event-kit').CompositeDisposable;

  capitalize = function(str) {
    return str[0].toUpperCase() + str.slice(1).toLowerCase();
  };

  getColors = function() {
    var background, brightBlack, brightBlue, brightCyan, brightGreen, brightPurple, brightRed, brightWhite, brightYellow, foreground, normalBlack, normalBlue, normalCyan, normalGreen, normalPurple, normalRed, normalWhite, normalYellow, _ref;
    _ref = (atom.config.getAll('term3.colors'))[0].value, normalBlack = _ref.normalBlack, normalRed = _ref.normalRed, normalGreen = _ref.normalGreen, normalYellow = _ref.normalYellow, normalBlue = _ref.normalBlue, normalPurple = _ref.normalPurple, normalCyan = _ref.normalCyan, normalWhite = _ref.normalWhite, brightBlack = _ref.brightBlack, brightRed = _ref.brightRed, brightGreen = _ref.brightGreen, brightYellow = _ref.brightYellow, brightBlue = _ref.brightBlue, brightPurple = _ref.brightPurple, brightCyan = _ref.brightCyan, brightWhite = _ref.brightWhite, background = _ref.background, foreground = _ref.foreground;
    return [normalBlack, normalRed, normalGreen, normalYellow, normalBlue, normalPurple, normalCyan, normalWhite, brightBlack, brightRed, brightGreen, brightYellow, brightBlue, brightPurple, brightCyan, brightWhite, background, foreground].map(function(color) {
      return color.toHexString();
    });
  };

  config = {
    autoRunCommand: {
      type: 'string',
      "default": ''
    },
    titleTemplate: {
      type: 'string',
      "default": "Terminal ({{ bashName }})"
    },
    fontFamily: {
      type: 'string',
      "default": ''
    },
    fontSize: {
      type: 'string',
      "default": ''
    },
    colors: {
      type: 'object',
      properties: {
        normalBlack: {
          type: 'color',
          "default": '#2e3436'
        },
        normalRed: {
          type: 'color',
          "default": '#cc0000'
        },
        normalGreen: {
          type: 'color',
          "default": '#4e9a06'
        },
        normalYellow: {
          type: 'color',
          "default": '#c4a000'
        },
        normalBlue: {
          type: 'color',
          "default": '#3465a4'
        },
        normalPurple: {
          type: 'color',
          "default": '#75507b'
        },
        normalCyan: {
          type: 'color',
          "default": '#06989a'
        },
        normalWhite: {
          type: 'color',
          "default": '#d3d7cf'
        },
        brightBlack: {
          type: 'color',
          "default": '#555753'
        },
        brightRed: {
          type: 'color',
          "default": '#ef2929'
        },
        brightGreen: {
          type: 'color',
          "default": '#8ae234'
        },
        brightYellow: {
          type: 'color',
          "default": '#fce94f'
        },
        brightBlue: {
          type: 'color',
          "default": '#729fcf'
        },
        brightPurple: {
          type: 'color',
          "default": '#ad7fa8'
        },
        brightCyan: {
          type: 'color',
          "default": '#34e2e2'
        },
        brightWhite: {
          type: 'color',
          "default": '#eeeeec'
        },
        background: {
          type: 'color',
          "default": '#000000'
        },
        foreground: {
          type: 'color',
          "default": '#f0f0f0'
        }
      }
    },
    scrollback: {
      type: 'integer',
      "default": 1000
    },
    cursorBlink: {
      type: 'boolean',
      "default": true
    },
    shellOverride: {
      type: 'string',
      "default": ''
    },
    shellArguments: {
      type: 'string',
      "default": (function(_arg) {
        var HOME, SHELL;
        SHELL = _arg.SHELL, HOME = _arg.HOME;
        switch (path.basename(SHELL && SHELL.toLowerCase())) {
          case 'bash':
            return "--init-file " + (path.join(HOME, '.bash_profile'));
          case 'zsh':
            return "-l";
          default:
            return '';
        }
      })(process.env)
    },
    openPanesInSameSplit: {
      type: 'boolean',
      "default": false
    }
  };

  module.exports = {
    termViews: [],
    focusedTerminal: false,
    emitter: new Emitter(),
    config: config,
    disposables: null,
    activate: function(state) {
      this.state = state;
      this.disposables = new CompositeDisposable();
      if (!process.env.LANG) {
        console.warn("Term3: LANG environment variable is not set. Fancy characters (å, ñ, ó, etc`) may be corrupted. The only work-around is to quit Atom and run `atom` from your shell.");
      }
      ['up', 'right', 'down', 'left'].forEach((function(_this) {
        return function(direction) {
          return _this.disposables.add(atom.commands.add("atom-workspace", "term3:open-split-" + direction, _this.splitTerm.bind(_this, direction)));
        };
      })(this));
      this.disposables.add(atom.commands.add("atom-workspace", "term3:open", this.newTerm.bind(this)));
      this.disposables.add(atom.commands.add("atom-workspace", "term3:pipe-path", this.pipeTerm.bind(this, 'path')));
      this.disposables.add(atom.commands.add("atom-workspace", "term3:pipe-selection", this.pipeTerm.bind(this, 'selection')));
      return atom.packages.activatePackage('tree-view').then((function(_this) {
        return function(treeViewPkg) {
          var node;
          node = new ListView();
          return treeViewPkg.mainModule.treeView.find(".tree-view-scroller").prepend(node);
        };
      })(this));
    },
    service_0_1_3: function() {
      return {
        getTerminals: this.getTerminals.bind(this),
        onTerm: this.onTerm.bind(this),
        newTerm: this.newTerm.bind(this)
      };
    },
    getTerminals: function() {
      return Terminals.map(function(t) {
        return t.term;
      });
    },
    onTerm: function(callback) {
      return this.emitter.on('term', callback);
    },
    attachSubscriptions: function(termView, item, pane) {
      var focusNextTick, subscriptions;
      subscriptions = new CompositeDisposable;
      focusNextTick = function(activeItem) {
        return process.nextTick(function() {
          var atomPane;
          termView.focus();
          atomPane = activeItem.parentsUntil("atom-pane").parent()[0];
          if (termView.term) {
            return termView.term.constructor._textarea = atomPane;
          }
        });
      };
      subscriptions.add(pane.onDidActivate(function() {
        var activeItem;
        activeItem = pane.getActiveItem();
        if (activeItem !== item) {
          return;
        }
        this.focusedTerminal = termView;
        termView.focus();
        return focusNextTick(activeItem);
      }));
      subscriptions.add(pane.onDidChangeActiveItem(function(activeItem) {
        if (activeItem !== termView) {
          if (termView.term) {
            termView.term.constructor._textarea = null;
          }
          return;
        }
        return focusNextTick(activeItem);
      }));
      subscriptions.add(termView.onExit(function() {
        return Terminals.remove(termView.id);
      }));
      subscriptions.add(pane.onWillRemoveItem((function(_this) {
        return function(itemRemoved, index) {
          if (itemRemoved.item === item) {
            item.destroy();
            Terminals.remove(termView.id);
            _this.disposables.remove(subscriptions);
            return subscriptions.dispose();
          }
        };
      })(this)));
      return subscriptions;
    },
    newTerm: function(forkPTY, rows, cols, title) {
      var item, pane, termView;
      if (forkPTY == null) {
        forkPTY = true;
      }
      if (rows == null) {
        rows = 30;
      }
      if (cols == null) {
        cols = 80;
      }
      if (title == null) {
        title = 'tty';
      }
      termView = this.createTermView(forkPTY, rows, cols, title);
      pane = atom.workspace.getActivePane();
      item = pane.addItem(termView);
      this.disposables.add(this.attachSubscriptions(termView, item, pane));
      pane.activateItem(item);
      return termView;
    },
    createTermView: function(forkPTY, rows, cols, title) {
      var editorPath, id, model, opts, termView, _base;
      if (forkPTY == null) {
        forkPTY = true;
      }
      if (rows == null) {
        rows = 30;
      }
      if (cols == null) {
        cols = 80;
      }
      if (title == null) {
        title = 'tty';
      }
      opts = {
        runCommand: atom.config.get('term3.autoRunCommand'),
        shellOverride: atom.config.get('term3.shellOverride'),
        shellArguments: atom.config.get('term3.shellArguments'),
        titleTemplate: atom.config.get('term3.titleTemplate'),
        cursorBlink: atom.config.get('term3.cursorBlink'),
        fontFamily: atom.config.get('term3.fontFamily'),
        fontSize: atom.config.get('term3.fontSize'),
        colors: getColors(),
        forkPTY: forkPTY,
        rows: rows,
        cols: cols
      };
      if (opts.shellOverride) {
        opts.shell = opts.shellOverride;
      } else {
        opts.shell = process.env.SHELL || 'bash';
      }
      editorPath = keypather.get(atom, 'workspace.getEditorViews[0].getEditor().getPath()');
      opts.cwd = opts.cwd || atom.project.getPaths()[0] || editorPath || process.env.HOME;
      termView = new TermView(opts);
      model = Terminals.add({
        local: !!forkPTY,
        term: termView,
        title: title
      });
      id = model.id;
      termView.id = id;
      termView.on('remove', this.handleRemoveTerm.bind(this));
      termView.on('click', (function(_this) {
        return function() {
          termView.term.element.focus();
          termView.term.focus();
          return _this.focusedTerminal = termView;
        };
      })(this));
      termView.onDidChangeTitle(function() {
        if (forkPTY) {
          return model.title = termView.getTitle();
        } else {
          return model.title = title + '-' + termView.getTitle();
        }
      });
      if (typeof (_base = this.termViews).push === "function") {
        _base.push(termView);
      }
      process.nextTick((function(_this) {
        return function() {
          return _this.emitter.emit('term', termView);
        };
      })(this));
      return termView;
    },
    splitTerm: function(direction) {
      var activePane, item, openPanesInSameSplit, pane, splitter, termView;
      openPanesInSameSplit = atom.config.get('term3.openPanesInSameSplit');
      termView = this.createTermView();
      direction = capitalize(direction);
      splitter = (function(_this) {
        return function() {
          var pane;
          pane = activePane["split" + direction]({
            items: [termView]
          });
          activePane.termSplits[direction] = pane;
          _this.focusedTerminal = [pane, pane.items[0]];
          return _this.disposables.add(_this.attachSubscriptions(termView, pane.items[0], pane));
        };
      })(this);
      activePane = atom.workspace.getActivePane();
      activePane.termSplits || (activePane.termSplits = {});
      if (openPanesInSameSplit) {
        if (activePane.termSplits[direction] && activePane.termSplits[direction].items.length > 0) {
          pane = activePane.termSplits[direction];
          item = pane.addItem(termView);
          pane.activateItem(item);
          this.focusedTerminal = [pane, item];
          return this.disposables.add(this.attachSubscriptions(termView, item, pane));
        } else {
          return splitter();
        }
      } else {
        return splitter();
      }
    },
    pipeTerm: function(action) {
      var editor, item, pane, stream, _ref;
      editor = atom.workspace.getActiveTextEditor();
      if (!editor) {
        return;
      }
      stream = (function() {
        switch (action) {
          case 'path':
            return editor.getBuffer().file.path;
          case 'selection':
            return editor.getSelectedText();
        }
      })();
      if (stream && this.focusedTerminal) {
        if (Array.isArray(this.focusedTerminal)) {
          _ref = this.focusedTerminal, pane = _ref[0], item = _ref[1];
          pane.activateItem(item);
        } else {
          item = this.focusedTerminal;
        }
        item.pty.write(stream.trim());
        return item.term.focus();
      }
    },
    handleRemoveTerm: function(termView) {
      return this.termViews.splice(this.termViews.indexOf(termView), 1);
    },
    deactivate: function() {
      this.termViews.forEach(function(view) {
        return view.exit();
      });
      this.termViews = [];
      return this.disposables.dispose;
    },
    serialize: function() {
      var termViewsState;
      termViewsState = this.termViews.map(function(view) {
        return view.serialize();
      });
      return {
        termViews: termViewsState
      };
    }
  };

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL1VzZXJzL2J6aXR0bGF1Ly5hdG9tL3BhY2thZ2VzL3Rlcm0zL2luZGV4LmNvZmZlZSIKICBdLAogICJuYW1lcyI6IFtdLAogICJtYXBwaW5ncyI6ICJBQUFBO0FBQUEsTUFBQSwyR0FBQTs7QUFBQSxFQUFBLElBQUEsR0FBTyxPQUFBLENBQVEsTUFBUixDQUFQLENBQUE7O0FBQUEsRUFDQSxRQUFBLEdBQVcsT0FBQSxDQUFRLGlCQUFSLENBRFgsQ0FBQTs7QUFBQSxFQUVBLFFBQUEsR0FBVyxPQUFBLENBQVEsdUJBQVIsQ0FGWCxDQUFBOztBQUFBLEVBR0EsU0FBQSxHQUFZLE9BQUEsQ0FBUSxzQkFBUixDQUhaLENBQUE7O0FBQUEsRUFJQyxVQUFZLE9BQUEsQ0FBUSxXQUFSLEVBQVosT0FKRCxDQUFBOztBQUFBLEVBS0EsU0FBQSxHQUFnQixPQUFBLENBQVEsV0FBUixDQUFILENBQUEsQ0FMYixDQUFBOztBQUFBLEVBTUMsc0JBQXVCLE9BQUEsQ0FBUSxXQUFSLEVBQXZCLG1CQU5ELENBQUE7O0FBQUEsRUFRQSxVQUFBLEdBQWEsU0FBQyxHQUFELEdBQUE7V0FBUSxHQUFJLENBQUEsQ0FBQSxDQUFFLENBQUMsV0FBUCxDQUFBLENBQUEsR0FBdUIsR0FBSSxTQUFJLENBQUMsV0FBVCxDQUFBLEVBQS9CO0VBQUEsQ0FSYixDQUFBOztBQUFBLEVBVUEsU0FBQSxHQUFZLFNBQUEsR0FBQTtBQUNWLFFBQUEsd09BQUE7QUFBQSxJQUFBLE9BTUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQVosQ0FBbUIsY0FBbkIsQ0FBRCxDQUFvQyxDQUFBLENBQUEsQ0FBRSxDQUFDLEtBTjNDLEVBQ0UsbUJBQUEsV0FERixFQUNlLGlCQUFBLFNBRGYsRUFDMEIsbUJBQUEsV0FEMUIsRUFDdUMsb0JBQUEsWUFEdkMsRUFFRSxrQkFBQSxVQUZGLEVBRWMsb0JBQUEsWUFGZCxFQUU0Qixr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

//# sourceURL=/Users/bzittlau/.atom/packages/term3/index.coffee
