var _slicedToArray = (function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; })();

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _atom = require("atom");

var _path = require("path");

var _path2 = _interopRequireDefault(_path);

"use babel";

module.exports = new ((function () {
  function _class() {
    _classCallCheck(this, _class);

    this.config = {};
  }

  _createClass(_class, [{
    key: "activate",
    value: function activate() {
      var _this = this;

      this.subscriptions = new _atom.CompositeDisposable();
      this.subscriptions.add(atom.commands.add("atom-workspace", {
        "copy-path:copy-basename": function copyPathCopyBasename(e) {
          return _this.copyBasename(e);
        },
        "copy-path:copy-extension": function copyPathCopyExtension(e) {
          return _this.copyExtension(e);
        },
        "copy-path:copy-basename-wo-extension": function copyPathCopyBasenameWoExtension(e) {
          return _this.copyBasenameWithoutExtension(e);
        },
        "copy-path:copy-project-relative-path": function copyPathCopyProjectRelativePath(e) {
          return _this.copyProjectRelativePath(e);
        },
        "copy-path:copy-full-path": function copyPathCopyFullPath(e) {
          return _this.copyFullPath(e);
        },
        "copy-path:copy-base-dirname": function copyPathCopyBaseDirname(e) {
          return _this.copyBaseDirname(e);
        },
        "copy-path:copy-project-relative-dirname": function copyPathCopyProjectRelativeDirname(e) {
          return _this.copyProjectRelativeDirname(e);
        },
        "copy-path:copy-full-dirname": function copyPathCopyFullDirname(e) {
          return _this.copyFullDirname(e);
        },
        "copy-path:copy-line-reference": function copyPathCopyLineReference(e) {
          return _this.copyLineReference(e);
        }
      }));
      if (process.platform === "win32") {
        this.activateForWin();
      }
    }
  }, {
    key: "activateForWin",
    value: function activateForWin() {
      var _this2 = this;

      this.subscriptions.add(atom.commands.add("atom-workspace", {
        "copy-path:copy-project-relative-path-web": function copyPathCopyProjectRelativePathWeb(e) {
          return _this2.copyProjectRelativePathForWeb(e);
        }
      }));
      atom.packages.onDidActivatePackage(function (package) {
        if (package.name !== "copy-path") {
          return;
        }
        package.menuManager.add([{
          label: "Packages",
          submenu: [{
            label: "Copy Path",
            submenu: [{
              label: "Copy Project-Relative Path for Web",
              command: "copy-path:copy-project-relative-path-web"
            }]
          }]
        }]);
        package.contextMenuManager.add({
          ".tab": [{
            label: "Copy Path",
            submenu: [{
              label: "Copy Project-Relative Path for Web",
              command: "copy-path:copy-project-relative-path-web"
            }]
          }]
        });
      });
    }
  }, {
    key: "deactivate",
    value: function deactivate() {
      this.subscriptions.dispose();
    }
  }, {
    key: "getTargetEditorPath",
    value: function getTargetEditorPath(e) {
      // tab's context menu
      var elTarget;
      if (e.target.classList.contains("title")) {
        elTarget = e.target;
      } else {
        // find .tab
        for (var i = 0; i < 100; i++) {
          var el = e.target.parentElement;
          if (el && el.classList.contains("tab")) {
            elTarget = el.querySelector(".title");
          }
        }
      }
      if (elTarget) {
        return elTarget.dataset.path;
      }
      // command palette etc.
      return atom.workspace.getActivePaneItem().getPath();
    }
  }, {
    key: "parseTargetEditorPath",
    value: function parseTargetEditorPath(e) {
      return _path2["default"].parse(this.getTargetEditorPath(e));
    }
  }, {
    key: "getProjectRelativePath",
    value: function getProjectRelativePath(p) {
      var _atom$project$relativizePath = atom.project.relativizePath(p);

      var _atom$project$relativizePath2 = _slicedToArray(_atom$project$relativizePath, 2);

      projectPath = _atom$project$relativizePath2[0];
      relativePath = _atom$project$relativizePath2[1];

      return relativePath;
    }
  }, {
    key: "copyBasename",
    value: function copyBasename(e) {
      var _parseTargetEditorPath = this.parseTargetEditorPath(e);

      var base = _parseTargetEditorPath.base;

      atom.clipboard.write(base);
    }
  }, {
    key: "copyExtension",
    value: function copyExtension(e) {
      var _parseTargetEditorPath2 = this.parseTargetEditorPath(e);

      var ext = _parseTargetEditorPath2.ext;

      atom.clipboard.write(ext);
    }
  }, {
    key: "copyBasenameWithoutExtension",
    value: function copyBasenameWithoutExtension(e) {
      var _parseTargetEditorPath3 = this.parseTargetEditorPath(e);

      var name = _parseTargetEditorPath3.name;

      atom.clipboard.write(name);
    }
  }, {
    key: "copyProjectRelativePath",
    value: function copyProjectRelativePath(e) {
      atom.clipboard.write(this.getProjectRelativePath(this.getTargetEditorPath(e)));
    }
  }, {
    key: "copyFullPath",
    value: function copyFullPath(e) {
      atom.clipboard.write(this.getTargetEditorPath(e));
    }
  }, {
    key: "copyBaseDirname",
    value: function copyBaseDirname(e) {
      var _parseTargetEditorPath4 = this.parseTargetEditorPath(e);

      var dir = _parseTargetEditorPath4.dir;

      atom.clipboard.write(_path2["default"].basename(dir));
    }
  }, {
    key: "copyProjectRelativeDirname",
    value: function copyProjectRelativeDirname(e) {
      var _parseTargetEditorPath5 = this.parseTargetEditorPath(e);

      var dir = _parseTargetEditorPath5.dir;

      atom.clipboard.write(this.getProjectRelativePath(dir));
    }
  }, {
    key: "copyFullDirname",
    value: function copyFullDirname(e) {
      var _parseTargetEditorPath6 = this.parseTargetEditorPath(e);

      var dir = _parseTargetEditorPath6.dir;

      atom.clipboard.write(dir);
    }
  }, {
    key: "copyLineReference",
    value: function copyLineReference(e) {
      var editor = atom.workspace.getActiveTextEditor();
      var lineNumber = editor.getCursorBufferPosition().row + 1;
      var relativePath = this.getProjectRelativePath(editor.getPath());
      atom.clipboard.write(relativePath + ":" + lineNumber);
    }
  }, {
    key: "copyProjectRelativePathForWeb",
    value: function copyProjectRelativePathForWeb(e) {
      var path = this.getProjectRelativePath(this.getTargetEditorPath(e)).replace(/\\/g, '/');
      atom.clipboard.write(path);
    }
  }]);

  return _class;
})())();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9ieml0dGxhdS8uYXRvbS9wYWNrYWdlcy9jb3B5LXBhdGgvbGliL2luZGV4LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O29CQUNxQyxNQUFNOztvQkFDMUIsTUFBTTs7OztBQUZ2QixXQUFXLENBQUM7O0FBSVosTUFBTSxDQUFDLE9BQU8sR0FBRztBQUVKLG9CQUFHOzs7QUFDWixRQUFJLENBQUMsTUFBTSxHQUFHLEVBQUUsQ0FBQztHQUNsQjs7OztXQUVPLG9CQUFHOzs7QUFDVCxVQUFJLENBQUMsYUFBYSxHQUFHLCtCQUF5QixDQUFDO0FBQy9DLFVBQUksQ0FBQyxhQUFhLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLGdCQUFnQixFQUFFO0FBQ3pELGlDQUF5QixFQUFFLDhCQUFDLENBQUM7aUJBQUssTUFBSyxZQUFZLENBQUMsQ0FBQyxDQUFDO1NBQUE7QUFDdEQsa0NBQTBCLEVBQUUsK0JBQUMsQ0FBQztpQkFBSyxNQUFLLGFBQWEsQ0FBQyxDQUFDLENBQUM7U0FBQTtBQUN4RCw4Q0FBc0MsRUFBRSx5Q0FBQyxDQUFDO2lCQUFLLE1BQUssNEJBQTRCLENBQUMsQ0FBQyxDQUFDO1NBQUE7QUFDbkYsOENBQXNDLEVBQUUseUNBQUMsQ0FBQztpQkFBSyxNQUFLLHVCQUF1QixDQUFDLENBQUMsQ0FBQztTQUFBO0FBQzlFLGtDQUEwQixFQUFFLDhCQUFDLENBQUM7aUJBQUssTUFBSyxZQUFZLENBQUMsQ0FBQyxDQUFDO1NBQUE7QUFDdkQscUNBQTZCLEVBQUUsaUNBQUMsQ0FBQztpQkFBSyxNQUFLLGVBQWUsQ0FBQyxDQUFDLENBQUM7U0FBQTtBQUM3RCxpREFBeUMsRUFBRSw0Q0FBQyxDQUFDO2lCQUFLLE1BQUssMEJBQTBCLENBQUMsQ0FBQyxDQUFDO1NBQUE7QUFDcEYscUNBQTZCLEVBQUUsaUNBQUMsQ0FBQztpQkFBSyxNQUFLLGVBQWUsQ0FBQyxDQUFDLENBQUM7U0FBQTtBQUM3RCx1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OztXQUVjLHlCQUFDLENBQUMsRUFBRTtvQ0FDSCxJQUFJLENBQUMscUJBQXFCLENBQUMsQ0FBQyxDQUFDOztVQUFwQyxHQUFHLDJCQUFILEdBQUc7O0FBQ1YsVUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7S0FDM0I7OztXQUVnQiwyQkFBQyxDQUFDLEVBQUU7QUFDbkIsVUFBTSxNQUFNLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxtQkFBbUIsRUFBRSxDQUFDO0FBQ3BELFVBQU0sVUFBVSxHQUFHLE1BQU0sQ0FBQyx1QkFBdUIsRUFBRSxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUM7QUFDNUQsVUFBTSxZQUFZLEdBQUcsSUFBSSxDQUFDLHNCQUFzQixDQUFDLE1BQU0sQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDO0FBQ25FLFVBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFJLFlBQVksU0FBSSxVQUFVLENBQUcsQ0FBQztLQUN2RDs7O1dBRTRCLHVDQUFDLENBQUMsRUFBRTtBQUMvQixVQUFJLElBQUksR0FBRyxJQUFJLENBQUMsc0JBQXNCLENBQUMsSUFBSSxDQUFDLG1CQUFtQixDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLEtBQUssRUFBRSxHQUFHLENBQUMsQ0FBQztBQUN4RixVQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQztLQUM1Qjs7OztPQUNGLENBQUMiLCJmaWxlIjoiL1VzZXJzL2J6aXR0bGF1Ly5hdG9tL3BhY2thZ2VzL2NvcHktcGF0aC9saWIvaW5kZXguanMiLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBiYWJlbFwiO1xuaW1wb3J0IHskLCBDb21wb3NpdGVEaXNwb3NhYmxlfSBmcm9tIFwiYXRvbVwiO1xuaW1wb3J0IHBhdGggZnJvbSBcInBhdGhcIjtcblxubW9kdWxlLmV4cG9ydHMgPSBuZXcgY2xhc3Mge1xuXG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMuY29uZmlnID0ge307XG4gIH1cblxuICBhY3RpdmF0ZSgpIHtcbiAgICB0aGlzLnN1YnNjcmlwdGlvbnMgPSBuZXcgQ29tcG9zaXRlRGlzcG9zYWJsZSgpO1xuICAgIHRoaXMuc3Vic2NyaXB0aW9ucy5hZGQoYXRvbS5jb21tYW5kcy5hZGQoXCJhdG9tLXdvcmtzcGFjZVwiLCB7XG4gICAgICBcImNvcHktcGF0aDpjb3B5LWJhc2VuYW1lXCI6IChlKSA9PiB0aGlzLmNvcHlCYXNlbmFtZShlKSxcbiAgICAgIFwiY29weS1wYXRoOmNvcHktZXh0ZW5zaW9uXCI6IChlKSA9PiB0aGlzLmNvcHlFeHRlbnNpb24oZSksXG4gICAgICBcImNvcHktcGF0aDpjb3B5LWJhc2VuYW1lLXdvLWV4dGVuc2lvblwiOiAoZSkgPT4gdGhpcy5jb3B5QmFzZW5hbWVXaXRob3V0RXh0ZW5zaW9uKGUpLFxuICAgICAgXCJjb3B5LXBhdGg6Y29weS1wcm9qZWN0LXJlbGF0aXZlLXBhdGhcIjogKGUpID0+IHRoaXMuY29weVByb2plY3RSZWxhdGl2ZVBhdGgoZSksXG4gICAgICBcImNvcHktcGF0aDpjb3B5LWZ1bGwtcGF0aFwiOiAoZSkgPT4gdGhpcy5jb3B5RnVsbFBhdGgoZSksXG4gICAgICBcImNvcHktcGF0aDpjb3B5LWJhc2UtZGlybmFtZVwiOiAoZSkgPT4gdGhpcy5jb3B5QmFzZURpcm5hbWUoZSksXG4gICAgICBcImNvcHktcGF0aDpjb3B5LXByb2plY3QtcmVsYXRpdmUtZGlybmFtZVwiOiAoZSkgPT4gdGhpcy5jb3B5UHJvamVjdFJlbGF0aXZlRGlybmFtZShlKSxcbiAgICAgIFwiY29weS1wYXRoOmNvcHktZnVsbC1kaXJuYW1lXCI6IChlKSA9PiB0aGlzLmNvcHlGdWxsRGlybmFtZShlKSxcbiAgICAgIFwiY29weS1wYXRoOmNvcHktbGluZS1yZWZlcmVuY2VcIjogKGUpID0+IHRoaXMuY29weUxpbmVSZWZlcmVuY2UoZSlcbiAgICB9KSk7XG4gICAgaWYgKHByb2Nlc3MucGxhdGZvcm0gPT09IFwid2luMzJcIikge1xuICAgICAgdGhpcy5hY3RpdmF0ZUZvcldpbigpO1xuICAgIH1cbiAgfVxuXG4gIGFjdGl2YXRlRm9yV2luKCkge1xuICAgIHRoaXMuc3Vic2NyaXB0aW9ucy5hZGQoYXRvbS5jb21tYW5kcy5hZGQoXCJhdG9tLXdvcmtzcGFjZVwiLCB7XG4gICAgICBcImNvcHktcGF0aDpjb3B5LXByb2plY3QtcmVsYXRpdmUtcGF0aC13ZWJcIjogKGUpID0+IHRoaXMuY29weVByb2plY3RSZWxhdGl2ZVBhdGhGb3JXZWIoZSlcbiAgICB9KSk7XG4gICAgYXRvbS5wYWNrYWdlcy5vbkRpZEFjdGl2YXRlUGFja2FnZSgocGFja2FnZSkgPT4ge1xuICAgICAgaWYgKHBhY2thZ2UubmFtZSAhPT0gXCJjb3B5LXBhdGhcIikge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBwYWNrYWdlLm1lbnVNYW5hZ2VyLmFkZChbXG4gICAgICAgIHtcbiAgICAgICAgICBsYWJlbDogXCJQYWNrYWdlc1wiLFxuICAgICAgICAgIHN1Ym1lbnU6IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgbGFiZWw6IFwiQ29weSBQYXRoXCIsXG4gICAgICAgICAgICAgIHN1Ym1lbnU6IFtcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICBsYWJlbDogXCJDb3B5IFByb2plY3QtUmVsYXRpdmUgUGF0aCBmb3IgV2ViXCIsXG4gICAgICAgICAgICAgICAgICBjb21tYW5kOiBcImNvcHktcGF0aDpjb3B5LXByb2plY3QtcmVsYXRpdmUtcGF0aC13ZWJcIlxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgfVxuICAgICAgICAgIF1cbiAgICAgICAgfVxuICAgICAgXSk7XG4gICAgICBwYWNrYWdlLmNvbnRleHRNZW51TWFuYWdlci5hZGQoe1xuICAgICAgICBcIi50YWJcIjogW1xuICAgICAgICAgIHtcbiAgICAgICAgICAgIGxhYmVsOiBcIkNvcHkgUGF0aFwiLFxuICAgICAgICAgICAgc3VibWVudTogW1xuICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgbGFiZWw6IFwiQ29weSBQcm9qZWN0LVJlbGF0aXZlIFBhdGggZm9yIFdlYlwiLFxuICAgICAgICAgICAgICAgIGNvbW1hbmQ6IFwiY29weS1wYXRoOmNvcHktcHJvamVjdC1yZWxhdGl2ZS1wYXRoLXdlYlwiXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIF1cbiAgICAgICAgICB9XG4gICAgICAgIF1cbiAgICAgIH0pXG4gICAgfSk7XG4gIH1cblxuICBkZWFjdGl2YXRlKCkge1xuICAgIHRoaXMuc3Vic2NyaXB0aW9ucy5kaXNwb3NlKCk7XG4gIH1cblxuICBnZXRUYXJnZXRFZGl0b3JQYXRoKGUpIHtcbiAgICAvLyB0YWIncyBjb250ZXh0IG1lbnVcbiAgICB2YXIgZWxUYXJnZXQ7XG4gICAgaWYgKGUudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucyhcInRpdGxlXCIpKSB7XG4gICAgICBlbFRhcmdldCA9IGUudGFyZ2V0O1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyBmaW5kIC50YWJcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgMTAwOyBpKyspIHtcbiAgICAgICAgY29uc3QgZWwgPSBlLnRhcmdldC5wYXJlbnRFbGVtZW50O1xuICAgICAgICBpZiAoZWwgJiYgZWwuY2xhc3NMaXN0LmNvbnRhaW5zKFwidGFiXCIpKSB7XG4gICAgICAgICAgZWxUYXJnZXQgPSBlbC5xdWVyeVNlbGVjdG9yKFwiLnRpdGxlXCIpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIGlmIChlbFRhcmdldCkge1xuICAgICAgcmV0dXJuIGVsVGFyZ2V0LmRhdGFzZXQucGF0aDtcbiAgICB9XG4gICAgLy8gY29tbWFuZCBwYWxldHRlIGV0Yy5cbiAgICByZXR1cm4gYXRvbS53b3Jrc3BhY2UuZ2V0QWN0aXZlUGFuZUl0ZW0oKS5nZXRQYXRoKCk7XG4gIH1cblxuICBwYXJzZVRhcmdldEVkaXRvclBhdGgoZSkge1xuICAgIHJldHVybiBwYXRoLnBhcnNlKHRoaXMuZ2V0VGFyZ2V0RWRpdG9yUGF0aChlKSk7XG4gIH1cblxuICBnZXRQcm9qZWN0UmVsYXRpdmVQYXRoKHApIHtcbiAgICBbcHJvamVjdFBhdGgsIHJlbGF0aXZlUGF0aF0gPSBhdG9tLnByb2plY3QucmVsYXRpdml6ZVBhdGgocCk7XG4gICAgcmV0dXJuIHJlbGF0aXZlUGF0aDtcbiAgfVxuXG4gIGNvcHlCYXNlbmFtZShlKSB7XG4gICAgY29uc3Qge2Jhc2V9ID0gdGhpcy5wYXJzZVRhcmdldEVkaXRvclBhdGgoZSk7XG4gICAgYXRvbS5jbGlwYm9hcmQud3JpdGUoYmFzZSk7XG4gIH1cblxuICBjb3B5RXh0ZW5zaW9uKGUpIHtcbiAgICBjb25zdCB7ZXh0fSA9IHRoaXMucGFyc2VUYXJnZXRFZGl0b3JQYXRoKGUpO1xuICAgIGF0b20uY2xpcGJvYXJkLndyaXRlKGV4dCk7XG4gIH1cblxuICBjb3B5QmFzZW5hbWVXaXRob3V0RXh0ZW5zaW9uKGUpIHtcbiAgICBjb25zdCB7bmFtZX0gPSB0aGlzLnBhcnNlVGFyZ2V0RWRpdG9yUGF0aChlKTtcbiAgICBhdG9tLmNsaXBib2FyZC53cml0ZShuYW1lKTtcbiAgfVxuXG4gIGNvcHlQcm9qZWN0UmVsYXRpdmVQYXRoKGUpIHtcbiAgICBhdG9tLmNsaXBib2FyZC53cml0ZSh0aGlzLmdldFByb2plY3RSZWxhdGl2ZVBhdGgodGhpcy5nZXRUYXJnZXRFZGl0b3JQYXRoKGUpKSk7XG4gIH1cblxuICBjb3B5RnVsbFBhdGgoZSkge1xuICAgIGF0b20uY2xpcGJvYXJkLndyaXRlKHRoaXMuZ2V0VGFyZ2V0RWRpdG9yUGF0aChlKSk7XG4gIH1cblxuICBjb3B5QmFzZURpcm5hbWUoZSkge1xuICAgIGNvbnN0IHtkaXJ9ID0gdGhpcy5wYXJzZVRhcmdldEVkaXRvclBhdGgoZSk7XG4gICAgYXRvbS5jbGlwYm9hcmQud3JpdGUocGF0aC5iYXNlbmFtZShkaXIpKTtcbiAgfVxuXG4gIGNvcHlQcm9qZWN0UmVsYXRpdmVEaXJuYW1lKGUpIHtcbiAgICBjb25zdCB7ZGlyfSA9IHRoaXMucGFyc2VUYXJnZXRFZGl0b3JQYXRoKGUpO1xuICAgIGF0b20uY2xpcGJvYXJkLndyaXRlKHRoaXMuZ2V0UHJvamVjdFJlbGF0aXZlUGF0aChkaXIpKTtcbiAgfVxuXG4gIGNvcHlGdWxsRGlybmFtZShlKSB7XG4gICAgY29uc3Qge2Rpcn0gPSB0aGlzLnBhcnNlVGFyZ2V0RWRpdG9yUGF0aChlKTtcbiAgICBhdG9tLmNsaXBib2FyZC53cml0ZShkaXIpO1xuICB9XG5cbiAgY29weUxpbmVSZWZlcmVuY2UoZSkge1xuICAgIGNvbnN0IGVkaXRvciA9IGF0b20ud29ya3NwYWNlLmdldEFjdGl2ZVRleHRFZGl0b3IoKTtcbiAgICBjb25zdCBsaW5lTnVtYmVyID0gZWRpdG9yLmdldEN1cnNvckJ1ZmZlclBvc2l0aW9uKCkucm93ICsgMTtcbiAgICBjb25zdCByZWxhdGl2ZVBhdGggPSB0aGlzLmdldFByb2plY3RSZWxhdGl2ZVBhdGgoZWRpdG9yLmdldFBhdGgoKSk7XG4gICAgYXRvbS5jbGlwYm9hcmQud3JpdGUoYCR7cmVsYXRpdmVQYXRofToke2xpbmVOdW1iZXJ9YCk7XG4gIH1cblxuICBjb3B5UHJvamVjdFJlbGF0aXZlUGF0aEZvcldlYihlKSB7XG4gICAgdmFyIHBhdGggPSB0aGlzLmdldFByb2plY3RSZWxhdGl2ZVBhdGgodGhpcy5nZXRUYXJnZXRFZGl0b3JQYXRoKGUpKS5yZXBsYWNlKC9cXFxcL2csICcvJyk7XG4gICAgYXRvbS5jbGlwYm9hcmQud3JpdGUocGF0aCk7XG4gIH1cbn07XG4iXX0=
//# sourceURL=/Users/bzittlau/.atom/packages/copy-path/lib/index.js
