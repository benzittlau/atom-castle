(function() {
  var CompositeDisposable, MinimapGitDiffBinding, repositoryForPath,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  CompositeDisposable = require('atom').CompositeDisposable;

  repositoryForPath = require('./helpers').repositoryForPath;

  module.exports = MinimapGitDiffBinding = (function() {
    MinimapGitDiffBinding.prototype.active = false;

    function MinimapGitDiffBinding(minimap) {
      var repository;
      this.minimap = minimap;
      this.destroy = __bind(this.destroy, this);
      this.updateDiffs = __bind(this.updateDiffs, this);
      this.decorations = {};
      this.markers = null;
      this.subscriptions = new CompositeDisposable;
      if (this.minimap == null) {
        return console.warn('minimap-git-diff binding created without a minimap');
      }
      this.editor = this.minimap.getTextEditor();
      this.subscriptions.add(this.minimap.onDidDestroy(this.destroy));
      if (repository = this.getRepo()) {
        this.subscriptions.add(this.editor.getBuffer().onDidStopChanging(this.updateDiffs));
        this.subscriptions.add(repository.onDidChangeStatuses((function(_this) {
          return function() {
            return _this.scheduleUpdate();
          };
        })(this)));
        this.subscriptions.add(repository.onDidChangeStatus((function(_this) {
          return function(changedPath) {
            if (changedPath === _this.editor.getPath()) {
              return _this.scheduleUpdate();
            }
          };
        })(this)));
        this.subscriptions.add(repository.onDidDestroy((function(_this) {
          return function() {
            return _this.destroy();
          };
        })(this)));
        this.subscriptions.add(atom.config.observe('minimap-git-diff.useGutterDecoration', (function(_this) {
          return function(useGutterDecoration) {
            _this.useGutterDecoration = useGutterDecoration;
            return _this.scheduleUpdate();
          };
        })(this)));
      }
      this.scheduleUpdate();
    }

    MinimapGitDiffBinding.prototype.cancelUpdate = function() {
      return clearImmediate(this.immediateId);
    };

    MinimapGitDiffBinding.prototype.scheduleUpdate = function() {
      this.cancelUpdate();
      return this.immediateId = setImmediate(this.updateDiffs);
    };

    MinimapGitDiffBinding.prototype.updateDiffs = function() {
      this.removeDecorations();
      if (this.getPath() && (this.diffs = this.getDiffs())) {
        return this.addDecorations(this.diffs);
      }
    };

    MinimapGitDiffBinding.prototype.addDecorations = function(diffs) {
      var endRow, newLines, newStart, oldLines, oldStart, startRow, _i, _len, _ref, _results;
      _results = [];
      for (_i = 0, _len = diffs.length; _i < _len; _i++) {
        _ref = diffs[_i], oldStart = _ref.oldStart, newStart = _ref.newStart, oldLines = _ref.oldLines, newLines = _ref.newLines;
        startRow = newStart - 1;
        endRow = newStart + newLines - 2;
        if (oldLines === 0 && newLines > 0) {
          _results.push(this.markRange(startRow, endRow, '.git-line-added'));
        } else if (newLines === 0 && oldLines > 0) {
          _results.push(this.markRange(startRow, startRow, '.git-line-removed'));
        } else {
          _results.push(this.markRange(startRow, endRow, '.git-line-modified'));
        }
      }
      return _results;
    };

    MinimapGitDiffBinding.prototype.removeDecorations = function() {
      var marker, _i, _len, _ref;
      if (this.markers == null) {
        return;
      }
      _ref = this.markers;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        marker = _ref[_i];
        marker.destroy();
      }
      return this.markers = null;
    };

    MinimapGitDiffBinding.prototype.markRange = function(startRow, endRow, scope) {
      var marker, type;
      if (this.editor.isDestroyed()) {
        return;
      }
      marker = this.editor.markBufferRange([[startRow, 0], [endRow, Infinity]], {
        invalidate: 'never'
      });
      type = this.useGutterDecoration ? 'gutter' : 'line';
      this.minimap.decorateMarker(marker, {
        type: type,
        scope: ".minimap ." + type + " " + scope,
        plugin: 'git-diff'
      });
      if (this.markers == null) {
        this.markers = [];
      }
      return this.markers.push(marker);
    };

    MinimapGitDiffBinding.prototype.destroy = function() {
      this.removeDecorations();
      this.subscriptions.dispose();
      this.diffs = null;
      return this.minimap = null;
    };

    MinimapGitDiffBinding.prototype.getPath = function() {
      var _ref;
      return (_ref = this.editor.getBuffer()) != null ? _ref.getPath() : void 0;
    };

    MinimapGitDiffBinding.prototype.getRepositories = function() {
      return atom.project.getRepositories().filter(function(repo) {
        return repo != null;
      });
    };

    MinimapGitDiffBinding.prototype.getRepo = function() {
      return this.repository != null ? this.repository : this.repository = repositoryForPath(this.editor.getPath());
    };

    MinimapGitDiffBinding.prototype.getDiffs = function() {
      var e, _ref;
      try {
        return (_ref = this.getRepo()) != null ? _ref.getLineDiffs(this.getPath(), this.editor.getBuffer().getText()) : void 0;
      } catch (_error) {
        e = _error;
        return null;
      }
    };

    return MinimapGitDiffBinding;

  })();

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL1VzZXJzL2J6aXR0bGF1Ly5hdG9tL3BhY2thZ2VzL21pbmltYXAtZ2l0LWRpZmYvbGliL21pbmltYXAtZ2l0LWRpZmYtYmluZGluZy5jb2ZmZWUiCiAgXSwKICAibmFtZXMiOiBbXSwKICAibWFwcGluZ3MiOiAiQUFBQTtBQUFBLE1BQUEsNkRBQUE7SUFBQSxrRkFBQTs7QUFBQSxFQUFDLHNCQUF1QixPQUFBLENBQVEsTUFBUixFQUF2QixtQkFBRCxDQUFBOztBQUFBLEVBQ0Msb0JBQXFCLE9BQUEsQ0FBUSxXQUFSLEVBQXJCLGlCQURELENBQUE7O0FBQUEsRUFHQSxNQUFNLENBQUMsT0FBUCxHQUNNO0FBRUosb0NBQUEsTUFBQSxHQUFRLEtBQVIsQ0FBQTs7QUFFYSxJQUFBLCtCQUFFLE9BQUYsR0FBQTtBQUNYLFVBQUEsVUFBQTtBQUFBLE1BRFksSUFBQyxDQUFBLFVBQUEsT0FDYixDQUFBO0FBQUEsK0NBQUEsQ0FBQTtBQUFBLHVEQUFBLENBQUE7QUFBQSxNQUFBLElBQUMsQ0FBQSxXQUFELEdBQWUsRUFBZixDQUFBO0FBQUEsTUFDQSxJQUFDLENBQUEsT0FBRCxHQUFXLElBRFgsQ0FBQTtBQUFBLE1BRUEsSUFBQyxDQUFBLGFBQUQsR0FBaUIsR0FBQSxDQUFBLG1CQUZqQixDQUFBO0FBSUEsTUFBQSxJQUFPLG9CQUFQO0FBQ0UsZUFBTyxPQUFPLENBQUMsSUFBUixDQUFhLG9EQUFiLENBQVAsQ0FERjtPQUpBO0FBQUEsTUFPQSxJQUFDLENBQUEsTUFBRCxHQUFVLElBQUMsQ0FBQSxPQUFPLENBQUMsYUFBVCxDQUFBLENBUFYsQ0FBQTtBQUFBLE1BU0EsSUFBQyxDQUFBLGFBQWEsQ0FBQyxHQUFmLENBQW1CLElBQUMsQ0FBQSxPQUFPLENBQUMsWUFBVCxDQUFzQixJQUFDLENBQUEsT0FBdkIsQ0FBbkIsQ0FUQSxDQUFBO0FBV0EsTUFBQSxJQUFHLFVBQUEsR0FBYSxJ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

//# sourceURL=/Users/bzittlau/.atom/packages/minimap-git-diff/lib/minimap-git-diff-binding.coffee
