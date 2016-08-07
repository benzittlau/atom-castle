(function() {
  var CompositeDisposable, Mocha, ResultView, context, currentContext, mocha, os, path, resultView;

  path = require('path');

  os = require('os');

  context = require('./context');

  Mocha = require('./mocha');

  ResultView = require('./result-view');

  CompositeDisposable = require('atom').CompositeDisposable;

  mocha = null;

  resultView = null;

  currentContext = null;

  module.exports = {
    config: {
      nodeBinaryPath: {
        type: 'string',
        "default": os.platform() === 'win32' ? 'C:\\Program Files\\nodejs\\node.exe' : '/usr/local/bin/node',
        description: 'Path to the node executable'
      },
      textOnlyOutput: {
        type: 'boolean',
        "default": false,
        description: 'Remove any colors from the Mocha output'
      },
      showContextInformation: {
        type: 'boolean',
        "default": false,
        description: 'Display extra information for troubleshooting'
      },
      options: {
        type: 'string',
        "default": '',
        description: 'Append given options always to Mocha binary'
      },
      optionsForDebug: {
        type: 'string',
        "default": '--debug --debug-brk',
        description: 'Append given options to Mocha binary to enable debugging'
      },
      env: {
        type: 'string',
        "default": '',
        description: 'Append environment variables'
      }
    },
    activate: function(state) {
      this.subscriptions = new CompositeDisposable;
      resultView = new ResultView(state);
      this.subscriptions.add(atom.commands.add(resultView, 'result-view:close', (function(_this) {
        return function() {
          return _this.close();
        };
      })(this)));
      this.subscriptions.add(atom.commands.add('atom-workspace', 'core:cancel', (function(_this) {
        return function() {
          return _this.close();
        };
      })(this)));
      this.subscriptions.add(atom.commands.add('atom-workspace', 'core:close', (function(_this) {
        return function() {
          return _this.close();
        };
      })(this)));
      this.subscriptions.add(atom.commands.add('atom-workspace', {
        'mocha-test-runner:run': (function(_this) {
          return function() {
            return _this.run();
          };
        })(this)
      }));
      this.subscriptions.add(atom.commands.add('atom-workspace', {
        'mocha-test-runner:debug': (function(_this) {
          return function() {
            return _this.run(true);
          };
        })(this)
      }));
      this.subscriptions.add(atom.commands.add('atom-workspace', 'mocha-test-runner:run-previous', (function(_this) {
        return function() {
          return _this.runPrevious();
        };
      })(this)));
      return this.subscriptions.add(atom.commands.add('atom-workspace', 'mocha-test-runner:debug-previous', (function(_this) {
        return function() {
          return _this.runPrevious(true);
        };
      })(this)));
    },
    deactivate: function() {
      this.close();
      this.subscriptions.dispose();
      return resultView = null;
    },
    serialize: function() {
      return resultView.serialize();
    },
    close: function() {
      var _ref;
      if (mocha) {
        mocha.stop();
      }
      resultView.detach();
      return (_ref = this.resultViewPanel) != null ? _ref.destroy() : void 0;
    },
    run: function(inDebugMode) {
      var editor;
      if (inDebugMode == null) {
        inDebugMode = false;
      }
      editor = atom.workspace.getActivePaneItem();
      currentContext = context.find(editor);
      return this.execute(inDebugMode);
    },
    runPrevious: function(inDebugMode) {
      if (inDebugMode == null) {
        inDebugMode = false;
      }
      if (currentContext) {
        return this.execute(inDebugMode);
      } else {
        return this.displayError('No previous test run');
      }
    },
    execute: function(inDebugMode) {
      var editor, nodeBinary;
      if (inDebugMode == null) {
        inDebugMode = false;
      }
      resultView.reset();
      if (!resultView.hasParent()) {
        this.resultViewPanel = atom.workspace.addBottomPanel({
          item: resultView
        });
      }
      if (atom.config.get('mocha-test-runner.showContextInformation')) {
        nodeBinary = atom.config.get('mocha-test-runner.nodeBinaryPath');
        resultView.addLine("Node binary:    " + nodeBinary + "\n");
        resultView.addLine("Root folder:    " + currentContext.root + "\n");
        resultView.addLine("Path to mocha:  " + currentContext.mocha + "\n");
        resultView.addLine("Debug-Mode:     " + inDebugMode + "\n");
        resultView.addLine("Test file:      " + currentContext.test + "\n");
        resultView.addLine("Selected test:  " + currentContext.grep + "\n\n");
      }
      editor = atom.workspace.getActivePaneItem();
      mocha = new Mocha(currentContext, inDebugMode);
      mocha.on('success', function() {
        return resultView.success();
      });
      mocha.on('failure', function() {
        return resultView.failure();
      });
      mocha.on('updateSummary', function(stats) {
        return resultView.updateSummary(stats);
      });
      mocha.on('output', function(text) {
        return resultView.addLine(text);
      });
      mocha.on('error', function(err) {
        resultView.addLine('Failed to run Mocha\n' + err.message);
        return resultView.failure();
      });
      return mocha.run();
    },
    displayError: function(message) {
      resultView.reset();
      resultView.addLine(message);
      resultView.failure();
      if (!resultView.hasParent()) {
        return atom.workspace.addBottomPanel({
          item: resultView
        });
      }
    }
  };

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL1VzZXJzL2J6aXR0bGF1Ly5hdG9tL3BhY2thZ2VzL21vY2hhLXRlc3QtcnVubmVyL2xpYi9tb2NoYS10ZXN0LXJ1bm5lci5jb2ZmZWUiCiAgXSwKICAibmFtZXMiOiBbXSwKICAibWFwcGluZ3MiOiAiQUFBQTtBQUFBLE1BQUEsNEZBQUE7O0FBQUEsRUFBQSxJQUFBLEdBQWMsT0FBQSxDQUFRLE1BQVIsQ0FBZCxDQUFBOztBQUFBLEVBQ0EsRUFBQSxHQUFjLE9BQUEsQ0FBUSxJQUFSLENBRGQsQ0FBQTs7QUFBQSxFQUVBLE9BQUEsR0FBYyxPQUFBLENBQVEsV0FBUixDQUZkLENBQUE7O0FBQUEsRUFHQSxLQUFBLEdBQWMsT0FBQSxDQUFRLFNBQVIsQ0FIZCxDQUFBOztBQUFBLEVBSUEsVUFBQSxHQUFjLE9BQUEsQ0FBUSxlQUFSLENBSmQsQ0FBQTs7QUFBQSxFQU1DLHNCQUF1QixPQUFBLENBQVEsTUFBUixFQUF2QixtQkFORCxDQUFBOztBQUFBLEVBUUEsS0FBQSxHQUFRLElBUlIsQ0FBQTs7QUFBQSxFQVNBLFVBQUEsR0FBYSxJQVRiLENBQUE7O0FBQUEsRUFVQSxjQUFBLEdBQWlCLElBVmpCLENBQUE7O0FBQUEsRUFZQSxNQUFNLENBQUMsT0FBUCxHQUNFO0FBQUEsSUFBQSxNQUFBLEVBQ0U7QUFBQSxNQUFBLGNBQUEsRUFDRTtBQUFBLFFBQUEsSUFBQSxFQUFNLFFBQU47QUFBQSxRQUNBLFNBQUEsRUFBWSxFQUFFLENBQUMsUUFBSCxDQUFBLENBQUEsS0FBaUIsT0FBcEIsR0FBaUMscUNBQWpDLEdBQTRFLHFCQURyRjtBQUFBLFFBRUEsV0FBQSxFQUFhLDZCQUZiO09BREY7QUFBQSxNQUlBLGNBQUEsRUFDRTtBQUFBLFFBQUEsSUFBQSxFQUFNLFNBQU47QUFBQSxRQUNBLFNBQUEsRUFBUyxLQURUO0FBQUEsUUFFQSxXQUFBLEVBQWEseUNBRmI7T0FMRjtBQUFBLE1B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

//# sourceURL=/Users/bzittlau/.atom/packages/mocha-test-runner/lib/mocha-test-runner.coffee
