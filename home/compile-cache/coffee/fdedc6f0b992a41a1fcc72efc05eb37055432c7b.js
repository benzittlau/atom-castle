(function() {
  var pty;

  pty = require('ptyw.js');

  module.exports = function(ptyCwd, sh, cols, rows, args) {
    var callback, path, ptyProcess, shell;
    callback = this.async();
    if (sh) {
      shell = sh;
    } else {
      shell = process.env.SHELL;
      if (!shell) {
        path = require('path');
        if (process.platform === 'win32') {
          shell = path.resolve(process.env.SystemRoot, 'System32', 'WindowsPowerShell', 'v1.0', 'powershell.exe');
        } else {
          shell = '/bin/sh';
        }
      }
    }
    ptyProcess = pty.fork(shell, args, {
      name: 'xterm-256color',
      cols: cols,
      rows: rows,
      cwd: ptyCwd,
      env: process.env
    });
    ptyProcess.on('data', function(data) {
      return emit('term3:data', new Buffer(data).toString("base64"));
    });
    ptyProcess.on('exit', function() {
      emit('term3:exit');
      return callback();
    });
    return process.on('message', function(_arg) {
      var cols, event, rows, text, _ref;
      _ref = _arg != null ? _arg : {}, event = _ref.event, cols = _ref.cols, rows = _ref.rows, text = _ref.text;
      switch (event) {
        case 'resize':
          return ptyProcess.resize(cols, rows);
        case 'input':
          return ptyProcess.write(new Buffer(text, "base64").toString("utf-8"));
      }
    });
  };

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL1VzZXJzL2J6aXR0bGF1Ly5hdG9tL3BhY2thZ2VzL3Rlcm0zL2xpYi9wdHkuY29mZmVlIgogIF0sCiAgIm5hbWVzIjogW10sCiAgIm1hcHBpbmdzIjogIkFBRUE7QUFBQSxNQUFBLEdBQUE7O0FBQUEsRUFBQSxHQUFBLEdBQU0sT0FBQSxDQUFRLFNBQVIsQ0FBTixDQUFBOztBQUFBLEVBRUEsTUFBTSxDQUFDLE9BQVAsR0FBaUIsU0FBQyxNQUFELEVBQVMsRUFBVCxFQUFhLElBQWIsRUFBbUIsSUFBbkIsRUFBeUIsSUFBekIsR0FBQTtBQUNmLFFBQUEsaUNBQUE7QUFBQSxJQUFBLFFBQUEsR0FBVyxJQUFDLENBQUEsS0FBRCxDQUFBLENBQVgsQ0FBQTtBQUNBLElBQUEsSUFBRyxFQUFIO0FBQ0ksTUFBQSxLQUFBLEdBQVEsRUFBUixDQURKO0tBQUEsTUFBQTtBQUdJLE1BQUEsS0FBQSxHQUFRLE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBcEIsQ0FBQTtBQUNBLE1BQUEsSUFBRyxDQUFBLEtBQUg7QUFFRSxRQUFBLElBQUEsR0FBTyxPQUFBLENBQVEsTUFBUixDQUFQLENBQUE7QUFDQSxRQUFBLElBQUcsT0FBTyxDQUFDLFFBQVIsS0FBb0IsT0FBdkI7QUFDRSxVQUFBLEtBQUEsR0FBUSxJQUFJLENBQUMsT0FBTCxDQUFhLE9BQU8sQ0FBQyxHQUFHLENBQUMsVUFBekIsRUFBcUMsVUFBckMsRUFBaUQsbUJBQWpELEVBQXNFLE1BQXRFLEVBQThFLGdCQUE5RSxDQUFSLENBREY7U0FBQSxNQUFBO0FBR0UsVUFBQSxLQUFBLEdBQVEsU0FBUixDQUhGO1NBSEY7T0FKSjtLQURBO0FBQUEsSUFhQSxVQUFBLEdBQWEsR0FBRyxDQUFDLElBQUosQ0FBUyxLQUFULEVBQWdCLElBQWhCLEVBQ1g7QUFBQSxNQUFBLElBQUEsRUFBTSxnQkFBTjtBQUFBLE1BQ0EsSUFBQSxFQUFNLElBRE47QUFBQSxNQUVBLElBQUEsRUFBTSxJQUZOO0FBQUEsTUFHQSxHQUFBLEVBQUssTUFITDtBQUFBLE1BSUEsR0FBQSxFQUFLLE9BQU8sQ0FBQyxHQUpiO0tBRFcsQ0FiYixDQUFBO0FBQUEsSUFvQkEsVUFBVSxDQUFDLEVBQVgsQ0FBYyxNQUFkLEVBQXNCLFNBQUMsSUFBRCxHQUFBO2FBQ3BCLElBQUEsQ0FBSyxZQUFMLEVBQXVCLElBQUEsTUFBQSxDQUFPLElBQVAsQ0FBWSxDQUFDLFFBQWIsQ0FBc0IsUUFBdEIsQ0FBdkIsRUFEb0I7SUFBQSxDQUF0QixDQXBCQSxDQUFBO0FBQUEsSUF1QkEsVUFBVSxDQUFDLEVBQVgsQ0FBYyxNQUFkLEVBQXNCLFNBQUEsR0FBQTtBQUNwQixNQUFBLElBQUEsQ0FBSyxZQUFMLENBQUEsQ0FBQTthQUNBLFFBQUEsQ0FBQSxFQUZvQjtJQUFBLENBQXRCLENBdkJBLENBQUE7V0EyQkEsT0FBTyxDQUFDLEVBQVIsQ0FBVyxTQUFYLEVBQXNCLFNBQUMsSUFBRCxHQUFBO0FBQ3BCLFVBQUEsNkJBQUE7QUFBQSw0QkFEcUIsT0FBMEIsSUFBekIsYUFBQSxPQUFPLFlBQUEsTUFBTSxZQUFBLE1BQU0sWUFBQSxJQUN6QyxDQUFBO0FBQUEsY0FBTyxLQUFQO0FBQUEsYUFDTyxRQURQO2lCQUNxQixVQUFVLENBQUMsTUFBWCxDQUFrQixJQUFsQixFQUF3QixJQUF4QixFQURyQjtBQUFBLGFBRU8sT0FGUDtpQkFFb0IsVUFBVSxDQUFDLEtBQVgsQ0FBcUIsSUFBQSxNQUFBLENBQU8sSUFBUCxFQUFhLFFBQWIsQ0FBc0IsQ0FBQyxRQUF2QixDQUFnQyxPQUFoQyxDQUFyQixFQUZwQjtBQUFBLE9BRG9CO0lBQUEsQ0FBdEIsRUE1QmU7RUFBQSxDQUZqQixDQUFBO0FBQUEiCn0=

//# sourceURL=/Users/bzittlau/.atom/packages/term3/lib/pty.coffee
