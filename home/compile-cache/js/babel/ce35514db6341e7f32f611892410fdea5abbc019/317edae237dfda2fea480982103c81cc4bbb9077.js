function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _libMinimapCursorline = require('../lib/minimap-cursorline');

var _libMinimapCursorline2 = _interopRequireDefault(_libMinimapCursorline);

// Use the command `window:run-package-specs` (cmd-alt-ctrl-p) to run specs.
//
// To run a specific `it` or `describe` block add an `f` to the front (e.g. `fit`
// or `fdescribe`). Remove the `f` to unfocus the block.

'use babel';

describe('MinimapCursorLine', function () {
  var _ref = [];
  var workspaceElement = _ref[0];
  var editor = _ref[1];
  var minimap = _ref[2];

  beforeEach(function () {
    workspaceElement = atom.views.getView(atom.workspace);
    jasmine.attachToDOM(workspaceElement);

    waitsForPromise(function () {
      return atom.workspace.open('sample.js').then(function (e) {
        editor = e;
      });
    });

    waitsForPromise(function () {
      return atom.packages.activatePackage('minimap').then(function (pkg) {
        minimap = pkg.mainModule.minimapForEditor(editor);
      });
    });

    waitsForPromise(function () {
      return atom.packages.activatePackage('minimap-cursorline');
    });
  });

  describe('with an open editor that have a minimap', function () {
    var cursor = undefined,
        marker = undefined;
    describe('when cursor markers are added to the editor', function () {
      beforeEach(function () {
        cursor = editor.addCursorAtScreenPosition({ row: 2, column: 3 });
        marker = cursor.getMarker();
      });

      it('creates decoration for the cursor markers', function () {
        expect(Object.keys(minimap.decorationsByMarkerId).length).toEqual(1);
      });
    });
  });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9ieml0dGxhdS8uYXRvbS9wYWNrYWdlcy9taW5pbWFwLWN1cnNvcmxpbmUvc3BlYy9taW5pbWFwLWN1cnNvcmxpbmUtc3BlYy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztvQ0FFOEIsMkJBQTJCOzs7Ozs7Ozs7QUFGekQsV0FBVyxDQUFBOztBQVNYLFFBQVEsQ0FBQyxtQkFBbUIsRUFBRSxZQUFNO2FBQ1EsRUFBRTtNQUF2QyxnQkFBZ0I7TUFBRSxNQUFNO01BQUUsT0FBTzs7QUFFdEMsWUFBVSxDQUFDLFlBQU07QUFDZixvQkFBZ0IsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUE7QUFDckQsV0FBTyxDQUFDLFdBQVcsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFBOztBQUVyQyxtQkFBZSxDQUFDLFlBQU07QUFDcEIsYUFBTyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBQyxDQUFDLEVBQUs7QUFDbEQsY0FBTSxHQUFHLENBQUMsQ0FBQTtPQUNYLENBQUMsQ0FBQTtLQUNILENBQUMsQ0FBQTs7QUFFRixtQkFBZSxDQUFDLFlBQU07QUFDcEIsYUFBTyxJQUFJLENBQUMsUUFBUSxDQUFDLGVBQWUsQ0FBQyxTQUFTLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBQyxHQUFHLEVBQUs7QUFDNUQsZUFBTyxHQUFHLEdBQUcsQ0FBQyxVQUFVLENBQUMsZ0JBQWdCLENBQUMsTUFBTSxDQUFDLENBQUE7T0FDbEQsQ0FBQyxDQUFBO0tBQ0gsQ0FBQyxDQUFBOztBQUVGLG1CQUFlLENBQUMsWUFBTTtBQUNwQixhQUFPLElBQUksQ0FBQyxRQUFRLENBQUMsZUFBZSxDQUFDLG9CQUFvQixDQUFDLENBQUE7S0FDM0QsQ0FBQyxDQUFBO0dBQ0gsQ0FBQyxDQUFBOztBQUVGLFVBQVEsQ0FBQyx5Q0FBeUMsRUFBRSxZQUFNO0FBQ3hELFFBQUksTUFBTSxZQUFBO1FBQUUsTUFBTSxZQUFBLENBQUE7QUFDbEIsWUFBUSxDQUFDLDZDQUE2QyxFQUFFLFlBQU07QUFDNUQsZ0JBQVUsQ0FBQyxZQUFNO0FBQ2YsY0FBTSxHQUFHLE1BQU0sQ0FBQyx5QkFBeUIsQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDLEVBQUUsTUFBTSxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUE7QUFDaEUsY0FBTSxHQUFHLE1BQU0sQ0FBQyxTQUFTLEVBQUUsQ0FBQTtPQUM1QixDQUFDLENBQUE7O0FBRUYsUUFBRSxDQUFDLDJDQUEyQyxFQUFFLFlBQU07QUFDcEQsY0FBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLHFCQUFxQixDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFBO09BQ3JFLENBQUMsQ0FBQTtLQUNILENBQUMsQ0FBQTtHQUNILENBQUMsQ0FBQTtDQUNILENBQUMsQ0FBQSIsImZpbGUiOiIvVXNlcnMvYnppdHRsYXUvLmF0b20vcGFja2FnZXMvbWluaW1hcC1jdXJzb3JsaW5lL3NwZWMvbWluaW1hcC1jdXJzb3JsaW5lLXNwZWMuanMiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIGJhYmVsJ1xuXG5pbXBvcnQgTWluaW1hcEN1cnNvckxpbmUgZnJvbSAnLi4vbGliL21pbmltYXAtY3Vyc29ybGluZSdcblxuLy8gVXNlIHRoZSBjb21tYW5kIGB3aW5kb3c6cnVuLXBhY2thZ2Utc3BlY3NgIChjbWQtYWx0LWN0cmwtcCkgdG8gcnVuIHNwZWNzLlxuLy9cbi8vIFRvIHJ1biBhIHNwZWNpZmljIGBpdGAgb3IgYGRlc2NyaWJlYCBibG9jayBhZGQgYW4gYGZgIHRvIHRoZSBmcm9udCAoZS5nLiBgZml0YFxuLy8gb3IgYGZkZXNjcmliZWApLiBSZW1vdmUgdGhlIGBmYCB0byB1bmZvY3VzIHRoZSBibG9jay5cblxuZGVzY3JpYmUoJ01pbmltYXBDdXJzb3JMaW5lJywgKCkgPT4ge1xuICBsZXQgW3dvcmtzcGFjZUVsZW1lbnQsIGVkaXRvciwgbWluaW1hcF0gPSBbXVxuXG4gIGJlZm9yZUVhY2goKCkgPT4ge1xuICAgIHdvcmtzcGFjZUVsZW1lbnQgPSBhdG9tLnZpZXdzLmdldFZpZXcoYXRvbS53b3Jrc3BhY2UpXG4gICAgamFzbWluZS5hdHRhY2hUb0RPTSh3b3Jrc3BhY2VFbGVtZW50KVxuXG4gICAgd2FpdHNGb3JQcm9taXNlKCgpID0+IHtcbiAgICAgIHJldHVybiBhdG9tLndvcmtzcGFjZS5vcGVuKCdzYW1wbGUuanMnKS50aGVuKChlKSA9PiB7XG4gICAgICAgIGVkaXRvciA9IGVcbiAgICAgIH0pXG4gICAgfSlcblxuICAgIHdhaXRzRm9yUHJvbWlzZSgoKSA9PiB7XG4gICAgICByZXR1cm4gYXRvbS5wYWNrYWdlcy5hY3RpdmF0ZVBhY2thZ2UoJ21pbmltYXAnKS50aGVuKChwa2cpID0+IHtcbiAgICAgICAgbWluaW1hcCA9IHBrZy5tYWluTW9kdWxlLm1pbmltYXBGb3JFZGl0b3IoZWRpdG9yKVxuICAgICAgfSlcbiAgICB9KVxuXG4gICAgd2FpdHNGb3JQcm9taXNlKCgpID0+IHtcbiAgICAgIHJldHVybiBhdG9tLnBhY2thZ2VzLmFjdGl2YXRlUGFja2FnZSgnbWluaW1hcC1jdXJzb3JsaW5lJylcbiAgICB9KVxuICB9KVxuXG4gIGRlc2NyaWJlKCd3aXRoIGFuIG9wZW4gZWRpdG9yIHRoYXQgaGF2ZSBhIG1pbmltYXAnLCAoKSA9PiB7XG4gICAgbGV0IGN1cnNvciwgbWFya2VyXG4gICAgZGVzY3JpYmUoJ3doZW4gY3Vyc29yIG1hcmtlcnMgYXJlIGFkZGVkIHRvIHRoZSBlZGl0b3InLCAoKSA9PiB7XG4gICAgICBiZWZvcmVFYWNoKCgpID0+IHtcbiAgICAgICAgY3Vyc29yID0gZWRpdG9yLmFkZEN1cnNvckF0U2NyZWVuUG9zaXRpb24oeyByb3c6IDIsIGNvbHVtbjogMyB9KVxuICAgICAgICBtYXJrZXIgPSBjdXJzb3IuZ2V0TWFya2VyKClcbiAgICAgIH0pXG5cbiAgICAgIGl0KCdjcmVhdGVzIGRlY29yYXRpb24gZm9yIHRoZSBjdXJzb3IgbWFya2VycycsICgpID0+IHtcbiAgICAgICAgZXhwZWN0KE9iamVjdC5rZXlzKG1pbmltYXAuZGVjb3JhdGlvbnNCeU1hcmtlcklkKS5sZW5ndGgpLnRvRXF1YWwoMSlcbiAgICAgIH0pXG4gICAgfSlcbiAgfSlcbn0pXG4iXX0=
//# sourceURL=/Users/bzittlau/.atom/packages/minimap-cursorline/spec/minimap-cursorline-spec.js
