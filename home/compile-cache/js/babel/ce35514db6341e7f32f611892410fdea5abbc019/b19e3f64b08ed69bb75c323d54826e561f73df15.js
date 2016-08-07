Object.defineProperty(exports, "__esModule", {
    value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _atom = require("atom");

var _viewsInput = require("./views/input");

var _viewsInput2 = _interopRequireDefault(_viewsInput);

"use babel";

var oConfig = undefined,
    fActivate = undefined,
    fDeactivate = undefined,
    oDisposables = undefined,
    _fStart = undefined;

exports.config = oConfig = {
    "replaceCharacters": {
        "type": "string",
        "default": "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
    }
};

_fStart = function (sMode, bSelect) {
    var oInput = new _viewsInput2["default"](atom.workspace.getActiveTextEditor(), sMode, bSelect),
        oPanel = undefined;

    oPanel = atom.workspace.addBottomPanel({
        "item": oInput
    });

    oInput.resetPositions();
    oInput.panel = oPanel;

    if (oInput.hasPositions()) {
        oInput.focus();
    } else {
        oInput.remove();
        oPanel.destroy();
    }
};

exports.activate = fActivate = function () {
    oDisposables && oDisposables.dispose();
    oDisposables = new _atom.CompositeDisposable();

    oDisposables.add(atom.commands.add("atom-text-editor:not([mini])", {
        "easy-motion-redux:words": function easyMotionReduxWords() {
            _fStart(_viewsInput2["default"].MODE_WORDS);
        },
        "easy-motion-redux:letter": function easyMotionReduxLetter() {
            _fStart(_viewsInput2["default"].MODE_LETTER);
        },
        "easy-motion-redux:words_starting": function easyMotionReduxWords_starting() {
            _fStart(_viewsInput2["default"].MODE_WORDS_STARTING);
        },
        "easy-motion-redux:words-select": function easyMotionReduxWordsSelect() {
            _fStart(_viewsInput2["default"].MODE_WORDS, true);
        },
        "easy-motion-redux:letter-select": function easyMotionReduxLetterSelect() {
            _fStart(_viewsInput2["default"].MODE_LETTER, true);
        },
        "easy-motion-redux:words_starting-select": function easyMotionReduxWords_startingSelect() {
            _fStart(_viewsInput2["default"].MODE_WORDS_STARTING, true);
        }
    }));
};

exports.deactivate = fDeactivate = function () {
    oDisposables && oDisposables.dispose();
};

exports.config = oConfig;
exports.activate = fActivate;
exports.deactivate = fDeactivate;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9ieml0dGxhdS8uYXRvbS9wYWNrYWdlcy9lYXN5LW1vdGlvbi1yZWR1eC9saWIvbWFpbi5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7b0JBRW9DLE1BQU07OzBCQUNwQixlQUFlOzs7O0FBSHJDLFdBQVcsQ0FBQzs7QUFLWixJQUFJLE9BQU8sWUFBQTtJQUNQLFNBQVMsWUFBQTtJQUNULFdBQVcsWUFBQTtJQUNYLFlBQVksWUFBQTtJQUNaLE9BQU8sWUFBQSxDQUFDOztBQUVaLFFBeURlLE1BQU0sR0F6RHJCLE9BQU8sR0FBRztBQUNOLHVCQUFtQixFQUFFO0FBQ2pCLGNBQU0sRUFBRSxRQUFRO0FBQ2hCLGlCQUFTLEVBQUUsNEJBQTRCO0tBQzFDO0NBQ0osQ0FBQzs7QUFFRixPQUFPLEdBQUcsVUFBVSxLQUFLLEVBQUUsT0FBTyxFQUFHO0FBQ2pDLFFBQUksTUFBTSxHQUFHLDRCQUFlLElBQUksQ0FBQyxTQUFTLENBQUMsbUJBQW1CLEVBQUUsRUFBRSxLQUFLLEVBQUUsT0FBTyxDQUFFO1FBQzlFLE1BQU0sWUFBQSxDQUFDOztBQUVYLFVBQU0sR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLGNBQWMsQ0FBRTtBQUNwQyxjQUFNLEVBQUUsTUFBTTtLQUNqQixDQUFFLENBQUM7O0FBRUosVUFBTSxDQUFDLGNBQWMsRUFBRSxDQUFDO0FBQ3hCLFVBQU0sQ0FBQyxLQUFLLEdBQUcsTUFBTSxDQUFDOztBQUV0QixRQUFLLE1BQU0sQ0FBQyxZQUFZLEVBQUUsRUFBRztBQUN6QixjQUFNLENBQUMsS0FBSyxFQUFFLENBQUM7S0FDbEIsTUFBTTtBQUNILGNBQU0sQ0FBQyxNQUFNLEVBQUUsQ0FBQztBQUNoQixjQUFNLENBQUMsT0FBTyxFQUFFLENBQUM7S0FDcEI7Q0FDSixDQUFDOztBQUVGLFFBZ0NpQixRQUFRLEdBaEN6QixTQUFTLEdBQUcsWUFBVztBQUNuQixnQkFBWSxJQUFJLFlBQVksQ0FBQyxPQUFPLEVBQUUsQ0FBQztBQUN2QyxnQkFBWSxHQUFHLCtCQUF5QixDQUFDOztBQUV6QyxnQkFBWSxDQUFDLEdBQUcsQ0FBRSxJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBRSw4QkFBOEIsRUFBRTtBQUNqRSxpQ0FBeUIsRUFBRSxnQ0FBTTtBQUM3QixtQkFBTyxDQUFFLHdCQUFVLFVBQVUsQ0FBRSxDQUFDO1NBQ25DO0FBQ0Qsa0NBQTBCLEVBQUUsaUNBQU07QUFDOUIsbUJBQU8sQ0FBRSx3QkFBVSxXQUFXLENBQUUsQ0FBQztTQUNwQztBQUNELDBDQUFrQyxFQUFFLHlDQUFNO0FBQ3RDLG1CQUFPLENBQUUsd0JBQVUsbUJBQW1CLENBQUUsQ0FBQztTQUM1QztBQUNELHdDQUFnQyxFQUFFLHNDQUFNO0FBQ3BDLG1CQUFPLENBQUUsd0JBQVUsVUFBVSxFQUFFLElBQUksQ0FBRSxDQUFDO1NBQ3pDO0FBQ0QseUNBQWlDLEVBQUUsdUNBQU07QUFDckMsbUJBQU8sQ0FBRSx3QkFBVSxXQUFXLEVBQUUsSUFBSSxDQUFFLENBQUM7U0FDMUM7QUFDRCxpREFBeUMsRUFBRSwrQ0FBTTtBQUM3QyxtQkFBTyxDQUFFLHdCQUFVLG1CQUFtQixFQUFFLElBQUksQ0FBRSxDQUFDO1NBQ2xEO0tBQ0osQ0FBRSxDQUFFLENBQUM7Q0FDVCxDQUFDOztBQUVGLFFBT21CLFVBQVUsR0FQN0IsV0FBVyxHQUFHLFlBQVc7QUFDckIsZ0JBQVksSUFBSSxZQUFZLENBQUMsT0FBTyxFQUFFLENBQUM7Q0FDMUMsQ0FBQzs7UUFHYSxNQUFNLEdBQWpCLE9BQU87UUFDTSxRQUFRLEdBQXJCLFNBQVM7UUFDTSxVQUFVLEdBQXpCLFdBQVciLCJmaWxlIjoiL1VzZXJzL2J6aXR0bGF1Ly5hdG9tL3BhY2thZ2VzL2Vhc3ktbW90aW9uLXJlZHV4L2xpYi9tYWluLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2UgYmFiZWxcIjtcblxuaW1wb3J0IHsgQ29tcG9zaXRlRGlzcG9zYWJsZSB9IGZyb20gXCJhdG9tXCI7XG5pbXBvcnQgSW5wdXRWaWV3IGZyb20gXCIuL3ZpZXdzL2lucHV0XCI7XG5cbmxldCBvQ29uZmlnLFxuICAgIGZBY3RpdmF0ZSxcbiAgICBmRGVhY3RpdmF0ZSxcbiAgICBvRGlzcG9zYWJsZXMsXG4gICAgX2ZTdGFydDtcblxub0NvbmZpZyA9IHtcbiAgICBcInJlcGxhY2VDaGFyYWN0ZXJzXCI6IHtcbiAgICAgICAgXCJ0eXBlXCI6IFwic3RyaW5nXCIsXG4gICAgICAgIFwiZGVmYXVsdFwiOiBcIkFCQ0RFRkdISUpLTE1OT1BRUlNUVVZXWFlaXCJcbiAgICB9XG59O1xuXG5fZlN0YXJ0ID0gZnVuY3Rpb24oIHNNb2RlLCBiU2VsZWN0ICkge1xuICAgIGxldCBvSW5wdXQgPSBuZXcgSW5wdXRWaWV3KCBhdG9tLndvcmtzcGFjZS5nZXRBY3RpdmVUZXh0RWRpdG9yKCksIHNNb2RlLCBiU2VsZWN0ICksXG4gICAgICAgIG9QYW5lbDtcblxuICAgIG9QYW5lbCA9IGF0b20ud29ya3NwYWNlLmFkZEJvdHRvbVBhbmVsKCB7XG4gICAgICAgIFwiaXRlbVwiOiBvSW5wdXRcbiAgICB9ICk7XG5cbiAgICBvSW5wdXQucmVzZXRQb3NpdGlvbnMoKTtcbiAgICBvSW5wdXQucGFuZWwgPSBvUGFuZWw7XG5cbiAgICBpZiAoIG9JbnB1dC5oYXNQb3NpdGlvbnMoKSApIHtcbiAgICAgICAgb0lucHV0LmZvY3VzKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgb0lucHV0LnJlbW92ZSgpO1xuICAgICAgICBvUGFuZWwuZGVzdHJveSgpO1xuICAgIH1cbn07XG5cbmZBY3RpdmF0ZSA9IGZ1bmN0aW9uKCkge1xuICAgIG9EaXNwb3NhYmxlcyAmJiBvRGlzcG9zYWJsZXMuZGlzcG9zZSgpO1xuICAgIG9EaXNwb3NhYmxlcyA9IG5ldyBDb21wb3NpdGVEaXNwb3NhYmxlKCk7XG5cbiAgICBvRGlzcG9zYWJsZXMuYWRkKCBhdG9tLmNvbW1hbmRzLmFkZCggXCJhdG9tLXRleHQtZWRpdG9yOm5vdChbbWluaV0pXCIsIHtcbiAgICAgICAgXCJlYXN5LW1vdGlvbi1yZWR1eDp3b3Jkc1wiOiAoKSA9PiB7XG4gICAgICAgICAgICBfZlN0YXJ0KCBJbnB1dFZpZXcuTU9ERV9XT1JEUyApO1xuICAgICAgICB9LFxuICAgICAgICBcImVhc3ktbW90aW9uLXJlZHV4OmxldHRlclwiOiAoKSA9PiB7XG4gICAgICAgICAgICBfZlN0YXJ0KCBJbnB1dFZpZXcuTU9ERV9MRVRURVIgKTtcbiAgICAgICAgfSxcbiAgICAgICAgXCJlYXN5LW1vdGlvbi1yZWR1eDp3b3Jkc19zdGFydGluZ1wiOiAoKSA9PiB7XG4gICAgICAgICAgICBfZlN0YXJ0KCBJbnB1dFZpZXcuTU9ERV9XT1JEU19TVEFSVElORyApO1xuICAgICAgICB9LFxuICAgICAgICBcImVhc3ktbW90aW9uLXJlZHV4OndvcmRzLXNlbGVjdFwiOiAoKSA9PiB7XG4gICAgICAgICAgICBfZlN0YXJ0KCBJbnB1dFZpZXcuTU9ERV9XT1JEUywgdHJ1ZSApO1xuICAgICAgICB9LFxuICAgICAgICBcImVhc3ktbW90aW9uLXJlZHV4OmxldHRlci1zZWxlY3RcIjogKCkgPT4ge1xuICAgICAgICAgICAgX2ZTdGFydCggSW5wdXRWaWV3Lk1PREVfTEVUVEVSLCB0cnVlICk7XG4gICAgICAgIH0sXG4gICAgICAgIFwiZWFzeS1tb3Rpb24tcmVkdXg6d29yZHNfc3RhcnRpbmctc2VsZWN0XCI6ICgpID0+IHtcbiAgICAgICAgICAgIF9mU3RhcnQoIElucHV0Vmlldy5NT0RFX1dPUkRTX1NUQVJUSU5HLCB0cnVlICk7XG4gICAgICAgIH1cbiAgICB9ICkgKTtcbn07XG5cbmZEZWFjdGl2YXRlID0gZnVuY3Rpb24oKSB7XG4gICAgb0Rpc3Bvc2FibGVzICYmIG9EaXNwb3NhYmxlcy5kaXNwb3NlKCk7XG59O1xuXG5leHBvcnQge1xuICAgIG9Db25maWcgYXMgY29uZmlnLFxuICAgIGZBY3RpdmF0ZSBhcyBhY3RpdmF0ZSxcbiAgICBmRGVhY3RpdmF0ZSBhcyBkZWFjdGl2YXRlXG59O1xuIl19
//# sourceURL=/Users/bzittlau/.atom/packages/easy-motion-redux/lib/main.js
