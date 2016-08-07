(function() {
  var assert;

  assert = require('assert');

  describe('Top level describe', function() {
    describe('Nested describe', function() {
      it('is successful', function() {
        return assert(true);
      });
      return it('fails', function() {
        return assert(false);
      });
    });
    return describe('Other nested', function() {
      it('is also successful', function() {
        return assert(true);
      });
      return it('is successful\t\nwith\' []()"&%', function() {
        return assert(true);
      });
    });
  });

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL1VzZXJzL2J6aXR0bGF1Ly5hdG9tL3BhY2thZ2VzL21vY2hhLXRlc3QtcnVubmVyL3Rlc3Qvc2FtcGxlLXRlc3QuY29mZmVlIgogIF0sCiAgIm5hbWVzIjogW10sCiAgIm1hcHBpbmdzIjogIkFBQ0E7QUFBQSxNQUFBLE1BQUE7O0FBQUEsRUFBQSxNQUFBLEdBQVMsT0FBQSxDQUFRLFFBQVIsQ0FBVCxDQUFBOztBQUFBLEVBRUEsUUFBQSxDQUFTLG9CQUFULEVBQStCLFNBQUEsR0FBQTtBQUU3QixJQUFBLFFBQUEsQ0FBUyxpQkFBVCxFQUE0QixTQUFBLEdBQUE7QUFFMUIsTUFBQSxFQUFBLENBQUcsZUFBSCxFQUFvQixTQUFBLEdBQUE7ZUFDbEIsTUFBQSxDQUFPLElBQVAsRUFEa0I7TUFBQSxDQUFwQixDQUFBLENBQUE7YUFHQSxFQUFBLENBQUcsT0FBSCxFQUFZLFNBQUEsR0FBQTtlQUNWLE1BQUEsQ0FBTyxLQUFQLEVBRFU7TUFBQSxDQUFaLEVBTDBCO0lBQUEsQ0FBNUIsQ0FBQSxDQUFBO1dBUUEsUUFBQSxDQUFTLGNBQVQsRUFBeUIsU0FBQSxHQUFBO0FBRXZCLE1BQUEsRUFBQSxDQUFHLG9CQUFILEVBQXlCLFNBQUEsR0FBQTtlQUN2QixNQUFBLENBQU8sSUFBUCxFQUR1QjtNQUFBLENBQXpCLENBQUEsQ0FBQTthQUdBLEVBQUEsQ0FBRyxpQ0FBSCxFQUFzQyxTQUFBLEdBQUE7ZUFDcEMsTUFBQSxDQUFPLElBQVAsRUFEb0M7TUFBQSxDQUF0QyxFQUx1QjtJQUFBLENBQXpCLEVBVjZCO0VBQUEsQ0FBL0IsQ0FGQSxDQUFBO0FBQUEiCn0=

//# sourceURL=/Users/bzittlau/.atom/packages/mocha-test-runner/test/sample-test.coffee
