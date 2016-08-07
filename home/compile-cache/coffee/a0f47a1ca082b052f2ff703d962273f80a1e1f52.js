(function() {
  var RspecView;

  RspecView = require('../lib/rspec-view');

  describe("RspecView", function() {
    beforeEach(function() {
      return this.rspecView = new RspecView('example_spec.rb');
    });
    return describe('addOutput', function() {
      it('adds output', function() {
        this.rspecView.addOutput('foo');
        return expect(this.rspecView.output.html()).toBe('foo');
      });
      return it('corectly formats complex output', function() {
        var output;
        output = '[31m# ./foo/bar_spec.rb:123:in `block (3 levels) in <top (required)>[0m';
        this.rspecView.addOutput(output);
        return expect(this.rspecView.output.html()).toBe('<p class="rspec-color tty-31">' + '# <a href="./foo/bar_spec.rb" data-line="123" data-file="./foo/bar_spec.rb">' + './foo/bar_spec.rb:123' + '</a>' + ':in `block (3 levels) in &lt;top (required)&gt;' + '</p>');
      });
    });
  });

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL1VzZXJzL2J6aXR0bGF1Ly5hdG9tL3BhY2thZ2VzL3JzcGVjL3NwZWMvcnNwZWMtdmlldy1zcGVjLmNvZmZlZSIKICBdLAogICJuYW1lcyI6IFtdLAogICJtYXBwaW5ncyI6ICJBQUFBO0FBQUEsTUFBQSxTQUFBOztBQUFBLEVBQUEsU0FBQSxHQUFZLE9BQUEsQ0FBUSxtQkFBUixDQUFaLENBQUE7O0FBQUEsRUFFQSxRQUFBLENBQVMsV0FBVCxFQUFzQixTQUFBLEdBQUE7QUFDcEIsSUFBQSxVQUFBLENBQVcsU0FBQSxHQUFBO2FBQ1QsSUFBQyxDQUFBLFNBQUQsR0FBaUIsSUFBQSxTQUFBLENBQVUsaUJBQVYsRUFEUjtJQUFBLENBQVgsQ0FBQSxDQUFBO1dBR0EsUUFBQSxDQUFTLFdBQVQsRUFBc0IsU0FBQSxHQUFBO0FBQ3BCLE1BQUEsRUFBQSxDQUFHLGFBQUgsRUFBa0IsU0FBQSxHQUFBO0FBQ2hCLFFBQUEsSUFBQyxDQUFBLFNBQVMsQ0FBQyxTQUFYLENBQXFCLEtBQXJCLENBQUEsQ0FBQTtlQUNBLE1BQUEsQ0FBTyxJQUFDLENBQUEsU0FBUyxDQUFDLE1BQU0sQ0FBQyxJQUFsQixDQUFBLENBQVAsQ0FBZ0MsQ0FBQyxJQUFqQyxDQUFzQyxLQUF0QyxFQUZnQjtNQUFBLENBQWxCLENBQUEsQ0FBQTthQUlBLEVBQUEsQ0FBRyxpQ0FBSCxFQUFzQyxTQUFBLEdBQUE7QUFDcEMsWUFBQSxNQUFBO0FBQUEsUUFBQSxNQUFBLEdBQVMseUVBQVQsQ0FBQTtBQUFBLFFBQ0EsSUFBQyxDQUFBLFNBQVMsQ0FBQyxTQUFYLENBQXFCLE1BQXJCLENBREEsQ0FBQTtlQUVBLE1BQUEsQ0FBTyxJQUFDLENBQUEsU0FBUyxDQUFDLE1BQU0sQ0FBQyxJQUFsQixDQUFBLENBQVAsQ0FBZ0MsQ0FBQyxJQUFqQyxDQUFzQyxnQ0FBQSxHQUNwQyw4RUFEb0MsR0FFcEMsdUJBRm9DLEdBR3BDLE1BSG9DLEdBSXBDLGlEQUpvQyxHQUtwQyxNQUxGLEVBSG9DO01BQUEsQ0FBdEMsRUFMb0I7SUFBQSxDQUF0QixFQUpvQjtFQUFBLENBQXRCLENBRkEsQ0FBQTtBQUFBIgp9

//# sourceURL=/Users/bzittlau/.atom/packages/rspec/spec/rspec-view-spec.coffee
