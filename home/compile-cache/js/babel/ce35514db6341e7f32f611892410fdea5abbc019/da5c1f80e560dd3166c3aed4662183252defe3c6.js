Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _letter = require("./letter");

var _letter2 = _interopRequireDefault(_letter);

"use babel";

var Markers = (function () {
    function Markers(oRefTextEditor, oRefTextEditorView) {
        _classCallCheck(this, Markers);

        this.oRefTextEditor = oRefTextEditor;
        this.oRefTextEditorView = oRefTextEditorView;
        this.aMarkers = [];
    }

    _createClass(Markers, [{
        key: "add",
        value: function add(oRange, sLetter, oOptions) {
            oMarker = this.oRefTextEditor.markBufferRange(oRange);
            oDecoration = this.oRefTextEditor.decorateMarker(oMarker, {
                "type": "overlay",
                "item": new _letter2["default"](this.oRefTextEditor, this.oRefTextEditorView, oRange, sLetter, oOptions)
            });
            this.aMarkers.push(oMarker);
        }
    }, {
        key: "clear",
        value: function clear() {
            for (var _oMarker of this.aMarkers) {
                _oMarker.destroy();
            }
        }
    }]);

    return Markers;
})();

exports["default"] = Markers;
module.exports = exports["default"];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9ieml0dGxhdS8uYXRvbS9wYWNrYWdlcy9lYXN5LW1vdGlvbi1yZWR1eC9saWIvdmlld3MvbWFya2Vycy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O3NCQUVtQixVQUFVOzs7O0FBRjdCLFdBQVcsQ0FBQzs7SUFJUyxPQUFPO0FBRWIsYUFGTSxPQUFPLENBRVgsY0FBYyxFQUFFLGtCQUFrQixFQUFHOzhCQUZqQyxPQUFPOztBQUdwQixZQUFJLENBQUMsY0FBYyxHQUFHLGNBQWMsQ0FBQztBQUNyQyxZQUFJLENBQUMsa0JBQWtCLEdBQUcsa0JBQWtCLENBQUM7QUFDN0MsWUFBSSxDQUFDLFFBQVEsR0FBRyxFQUFFLENBQUM7S0FDdEI7O2lCQU5nQixPQUFPOztlQVFyQixhQUFFLE1BQU0sRUFBRSxPQUFPLEVBQUUsUUFBUSxFQUFHO0FBQzdCLG1CQUFPLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxlQUFlLENBQUUsTUFBTSxDQUFFLENBQUM7QUFDeEQsdUJBQVcsR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDLGNBQWMsQ0FBRSxPQUFPLEVBQUU7QUFDdkQsc0JBQU0sRUFBRSxTQUFTO0FBQ2pCLHNCQUFNLEVBQUUsd0JBQVksSUFBSSxDQUFDLGNBQWMsRUFBRSxJQUFJLENBQUMsa0JBQWtCLEVBQUUsTUFBTSxFQUFFLE9BQU8sRUFBRSxRQUFRLENBQUU7YUFDaEcsQ0FBRSxDQUFDO0FBQ0osZ0JBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFFLE9BQU8sQ0FBRSxDQUFDO1NBQ2pDOzs7ZUFFSSxpQkFBRztBQUNKLGlCQUFNLElBQUksUUFBTyxJQUFJLElBQUksQ0FBQyxRQUFRLEVBQUc7QUFDakMsd0JBQU8sQ0FBQyxPQUFPLEVBQUUsQ0FBQzthQUNyQjtTQUNKOzs7V0FyQmdCLE9BQU87OztxQkFBUCxPQUFPIiwiZmlsZSI6Ii9Vc2Vycy9ieml0dGxhdS8uYXRvbS9wYWNrYWdlcy9lYXN5LW1vdGlvbi1yZWR1eC9saWIvdmlld3MvbWFya2Vycy5qcyIsInNvdXJjZXNDb250ZW50IjpbIlwidXNlIGJhYmVsXCI7XG5cbmltcG9ydCBMZXR0ZXIgZnJvbSBcIi4vbGV0dGVyXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE1hcmtlcnMge1xuXG4gICAgY29uc3RydWN0b3IoIG9SZWZUZXh0RWRpdG9yLCBvUmVmVGV4dEVkaXRvclZpZXcgKSB7XG4gICAgICAgIHRoaXMub1JlZlRleHRFZGl0b3IgPSBvUmVmVGV4dEVkaXRvcjtcbiAgICAgICAgdGhpcy5vUmVmVGV4dEVkaXRvclZpZXcgPSBvUmVmVGV4dEVkaXRvclZpZXc7XG4gICAgICAgIHRoaXMuYU1hcmtlcnMgPSBbXTtcbiAgICB9XG5cbiAgICBhZGQoIG9SYW5nZSwgc0xldHRlciwgb09wdGlvbnMgKSB7XG4gICAgICAgIG9NYXJrZXIgPSB0aGlzLm9SZWZUZXh0RWRpdG9yLm1hcmtCdWZmZXJSYW5nZSggb1JhbmdlICk7XG4gICAgICAgIG9EZWNvcmF0aW9uID0gdGhpcy5vUmVmVGV4dEVkaXRvci5kZWNvcmF0ZU1hcmtlciggb01hcmtlciwge1xuICAgICAgICAgICAgXCJ0eXBlXCI6IFwib3ZlcmxheVwiLFxuICAgICAgICAgICAgXCJpdGVtXCI6IG5ldyBMZXR0ZXIoIHRoaXMub1JlZlRleHRFZGl0b3IsIHRoaXMub1JlZlRleHRFZGl0b3JWaWV3LCBvUmFuZ2UsIHNMZXR0ZXIsIG9PcHRpb25zIClcbiAgICAgICAgfSApO1xuICAgICAgICB0aGlzLmFNYXJrZXJzLnB1c2goIG9NYXJrZXIgKTtcbiAgICB9XG5cbiAgICBjbGVhcigpIHtcbiAgICAgICAgZm9yICggbGV0IG9NYXJrZXIgb2YgdGhpcy5hTWFya2VycyApIHtcbiAgICAgICAgICAgIG9NYXJrZXIuZGVzdHJveSgpO1xuICAgICAgICB9XG4gICAgfVxuXG59XG4iXX0=
//# sourceURL=/Users/bzittlau/.atom/packages/easy-motion-redux/lib/views/markers.js
