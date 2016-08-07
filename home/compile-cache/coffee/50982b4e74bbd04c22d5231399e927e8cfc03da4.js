(function() {
  var DefinitionsView, config;

  DefinitionsView = require('./definitions-view.coffee');

  config = require('./config.coffee');

  module.exports = {
    config: {
      rightMenuDisplayAtFirst: {
        type: 'boolean',
        "default": true
      }
    },
    firstMenu: {
      'atom-workspace atom-text-editor:not(.mini)': [
        {
          label: 'Goto Definition',
          command: 'goto-definition:go'
        }, {
          type: 'separator'
        }
      ]
    },
    normalMenu: {
      'atom-workspace atom-text-editor:not(.mini)': [
        {
          label: 'Goto Definition',
          command: 'goto-definition:go'
        }
      ]
    },
    activate: function() {
      atom.commands.add('atom-workspace atom-text-editor:not(.mini)', 'goto-definition:go', (function(_this) {
        return function() {
          return _this.go();
        };
      })(this));
      if (atom.config.get('goto-definition.rightMenuDisplayAtFirst')) {
        atom.contextMenu.add(this.firstMenu);
        return atom.contextMenu.itemSets.unshift(atom.contextMenu.itemSets.pop());
      } else {
        return atom.contextMenu.add(this.normalMenu);
      }
    },
    deactivate: function() {},
    getScanOptions: function() {
      var editor, file_extension, grammar_name, grammar_option, name_matches, paths, project_name, project_path, regex, scan_paths, scan_regex, word;
      editor = atom.workspace.getActiveTextEditor();
      project_path = atom.project.relativizePath(editor.getPath())[0];
      name_matches = /[\/\\]([^\/^\\]+)$/.exec(project_path);
      project_name = name_matches ? name_matches[1] : '*';
      word = (editor.getSelectedText() || editor.getWordUnderCursor()).replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
      file_extension = "*." + editor.getPath().split('.').pop();
      scan_regex = [];
      scan_paths = [];
      for (grammar_name in config) {
        grammar_option = config[grammar_name];
        if (grammar_option.type.indexOf(file_extension) !== -1) {
          scan_regex.push.apply(scan_regex, grammar_option.regex);
          scan_paths.push.apply(scan_paths, grammar_option.type);
        }
      }
      if (scan_regex.length === 0) {
        return {};
      }
      scan_regex = scan_regex.filter(function(e, i, arr) {
        return arr.lastIndexOf(e) === i;
      });
      scan_paths = scan_paths.filter(function(e, i, arr) {
        return arr.lastIndexOf(e) === i;
      });
      regex = scan_regex.join('|').replace(/{word}/g, word);
      paths = scan_paths.concat(project_name);
      return {
        regex: new RegExp(regex, 'i'),
        paths: paths
      };
    },
    go: function() {
      var paths, regex, _ref;
      _ref = this.getScanOptions(), regex = _ref.regex, paths = _ref.paths;
      if (!regex) {
        return atom.notifications.addWarning('This language is not supported . Pull Request Welcome 👏.');
      }
      if (this.definitionsView) {
        this.definitionsView.destroy();
      }
      this.definitionsView = new DefinitionsView();
      return atom.workspace.scan(regex, {
        paths: paths
      }, (function(_this) {
        return function(result, error) {
          var items, _ref1;
          items = result.matches.map(function(match) {
            var all_lines, line_number, lines, start_position;
            if (Array.isArray(match.range)) {
              return {
                text: match.lineText,
                fileName: result.filePath,
                line: match.range[0][0],
                column: match.range[0][1]
              };
            } else {
              if (/\s/.test(match.match.input.charAt(match.match.index))) {
                start_position = match.match.index + 1;
              } else {
                start_position = match.match.index;
              }
              all_lines = match.match.input.split(/\r\n|\r|\n/);
              lines = match.match.input.substring(0, start_position).split(/\r\n|\r|\n/);
              line_number = lines.length - 1;
              return {
                text: all_lines[line_number],
                fileName: result.filePath,
                line: line_number,
                column: lines.pop().length
              };
            }
          });
          if (((_ref1 = _this.definitionsView.items) != null ? _ref1 : []).length === 0) {
            return _this.definitionsView.setItems(items);
          } else {
            return _this.definitionsView.addItems(items);
          }
        };
      })(this)).then((function(_this) {
        return function() {
          var items, _ref1;
          items = (_ref1 = _this.definitionsView.items) != null ? _ref1 : [];
          switch (items.length) {
            case 0:
              return _this.definitionsView.setItems(items);
            case 1:
              return _this.definitionsView.confirmed(items[0]);
          }
        };
      })(this));
    }
  };

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL1VzZXJzL2J6aXR0bGF1Ly5hdG9tL3BhY2thZ2VzL2dvdG8tZGVmaW5pdGlvbi9saWIvZ290by1kZWZpbml0aW9uLmNvZmZlZSIKICBdLAogICJuYW1lcyI6IFtdLAogICJtYXBwaW5ncyI6ICJBQUFBO0FBQUEsTUFBQSx1QkFBQTs7QUFBQSxFQUFBLGVBQUEsR0FBa0IsT0FBQSxDQUFRLDJCQUFSLENBQWxCLENBQUE7O0FBQUEsRUFDQSxNQUFBLEdBQVMsT0FBQSxDQUFRLGlCQUFSLENBRFQsQ0FBQTs7QUFBQSxFQUdBLE1BQU0sQ0FBQyxPQUFQLEdBQ0U7QUFBQSxJQUFBLE1BQUEsRUFDRTtBQUFBLE1BQUEsdUJBQUEsRUFDRTtBQUFBLFFBQUEsSUFBQSxFQUFNLFNBQU47QUFBQSxRQUNBLFNBQUEsRUFBUyxJQURUO09BREY7S0FERjtBQUFBLElBS0EsU0FBQSxFQUNFO0FBQUEsTUFBQSw0Q0FBQSxFQUE4QztRQUM1QztBQUFBLFVBQ0UsS0FBQSxFQUFPLGlCQURUO0FBQUEsVUFFRSxPQUFBLEVBQVMsb0JBRlg7U0FENEMsRUFLNUM7QUFBQSxVQUNFLElBQUEsRUFBTSxXQURSO1NBTDRDO09BQTlDO0tBTkY7QUFBQSxJQWdCQSxVQUFBLEVBQ0U7QUFBQSxNQUFBLDRDQUFBLEVBQThDO1FBQzVDO0FBQUEsVUFDRSxLQUFBLEVBQU8saUJBRFQ7QUFBQSxVQUVFLE9BQUEsRUFBUyxvQkFGWDtTQUQ0QztPQUE5QztLQWpCRjtBQUFBLElBd0JBLFFBQUEsRUFBVSxTQUFBLEdBQUE7QUFDUixNQUFBLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBZCxDQUFrQiw0Q0FBbEIsRUFBZ0Usb0JBQWhFLEVBQXNGLENBQUEsU0FBQSxLQUFBLEdBQUE7ZUFBQSxTQUFBLEdBQUE7aUJBQ3BGLEtBQUMsQ0FBQSxFQUFELENBQUEsRUFEb0Y7UUFBQSxFQUFBO01BQUEsQ0FBQSxDQUFBLENBQUEs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

//# sourceURL=/Users/bzittlau/.atom/packages/goto-definition/lib/goto-definition.coffee
