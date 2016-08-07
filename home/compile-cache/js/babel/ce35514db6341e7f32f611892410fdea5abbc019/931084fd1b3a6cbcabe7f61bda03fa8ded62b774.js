'use babel';
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});
function toggleClass(boolean, className) {
    var root = document.querySelector('atom-workspace');

    if (boolean) {
        root.classList.add(className);
    } else {
        root.classList.remove(className);
    }
}

function toCamelCase(str) {
    return str.replace(/\s(.)/g, function ($1) {
        return $1.toUpperCase();
    }).replace(/\s/g, '').replace(/^(.)/, function ($1) {
        return $1.toLowerCase();
    });
}

exports['default'] = {
    toggleClass: toggleClass,
    toCamelCase: toCamelCase
};
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9ieml0dGxhdS8uYXRvbS9wYWNrYWdlcy9hdG9tLW1hdGVyaWFsLXVpL2xpYi9oZWxwZXJzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLFdBQVcsQ0FBQztBQUNaLFlBQVksQ0FBQzs7Ozs7QUFFYixTQUFTLFdBQVcsQ0FBQyxPQUFPLEVBQUUsU0FBUyxFQUFFO0FBQ3JDLFFBQUksSUFBSSxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsZ0JBQWdCLENBQUMsQ0FBQzs7QUFFcEQsUUFBSSxPQUFPLEVBQUU7QUFDVCxZQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsQ0FBQztLQUNqQyxNQUFNO0FBQ0gsWUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUM7S0FDcEM7Q0FDSjs7QUFFRCxTQUFTLFdBQVcsQ0FBQyxHQUFHLEVBQUU7QUFDdEIsV0FBTyxHQUFHLENBQ0wsT0FBTyxDQUFDLFFBQVEsRUFBRSxVQUFTLEVBQUUsRUFBRTtBQUFFLGVBQU8sRUFBRSxDQUFDLFdBQVcsRUFBRSxDQUFDO0tBQUUsQ0FBQyxDQUM1RCxPQUFPLENBQUMsS0FBSyxFQUFFLEVBQUUsQ0FBQyxDQUNsQixPQUFPLENBQUMsTUFBTSxFQUFFLFVBQVMsRUFBRSxFQUFFO0FBQUUsZUFBTyxFQUFFLENBQUMsV0FBVyxFQUFFLENBQUM7S0FBRSxDQUFDLENBQUM7Q0FDbkU7O3FCQUVjO0FBQ1gsZUFBVyxFQUFYLFdBQVc7QUFDWCxlQUFXLEVBQVgsV0FBVztDQUNkIiwiZmlsZSI6Ii9Vc2Vycy9ieml0dGxhdS8uYXRvbS9wYWNrYWdlcy9hdG9tLW1hdGVyaWFsLXVpL2xpYi9oZWxwZXJzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBiYWJlbCc7XG4ndXNlIHN0cmljdCc7XG5cbmZ1bmN0aW9uIHRvZ2dsZUNsYXNzKGJvb2xlYW4sIGNsYXNzTmFtZSkge1xuICAgIHZhciByb290ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignYXRvbS13b3Jrc3BhY2UnKTtcblxuICAgIGlmIChib29sZWFuKSB7XG4gICAgICAgIHJvb3QuY2xhc3NMaXN0LmFkZChjbGFzc05hbWUpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHJvb3QuY2xhc3NMaXN0LnJlbW92ZShjbGFzc05hbWUpO1xuICAgIH1cbn1cblxuZnVuY3Rpb24gdG9DYW1lbENhc2Uoc3RyKSB7XG4gICAgcmV0dXJuIHN0clxuICAgICAgICAucmVwbGFjZSgvXFxzKC4pL2csIGZ1bmN0aW9uKCQxKSB7IHJldHVybiAkMS50b1VwcGVyQ2FzZSgpOyB9KVxuICAgICAgICAucmVwbGFjZSgvXFxzL2csICcnKVxuICAgICAgICAucmVwbGFjZSgvXiguKS8sIGZ1bmN0aW9uKCQxKSB7IHJldHVybiAkMS50b0xvd2VyQ2FzZSgpOyB9KTtcbn1cblxuZXhwb3J0IGRlZmF1bHQge1xuICAgIHRvZ2dsZUNsYXNzLFxuICAgIHRvQ2FtZWxDYXNlXG59O1xuIl19
//# sourceURL=/Users/bzittlau/.atom/packages/atom-material-ui/lib/helpers.js
