(function() {
  var CompositeDisposable, Point, createElementsForGuides, getGuides, styleGuide, _, _ref, _ref1;

  _ref = require('atom'), CompositeDisposable = _ref.CompositeDisposable, Point = _ref.Point;

  _ = require('lodash');

  _ref1 = require('./indent-guide-improved-element'), createElementsForGuides = _ref1.createElementsForGuides, styleGuide = _ref1.styleGuide;

  getGuides = require('./guides.coffee').getGuides;

  module.exports = {
    activate: function(state) {
      var handleEvents, msg, updateGuide;
      this.currentSubscriptions = [];
      atom.config.set('editor.showIndentGuide', false);
      if (!atom.config.get('editor.useShadowDOM')) {
        msg = 'To use indent-guide-improved package, please check "Use Shadow DOM" in Settings.';
        atom.notifications.addError(msg, {
          dismissable: true
        });
        return;
      }
      updateGuide = function(editor, editorElement) {
        var basePixelPos, getIndent, guides, lineHeightPixel, scrollLeft, scrollTop, visibleRange, visibleScreenRange;
        visibleScreenRange = editorElement.getVisibleRowRange();
        if (!((visibleScreenRange != null) && (editorElement.component != null))) {
          return;
        }
        basePixelPos = editorElement.pixelPositionForScreenPosition(new Point(visibleScreenRange[0], 0)).top;
        visibleRange = visibleScreenRange.map(function(row) {
          return editor.bufferPositionForScreenPosition(new Point(row, 0)).row;
        });
        getIndent = function(row) {
          if (editor.lineTextForBufferRow(row).match(/^\s*$/)) {
            return null;
          } else {
            return editor.indentationForBufferRow(row);
          }
        };
        scrollTop = editorElement.getScrollTop();
        scrollLeft = editorElement.getScrollLeft();
        guides = getGuides(visibleRange[0], visibleRange[1], editor.getLastBufferRow(), editor.getCursorBufferPositions().map(function(point) {
          return point.row;
        }), getIndent);
        lineHeightPixel = editor.getLineHeightInPixels();
        return createElementsForGuides(editorElement, guides.map(function(g) {
          return function(el) {
            return styleGuide(el, g.point.translate(new Point(visibleRange[0], 0)), g.length, g.stack, g.active, editor, basePixelPos, lineHeightPixel, visibleScreenRange[0], scrollTop, scrollLeft);
          };
        }));
      };
      handleEvents = (function(_this) {
        return function(editor, editorElement) {
          var delayedUpdate, subscriptions, up, update;
          up = function() {
            return updateGuide(editor, editorElement);
          };
          delayedUpdate = function() {
            return setTimeout(up, 0);
          };
          update = _.throttle(up, 30);
          subscriptions = new CompositeDisposable;
          subscriptions.add(atom.workspace.onDidStopChangingActivePaneItem(function(item) {
            if (item === editor) {
              return delayedUpdate();
            }
          }));
          subscriptions.add(atom.config.onDidChange('editor.fontSize', delayedUpdate));
          subscriptions.add(atom.config.onDidChange('editor.fontFamily', delayedUpdate));
          subscriptions.add(atom.config.onDidChange('editor.lineHeight', delayedUpdate));
          subscriptions.add(editor.onDidChangeCursorPosition(update));
          subscriptions.add(editorElement.onDidChangeScrollTop(update));
          subscriptions.add(editorElement.onDidChangeScrollLeft(update));
          subscriptions.add(editor.onDidStopChanging(update));
          subscriptions.add(editor.onDidDestroy(function() {
            _this.currentSubscriptions.splice(_this.currentSubscriptions.indexOf(subscriptions), 1);
            return subscriptions.dispose();
          }));
          return _this.currentSubscriptions.push(subscriptions);
        };
      })(this);
      return atom.workspace.observeTextEditors(function(editor) {
        var editorElement;
        if (editor == null) {
          return;
        }
        editorElement = atom.views.getView(editor);
        if (editorElement == null) {
          return;
        }
        handleEvents(editor, editorElement);
        return updateGuide(editor, editorElement);
      });
    },
    deactivate: function() {
      this.currentSubscriptions.forEach(function(s) {
        return s.dispose();
      });
      return atom.workspace.getTextEditors().forEach(function(te) {
        var v;
        v = atom.views.getView(te);
        if (!v) {
          return;
        }
        return Array.prototype.forEach.call(v.querySelectorAll('.indent-guide-improved'), function(e) {
          return e.parentNode.removeChild(e);
        });
      });
    }
  };

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL1VzZXJzL2J6aXR0bGF1Ly5hdG9tL3BhY2thZ2VzL2luZGVudC1ndWlkZS1pbXByb3ZlZC9saWIvaW5kZW50LWd1aWRlLWltcHJvdmVkLmNvZmZlZSIKICBdLAogICJuYW1lcyI6IFtdLAogICJtYXBwaW5ncyI6ICJBQUFBO0FBQUEsTUFBQSwwRkFBQTs7QUFBQSxFQUFBLE9BQStCLE9BQUEsQ0FBUSxNQUFSLENBQS9CLEVBQUMsMkJBQUEsbUJBQUQsRUFBc0IsYUFBQSxLQUF0QixDQUFBOztBQUFBLEVBQ0EsQ0FBQSxHQUFJLE9BQUEsQ0FBUSxRQUFSLENBREosQ0FBQTs7QUFBQSxFQUdBLFFBQXdDLE9BQUEsQ0FBUSxpQ0FBUixDQUF4QyxFQUFDLGdDQUFBLHVCQUFELEVBQTBCLG1CQUFBLFVBSDFCLENBQUE7O0FBQUEsRUFJQyxZQUFhLE9BQUEsQ0FBUSxpQkFBUixFQUFiLFNBSkQsQ0FBQTs7QUFBQSxFQU1BLE1BQU0sQ0FBQyxPQUFQLEdBQ0U7QUFBQSxJQUFBLFFBQUEsRUFBVSxTQUFDLEtBQUQsR0FBQTtBQUNSLFVBQUEsOEJBQUE7QUFBQSxNQUFBLElBQUMsQ0FBQSxvQkFBRCxHQUF3QixFQUF4QixDQUFBO0FBQUEsTUFHQSxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQVosQ0FBZ0Isd0JBQWhCLEVBQTBDLEtBQTFDLENBSEEsQ0FBQTtBQUtBLE1BQUEsSUFBQSxDQUFBLElBQVcsQ0FBQyxNQUFNLENBQUMsR0FBWixDQUFnQixxQkFBaEIsQ0FBUDtBQUNFLFFBQUEsR0FBQSxHQUFNLGtGQUFOLENBQUE7QUFBQSxRQUNBLElBQUksQ0FBQyxhQUFhLENBQUMsUUFBbkIsQ0FBNEIsR0FBNUIsRUFBaUM7QUFBQSxVQUFDLFdBQUEsRUFBYSxJQUFkO1NBQWpDLENBREEsQ0FBQTtBQUVBLGNBQUEsQ0FIRjtPQUxBO0FBQUEsTUFVQSxXQUFBLEdBQWMsU0FBQyxNQUFELEVB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

//# sourceURL=/Users/bzittlau/.atom/packages/indent-guide-improved/lib/indent-guide-improved.coffee
