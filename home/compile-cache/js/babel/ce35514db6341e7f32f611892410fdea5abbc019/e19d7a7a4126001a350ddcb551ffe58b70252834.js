Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _atomSpacePenViews = require("atom-space-pen-views");

"use babel";

var LetterCoverView = (function (_View) {
    _inherits(LetterCoverView, _View);

    function LetterCoverView() {
        _classCallCheck(this, LetterCoverView);

        _get(Object.getPrototypeOf(LetterCoverView.prototype), "constructor", this).apply(this, arguments);
    }

    _createClass(LetterCoverView, [{
        key: "initialize",
        value: function initialize(oTextEditor, oTextEditorView, oRange, sLetter, oOptions) {
            var iHeight = oTextEditor.getLineHeightInPixels();

            this.text(sLetter);
            this.addClass(oOptions.single ? "single" : "many");

            this.css({
                "position": "absolute",
                "height": iHeight + "px",
                "top": iHeight * -1 + "px",
                "left": oTextEditor.getDefaultCharWidth() * -1 + "px"
            });
        }
    }], [{
        key: "content",
        value: function content() {
            return this.div({
                "class": "easy-motion-redux-letter"
            });
        }
    }]);

    return LetterCoverView;
})(_atomSpacePenViews.View);

exports["default"] = LetterCoverView;
module.exports = exports["default"];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9ieml0dGxhdS8uYXRvbS9wYWNrYWdlcy9lYXN5LW1vdGlvbi1yZWR1eC9saWIvdmlld3MvbGV0dGVyLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztpQ0FFcUIsc0JBQXNCOztBQUYzQyxXQUFXLENBQUM7O0lBSVMsZUFBZTtjQUFmLGVBQWU7O2FBQWYsZUFBZTs4QkFBZixlQUFlOzttQ0FBZixlQUFlOzs7aUJBQWYsZUFBZTs7ZUFPdEIsb0JBQUUsV0FBVyxFQUFFLGVBQWUsRUFBRSxNQUFNLEVBQUUsT0FBTyxFQUFFLFFBQVEsRUFBRztBQUNsRSxnQkFBSSxPQUFPLEdBQUcsV0FBVyxDQUFDLHFCQUFxQixFQUFFLENBQUM7O0FBRWxELGdCQUFJLENBQUMsSUFBSSxDQUFFLE9BQU8sQ0FBRSxDQUFDO0FBQ3JCLGdCQUFJLENBQUMsUUFBUSxDQUFFLFFBQVEsQ0FBQyxNQUFNLEdBQUcsUUFBUSxHQUFHLE1BQU0sQ0FBRSxDQUFDOztBQUVyRCxnQkFBSSxDQUFDLEdBQUcsQ0FBRTtBQUNOLDBCQUFVLEVBQUUsVUFBVTtBQUN0Qix3QkFBUSxFQUFNLE9BQU8sT0FBSztBQUMxQixxQkFBSyxFQUFNLE9BQU8sR0FBRyxDQUFDLENBQUMsT0FBSztBQUM1QixzQkFBTSxFQUFNLFdBQVcsQ0FBQyxtQkFBbUIsRUFBRSxHQUFHLENBQUMsQ0FBQyxPQUFLO2FBQzFELENBQUUsQ0FBQztTQUNQOzs7ZUFsQmEsbUJBQUc7QUFDYixtQkFBTyxJQUFJLENBQUMsR0FBRyxDQUFFO0FBQ2IsdUJBQU8sRUFBRSwwQkFBMEI7YUFDdEMsQ0FBRSxDQUFDO1NBQ1A7OztXQUxnQixlQUFlOzs7cUJBQWYsZUFBZSIsImZpbGUiOiIvVXNlcnMvYnppdHRsYXUvLmF0b20vcGFja2FnZXMvZWFzeS1tb3Rpb24tcmVkdXgvbGliL3ZpZXdzL2xldHRlci5qcyIsInNvdXJjZXNDb250ZW50IjpbIlwidXNlIGJhYmVsXCI7XG5cbmltcG9ydCB7IFZpZXcgfSBmcm9tIFwiYXRvbS1zcGFjZS1wZW4tdmlld3NcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTGV0dGVyQ292ZXJWaWV3IGV4dGVuZHMgVmlldyB7XG4gICAgc3RhdGljIGNvbnRlbnQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmRpdigge1xuICAgICAgICAgICAgXCJjbGFzc1wiOiBcImVhc3ktbW90aW9uLXJlZHV4LWxldHRlclwiXG4gICAgICAgIH0gKTtcbiAgICB9XG5cbiAgICBpbml0aWFsaXplKCBvVGV4dEVkaXRvciwgb1RleHRFZGl0b3JWaWV3LCBvUmFuZ2UsIHNMZXR0ZXIsIG9PcHRpb25zICkge1xuICAgICAgICBsZXQgaUhlaWdodCA9IG9UZXh0RWRpdG9yLmdldExpbmVIZWlnaHRJblBpeGVscygpO1xuXG4gICAgICAgIHRoaXMudGV4dCggc0xldHRlciApO1xuICAgICAgICB0aGlzLmFkZENsYXNzKCBvT3B0aW9ucy5zaW5nbGUgPyBcInNpbmdsZVwiIDogXCJtYW55XCIgKTtcblxuICAgICAgICB0aGlzLmNzcygge1xuICAgICAgICAgICAgXCJwb3NpdGlvblwiOiBcImFic29sdXRlXCIsXG4gICAgICAgICAgICBcImhlaWdodFwiOiBgJHsgaUhlaWdodCB9cHhgLFxuICAgICAgICAgICAgXCJ0b3BcIjogYCR7IGlIZWlnaHQgKiAtMSB9cHhgLFxuICAgICAgICAgICAgXCJsZWZ0XCI6IGAkeyBvVGV4dEVkaXRvci5nZXREZWZhdWx0Q2hhcldpZHRoKCkgKiAtMSB9cHhgXG4gICAgICAgIH0gKTtcbiAgICB9XG5cbn1cbiJdfQ==
//# sourceURL=/Users/bzittlau/.atom/packages/easy-motion-redux/lib/views/letter.js
