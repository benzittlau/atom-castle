(function() {
  var exec,
    __slice = [].slice;

  exec = require("child_process").exec;

  module.exports = function(pid, callback) {
    var process_lister, process_lister_command, stderr, stdout;
    process_lister_command = process.platform === "win32" ? "wmic PROCESS GET Name,ProcessId,ParentProcessId" : "ps -A -o ppid,pid,comm";
    process_lister = exec(process_lister_command);
    process_lister.on("error", callback);
    stdout = "";
    stderr = "";
    process_lister.stdout.on("data", function(data) {
      return stdout += data;
    });
    process_lister.stderr.on("data", function(data) {
      return stderr += data;
    });
    return process_lister.on("close", function(code) {
      var children_of, header_keys, headers, i, info, key, output, proc_infos, procs, row, row_values, rows, value, _ref;
      if (code) {
        return callback(new Error("Process `" + process_lister_command + "` exited with code " + code + ":\n" + stderr));
      }
      output = stdout.trim();
      _ref = output.split(/\r?\n/), headers = _ref[0], rows = 2 <= _ref.length ? __slice.call(_ref, 1) : [];
      header_keys = headers.trim().split(/\s+/);
      proc_infos = (function() {
        var _i, _j, _len, _len1, _ref1, _results;
        _results = [];
        for (_i = 0, _len = rows.length; _i < _len; _i++) {
          row = rows[_i];
          info = {};
          row_values = row.trim().split(/\s+/);
          for (i = _j = 0, _len1 = header_keys.length; _j < _len1; i = ++_j) {
            key = header_keys[i];
            value = (_ref1 = row_values[i]) != null ? _ref1 : "";
            if (!(key.match(/Name/i) || isNaN(value))) {
              value = parseFloat(value);
            }
            info[key] = value;
          }
          _results.push(info);
        }
        return _results;
      })();
      procs = (function() {
        var _i, _len, _ref1, _ref2, _ref3, _ref4, _ref5, _ref6, _ref7, _results;
        _results = [];
        for (_i = 0, _len = proc_infos.length; _i < _len; _i++) {
          info = proc_infos[_i];
          _results.push({
            pid: (_ref1 = (_ref2 = info.pid) != null ? _ref2 : info.PID) != null ? _ref1 : info.ProcessId,
            ppid: (_ref3 = (_ref4 = info.ppid) != null ? _ref4 : info.PPID) != null ? _ref3 : info.ParentProcessId,
            name: (_ref5 = (_ref6 = (_ref7 = info.name) != null ? _ref7 : info.Name) != null ? _ref6 : info.comm) != null ? _ref5 : proc.cmd
          });
        }
        return _results;
      })();
      children_of = function(ppid) {
        var proc, _i, _len, _results;
        _results = [];
        for (_i = 0, _len = procs.length; _i < _len; _i++) {
          proc = procs[_i];
          if (!(("" + proc.ppid) === ("" + ppid))) {
            continue;
          }
          proc.children = children_of(proc.pid);
          _results.push(proc);
        }
        return _results;
      };
      return callback(null, children_of(pid));
    });
  };

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL1VzZXJzL2J6aXR0bGF1Ly5hdG9tL3BhY2thZ2VzL21vY2hhLXRlc3QtcnVubmVyL25vZGVfbW9kdWxlcy9wcm9jZXNzLXRyZWUvaW5kZXguY29mZmVlIgogIF0sCiAgIm5hbWVzIjogW10sCiAgIm1hcHBpbmdzIjogIkFBQ0E7QUFBQSxNQUFBLElBQUE7SUFBQSxrQkFBQTs7QUFBQSxFQUFDLE9BQVEsT0FBQSxDQUFRLGVBQVIsRUFBUixJQUFELENBQUE7O0FBQUEsRUFHQSxNQUFNLENBQUMsT0FBUCxHQUFpQixTQUFDLEdBQUQsRUFBTSxRQUFOLEdBQUE7QUFDaEIsUUFBQSxzREFBQTtBQUFBLElBQUEsc0JBQUEsR0FDSSxPQUFPLENBQUMsUUFBUixLQUFvQixPQUF2QixHQUNDLGlEQURELEdBR0Msd0JBSkYsQ0FBQTtBQUFBLElBTUEsY0FBQSxHQUFpQixJQUFBLENBQUssc0JBQUwsQ0FOakIsQ0FBQTtBQUFBLElBT0EsY0FBYyxDQUFDLEVBQWYsQ0FBa0IsT0FBbEIsRUFBMkIsUUFBM0IsQ0FQQSxDQUFBO0FBQUEsSUFRQSxNQUFBLEdBQVMsRUFSVCxDQUFBO0FBQUEsSUFTQSxNQUFBLEdBQVMsRUFUVCxDQUFBO0FBQUEsSUFVQSxjQUFjLENBQUMsTUFBTSxDQUFDLEVBQXRCLENBQXlCLE1BQXpCLEVBQWlDLFNBQUMsSUFBRCxHQUFBO2FBQVMsTUFBQSxJQUFVLEtBQW5CO0lBQUEsQ0FBakMsQ0FWQSxDQUFBO0FBQUEsSUFXQSxjQUFjLENBQUMsTUFBTSxDQUFDLEVBQXRCLENBQXlCLE1BQXpCLEVBQWlDLFNBQUMsSUFBRCxHQUFBO2FBQVMsTUFBQSxJQUFVLEtBQW5CO0lBQUEsQ0FBakMsQ0FYQSxDQUFBO1dBWUEsY0FBYyxDQUFDLEVBQWYsQ0FBa0IsT0FBbEIsRUFBMkIsU0FBQyxJQUFELEdBQUE7QUFDMUIsVUFBQSw4R0FBQTtBQUFBLE1BQUEsSUFBd0csSUFBeEc7QUFBQSxlQUFPLFFBQUEsQ0FBYSxJQUFBLEtBQUEsQ0FBTyxXQUFBLEdBQVcsc0JBQVgsR0FBa0MscUJBQWxDLEdBQXVELElBQXZELEdBQTRELEtBQTVELEdBQWlFLE1BQXhFLENBQWIsQ0FBUCxDQUFBO09BQUE7QUFBQSxNQUVBLE1BQUEsR0FBUyxNQUFNLENBQUMsSUFBUCxDQUFBLENBRlQsQ0FBQTtBQUFBLE1BTUEsT0FBcUIsTUFBTSxDQUFDLEtBQVAsQ0FBYSxPQUFiLENBQXJCLEVBQUMsaUJBQUQsRUFBVSxvREFOVixDQUFBO0FBQUEsTUFPQSxXQUFBLEdBQWMsT0FBTyxDQUFDLElBQVIsQ0FBQSxDQUFjLENBQUMsS0FBZixDQUFxQixLQUFyQixDQVBkLENBQUE7QUFBQSxNQVFBLFVBQUE7O0FBQ0M7YUFBQSwyQ0FBQTt5QkFBQTtBQUNDLFVBQUEsSUFBQSxHQUFPLEVBQVAsQ0FBQTtBQUFBLFVBQ0EsVUFBQSxHQUFhLEdBQUcsQ0FBQyxJQUFKLENBQUEsQ0FBVSxDQUFDLEtBQVgsQ0FBaUIsS0FBakIsQ0FEYixDQUFBO0FBRUEsZUFBQSw0REFBQTtpQ0FBQTtBQUNDLFlBQUEsS0FBQSw2Q0FBd0IsRUFBeEIsQ0FBQTtBQUNBLFlBQUEsSUFBQSxDQUFBLENBQWlDLEdBQUcsQ0FBQyxLQUFKLENBQVUsT0FBVixDQUFBLElBQXNCLEtBQUEsQ0FBTSxLQUFOLENBQXZELENBQUE7QUFBQSxjQUFBLEtBQUEsR0FBUSxVQUFBLENBQVcsS0FBWCxDQUFSLENBQUE7YUFEQTtBQUFBLFlBRUEsSUFBSyxDQUFBLEdBQUEsQ0FBTCxHQUFZLEtBRlosQ0FERDtBQUFBLFdBRkE7QUFBQSx3QkFNQSxLQU5BLENBREQ7QUFBQTs7VUFURCxDQUFBO0FBQUEsTUFrQkEsS0FBQTs7QUFDQzthQUFBLGlEQUFBO2dDQUFBO0FBQ0Msd0JBQUE7QUFBQSxZQUFBLEdBQUEsNEVBQTJCLElBQUksQ0FBQyxTQUFoQztBQUFBLFlBQ0EsSUFBQSw4RUFBOEIsSUFBSSxDQUFDLGVBRG5DO0FBQUEsWUFFQSxJQUFBLG9IQUEwQyxJQUFJLENBQUMsR0FGL0M7WUFBQSxDQUREO0FBQUE7O1VBbkJELENBQUE7QUFBQSxNQXdCQSxXQUFBLEdBQWMsU0FBQyxJQUFELEdBQUE7QUFDYixZQUFBLHdCQUFBO0FBQUE7YUFBQSw0Q0FBQTsyQkFBQTtnQkFBdUIsQ0FBQSxFQUFBLEdBQUcsSUFBSSxDQUFDLElBQVIsQ0FBQSxLQUFrQixDQUFBLEVBQUEsR0FBRyxJQUFIOztXQUN4QztBQUFBLFVBQUEsSUFBSSxDQUFDLFFBQUwsR0FBZ0IsV0FBQSxDQUFZLElBQUksQ0FBQyxHQUFqQixDQUFoQixDQUFBO0FBQUEsd0JBQ0EsS0FEQSxDQUREO0FBQUE7d0JBRGE7TUFBQSxDQXhCZCxDQUFBO2FBNkJBLFFBQUEsQ0FBUyxJQUFULEVBQWUsV0FBQSxDQUFZLEdBQVosQ0FBZixFQTlCMEI7SUFBQSxDQUEzQixFQWJnQjtFQUFBLENBSGpCLENBQUE7QUFBQSIKfQ==

//# sourceURL=/Users/bzittlau/.atom/packages/mocha-test-runner/node_modules/process-tree/index.coffee
