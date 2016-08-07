Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x2, _x3, _x4) { var _again = true; _function: while (_again) { var object = _x2, property = _x3, receiver = _x4; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x2 = parent; _x3 = property; _x4 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/* eslint-disable no-loop-func, no-bitwise, no-continue */

var _atomSpacePenViews = require("atom-space-pen-views");

var _atom = require("atom");

var _underscorePlus = require("underscore-plus");

var _underscorePlus2 = _interopRequireDefault(_underscorePlus);

var _markers = require("./markers");

var _markers2 = _interopRequireDefault(_markers);

"use babel";
var InputView = (function (_View) {
    _inherits(InputView, _View);

    _createClass(InputView, null, [{
        key: "content",
        value: function content() {
            var _this = this;

            return this.div({
                "class": "easy-motion-redux-input"
            }, function () {
                _this.div({
                    "class": "editor-container",
                    "outlet": "editorContainer"
                });
                return _this.subview("editorInput", new _atomSpacePenViews.TextEditorView({
                    "mini": true,
                    "placeholderText": "EasyMotion"
                }));
            });
        }
    }]);

    function InputView(oRefTextEditor, sMode, bSelect) {
        _classCallCheck(this, InputView);

        _get(Object.getPrototypeOf(InputView.prototype), "constructor", this).call(this, oRefTextEditor, sMode, bSelect);
    }

    _createClass(InputView, [{
        key: "initialize",
        value: function initialize(oRefTextEditor, sMode, bSelect) {
            this.sMode = sMode;
            this.bSelect = bSelect;
            this.aPositions = [];
            this.sLetter = null;
            this.oRefTextEditor = oRefTextEditor;

            this.updatePlaceholder();

            this.subscriptions = new _atom.CompositeDisposable();

            this.oRefTextEditorView = atom.views.getView(this.oRefTextEditor);
            this.markers = new _markers2["default"](this.oRefTextEditor, this.oRefTextEditorView);

            this.oRefTextEditorView.classList.add("easy-motion-redux-editor");

            this.handleEvents();
        }
    }, {
        key: "updatePlaceholder",
        value: function updatePlaceholder() {
            var sPlaceholderText = undefined;

            switch (this.sMode) {
                case InputView.MODE_LETTER:
                    sPlaceholderText = "EasyMotion:Letter…";
                    break;
                case InputView.MODE_WORDS_STARTING:
                    sPlaceholderText = "EasyMotion:Words starting with letter…";
                    break;
                case InputView.MODE_WORDS:
                default:
                    sPlaceholderText = "EasyMotion:Words";
                    break;
            }
            this.editorInput.element.getModel().setPlaceholderText(sPlaceholderText);
        }
    }, {
        key: "handleEvents",
        value: function handleEvents() {
            var _this2 = this;

            this.editorInput.element.addEventListener("keypress", this.autosubmit.bind(this));
            this.editorInput.element.addEventListener("blur", this.remove.bind(this));
            this.subscriptions.add(atom.commands.add(this.editorInput.element, {
                "core:backspace": this.backspace.bind(this),
                "core:confirm": function coreConfirm() {
                    _this2.confirm();
                },
                "core:cancel": function coreCancel() {
                    _this2.goBack();
                },
                "core:page-up": function corePageUp() {
                    _this2.oRefTextEditor.trigger("core:page-up");
                },
                "core:page-down": function corePageDown() {
                    _this2.oRefTextEditor.trigger("core:page-down");
                }
            }));
            this.subscriptions.add(this.oRefTextEditor.onDidChangeScrollTop(this.goBack.bind(this)));
        }
    }, {
        key: "resetPositions",
        value: function resetPositions() {
            this.markers.clear();
            if ([InputView.MODE_LETTER, InputView.MODE_WORDS_STARTING].indexOf(this.sMode) === -1) {
                this.loadPositions();
                this.groupPositions();
            }
        }
    }, {
        key: "hasPositions",
        value: function hasPositions() {
            switch (this.sMode) {
                case InputView.MODE_LETTER:
                case InputView.MODE_WORDS_STARTING:
                    return this.sLetter ? this.aPositions.length > 0 : true;
                case InputView.MODE_WORDS:
                default:
                    return this.aPositions.length > 0;
            }
        }
    }, {
        key: "autosubmit",
        value: function autosubmit(oEvent) {
            var sChar = String.fromCharCode(oEvent.charCode);

            if (!this.sLetter && [InputView.MODE_LETTER, InputView.MODE_WORDS_STARTING].indexOf(this.sMode) > -1) {
                this.sLetter = sChar;
                this.loadPositions();
                this.groupPositions();
                return false;
            }

            this.filterPositions(sChar);
            return false;
        }
    }, {
        key: "backspace",
        value: function backspace() {
            if (this.editorInput.getText().length === 0) {
                this.goBack();
                return;
            }

            if ([InputView.MODE_LETTER, InputView.MODE_WORDS_STARTING].indexOf(this.sMode) > -1) {
                if (this.editorInput.getText().length === 1) {
                    this.sLetter = null;
                    this.loadPositions();
                    this.groupPositions();
                } else {
                    this.loadPositions();
                    this.groupPositions();
                    return;
                }
            }

            this.resetPositions();
        }
    }, {
        key: "remove",
        value: function remove() {
            this.subscriptions.dispose();
            this.markers.clear();
            this.oRefTextEditorView.classList.remove("easy-motion-redux-editor");
            _get(Object.getPrototypeOf(InputView.prototype), "remove", this).call(this);
        }
    }, {
        key: "confirm",
        value: function confirm() {
            var point = this.aPositions[0][0];

            if (this.bSelect) {
                point.column += 1; // include target letter in selection
                this.oRefTextEditor.selectToBufferPosition(point);
            } else {
                this.oRefTextEditor.setCursorBufferPosition(point);
            }
            this.goBack();
        }
    }, {
        key: "goBack",
        value: function goBack() {
            this.oRefTextEditorView.focus();
            this.remove();
            this.panel.destroy();
        }
    }, {
        key: "focus",
        value: function focus() {
            this.editorInput.focus();
        }
    }, {
        key: "filterPositions",
        value: function filterPositions(sChar) {
            this.pickPositions(sChar);
            if (this.aPositions.length > 1) {
                this.groupPositions();
            } else {
                this.confirm();
            }
        }
    }, {
        key: "groupPositions",
        value: function groupPositions() {
            var _this3 = this;

            var iCount = this.aPositions.length,
                sReplaceCharacters = atom.config.get("easy-motion-redux.replaceCharacters"),
                iLast = 0;

            this.oGroupedPositions = {};

            var _loop = function (i) {
                var iTake = Math.floor(iCount / sReplaceCharacters.length);

                if (i < iCount % sReplaceCharacters.length) {
                    iTake += 1;
                }

                _this3.oGroupedPositions[sReplaceCharacters[i]] = [];
                _this3.aPositions.slice(iLast, iLast + iTake).forEach(function (oWordStart, j) {
                    var sReplacement = undefined,
                        bSingle = iTake === 1;

                    if (bSingle) {
                        sReplacement = sReplaceCharacters[i];
                    } else {
                        var iCharsAmount = sReplaceCharacters.length,
                            iRemains = iTake % iCharsAmount,
                            k = undefined;

                        if (iTake <= iCharsAmount) {
                            k = j % iTake;
                        } else if (iTake < 2 * iCharsAmount && j >= iRemains * 2) {
                            k = j - iRemains;
                        } else {
                            k = -1;
                        }

                        sReplacement = sReplaceCharacters[i] + (sReplaceCharacters[k] || "•");
                    }

                    _this3.oGroupedPositions[sReplaceCharacters[i]].push(oWordStart);
                    _this3.markers.add(oWordStart, sReplacement, {
                        "single": bSingle
                    });
                });

                iLast += iTake;
            };

            for (var i of _underscorePlus2["default"].range(0, sReplaceCharacters.length)) {
                _loop(i);
            }
        }
    }, {
        key: "pickPositions",
        value: function pickPositions(sChar) {
            var sCharacter = sChar;

            this.markers.clear();
            if (sCharacter in this.oGroupedPositions && this.oGroupedPositions[sCharacter].length) {
                this.aPositions = this.oGroupedPositions[sCharacter];
                return;
            }

            if (sCharacter !== sCharacter.toLowerCase()) {
                sCharacter = sCharacter.toLowerCase();
            } else if (sCharacter !== sCharacter.toUpperCase()) {
                sCharacter = sCharacter.toUpperCase();
            } else {
                return;
            }

            if (sCharacter in this.oGroupedPositions && this.oGroupedPositions[sCharacter].length) {
                this.aPositions = this.oGroupedPositions[sCharacter];
            }
        }
    }, {
        key: "createLetterRegExp",
        value: function createLetterRegExp() {
            var sLetter = arguments.length <= 0 || arguments[0] === undefined ? "" : arguments[0];

            return new RegExp("" + sLetter.replace(/([\W]+)/g, "\\$1"), "gi");
        }
    }, {
        key: "loadPositions",
        value: function loadPositions() {
            var _this4 = this;

            var oBuffer = this.oRefTextEditor.getBuffer(),
                aPositions = [],
                fMarkBeginning = undefined,
                rPositionRegExp = undefined;

            fMarkBeginning = function (oObj) {
                var iStart = null;
                var iEnd = null;

                iStart = oObj.range.start;
                if (_this4.sMode === InputView.MODE_WORDS_STARTING) {
                    iStart.column = oObj.range.end.column - 1;
                }
                iEnd = [iStart.row, iStart.column + 1];

                aPositions.push([iStart, iEnd]);
            };

            switch (this.sMode) {
                case InputView.MODE_LETTER:
                    rPositionRegExp = this.createLetterRegExp(this.sLetter);
                    break;
                case InputView.MODE_WORDS_STARTING:
                    rPositionRegExp = this.startingLetterWordRegExp(this.sLetter);
                    break;
                case InputView.MODE_WORDS:
                default:
                    rPositionRegExp = this.wordRegExp();
                    break;
            }

            for (var oRowRange of this.getRowRanges()) {
                oBuffer.scanInRange(rPositionRegExp, oRowRange, fMarkBeginning);
            }

            this.aPositions = aPositions;
        }
    }, {
        key: "getRowRanges",
        value: function getRowRanges() {
            var _this5 = this;

            var iBeginRow = this.oRefTextEditorView.getFirstVisibleScreenRow(),
                iEndRowPadding = Math.ceil(this.outerHeight() / this.oRefTextEditor.getLineHeightInPixels()) * 2,
                iEndRow = this.oRefTextEditorView.getLastVisibleScreenRow() - iEndRowPadding,
                aResultingRows = [];

            for (var iRow of _underscorePlus2["default"].range(iBeginRow, iEndRow + 1)) {
                if (this.notFolded(iRow)) {
                    aResultingRows.push(iRow);
                }
            }

            aResultingRows = aResultingRows.map(function (iRow) {
                return _this5.getColumnRangeForRow(iRow);
            });

            return aResultingRows;
        }
    }, {
        key: "getColumnRangeForRow",
        value: function getColumnRangeForRow(iRow) {
            var oBuffer = this.oRefTextEditor.getBuffer(),
                iBeginColumn = undefined,
                iEndColumn = undefined,
                oRange = undefined;

            if (oBuffer.isRowBlank(iRow)) {
                return [[iRow, 0], [iRow, 0]];
            }

            if (this.oRefTextEditor.isSoftWrapped()) {
                oRange = oBuffer.rangeForRow(iRow);
                iBeginColumn = oRange.start.column;
                iEndColumn = oRange.end.column;
            } else {
                oRange = oBuffer.rangeForRow(iRow);
                var iMaxColumn = this.oRefTextEditor.getEditorWidthInChars(),
                    iCharWidth = this.oRefTextEditor.getDefaultCharWidth(),
                    iLeft = this.oRefTextEditor.getScrollLeft();

                if (iLeft === 0) {
                    iBeginColumn = 0;
                    iEndColumn = iMaxColumn;
                } else {
                    iBeginColumn = Math.floor(iLeft / iCharWidth);
                    iEndColumn = iBeginColumn + iMaxColumn;
                }
            }

            return [[iRow, iBeginColumn], [iRow, iEndColumn]];
        }
    }, {
        key: "notFolded",
        value: function notFolded(iRow) {
            return iRow === 0 || !this.oRefTextEditor.isFoldedAtBufferRow(iRow) || !this.oRefTextEditor.isFoldedAtBufferRow(iRow - 1);
        }
    }, {
        key: "wordRegExp",
        value: function wordRegExp() {
            var sNonWordCharacters = atom.config.get("editor.nonWordCharacters");

            return new RegExp("[^\\s" + _underscorePlus2["default"].escapeRegExp(sNonWordCharacters) + "]+", "gi");
        }
    }, {
        key: "startingLetterWordRegExp",
        value: function startingLetterWordRegExp(sStartingLetter) {
            var sNonWordCharacters = atom.config.get("editor.nonWordCharacters");

            return new RegExp("(?:^" + sStartingLetter + "|[\\s" + _underscorePlus2["default"].escapeRegExp(sNonWordCharacters) + "]+" + sStartingLetter + ")", "gi");
        }
    }]);

    return InputView;
})(_atomSpacePenViews.View);

InputView.MODE_WORDS = "words";
InputView.MODE_LETTER = "letter";
InputView.MODE_WORDS_STARTING = "words_starting";

exports["default"] = InputView;
module.exports = exports["default"];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9ieml0dGxhdS8uYXRvbS9wYWNrYWdlcy9lYXN5LW1vdGlvbi1yZWR1eC9saWIvdmlld3MvaW5wdXQuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztpQ0FJcUMsc0JBQXNCOztvQkFDdkIsTUFBTTs7OEJBQzVCLGlCQUFpQjs7Ozt1QkFDWCxXQUFXOzs7O0FBUC9CLFdBQVcsQ0FBQztJQVNOLFNBQVM7Y0FBVCxTQUFTOztpQkFBVCxTQUFTOztlQUNHLG1CQUFHOzs7QUFDYixtQkFBTyxJQUFJLENBQUMsR0FBRyxDQUFFO0FBQ2IsdUJBQU8sRUFBRSx5QkFBeUI7YUFDckMsRUFBRSxZQUFNO0FBQ0wsc0JBQUssR0FBRyxDQUFFO0FBQ04sMkJBQU8sRUFBRSxrQkFBa0I7QUFDM0IsNEJBQVEsRUFBRSxpQkFBaUI7aUJBQzlCLENBQUUsQ0FBQztBQUNKLHVCQUFPLE1BQUssT0FBTyxDQUFFLGFBQWEsRUFBRSxzQ0FBb0I7QUFDcEQsMEJBQU0sRUFBRSxJQUFJO0FBQ1oscUNBQWlCLEVBQUUsWUFBWTtpQkFDbEMsQ0FBRSxDQUFFLENBQUM7YUFDVCxDQUFFLENBQUM7U0FDUDs7O0FBRVUsYUFoQlQsU0FBUyxDQWdCRSxjQUFjLEVBQUUsS0FBSyxFQUFFLE9BQU8sRUFBRzs4QkFoQjVDLFNBQVM7O0FBaUJQLG1DQWpCRixTQUFTLDZDQWlCQSxjQUFjLEVBQUUsS0FBSyxFQUFFLE9BQU8sRUFBRztLQUMzQzs7aUJBbEJDLFNBQVM7O2VBb0JELG9CQUFFLGNBQWMsRUFBRSxLQUFLLEVBQUUsT0FBTyxFQUFHO0FBQ3pDLGdCQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztBQUNuQixnQkFBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7QUFDdkIsZ0JBQUksQ0FBQyxVQUFVLEdBQUcsRUFBRSxDQUFDO0FBQ3JCLGdCQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQztBQUNwQixnQkFBSSxDQUFDLGNBQWMsR0FBRyxj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QUUsQ0FBQzs7QUFFdkUsbUJBQU8sSUFBSSxNQUFNLFdBQVcsNEJBQUUsWUFBWSxDQUFFLGtCQUFrQixDQUFFLFNBQU8sSUFBSSxDQUFFLENBQUM7U0FDakY7OztlQUV1QixrQ0FBRSxlQUFlLEVBQUc7QUFDeEMsZ0JBQUksa0JBQWtCLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUUsMEJBQTBCLENBQUUsQ0FBQzs7QUFFdkUsbUJBQU8sSUFBSSxNQUFNLFVBQVUsZUFBZSxhQUFVLDRCQUFFLFlBQVksQ0FBRSxrQkFBa0IsQ0FBRSxVQUFPLGVBQWUsUUFBTSxJQUFJLENBQUUsQ0FBQztTQUM5SDs7O1dBM1ZDLFNBQVM7OztBQThWZixTQUFTLENBQUMsVUFBVSxHQUFHLE9BQU8sQ0FBQztBQUMvQixTQUFTLENBQUMsV0FBVyxHQUFHLFFBQVEsQ0FBQztBQUNqQyxTQUFTLENBQUMsbUJBQW1CLEdBQUcsZ0JBQWdCLENBQUM7O3FCQUVsQyxTQUFTIiwiZmlsZSI6Ii9Vc2Vycy9ieml0dGxhdS8uYXRvbS9wYWNrYWdlcy9lYXN5LW1vdGlvbi1yZWR1eC9saWIvdmlld3MvaW5wdXQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBiYWJlbFwiO1xuXG4vKiBlc2xpbnQtZGlzYWJsZSBuby1sb29wLWZ1bmMsIG5vLWJpdHdpc2UsIG5vLWNvbnRpbnVlICovXG5cbmltcG9ydCB7IFZpZXcsIFRleHRFZGl0b3JWaWV3IH0gZnJvbSBcImF0b20tc3BhY2UtcGVuLXZpZXdzXCI7XG5pbXBvcnQgeyBDb21wb3NpdGVEaXNwb3NhYmxlIH0gZnJvbSBcImF0b21cIjtcbmltcG9ydCBfIGZyb20gXCJ1bmRlcnNjb3JlLXBsdXNcIjtcbmltcG9ydCBNYXJrZXJzIGZyb20gXCIuL21hcmtlcnNcIjtcblxuY2xhc3MgSW5wdXRWaWV3IGV4dGVuZHMgVmlldyB7XG4gICAgc3RhdGljIGNvbnRlbnQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmRpdigge1xuICAgICAgICAgICAgXCJjbGFzc1wiOiBcImVhc3ktbW90aW9uLXJlZHV4LWlucHV0XCJcbiAgICAgICAgfSwgKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5kaXYoIHtcbiAgICAgICAgICAgICAgICBcImNsYXNzXCI6IFwiZWRpdG9yLWNvbnRhaW5lclwiLFxuICAgICAgICAgICAgICAgIFwib3V0bGV0XCI6IFwiZWRpdG9yQ29udGFpbmVyXCJcbiAgICAgICAgICAgIH0gKTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnN1YnZpZXcoIFwiZWRpdG9ySW5wdXRcIiwgbmV3IFRleHRFZGl0b3JWaWV3KCB7XG4gICAgICAgICAgICAgICAgXCJtaW5pXCI6IHRydWUsXG4gICAgICAgICAgICAgICAgXCJwbGFjZWhvbGRlclRleHRcIjogXCJFYXN5TW90aW9uXCJcbiAgICAgICAgICAgIH0gKSApO1xuICAgICAgICB9ICk7XG4gICAgfVxuXG4gICAgY29uc3RydWN0b3IoIG9SZWZUZXh0RWRpdG9yLCBzTW9kZSwgYlNlbGVjdCApIHtcbiAgICAgICAgc3VwZXIoIG9SZWZUZXh0RWRpdG9yLCBzTW9kZSwgYlNlbGVjdCApO1xuICAgIH1cblxuICAgIGluaXRpYWxpemUoIG9SZWZUZXh0RWRpdG9yLCBzTW9kZSwgYlNlbGVjdCApIHtcbiAgICAgICAgdGhpcy5zTW9kZSA9IHNNb2RlO1xuICAgICAgICB0aGlzLmJTZWxlY3QgPSBiU2VsZWN0O1xuICAgICAgICB0aGlzLmFQb3NpdGlvbnMgPSBbXTtcbiAgICAgICAgdGhpcy5zTGV0dGVyID0gbnVsbDtcbiAgICAgICAgdGhpcy5vUmVmVGV4dEVkaXRvciA9IG9SZWZUZXh0RWRpdG9yO1xuXG4gICAgICAgIHRoaXMudXBkYXRlUGxhY2Vob2xkZXIoKTtcblxuICAgICAgICB0aGlzLnN1YnNjcmlwdGlvbnMgPSBuZXcgQ29tcG9zaXRlRGlzcG9zYWJsZSgpO1xuXG4gICAgICAgIHRoaXMub1JlZlRleHRFZGl0b3JWaWV3ID0gYXRvbS52aWV3cy5nZXRWaWV3KCB0aGlzLm9SZWZUZXh0RWRpdG9yICk7XG4gICAgICAgIHRoaXMubWFya2VycyA9IG5ldyBNYXJrZXJzKCB0aGlzLm9SZWZUZXh0RWRpdG9yLCB0aGlzLm9SZWZUZXh0RWRpdG9yVmlldyApO1xuXG4gICAgICAgIHRoaXMub1JlZlRleHRFZGl0b3JWaWV3LmNsYXNzTGlzdC5hZGQoIFwiZWFzeS1tb3Rpb24tcmVkdXgtZWRpdG9yXCIgKTtcblxuICAgICAgICB0aGlzLmhhbmRsZUV2ZW50cygpO1xuICAgIH1cblxuICAgIHVwZGF0ZVBsYWNlaG9sZGVyKCkge1xuICAgICAgICBsZXQgc1BsYWNlaG9sZGVyVGV4dDtcblxuICAgICAgICBzd2l0Y2ggKCB0aGlzLnNNb2RlICkge1xuICAgICAgICAgICAgY2FzZSBJbnB1dFZpZXcuTU9ERV9MRVRURVI6XG4gICAgICAgICAgICAgICAgc1BsYWNlaG9sZGVyVGV4dCA9IFwiRWFzeU1vdGlvbjpMZXR0ZXLigKZcIjtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgSW5wdXRWaWV3Lk1PREVfV09SRFNfU1RBUlRJTkc6XG4gICAgICAgICAgICAgICAgc1BsYWNlaG9sZGVyVGV4dCA9IFwiRWFzeU1vdGlvbjpXb3JkcyBzdGFydGluZyB3aXRoIGxldHRlcuKAplwiO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBJbnB1dFZpZXcuTU9ERV9XT1JEUzpcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgc1BsYWNlaG9sZGVyVGV4dCA9IFwiRWFzeU1vdGlvbjpXb3Jkc1wiO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuZWRpdG9ySW5wdXQuZWxlbWVudC5nZXRNb2RlbCgpLnNldFBsYWNlaG9sZGVyVGV4dCggc1BsYWNlaG9sZGVyVGV4dCApO1xuICAgIH1cblxuICAgIGhhbmRsZUV2ZW50cygpIHtcbiAgICAgICAgdGhpcy5lZGl0b3JJbnB1dC5lbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoIFwia2V5cHJlc3NcIiwgdGhpcy5hdXRvc3VibWl0LmJpbmQoIHRoaXMgKSApO1xuICAgICAgICB0aGlzLmVkaXRvcklucHV0LmVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lciggXCJibHVyXCIsIHRoaXMucmVtb3ZlLmJpbmQoIHRoaXMgKSApO1xuICAgICAgICB0aGlzLnN1YnNjcmlwdGlvbnMuYWRkKCBhdG9tLmNvbW1hbmRzLmFkZCggdGhpcy5lZGl0b3JJbnB1dC5lbGVtZW50LCB7XG4gICAgICAgICAgICBcImNvcmU6YmFja3NwYWNlXCI6IHRoaXMuYmFja3NwYWNlLmJpbmQoIHRoaXMgKSxcbiAgICAgICAgICAgIFwiY29yZTpjb25maXJtXCI6ICgpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLmNvbmZpcm0oKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBcImNvcmU6Y2FuY2VsXCI6ICgpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLmdvQmFjaygpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIFwiY29yZTpwYWdlLXVwXCI6ICgpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLm9SZWZUZXh0RWRpdG9yLnRyaWdnZXIoIFwiY29yZTpwYWdlLXVwXCIgKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBcImNvcmU6cGFnZS1kb3duXCI6ICgpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLm9SZWZUZXh0RWRpdG9yLnRyaWdnZXIoIFwiY29yZTpwYWdlLWRvd25cIiApO1xuICAgICAgICAgICAgfVxuICAgICAgICB9ICkgKTtcbiAgICAgICAgdGhpcy5zdWJzY3JpcHRpb25zLmFkZCggdGhpcy5vUmVmVGV4dEVkaXRvci5vbkRpZENoYW5nZVNjcm9sbFRvcCggdGhpcy5nb0JhY2suYmluZCggdGhpcyApICkgKTtcbiAgICB9XG5cbiAgICByZXNldFBvc2l0aW9ucygpIHtcbiAgICAgICAgdGhpcy5tYXJrZXJzLmNsZWFyKCk7XG4gICAgICAgIGlmICggWyBJbnB1dFZpZXcuTU9ERV9MRVRURVIsIElucHV0Vmlldy5NT0RFX1dPUkRTX1NUQVJUSU5HIF0uaW5kZXhPZiggdGhpcy5zTW9kZSApID09PSAtMSApIHtcbiAgICAgICAgICAgIHRoaXMubG9hZFBvc2l0aW9ucygpO1xuICAgICAgICAgICAgdGhpcy5ncm91cFBvc2l0aW9ucygpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgaGFzUG9zaXRpb25zKCkge1xuICAgICAgICBzd2l0Y2ggKCB0aGlzLnNNb2RlICkge1xuICAgICAgICAgICAgY2FzZSBJbnB1dFZpZXcuTU9ERV9MRVRURVI6XG4gICAgICAgICAgICBjYXNlIElucHV0Vmlldy5NT0RFX1dPUkRTX1NUQVJUSU5HOlxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnNMZXR0ZXIgPyB0aGlzLmFQb3NpdGlvbnMubGVuZ3RoID4gMCA6IHRydWU7XG4gICAgICAgICAgICBjYXNlIElucHV0Vmlldy5NT0RFX1dPUkRTOlxuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5hUG9zaXRpb25zLmxlbmd0aCA+IDA7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBhdXRvc3VibWl0KCBvRXZlbnQgKSB7XG4gICAgICAgIGxldCBzQ2hhciA9IFN0cmluZy5mcm9tQ2hhckNvZGUoIG9FdmVudC5jaGFyQ29kZSApO1xuXG4gICAgICAgIGlmICggIXRoaXMuc0xldHRlciAmJiBbIElucHV0Vmlldy5NT0RFX0xFVFRFUiwgSW5wdXRWaWV3Lk1PREVfV09SRFNfU1RBUlRJTkcgXS5pbmRleE9mKCB0aGlzLnNNb2RlICkgPiAtMSApIHtcbiAgICAgICAgICAgIHRoaXMuc0xldHRlciA9IHNDaGFyO1xuICAgICAgICAgICAgdGhpcy5sb2FkUG9zaXRpb25zKCk7XG4gICAgICAgICAgICB0aGlzLmdyb3VwUG9zaXRpb25zKCk7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmZpbHRlclBvc2l0aW9ucyggc0NoYXIgKTtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIGJhY2tzcGFjZSgpIHtcbiAgICAgICAgaWYgKCB0aGlzLmVkaXRvcklucHV0LmdldFRleHQoKS5sZW5ndGggPT09IDAgKSB7XG4gICAgICAgICAgICB0aGlzLmdvQmFjaygpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCBbIElucHV0Vmlldy5NT0RFX0xFVFRFUiwgSW5wdXRWaWV3Lk1PREVfV09SRFNfU1RBUlRJTkcgXS5pbmRleE9mKCB0aGlzLnNNb2RlICkgPiAtMSApIHtcbiAgICAgICAgICAgIGlmICggdGhpcy5lZGl0b3JJbnB1dC5nZXRUZXh0KCkubGVuZ3RoID09PSAxICkge1xuICAgICAgICAgICAgICAgIHRoaXMuc0xldHRlciA9IG51bGw7XG4gICAgICAgICAgICAgICAgdGhpcy5sb2FkUG9zaXRpb25zKCk7XG4gICAgICAgICAgICAgICAgdGhpcy5ncm91cFBvc2l0aW9ucygpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLmxvYWRQb3NpdGlvbnMoKTtcbiAgICAgICAgICAgICAgICB0aGlzLmdyb3VwUG9zaXRpb25zKCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5yZXNldFBvc2l0aW9ucygpO1xuICAgIH1cblxuICAgIHJlbW92ZSgpIHtcbiAgICAgICAgdGhpcy5zdWJzY3JpcHRpb25zLmRpc3Bvc2UoKTtcbiAgICAgICAgdGhpcy5tYXJrZXJzLmNsZWFyKCk7XG4gICAgICAgIHRoaXMub1JlZlRleHRFZGl0b3JWaWV3LmNsYXNzTGlzdC5yZW1vdmUoIFwiZWFzeS1tb3Rpb24tcmVkdXgtZWRpdG9yXCIgKTtcbiAgICAgICAgc3VwZXIucmVtb3ZlKCk7XG4gICAgfVxuXG4gICAgY29uZmlybSgpIHtcbiAgICAgICAgbGV0IHBvaW50ID0gdGhpcy5hUG9zaXRpb25zWyAwIF1bIDAgXTtcblxuICAgICAgICBpZiAoIHRoaXMuYlNlbGVjdCApIHtcbiAgICAgICAgICAgIHBvaW50LmNvbHVtbiArPSAxOyAvLyBpbmNsdWRlIHRhcmdldCBsZXR0ZXIgaW4gc2VsZWN0aW9uXG4gICAgICAgICAgICB0aGlzLm9SZWZUZXh0RWRpdG9yLnNlbGVjdFRvQnVmZmVyUG9zaXRpb24oIHBvaW50ICk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLm9SZWZUZXh0RWRpdG9yLnNldEN1cnNvckJ1ZmZlclBvc2l0aW9uKCBwb2ludCApO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuZ29CYWNrKCk7XG4gICAgfVxuXG4gICAgZ29CYWNrKCkge1xuICAgICAgICB0aGlzLm9SZWZUZXh0RWRpdG9yVmlldy5mb2N1cygpO1xuICAgICAgICB0aGlzLnJlbW92ZSgpO1xuICAgICAgICB0aGlzLnBhbmVsLmRlc3Ryb3koKTtcbiAgICB9XG5cbiAgICBmb2N1cygpIHtcbiAgICAgICAgdGhpcy5lZGl0b3JJbnB1dC5mb2N1cygpO1xuICAgIH1cblxuICAgIGZpbHRlclBvc2l0aW9ucyggc0NoYXIgKSB7XG4gICAgICAgIHRoaXMucGlja1Bvc2l0aW9ucyggc0NoYXIgKTtcbiAgICAgICAgaWYgKCB0aGlzLmFQb3NpdGlvbnMubGVuZ3RoID4gMSApIHtcbiAgICAgICAgICAgIHRoaXMuZ3JvdXBQb3NpdGlvbnMoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuY29uZmlybSgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZ3JvdXBQb3NpdGlvbnMoKSB7XG4gICAgICAgIGxldCBpQ291bnQgPSB0aGlzLmFQb3NpdGlvbnMubGVuZ3RoLFxuICAgICAgICAgICAgc1JlcGxhY2VDaGFyYWN0ZXJzID0gYXRvbS5jb25maWcuZ2V0KCBcImVhc3ktbW90aW9uLXJlZHV4LnJlcGxhY2VDaGFyYWN0ZXJzXCIgKSxcbiAgICAgICAgICAgIGlMYXN0ID0gMDtcblxuICAgICAgICB0aGlzLm9Hcm91cGVkUG9zaXRpb25zID0ge307XG5cbiAgICAgICAgZm9yICggbGV0IGkgb2YgXy5yYW5nZSggMCwgc1JlcGxhY2VDaGFyYWN0ZXJzLmxlbmd0aCApICkge1xuICAgICAgICAgICAgbGV0IGlUYWtlID0gTWF0aC5mbG9vciggaUNvdW50IC8gc1JlcGxhY2VDaGFyYWN0ZXJzLmxlbmd0aCApO1xuXG4gICAgICAgICAgICBpZiAoIGkgPCBpQ291bnQgJSBzUmVwbGFjZUNoYXJhY3RlcnMubGVuZ3RoICkge1xuICAgICAgICAgICAgICAgIGlUYWtlICs9IDE7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMub0dyb3VwZWRQb3NpdGlvbnNbIHNSZXBsYWNlQ2hhcmFjdGVyc1sgaSBdIF0gPSBbXTtcbiAgICAgICAgICAgIHRoaXMuYVBvc2l0aW9ucy5zbGljZSggaUxhc3QsIGlMYXN0ICsgaVRha2UgKS5mb3JFYWNoKCAoIG9Xb3JkU3RhcnQsIGogKSA9PiB7XG4gICAgICAgICAgICAgICAgbGV0IHNSZXBsYWNlbWVudCxcbiAgICAgICAgICAgICAgICAgICAgYlNpbmdsZSA9IGlUYWtlID09PSAxO1xuXG4gICAgICAgICAgICAgICAgaWYgKCBiU2luZ2xlICkge1xuICAgICAgICAgICAgICAgICAgICBzUmVwbGFjZW1lbnQgPSBzUmVwbGFjZUNoYXJhY3RlcnNbIGkgXTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBsZXQgaUNoYXJzQW1vdW50ID0gc1JlcGxhY2VDaGFyYWN0ZXJzLmxlbmd0aCxcbiAgICAgICAgICAgICAgICAgICAgICAgIGlSZW1haW5zID0gaVRha2UgJSBpQ2hhcnNBbW91bnQsXG4gICAgICAgICAgICAgICAgICAgICAgICBrO1xuXG4gICAgICAgICAgICAgICAgICAgIGlmICggaVRha2UgPD0gaUNoYXJzQW1vdW50ICkge1xuICAgICAgICAgICAgICAgICAgICAgICAgayA9IGogJSBpVGFrZTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmICggaVRha2UgPCAyICogaUNoYXJzQW1vdW50ICYmIGogPj0gaVJlbWFpbnMgKiAyICkge1xuICAgICAgICAgICAgICAgICAgICAgICAgayA9IGogLSBpUmVtYWlucztcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGsgPSAtMTtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIHNSZXBsYWNlbWVudCA9IHNSZXBsYWNlQ2hhcmFjdGVyc1sgaSBdICsgKCBzUmVwbGFjZUNoYXJhY3RlcnNbIGsgXSB8fCBcIuKAolwiICk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgdGhpcy5vR3JvdXBlZFBvc2l0aW9uc1sgc1JlcGxhY2VDaGFyYWN0ZXJzWyBpIF0gXS5wdXNoKCBvV29yZFN0YXJ0ICk7XG4gICAgICAgICAgICAgICAgdGhpcy5tYXJrZXJzLmFkZCggb1dvcmRTdGFydCwgc1JlcGxhY2VtZW50LCB7XG4gICAgICAgICAgICAgICAgICAgIFwic2luZ2xlXCI6IGJTaW5nbGVcbiAgICAgICAgICAgICAgICB9ICk7XG4gICAgICAgICAgICB9ICk7XG5cbiAgICAgICAgICAgIGlMYXN0ICs9IGlUYWtlO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcGlja1Bvc2l0aW9ucyggc0NoYXIgKSB7XG4gICAgICAgIGxldCBzQ2hhcmFjdGVyID0gc0NoYXI7XG5cbiAgICAgICAgdGhpcy5tYXJrZXJzLmNsZWFyKCk7XG4gICAgICAgIGlmICggc0NoYXJhY3RlciBpbiB0aGlzLm9Hcm91cGVkUG9zaXRpb25zICYmIHRoaXMub0dyb3VwZWRQb3NpdGlvbnNbIHNDaGFyYWN0ZXIgXS5sZW5ndGggKSB7XG4gICAgICAgICAgICB0aGlzLmFQb3NpdGlvbnMgPSB0aGlzLm9Hcm91cGVkUG9zaXRpb25zWyBzQ2hhcmFjdGVyIF07XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIHNDaGFyYWN0ZXIgIT09IHNDaGFyYWN0ZXIudG9Mb3dlckNhc2UoKSApIHtcbiAgICAgICAgICAgIHNDaGFyYWN0ZXIgPSBzQ2hhcmFjdGVyLnRvTG93ZXJDYXNlKCk7XG4gICAgICAgIH0gZWxzZSBpZiAoIHNDaGFyYWN0ZXIgIT09IHNDaGFyYWN0ZXIudG9VcHBlckNhc2UoKSApIHtcbiAgICAgICAgICAgIHNDaGFyYWN0ZXIgPSBzQ2hhcmFjdGVyLnRvVXBwZXJDYXNlKCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIHNDaGFyYWN0ZXIgaW4gdGhpcy5vR3JvdXBlZFBvc2l0aW9ucyAmJiB0aGlzLm9Hcm91cGVkUG9zaXRpb25zWyBzQ2hhcmFjdGVyIF0ubGVuZ3RoICkge1xuICAgICAgICAgICAgdGhpcy5hUG9zaXRpb25zID0gdGhpcy5vR3JvdXBlZFBvc2l0aW9uc1sgc0NoYXJhY3RlciBdO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgY3JlYXRlTGV0dGVyUmVnRXhwKCBzTGV0dGVyID0gXCJcIiApIHtcbiAgICAgICAgcmV0dXJuIG5ldyBSZWdFeHAoIGAkeyBzTGV0dGVyLnJlcGxhY2UoIC8oW1xcV10rKS9nLCBcIlxcXFwkMVwiICkgfWAsIFwiZ2lcIiApO1xuICAgIH1cblxuICAgIGxvYWRQb3NpdGlvbnMoKSB7XG4gICAgICAgIGxldCBvQnVmZmVyID0gdGhpcy5vUmVmVGV4dEVkaXRvci5nZXRCdWZmZXIoKSxcbiAgICAgICAgICAgIGFQb3NpdGlvbnMgPSBbXSxcbiAgICAgICAgICAgIGZNYXJrQmVnaW5uaW5nLFxuICAgICAgICAgICAgclBvc2l0aW9uUmVnRXhwO1xuXG4gICAgICAgIGZNYXJrQmVnaW5uaW5nID0gKCBvT2JqICkgPT4ge1xuICAgICAgICAgICAgbGV0IFsgaVN0YXJ0LCBpRW5kIF0gPSBbIG51bGwsIG51bGwgXTtcblxuICAgICAgICAgICAgaVN0YXJ0ID0gb09iai5yYW5nZS5zdGFydDtcbiAgICAgICAgICAgIGlmICggdGhpcy5zTW9kZSA9PT0gSW5wdXRWaWV3Lk1PREVfV09SRFNfU1RBUlRJTkcgKSB7XG4gICAgICAgICAgICAgICAgaVN0YXJ0LmNvbHVtbiA9IG9PYmoucmFuZ2UuZW5kLmNvbHVtbiAtIDE7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpRW5kID0gWyBpU3RhcnQucm93LCBpU3RhcnQuY29sdW1uICsgMSBdO1xuXG4gICAgICAgICAgICBhUG9zaXRpb25zLnB1c2goIFsgaVN0YXJ0LCBpRW5kIF0gKTtcbiAgICAgICAgfTtcblxuICAgICAgICBzd2l0Y2ggKCB0aGlzLnNNb2RlICkge1xuICAgICAgICAgICAgY2FzZSBJbnB1dFZpZXcuTU9ERV9MRVRURVI6XG4gICAgICAgICAgICAgICAgclBvc2l0aW9uUmVnRXhwID0gdGhpcy5jcmVhdGVMZXR0ZXJSZWdFeHAoIHRoaXMuc0xldHRlciApO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBJbnB1dFZpZXcuTU9ERV9XT1JEU19TVEFSVElORzpcbiAgICAgICAgICAgICAgICByUG9zaXRpb25SZWdFeHAgPSB0aGlzLnN0YXJ0aW5nTGV0dGVyV29yZFJlZ0V4cCggdGhpcy5zTGV0dGVyICk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIElucHV0Vmlldy5NT0RFX1dPUkRTOlxuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICByUG9zaXRpb25SZWdFeHAgPSB0aGlzLndvcmRSZWdFeHAoKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuXG4gICAgICAgIGZvciAoIGxldCBvUm93UmFuZ2Ugb2YgdGhpcy5nZXRSb3dSYW5nZXMoKSApIHtcbiAgICAgICAgICAgIG9CdWZmZXIuc2NhbkluUmFuZ2UoIHJQb3NpdGlvblJlZ0V4cCwgb1Jvd1JhbmdlLCBmTWFya0JlZ2lubmluZyApO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5hUG9zaXRpb25zID0gYVBvc2l0aW9ucztcbiAgICB9XG5cblxuICAgIGdldFJvd1JhbmdlcygpIHtcbiAgICAgICAgbGV0IGlCZWdpblJvdyA9IHRoaXMub1JlZlRleHRFZGl0b3JWaWV3LmdldEZpcnN0VmlzaWJsZVNjcmVlblJvdygpLFxuICAgICAgICAgICAgaUVuZFJvd1BhZGRpbmcgPSBNYXRoLmNlaWwoIHRoaXMub3V0ZXJIZWlnaHQoKSAvIHRoaXMub1JlZlRleHRFZGl0b3IuZ2V0TGluZUhlaWdodEluUGl4ZWxzKCkgKSAqIDIsXG4gICAgICAgICAgICBpRW5kUm93ID0gdGhpcy5vUmVmVGV4dEVkaXRvclZpZXcuZ2V0TGFzdFZpc2libGVTY3JlZW5Sb3coKSAtIGlFbmRSb3dQYWRkaW5nLFxuICAgICAgICAgICAgYVJlc3VsdGluZ1Jvd3MgPSBbXTtcblxuICAgICAgICBmb3IgKCBsZXQgaVJvdyBvZiBfLnJhbmdlKCBpQmVnaW5Sb3csIGlFbmRSb3cgKyAxICkgKSB7XG4gICAgICAgICAgICBpZiAoIHRoaXMubm90Rm9sZGVkKCBpUm93ICkgKSB7XG4gICAgICAgICAgICAgICAgYVJlc3VsdGluZ1Jvd3MucHVzaCggaVJvdyApO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgYVJlc3VsdGluZ1Jvd3MgPSBhUmVzdWx0aW5nUm93cy5tYXAoICggaVJvdyApID0+IHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmdldENvbHVtblJhbmdlRm9yUm93KCBpUm93ICk7XG4gICAgICAgIH0gKTtcblxuICAgICAgICByZXR1cm4gYVJlc3VsdGluZ1Jvd3M7XG4gICAgfVxuXG4gICAgZ2V0Q29sdW1uUmFuZ2VGb3JSb3coIGlSb3cgKSB7XG4gICAgICAgIGxldCBvQnVmZmVyID0gdGhpcy5vUmVmVGV4dEVkaXRvci5nZXRCdWZmZXIoKSxcbiAgICAgICAgICAgIGlCZWdpbkNvbHVtbixcbiAgICAgICAgICAgIGlFbmRDb2x1bW4sXG4gICAgICAgICAgICBvUmFuZ2U7XG5cbiAgICAgICAgaWYgKCBvQnVmZmVyLmlzUm93QmxhbmsoIGlSb3cgKSApIHtcbiAgICAgICAgICAgIHJldHVybiBbIFsgaVJvdywgMCBdLCBbIGlSb3csIDAgXSBdO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCB0aGlzLm9SZWZUZXh0RWRpdG9yLmlzU29mdFdyYXBwZWQoKSApIHtcbiAgICAgICAgICAgIG9SYW5nZSA9IG9CdWZmZXIucmFuZ2VGb3JSb3coIGlSb3cgKTtcbiAgICAgICAgICAgIGlCZWdpbkNvbHVtbiA9IG9SYW5nZS5zdGFydC5jb2x1bW47XG4gICAgICAgICAgICBpRW5kQ29sdW1uID0gb1JhbmdlLmVuZC5jb2x1bW47XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBvUmFuZ2UgPSBvQnVmZmVyLnJhbmdlRm9yUm93KCBpUm93ICk7XG4gICAgICAgICAgICBsZXQgaU1heENvbHVtbiA9IHRoaXMub1JlZlRleHRFZGl0b3IuZ2V0RWRpdG9yV2lkdGhJbkNoYXJzKCksXG4gICAgICAgICAgICAgICAgaUNoYXJXaWR0aCA9IHRoaXMub1JlZlRleHRFZGl0b3IuZ2V0RGVmYXVsdENoYXJXaWR0aCgpLFxuICAgICAgICAgICAgICAgIGlMZWZ0ID0gdGhpcy5vUmVmVGV4dEVkaXRvci5nZXRTY3JvbGxMZWZ0KCk7XG5cbiAgICAgICAgICAgIGlmICggaUxlZnQgPT09IDAgKSB7XG4gICAgICAgICAgICAgICAgaUJlZ2luQ29sdW1uID0gMDtcbiAgICAgICAgICAgICAgICBpRW5kQ29sdW1uID0gaU1heENvbHVtbjtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgaUJlZ2luQ29sdW1uID0gTWF0aC5mbG9vciggaUxlZnQgLyBpQ2hhcldpZHRoICk7XG4gICAgICAgICAgICAgICAgaUVuZENvbHVtbiA9IGlCZWdpbkNvbHVtbiArIGlNYXhDb2x1bW47XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gWyBbIGlSb3csIGlCZWdpbkNvbHVtbiBdLCBbIGlSb3csIGlFbmRDb2x1bW4gXSBdO1xuICAgIH1cblxuICAgIG5vdEZvbGRlZCggaVJvdyApIHtcbiAgICAgICAgcmV0dXJuIGlSb3cgPT09IDAgfHwgIXRoaXMub1JlZlRleHRFZGl0b3IuaXNGb2xkZWRBdEJ1ZmZlclJvdyggaVJvdyApIHx8ICF0aGlzLm9SZWZUZXh0RWRpdG9yLmlzRm9sZGVkQXRCdWZmZXJSb3coIGlSb3cgLSAxICk7XG4gICAgfVxuXG4gICAgd29yZFJlZ0V4cCgpIHtcbiAgICAgICAgbGV0IHNOb25Xb3JkQ2hhcmFjdGVycyA9IGF0b20uY29uZmlnLmdldCggXCJlZGl0b3Iubm9uV29yZENoYXJhY3RlcnNcIiApO1xuXG4gICAgICAgIHJldHVybiBuZXcgUmVnRXhwKCBgW15cXFxccyR7IF8uZXNjYXBlUmVnRXhwKCBzTm9uV29yZENoYXJhY3RlcnMgKSB9XStgLCBcImdpXCIgKTtcbiAgICB9XG5cbiAgICBzdGFydGluZ0xldHRlcldvcmRSZWdFeHAoIHNTdGFydGluZ0xldHRlciApIHtcbiAgICAgICAgbGV0IHNOb25Xb3JkQ2hhcmFjdGVycyA9IGF0b20uY29uZmlnLmdldCggXCJlZGl0b3Iubm9uV29yZENoYXJhY3RlcnNcIiApO1xuXG4gICAgICAgIHJldHVybiBuZXcgUmVnRXhwKCBgKD86XiR7IHNTdGFydGluZ0xldHRlciB9fFtcXFxccyR7IF8uZXNjYXBlUmVnRXhwKCBzTm9uV29yZENoYXJhY3RlcnMgKSB9XSskeyBzU3RhcnRpbmdMZXR0ZXIgfSlgLCBcImdpXCIgKTtcbiAgICB9XG59XG5cbklucHV0Vmlldy5NT0RFX1dPUkRTID0gXCJ3b3Jkc1wiO1xuSW5wdXRWaWV3Lk1PREVfTEVUVEVSID0gXCJsZXR0ZXJcIjtcbklucHV0Vmlldy5NT0RFX1dPUkRTX1NUQVJUSU5HID0gXCJ3b3Jkc19zdGFydGluZ1wiO1xuXG5leHBvcnQgZGVmYXVsdCBJbnB1dFZpZXc7XG4iXX0=
//# sourceURL=/Users/bzittlau/.atom/packages/easy-motion-redux/lib/views/input.js
