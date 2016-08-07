(function() {
  var MochaWrapper, STATS_MATCHER, ansi, clickablePaths, escape, events, fs, kill, killTree, path, psTree, spawn, util,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  fs = require('fs');

  path = require('path');

  util = require('util');

  events = require('events');

  escape = require('jsesc');

  ansi = require('ansi-html-stream');

  psTree = require('process-tree');

  spawn = require('child_process').spawn;

  kill = require('tree-kill');

  clickablePaths = require('./clickable-paths');

  STATS_MATCHER = /\d+\s+(?:failing|passing|pending)/g;

  module.exports = MochaWrapper = (function(_super) {
    __extends(MochaWrapper, _super);

    function MochaWrapper(context, debugMode) {
      var optionsForDebug;
      this.context = context;
      if (debugMode == null) {
        debugMode = false;
      }
      this.mocha = null;
      this.node = atom.config.get('mocha-test-runner.nodeBinaryPath');
      this.textOnly = atom.config.get('mocha-test-runner.textOnlyOutput');
      this.options = atom.config.get('mocha-test-runner.options');
      this.env = atom.config.get('mocha-test-runner.env');
      if (debugMode) {
        optionsForDebug = atom.config.get('mocha-test-runner.optionsForDebug');
        this.options = "" + this.options + " " + optionsForDebug;
      }
      this.resetStatistics();
    }

    MochaWrapper.prototype.stop = function() {
      if (this.mocha != null) {
        killTree(this.mocha.pid);
        return this.mocha = null;
      }
    };

    MochaWrapper.prototype.run = function() {
      var env, flags, index, key, name, opts, stream, value, _ref, _ref1;
      flags = [this.context.test];
      env = {
        PATH: path.dirname(this.node)
      };
      if (this.env) {
        _ref = this.env.split(' ');
        for (index in _ref) {
          name = _ref[index];
          _ref1 = name.split('='), key = _ref1[0], value = _ref1[1];
          env[key] = value;
        }
      }
      if (this.textOnly) {
        flags.push('--no-colors');
      } else {
        flags.push('--colors');
      }
      if (this.context.grep) {
        flags.push('--grep');
        flags.push(escape(this.context.grep, {
          escapeEverything: true
        }));
      }
      if (this.options) {
        Array.prototype.push.apply(flags, this.options.split(' '));
      }
      opts = {
        cwd: this.context.root,
        env: env
      };
      this.resetStatistics();
      this.mocha = spawn(this.context.mocha, flags, opts);
      if (this.textOnly) {
        this.mocha.stdout.on('data', (function(_this) {
          return function(data) {
            _this.parseStatistics(data);
            return _this.emit('output', data.toString());
          };
        })(this));
        this.mocha.stderr.on('data', (function(_this) {
          return function(data) {
            _this.parseStatistics(data);
            return _this.emit('output', data.toString());
          };
        })(this));
      } else {
        stream = ansi({
          chunked: false
        });
        this.mocha.stdout.pipe(stream);
        this.mocha.stderr.pipe(stream);
        stream.on('data', (function(_this) {
          return function(data) {
            _this.parseStatistics(data);
            return _this.emit('output', clickablePaths.link(data.toString()));
          };
        })(this));
      }
      this.mocha.on('error', (function(_this) {
        return function(err) {
          return _this.emit('error', err);
        };
      })(this));
      return this.mocha.on('exit', (function(_this) {
        return function(code) {
          if (code === 0) {
            return _this.emit('success', _this.stats);
          } else {
            return _this.emit('failure', _this.stats);
          }
        };
      })(this));
    };

    MochaWrapper.prototype.resetStatistics = function() {
      return this.stats = [];
    };

    MochaWrapper.prototype.parseStatistics = function(data) {
      var matches, stat, _results;
      _results = [];
      while (matches = STATS_MATCHER.exec(data)) {
        stat = matches[0];
        this.stats.push(stat);
        _results.push(this.emit('updateSummary', this.stats));
      }
      return _results;
    };

    return MochaWrapper;

  })(events.EventEmitter);

  killTree = function(pid, signal, callback) {
    signal = signal || 'SIGKILL';
    callback = callback || (function() {});
    return psTree(pid, function(err, children) {
      var childrenPid;
      childrenPid = children.map(function(p) {
        return p.PID;
      });
      [pid].concat(childrenPid).forEach(function(tpid) {
        var ex;
        try {
          return kill(tpid, signal);
        } catch (_error) {
          ex = _error;
          return console.log("Failed to " + signal + " " + tpid);
        }
      });
      return callback();
    });
  };

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL1VzZXJzL2J6aXR0bGF1Ly5hdG9tL3BhY2thZ2VzL21vY2hhLXRlc3QtcnVubmVyL2xpYi9tb2NoYS5jb2ZmZWUiCiAgXSwKICAibmFtZXMiOiBbXSwKICAibWFwcGluZ3MiOiAiQUFBQTtBQUFBLE1BQUEsZ0hBQUE7SUFBQTttU0FBQTs7QUFBQSxFQUFBLEVBQUEsR0FBUyxPQUFBLENBQVEsSUFBUixDQUFULENBQUE7O0FBQUEsRUFDQSxJQUFBLEdBQVMsT0FBQSxDQUFRLE1BQVIsQ0FEVCxDQUFBOztBQUFBLEVBRUEsSUFBQSxHQUFTLE9BQUEsQ0FBUSxNQUFSLENBRlQsQ0FBQTs7QUFBQSxFQUdBLE1BQUEsR0FBUyxPQUFBLENBQVEsUUFBUixDQUhULENBQUE7O0FBQUEsRUFJQSxNQUFBLEdBQVMsT0FBQSxDQUFRLE9BQVIsQ0FKVCxDQUFBOztBQUFBLEVBS0EsSUFBQSxHQUFTLE9BQUEsQ0FBUSxrQkFBUixDQUxULENBQUE7O0FBQUEsRUFNQSxNQUFBLEdBQVMsT0FBQSxDQUFRLGNBQVIsQ0FOVCxDQUFBOztBQUFBLEVBT0EsS0FBQSxHQUFTLE9BQUEsQ0FBUSxlQUFSLENBQXdCLENBQUMsS0FQbEMsQ0FBQTs7QUFBQSxFQVFBLElBQUEsR0FBUyxPQUFBLENBQVEsV0FBUixDQVJULENBQUE7O0FBQUEsRUFVQSxjQUFBLEdBQWlCLE9BQUEsQ0FBUSxtQkFBUixDQVZqQixDQUFBOztBQUFBLEVBWUEsYUFBQSxHQUFnQixvQ0FaaEIsQ0FBQTs7QUFBQSxFQWNBLE1BQU0sQ0FBQyxPQUFQLEdBQXVCO0FBRXJCLG1DQUFBLENBQUE7O0FBQWEsSUFBQSxzQkFBRSxPQUFGLEVBQVcsU0FBWCxHQUFBO0FBQ1gsVUFBQSxlQUFBO0FBQUEsTUFEWSxJQUFDLENBQUEsVUFBQSxPQUNiLENBQUE7O1FBRHNCLFlBQVk7T0FDbEM7QUFBQSxNQUFBLElBQUMsQ0FBQSxLQUFELEdBQVMsSUFBVCxDQUFBO0FBQUEsTUFDQSxJQUFDLENBQUEsSUFBRCxHQUFRLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBWixDQUFnQixrQ0FBaEIsQ0FEUixDQUFBO0FBQUEsTUFFQSxJQUFDLENBQUEsUUFBRCxHQUFZLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBWixDQUFnQixrQ0FBaEIsQ0FGWixDQUFBO0FBQUEsTUFHQSxJQUFDLENBQUEsT0FBRCxHQUFXLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBWixDQUFnQiwyQkFBaEIsQ0FIWCxDQUFBO0FBQUEsTUFJQSxJQUFDLENBQUEsR0FBRCxHQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBWixDQUFnQix1QkFBaEIsQ0FKUCxDQUFBO0FBTUEsTUFBQSxJQUFHLFNBQUg7QUFDRSxRQUFBLGVBQUEsR0FBa0IsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFaLENBQWdCLG1DQUFoQixDQUFsQixDQUFBO0FBQUEsUUFDQSxJQUFDLENBQUEsT0FBRCxHQUFXLEVBQUEsR0FBRyxJQUFDLENBQUEsT0FBSixHQUFZLEdBQVosR0FBZSxlQUQxQixDQURGO09BTkE7QUFBQSxNQVVBLElBQUMsQ0FBQSxlQUFELENBQUEsQ0FWQSxDQURXO0lBQUEsQ0FBYjs7QUFBQSwyQkFhQSxJQUFBLEdBQU0sU0FBQSxHQUFBO0FBQ0osTUFBQSxJQUFHLGtCQUFIO0FBQ0UsUUFBQSxRQUFBLENBQVMsSUFBQyxDQUFBLEtBQUssQ0FBQyxHQUFoQixDQUFBLENBQUE7ZUFDQSxJQUFDLENBQUEsS0FBRCxHQUFTLEtBRlg7T0FESTtJQUFBLENBYk4sQ0FBQTs7QUFBQSwyQkFrQkEsR0FBQSxHQUFLLFNBQUEsR0FBQTtBQUVILFVBQUEsOERBQUE7QUFBQSxNQUFBLEtBQUEsR0FBUSxDQUNOLElBQUMsQ0FBQSxPQUFPLENBQUMsSUFESCxDQUFSLENBQUE7QUFBQSxNQUlBLEdBQUEsR0FDRTtBQUFBLFFBQUEsSUFBQSxFQUFNLElBQUksQ0FBQyxPQUFMLENBQWEsSUFBQyxDQUFBLElBQWQsQ0FBTjtPQUxGLENBQUE7QUFPQSxNQUFBLElBQUcsSUFBQyxDQUFBLEdBQUo7QUFDRTtBQUFBLGFBQUEsYUFBQTs2QkFBQTtBQUNFLFVBQUEsUUFBZSxJQUFJLENBQUMsS0FBTCxDQUFXLEdBQVgsQ0FBZixFQUFDLGNBQUQsRUFBTSxnQkFBTixDQUFBO0FBQUEsVUFDQSxHQUFJLENBQUEsR0FBQSxDQUFKLEdBQVcsS0FEWCxDQURGO0FBQUEsU0FERjtPQVBBO0FBWUEsTUFBQSxJQUFHLElBQUMsQ0FBQSxRQUFKO0FBQ0UsUUFBQSxLQUFLLENBQUMsSUFBTixDQUFXLGFBQVgsQ0FBQSxDQURGO09BQUEsTUFBQTtBQUdFLFFBQUEsS0FBSyxDQUFDLElBQU4sQ0FBVyxVQUFYLENBQUEsQ0FIRjtPQVpBO0FBaUJBLE1BQUEsSUFBRyxJQUFDLENBQUEsT0FBTyxDQUFDLElBQVo7QUFDRSxRQUFBLEtBQUssQ0FBQyxJQUFOLENBQVcsUUFBWCxDQUFBLENBQUE7QUFBQSxRQUNBLEtBQUssQ0FBQyxJQUFOLENBQVcsTUFBQSxDQUFPLElBQUMsQ0FBQSxPQUFPLENBQUMsSUFBaEIsRUFBc0I7QUFBQSxVQUFBLGdCQUFBLEVBQWtCLElBQWxCO1NBQXRCLENBQVgsQ0FEQSxDQURGO09BakJBO0FBcUJBLE1BQUEsSUFBRyxJQUFDLENBQUEsT0FBSjtBQUNFLFFBQUEsS0FBSyxDQUFBLFNBQUUsQ0FBQSxJQUFJLENBQUMsS0FBWixDQUFrQixLQUFsQixFQUF5QixJQUFDLENBQUEsT0FBTyxDQUFDLEtBQVQsQ0FBZSxHQUFmLENBQXpCLENBQUEsQ0FERjtPQXJCQTtBQUFBLE1Bd0JBLElBQUEsR0FDRTtBQUFBLFFBQUEsR0FBQSxFQUFLLElBQUMsQ0FBQSxPQUFPLENBQUMsSUFBZDtBQUFBLFFBQ0EsR0FBQSxFQUFLLEdBREw7T0F6QkYsQ0FBQTtBQUFBLE1BNEJBLElBQUMsQ0FBQSxlQUFELENBQUEsQ0E1QkEsQ0FBQTtBQUFBLE1BNkJBLElBQUMsQ0FBQSxLQUFELEdBQVMsS0FBQSxDQUFNLElBQUMsQ0FBQSxPQUFPLENBQUMsS0FBZixFQUFzQixLQUF0QixFQUE2QixJQUE3QixDQTdCVCxDQUFBO0FBK0JBLE1BQUEsSUFBRyxJQUFDLENBQUEsUUFBSjtBQUNFLFFBQUEsSUFBQyxDQUFBLEtBQUssQ0FBQyxNQUFNLENBQUMsRUFBZCxDQUFpQixNQUFqQixFQUF5QixDQUFBLFNBQUEsS0FBQSxHQUFBO2lCQUFBLFNBQUMsSUFBRCxHQUFBO0FBQ3ZCLFlBQUEsS0FBQyxDQUFBLGVBQUQsQ0FBaUIsSUFBakIsQ0FBQSxDQUFBO21CQUNBLEtBQUMsQ0FBQSxJQUFELENBQU0sUUFBTixFQUFnQixJQUFJLENBQUMsUUFBTCxDQUFBLENBQWhCLEVBRnVCO1VBQUEsRUFBQTtRQUFBLENBQUEsQ0FBQSxDQUFBLElBQUEsQ0FBekIsQ0FBQSxDQUFBO0FBQUEsUUFHQSxJQUFDLENBQUEsS0FBSyxDQUFDLE1BQU0sQ0FBQyxFQUFkLENBQWlCLE1BQWpCLEVBQXlCLENBQUEsU0FBQSxLQUFBLEdBQUE7aUJBQUEsU0FBQyxJQUFELEdBQUE7QUFDdkIsWUFBQSxLQUFDLENBQUEsZUFBRCxDQUFpQixJQUFqQixDQUFBLENBQUE7bUJBQ0EsS0FBQyxDQUFBLElBQUQsQ0FBTSxRQUFOLEVBQWdCLElBQUksQ0FBQyxRQUFMLENBQUEsQ0FBaEIsRUFGdUI7VUFBQSxFQUFBO1FBQUEsQ0FBQSxDQUFBLENBQUEsSUFBQSxDQUF6QixDQUhBLENBREY7T0FBQSxNQUFBO0FBUUUsUUFBQSxNQUFBLEdBQVMsSUFBQSxDQUFLO0FBQUEsVUFBQSxPQUFBLEVBQVMsS0FBVDtTQUFMLENBQVQsQ0FBQTtBQUFBLFFBQ0EsSUFBQyxDQUFBLEtBQUssQ0FBQyxNQUFNLENBQUMsSUFBZCxDQUFtQixNQUFuQixDQURBLENBQUE7QUFBQSxRQUVBLElBQUMsQ0FBQSxLQUFLLENBQUMsTUFBTSxDQUFDLElBQWQsQ0FBbUIsTUFBbkIsQ0FGQSxDQUFBO0FBQUEsUUFHQSxNQUFNLENBQUMsRUFBUCxDQUFVLE1BQVYsRUFBa0IsQ0FBQSxTQUFBLEtBQUEsR0FBQTtpQkFBQSxTQUFDLElBQUQsR0FBQTtBQUNoQixZQUFBLEtBQUMsQ0FBQSxlQUFELENBQWlCLElBQWpCLENBQUEsQ0FBQTttQkFDQSxLQUFDLENBQUEsSUFBRCxDQUFNLFFBQU4sRUFBZ0IsY0FBYyxDQUFDLElBQWYsQ0FBb0IsSUFBSSxDQUFDLFFBQUwsQ0FBQSxDQUFwQixDQUFoQixFQUZnQjtVQUFBLEVBQUE7UUFBQSxDQUFBLENBQUEsQ0FBQSxJQUFBLENBQWxCLENBSEEsQ0FSRjtPQS9CQTtBQUFBLE1BOENBLElBQUMsQ0FBQSxLQUFLLENBQUMsRUFBUCxDQUFVLE9BQVYsRUFBbUIsQ0FBQSxTQUFBLEtBQUEsR0FBQTtlQUFBLFNBQUMsR0FBRCxHQUFBO2lCQUNqQixLQUFDLENBQUEsSUFBRCxDQUFNLE9BQU4sRUFBZSxHQUFmLEVBRGlCO1FBQUEsRUFBQTtNQUFBLENBQUEsQ0FBQSxDQUFBLElBQUEsQ0FBbkIsQ0E5Q0EsQ0FBQTthQWlEQSxJQUFDLENBQUEsS0FBSyxDQUFDLEVBQVAsQ0FBVSxNQUFWLEVBQWtCLENBQUEsU0FBQSxLQUFBLEdBQUE7ZUFBQSxTQUFDLElBQUQsR0FBQTtBQUNoQixVQUFBLElBQUcsSUFBQSxLQUFRLENBQVg7bUJBQ0UsS0FBQyxDQUFBLElBQUQsQ0FBTSxTQUFOLEVBQWlCLEtBQUMsQ0FBQSxLQUFsQixFQURGO1dBQUEsTUFBQTttQkFHRSxLQUFDLENBQUEsSUFBRCxDQUFNLFNBQU4sRUFBaUIsS0FBQyxDQUFBLEtBQWxCLEVBSEY7V0FEZ0I7UUFBQSxFQUFBO01BQUEsQ0FBQSxDQUFBLENBQUEsSUFBQSxDQUFsQixFQW5ERztJQUFBLENBbEJMLENBQUE7O0FBQUEsMkJBMkVBLGVBQUEsR0FBaUIsU0FBQSxHQUFBO2FBQ2YsSUFBQyxDQUFBLEtBQUQsR0FBUyxHQURNO0lBQUEsQ0EzRWpCLENBQUE7O0FBQUEsMkJBOEVBLGVBQUEsR0FBaUIsU0FBQyxJQUFELEdBQUE7QUFDZixVQUFBLHVCQUFBO0FBQUE7YUFBTSxPQUFBLEdBQVUsYUFBYSxDQUFDLElBQWQsQ0FBbUIsSUFBbkIsQ0FBaEIsR0FBQTtBQUNFLFFBQUEsSUFBQSxHQUFPLE9BQVEsQ0FBQSxDQUFBLENBQWYsQ0FBQTtBQUFBLFFBQ0EsSUFBQyxDQUFBLEtBQUssQ0FBQyxJQUFQLENBQVksSUFBWixDQURBLENBQUE7QUFBQSxzQkFFQSxJQUFDLENBQUEsSUFBRCxDQUFNLGVBQU4sRUFBdUIsSUFBQyxDQUFBLEtBQXhCLEVBRkEsQ0FERjtNQUFBLENBQUE7c0JBRGU7SUFBQSxDQTlFakIsQ0FBQTs7d0JBQUE7O0tBRjBDLE1BQU0sQ0FBQyxhQWRuRCxDQUFBOztBQUFBLEVBcUdBLFFBQUEsR0FBVyxTQUFDLEdBQUQsRUFBTSxNQUFOLEVBQWMsUUFBZCxHQUFBO0FBQ1QsSUFBQSxNQUFBLEdBQVMsTUFBQSxJQUFVLFNBQW5CLENBQUE7QUFBQSxJQUNBLFFBQUEsR0FBVyxRQUFBLElBQVksQ0FBQyxTQUFBLEdBQUEsQ0FBRCxDQUR2QixDQUFBO1dBRUEsTUFBQSxDQUFPLEdBQVAsRUFBWSxTQUFDLEdBQUQsRUFBTSxRQUFOLEdBQUE7QUFDVixVQUFBLFdBQUE7QUFBQSxNQUFBLFdBQUEsR0FBYyxRQUFRLENBQUMsR0FBVCxDQUFhLFNBQUMsQ0FBRCxHQUFBO2VBQU8sQ0FBQyxDQUFDLElBQVQ7TUFBQSxDQUFiLENBQWQsQ0FBQTtBQUFBLE1BQ0EsQ0FBQyxHQUFELENBQUssQ0FBQyxNQUFOLENBQWEsV0FBYixDQUF5QixDQUFDLE9BQTFCLENBQWtDLFNBQUMsSUFBRCxHQUFBO0FBQ2hDLFlBQUEsRUFBQTtBQUFBO2lCQUNFLElBQUEsQ0FBSyxJQUFMLEVBQVcsTUFBWCxFQURGO1NBQUEsY0FBQTtBQUlFLFVBREksV0FDSixDQUFBO2lCQUFBLE9BQU8sQ0FBQyxHQUFSLENBQWEsWUFBQSxHQUFZLE1BQVosR0FBbUIsR0FBbkIsR0FBc0IsSUFBbkMsRUFKRjtTQURnQztNQUFBLENBQWxDLENBREEsQ0FBQTthQU9BLFFBQUEsQ0FBQSxFQVJVO0lBQUEsQ0FBWixFQUhTO0VBQUEsQ0FyR1gsQ0FBQTtBQUFBIgp9

//# sourceURL=/Users/bzittlau/.atom/packages/mocha-test-runner/lib/mocha.coffee
