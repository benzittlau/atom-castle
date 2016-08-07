(function() {
  var extractMatch, getTestName, localeval, path;

  path = require('path');

  localeval = require('localeval');

  exports.fromEditor = function(editor) {
    var line, row, test;
    row = editor.getCursorScreenPosition().row;
    line = editor.lineTextForBufferRow(row);
    test = getTestName(line);
    return test;
  };

  getTestName = function(line) {
    var describe, it, suite, test;
    describe = extractMatch(line, /describe\s*\(?\s*['"](.*)['"]/);
    suite = extractMatch(line, /suite\s*\(?\s*['"](.*)['"]/);
    it = extractMatch(line, /it\s*\(?\s*['"](.*)['"]/);
    test = extractMatch(line, /test\s*\(?\s*['"](.*)['"]/);
    return describe || suite || it || test || null;
  };

  extractMatch = function(line, regex) {
    var matches;
    matches = regex.exec(line);
    if (matches && matches.length >= 2) {
      return localeval("'" + matches[1] + "'");
    } else {
      return null;
    }
  };

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL1VzZXJzL2J6aXR0bGF1Ly5hdG9tL3BhY2thZ2VzL21vY2hhLXRlc3QtcnVubmVyL2xpYi9zZWxlY3RlZC10ZXN0LmNvZmZlZSIKICBdLAogICJuYW1lcyI6IFtdLAogICJtYXBwaW5ncyI6ICJBQUFBO0FBQUEsTUFBQSwwQ0FBQTs7QUFBQSxFQUFBLElBQUEsR0FBWSxPQUFBLENBQVEsTUFBUixDQUFaLENBQUE7O0FBQUEsRUFDQSxTQUFBLEdBQVksT0FBQSxDQUFRLFdBQVIsQ0FEWixDQUFBOztBQUFBLEVBR0EsT0FBTyxDQUFDLFVBQVIsR0FBcUIsU0FBQyxNQUFELEdBQUE7QUFDbkIsUUFBQSxlQUFBO0FBQUEsSUFBQSxHQUFBLEdBQU0sTUFBTSxDQUFDLHVCQUFQLENBQUEsQ0FBZ0MsQ0FBQyxHQUF2QyxDQUFBO0FBQUEsSUFDQSxJQUFBLEdBQU8sTUFBTSxDQUFDLG9CQUFQLENBQTRCLEdBQTVCLENBRFAsQ0FBQTtBQUFBLElBRUEsSUFBQSxHQUFPLFdBQUEsQ0FBWSxJQUFaLENBRlAsQ0FBQTtBQUdBLFdBQU8sSUFBUCxDQUptQjtFQUFBLENBSHJCLENBQUE7O0FBQUEsRUFTQSxXQUFBLEdBQWMsU0FBQyxJQUFELEdBQUE7QUFDWixRQUFBLHlCQUFBO0FBQUEsSUFBQSxRQUFBLEdBQWEsWUFBQSxDQUFhLElBQWIsRUFBbUIsK0JBQW5CLENBQWIsQ0FBQTtBQUFBLElBQ0EsS0FBQSxHQUFhLFlBQUEsQ0FBYSxJQUFiLEVBQW1CLDRCQUFuQixDQURiLENBQUE7QUFBQSxJQUVBLEVBQUEsR0FBYSxZQUFBLENBQWEsSUFBYixFQUFtQix5QkFBbkIsQ0FGYixDQUFBO0FBQUEsSUFHQSxJQUFBLEdBQWEsWUFBQSxDQUFhLElBQWIsRUFBbUIsMkJBQW5CLENBSGIsQ0FBQTtXQUlBLFFBQUEsSUFBWSxLQUFaLElBQXFCLEVBQXJCLElBQTJCLElBQTNCLElBQW1DLEtBTHZCO0VBQUEsQ0FUZCxDQUFBOztBQUFBLEVBZ0JBLFlBQUEsR0FBZSxTQUFDLElBQUQsRUFBTyxLQUFQLEdBQUE7QUFDYixRQUFBLE9BQUE7QUFBQSxJQUFBLE9BQUEsR0FBVSxLQUFLLENBQUMsSUFBTixDQUFXLElBQVgsQ0FBVixDQUFBO0FBQ0EsSUFBQSxJQUFHLE9BQUEsSUFBWSxPQUFPLENBQUMsTUFBUixJQUFrQixDQUFqQzthQUNFLFNBQUEsQ0FBVyxHQUFBLEdBQUcsT0FBUSxDQUFBLENBQUEsQ0FBWCxHQUFjLEdBQXpCLEVBREY7S0FBQSxNQUFBO2FBR0UsS0FIRjtLQUZhO0VBQUEsQ0FoQmYsQ0FBQTtBQUFBIgp9

//# sourceURL=/Users/bzittlau/.atom/packages/mocha-test-runner/lib/selected-test.coffee
