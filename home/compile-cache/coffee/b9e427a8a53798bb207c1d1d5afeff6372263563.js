(function() {
  var Point, fits, getGuides, gs, its, statesAboveVisible, statesBelowVisible, toGuides, uniq;

  gs = require('../lib/guides');

  toGuides = gs.toGuides, uniq = gs.uniq, statesAboveVisible = gs.statesAboveVisible, statesBelowVisible = gs.statesBelowVisible, getGuides = gs.getGuides;

  Point = require('atom').Point;

  its = function(f) {
    return it(f.toString(), f);
  };

  fits = function(f) {
    return fit(f.toString(), f);
  };

  describe("toGuides", function() {
    var guides;
    guides = null;
    describe("step-by-step indent", function() {
      beforeEach(function() {
        return guides = toGuides([0, 1, 2, 2, 1, 2, 1, 0], []);
      });
      its(function() {
        return expect(guides.length).toBe(3);
      });
      its(function() {
        return expect(guides[0].length).toBe(6);
      });
      its(function() {
        return expect(guides[0].point).toEqual(new Point(1, 0));
      });
      its(function() {
        return expect(guides[1].length).toBe(2);
      });
      its(function() {
        return expect(guides[1].point).toEqual(new Point(2, 1));
      });
      its(function() {
        return expect(guides[2].length).toBe(1);
      });
      return its(function() {
        return expect(guides[2].point).toEqual(new Point(5, 1));
      });
    });
    describe("steep indent", function() {
      beforeEach(function() {
        return guides = toGuides([0, 3, 2, 1, 0], []);
      });
      its(function() {
        return expect(guides.length).toBe(3);
      });
      its(function() {
        return expect(guides[0].length).toBe(3);
      });
      its(function() {
        return expect(guides[0].point).toEqual(new Point(1, 0));
      });
      its(function() {
        return expect(guides[1].length).toBe(2);
      });
      its(function() {
        return expect(guides[1].point).toEqual(new Point(1, 1));
      });
      its(function() {
        return expect(guides[2].length).toBe(1);
      });
      return its(function() {
        return expect(guides[2].point).toEqual(new Point(1, 2));
      });
    });
    describe("steep dedent", function() {
      guides = null;
      beforeEach(function() {
        return guides = toGuides([0, 1, 2, 3, 0], []);
      });
      its(function() {
        return expect(guides.length).toBe(3);
      });
      its(function() {
        return expect(guides[0].length).toBe(3);
      });
      its(function() {
        return expect(guides[0].point).toEqual(new Point(1, 0));
      });
      its(function() {
        return expect(guides[1].length).toBe(2);
      });
      its(function() {
        return expect(guides[1].point).toEqual(new Point(2, 1));
      });
      its(function() {
        return expect(guides[2].length).toBe(1);
      });
      return its(function() {
        return expect(guides[2].point).toEqual(new Point(3, 2));
      });
    });
    describe("recurring indent", function() {
      guides = null;
      beforeEach(function() {
        return guides = toGuides([0, 1, 1, 0, 1, 0], []);
      });
      its(function() {
        return expect(guides.length).toBe(2);
      });
      its(function() {
        return expect(guides[0].length).toBe(2);
      });
      its(function() {
        return expect(guides[0].point).toEqual(new Point(1, 0));
      });
      its(function() {
        return expect(guides[1].length).toBe(1);
      });
      return its(function() {
        return expect(guides[1].point).toEqual(new Point(4, 0));
      });
    });
    describe("no indent", function() {
      guides = null;
      beforeEach(function() {
        return guides = toGuides([0, 0, 0], []);
      });
      return its(function() {
        return expect(guides.length).toBe(0);
      });
    });
    describe("same indent", function() {
      guides = null;
      beforeEach(function() {
        return guides = toGuides([1, 1, 1], []);
      });
      its(function() {
        return expect(guides.length).toBe(1);
      });
      its(function() {
        return expect(guides[0].length).toBe(3);
      });
      return its(function() {
        return expect(guides[0].point).toEqual(new Point(0, 0));
      });
    });
    describe("stack and active", function() {
      describe("simple", function() {
        beforeEach(function() {
          return guides = toGuides([1, 2, 2, 1, 2, 1, 0], [2]);
        });
        its(function() {
          return expect(guides[0].stack).toBe(true);
        });
        its(function() {
          return expect(guides[0].active).toBe(false);
        });
        its(function() {
          return expect(guides[1].stack).toBe(true);
        });
        its(function() {
          return expect(guides[1].active).toBe(true);
        });
        its(function() {
          return expect(guides[2].stack).toBe(false);
        });
        return its(function() {
          return expect(guides[2].active).toBe(false);
        });
      });
      describe("cursor not on deepest", function() {
        beforeEach(function() {
          return guides = toGuides([1, 2, 1], [0]);
        });
        its(function() {
          return expect(guides[0].stack).toBe(true);
        });
        its(function() {
          return expect(guides[0].active).toBe(true);
        });
        its(function() {
          return expect(guides[1].stack).toBe(false);
        });
        return its(function() {
          return expect(guides[1].active).toBe(false);
        });
      });
      describe("no cursor", function() {
        beforeEach(function() {
          return guides = toGuides([1, 2, 1], []);
        });
        its(function() {
          return expect(guides[0].stack).toBe(false);
        });
        its(function() {
          return expect(guides[0].active).toBe(false);
        });
        its(function() {
          return expect(guides[1].stack).toBe(false);
        });
        return its(function() {
          return expect(guides[1].active).toBe(false);
        });
      });
      return describe("multiple cursors", function() {
        beforeEach(function() {
          return guides = toGuides([1, 2, 1, 2, 0, 1], [1, 2]);
        });
        its(function() {
          return expect(guides[0].stack).toBe(true);
        });
        its(function() {
          return expect(guides[0].active).toBe(true);
        });
        its(function() {
          return expect(guides[1].stack).toBe(true);
        });
        its(function() {
          return expect(guides[1].active).toBe(true);
        });
        its(function() {
          return expect(guides[2].stack).toBe(false);
        });
        its(function() {
          return expect(guides[2].active).toBe(false);
        });
        its(function() {
          return expect(guides[3].stack).toBe(false);
        });
        return its(function() {
          return expect(guides[3].active).toBe(false);
        });
      });
    });
    describe("empty lines", function() {
      describe("between the same indents", function() {
        beforeEach(function() {
          return guides = toGuides([1, null, 1], []);
        });
        its(function() {
          return expect(guides.length).toBe(1);
        });
        its(function() {
          return expect(guides[0].length).toBe(3);
        });
        return its(function() {
          return expect(guides[0].point).toEqual(new Point(0, 0));
        });
      });
      describe("starts with a null", function() {
        beforeEach(function() {
          return guides = toGuides([null, 1], []);
        });
        its(function() {
          return expect(guides.length).toBe(1);
        });
        its(function() {
          return expect(guides[0].length).toBe(2);
        });
        return its(function() {
          return expect(guides[0].point).toEqual(new Point(0, 0));
        });
      });
      describe("starts with nulls", function() {
        beforeEach(function() {
          return guides = toGuides([null, null, 1], []);
        });
        its(function() {
          return expect(guides.length).toBe(1);
        });
        its(function() {
          return expect(guides[0].length).toBe(3);
        });
        return its(function() {
          return expect(guides[0].point).toEqual(new Point(0, 0));
        });
      });
      describe("ends with a null", function() {
        beforeEach(function() {
          return guides = toGuides([1, null], []);
        });
        its(function() {
          return expect(guides.length).toBe(1);
        });
        its(function() {
          return expect(guides[0].length).toBe(1);
        });
        return its(function() {
          return expect(guides[0].point).toEqual(new Point(0, 0));
        });
      });
      describe("ends with nulls", function() {
        beforeEach(function() {
          return guides = toGuides([1, null, null], []);
        });
        its(function() {
          return expect(guides.length).toBe(1);
        });
        its(function() {
          return expect(guides[0].length).toBe(1);
        });
        return its(function() {
          return expect(guides[0].point).toEqual(new Point(0, 0));
        });
      });
      describe("large to small", function() {
        beforeEach(function() {
          return guides = toGuides([2, null, 1], []);
        });
        its(function() {
          return expect(guides.length).toBe(2);
        });
        its(function() {
          return expect(guides[0].length).toBe(3);
        });
        its(function() {
          return expect(guides[0].point).toEqual(new Point(0, 0));
        });
        its(function() {
          return expect(guides[1].length).toBe(1);
        });
        return its(function() {
          return expect(guides[1].point).toEqual(new Point(0, 1));
        });
      });
      describe("small to large", function() {
        beforeEach(function() {
          return guides = toGuides([1, null, 2], []);
        });
        its(function() {
          return expect(guides.length).toBe(2);
        });
        its(function() {
          return expect(guides[0].length).toBe(3);
        });
        its(function() {
          return expect(guides[0].point).toEqual(new Point(0, 0));
        });
        its(function() {
          return expect(guides[1].length).toBe(2);
        });
        return its(function() {
          return expect(guides[1].point).toEqual(new Point(1, 1));
        });
      });
      return describe("continuous", function() {
        beforeEach(function() {
          return guides = toGuides([1, null, null, 1], []);
        });
        its(function() {
          return expect(guides.length).toBe(1);
        });
        its(function() {
          return expect(guides[0].length).toBe(4);
        });
        return its(function() {
          return expect(guides[0].point).toEqual(new Point(0, 0));
        });
      });
    });
    return describe("incomplete indent", function() {
      guides = null;
      beforeEach(function() {
        return guides = toGuides([1, 1.5, 1], []);
      });
      its(function() {
        return expect(guides.length).toBe(1);
      });
      its(function() {
        return expect(guides[0].length).toBe(3);
      });
      return its(function() {
        return expect(guides[0].point).toEqual(new Point(0, 0));
      });
    });
  });

  describe("uniq", function() {
    its(function() {
      return expect(uniq([1, 1, 1, 2, 2, 3, 3])).toEqual([1, 2, 3]);
    });
    its(function() {
      return expect(uniq([1, 1, 2])).toEqual([1, 2]);
    });
    its(function() {
      return expect(uniq([1, 2])).toEqual([1, 2]);
    });
    its(function() {
      return expect(uniq([1, 1])).toEqual([1]);
    });
    its(function() {
      return expect(uniq([1])).toEqual([1]);
    });
    return its(function() {
      return expect(uniq([])).toEqual([]);
    });
  });

  describe("statesAboveVisible", function() {
    var getLastRow, getRowIndents, guides, rowIndents, run;
    run = statesAboveVisible;
    guides = null;
    rowIndents = null;
    getRowIndents = function(r) {
      return rowIndents[r];
    };
    getLastRow = function() {
      return rowIndents.length - 1;
    };
    describe("only stack", function() {
      beforeEach(function() {
        rowIndents = [0, 1, 2, 3, 2, 3];
        return guides = run([3], 4, getRowIndents, getLastRow());
      });
      its(function() {
        return expect(guides.stack).toEqual([0, 1]);
      });
      return its(function() {
        return expect(guides.active).toEqual([]);
      });
    });
    describe("active and stack", function() {
      beforeEach(function() {
        rowIndents = [0, 1, 2, 2, 2, 3];
        return guides = run([3], 4, getRowIndents, getLastRow());
      });
      its(function() {
        return expect(guides.stack).toEqual([0, 1]);
      });
      return its(function() {
        return expect(guides.active).toEqual([1]);
      });
    });
    describe("cursor on null row", function() {
      beforeEach(function() {
        rowIndents = [0, 1, 2, null, 2, 3];
        return guides = run([3], 4, getRowIndents, getLastRow());
      });
      its(function() {
        return expect(guides.stack).toEqual([0, 1]);
      });
      return its(function() {
        return expect(guides.active).toEqual([1]);
      });
    });
    describe("continuous nulls", function() {
      beforeEach(function() {
        rowIndents = [0, 1, 2, null, null, 3];
        return guides = run([3], 4, getRowIndents, getLastRow());
      });
      its(function() {
        return expect(guides.stack).toEqual([0, 1, 2]);
      });
      return its(function() {
        return expect(guides.active).toEqual([2]);
      });
    });
    describe("no effect", function() {
      beforeEach(function() {
        rowIndents = [0, 1, 2, 0, 1, 3];
        return guides = run([2], 4, getRowIndents, getLastRow());
      });
      its(function() {
        return expect(guides.stack).toEqual([]);
      });
      return its(function() {
        return expect(guides.active).toEqual([]);
      });
    });
    describe("no rows", function() {
      beforeEach(function() {
        rowIndents = [];
        return guides = run([], -1, getRowIndents, getLastRow());
      });
      its(function() {
        return expect(guides.stack).toEqual([]);
      });
      return its(function() {
        return expect(guides.active).toEqual([]);
      });
    });
    describe("no rows above", function() {
      beforeEach(function() {
        rowIndents = [0];
        return guides = run([], -1, getRowIndents, getLastRow());
      });
      its(function() {
        return expect(guides.stack).toEqual([]);
      });
      return its(function() {
        return expect(guides.active).toEqual([]);
      });
    });
    describe("multiple cursors", function() {
      beforeEach(function() {
        rowIndents = [0, 1, 2, 3, 2, 3];
        return guides = run([2, 3], 4, getRowIndents, getLastRow());
      });
      its(function() {
        return expect(guides.stack).toEqual([0, 1]);
      });
      return its(function() {
        return expect(guides.active).toEqual([1]);
      });
    });
    describe("multiple cursors 2", function() {
      beforeEach(function() {
        rowIndents = [0, 1, 2, 3, 2, 3];
        return guides = run([1, 2], 4, getRowIndents, getLastRow());
      });
      its(function() {
        return expect(guides.stack).toEqual([0, 1]);
      });
      return its(function() {
        return expect(guides.active).toEqual([0, 1]);
      });
    });
    return describe("multiple cursors on the same level", function() {
      beforeEach(function() {
        rowIndents = [0, 1, 2, 3, 2, 3];
        return guides = run([2, 4], 4, getRowIndents, getLastRow());
      });
      its(function() {
        return expect(guides.stack).toEqual([0, 1]);
      });
      return its(function() {
        return expect(guides.active).toEqual([1]);
      });
    });
  });

  describe("statesBelowVisible", function() {
    var getLastRow, getRowIndents, guides, rowIndents, run;
    run = statesBelowVisible;
    guides = null;
    rowIndents = null;
    getRowIndents = function(r) {
      return rowIndents[r];
    };
    getLastRow = function() {
      return rowIndents.length - 1;
    };
    describe("only stack", function() {
      beforeEach(function() {
        rowIndents = [3, 2, 3, 2, 1, 0];
        return guides = run([2], 1, getRowIndents, getLastRow());
      });
      its(function() {
        return expect(guides.stack).toEqual([0, 1]);
      });
      return its(function() {
        return expect(guides.active).toEqual([]);
      });
    });
    describe("active and stack", function() {
      beforeEach(function() {
        rowIndents = [3, 2, 2, 2, 1, 0];
        return guides = run([2], 1, getRowIndents, getLastRow());
      });
      its(function() {
        return expect(guides.stack).toEqual([0, 1]);
      });
      return its(function() {
        return expect(guides.active).toEqual([1]);
      });
    });
    describe("cursor on null row", function() {
      beforeEach(function() {
        rowIndents = [3, 2, null, 2, 1, 0];
        return guides = run([2], 1, getRowIndents, getLastRow());
      });
      its(function() {
        return expect(guides.stack).toEqual([0, 1]);
      });
      return its(function() {
        return expect(guides.active).toEqual([1]);
      });
    });
    describe("continuous nulls", function() {
      beforeEach(function() {
        rowIndents = [3, null, null, 2];
        return guides = run([1], 1, getRowIndents, getLastRow());
      });
      its(function() {
        return expect(guides.stack).toEqual([0, 1]);
      });
      return its(function() {
        return expect(guides.active).toEqual([1]);
      });
    });
    describe("no effect", function() {
      beforeEach(function() {
        rowIndents = [3, 0, 1, 0];
        return guides = run([3], 4, getRowIndents, getLastRow());
      });
      its(function() {
        return expect(guides.stack).toEqual([]);
      });
      return its(function() {
        return expect(guides.active).toEqual([]);
      });
    });
    describe("no rows", function() {
      beforeEach(function() {
        rowIndents = [];
        return guides = run([], -1, getRowIndents, getLastRow());
      });
      its(function() {
        return expect(guides.stack).toEqual([]);
      });
      return its(function() {
        return expect(guides.active).toEqual([]);
      });
    });
    describe("no rows below", function() {
      beforeEach(function() {
        rowIndents = [0];
        return guides = run([], 1, getRowIndents, getLastRow());
      });
      its(function() {
        return expect(guides.stack).toEqual([]);
      });
      return its(function() {
        return expect(guides.active).toEqual([]);
      });
    });
    describe("multiple cursors", function() {
      beforeEach(function() {
        rowIndents = [3, 2, 3, 2, 1, 0];
        return guides = run([2, 3], 1, getRowIndents, getLastRow());
      });
      its(function() {
        return expect(guides.stack).toEqual([0, 1]);
      });
      return its(function() {
        return expect(guides.active).toEqual([1]);
      });
    });
    describe("multiple cursors 2", function() {
      beforeEach(function() {
        rowIndents = [3, 2, 3, 2, 1, 0];
        return guides = run([3, 4], 1, getRowIndents, getLastRow());
      });
      its(function() {
        return expect(guides.stack).toEqual([0, 1]);
      });
      return its(function() {
        return expect(guides.active).toEqual([0, 1]);
      });
    });
    return describe("multiple cursors on the same level", function() {
      beforeEach(function() {
        rowIndents = [3, 2, 3, 2, 1, 0];
        return guides = run([1, 3], 1, getRowIndents, getLastRow());
      });
      its(function() {
        return expect(guides.stack).toEqual([0, 1]);
      });
      return its(function() {
        return expect(guides.active).toEqual([1]);
      });
    });
  });

  describe("getGuides", function() {
    var getLastRow, getRowIndents, guides, rowIndents, run;
    run = getGuides;
    guides = null;
    rowIndents = null;
    getRowIndents = function(r) {
      return rowIndents[r];
    };
    getLastRow = function() {
      return rowIndents.length - 1;
    };
    describe("typical", function() {
      beforeEach(function() {
        rowIndents = [0, 1, 2, 2, 3, 0, 1, 2, 0, 1, 1, 0];
        return guides = run(3, 9, getLastRow(), [2, 6, 10], getRowIndents);
      });
      its(function() {
        return expect(guides.length).toBe(6);
      });
      its(function() {
        return expect(guides[0].length).toBe(2);
      });
      its(function() {
        return expect(guides[0].point).toEqual(new Point(0, 0));
      });
      its(function() {
        return expect(guides[0].active).toBe(false);
      });
      its(function() {
        return expect(guides[0].stack).toBe(true);
      });
      its(function() {
        return expect(guides[1].length).toBe(2);
      });
      its(function() {
        return expect(guides[1].point).toEqual(new Point(0, 1));
      });
      its(function() {
        return expect(guides[1].active).toBe(true);
      });
      its(function() {
        return expect(guides[1].stack).toBe(true);
      });
      its(function() {
        return expect(guides[2].length).toBe(1);
      });
      its(function() {
        return expect(guides[2].point).toEqual(new Point(1, 2));
      });
      its(function() {
        return expect(guides[2].active).toBe(false);
      });
      its(function() {
        return expect(guides[2].stack).toBe(false);
      });
      its(function() {
        return expect(guides[3].length).toBe(2);
      });
      its(function() {
        return expect(guides[3].point).toEqual(new Point(3, 0));
      });
      its(function() {
        return expect(guides[3].active).toBe(true);
      });
      its(function() {
        return expect(guides[3].stack).toBe(true);
      });
      its(function() {
        return expect(guides[4].length).toBe(1);
      });
      its(function() {
        return expect(guides[4].point).toEqual(new Point(4, 1));
      });
      its(function() {
        return expect(guides[4].active).toBe(false);
      });
      its(function() {
        return expect(guides[4].stack).toBe(false);
      });
      its(function() {
        return expect(guides[5].length).toBe(1);
      });
      its(function() {
        return expect(guides[5].point).toEqual(new Point(6, 0));
      });
      its(function() {
        return expect(guides[5].active).toBe(true);
      });
      return its(function() {
        return expect(guides[5].stack).toBe(true);
      });
    });
    describe("when last line is null", function() {
      beforeEach(function() {
        rowIndents = [0, 1, 2, 2, 2, null, 2, 0];
        return guides = run(3, 5, getLastRow(), [6], getRowIndents);
      });
      its(function() {
        return expect(guides.length).toBe(2);
      });
      its(function() {
        return expect(guides[0].length).toBe(4);
      });
      its(function() {
        return expect(guides[0].point).toEqual(new Point(0, 0));
      });
      its(function() {
        return expect(guides[0].active).toBe(false);
      });
      its(function() {
        return expect(guides[0].stack).toBe(true);
      });
      its(function() {
        return expect(guides[1].length).toBe(4);
      });
      its(function() {
        return expect(guides[1].point).toEqual(new Point(0, 1));
      });
      its(function() {
        return expect(guides[1].active).toBe(true);
      });
      return its(function() {
        return expect(guides[1].stack).toBe(true);
      });
    });
    describe("when last line is null and the following line is also null", function() {
      beforeEach(function() {
        rowIndents = [0, 1, 2, 2, 2, null, null, 2, 0];
        return guides = run(3, 5, getLastRow(), [7], getRowIndents);
      });
      its(function() {
        return expect(guides.length).toBe(2);
      });
      its(function() {
        return expect(guides[0].length).toBe(5);
      });
      its(function() {
        return expect(guides[0].point).toEqual(new Point(0, 0));
      });
      its(function() {
        return expect(guides[0].active).toBe(false);
      });
      its(function() {
        return expect(guides[0].stack).toBe(true);
      });
      its(function() {
        return expect(guides[1].length).toBe(5);
      });
      its(function() {
        return expect(guides[1].point).toEqual(new Point(0, 1));
      });
      its(function() {
        return expect(guides[1].active).toBe(true);
      });
      return its(function() {
        return expect(guides[1].stack).toBe(true);
      });
    });
    return describe("when last line is null and the cursor doesnt follow", function() {
      beforeEach(function() {
        rowIndents = [0, 1, 2, 2, 2, null, null, 2, 1, 0];
        return guides = run(3, 5, getLastRow(), [8], getRowIndents);
      });
      its(function() {
        return expect(guides.length).toBe(2);
      });
      its(function() {
        return expect(guides[0].length).toBe(5);
      });
      its(function() {
        return expect(guides[0].point).toEqual(new Point(0, 0));
      });
      its(function() {
        return expect(guides[0].active).toBe(true);
      });
      its(function() {
        return expect(guides[0].stack).toBe(true);
      });
      its(function() {
        return expect(guides[1].length).toBe(5);
      });
      its(function() {
        return expect(guides[1].point).toEqual(new Point(0, 1));
      });
      its(function() {
        return expect(guides[1].active).toBe(false);
      });
      return its(function() {
        return expect(guides[1].stack).toBe(false);
      });
    });
  });

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL1VzZXJzL2J6aXR0bGF1Ly5hdG9tL3BhY2thZ2VzL2luZGVudC1ndWlkZS1pbXByb3ZlZC9zcGVjL2d1aWRlcy1zcGVjLmNvZmZlZSIKICBdLAogICJuYW1lcyI6IFtdLAogICJtYXBwaW5ncyI6ICJBQUFBO0FBQUEsTUFBQSx1RkFBQTs7QUFBQSxFQUFBLEVBQUEsR0FBSyxPQUFBLENBQVEsZUFBUixDQUFMLENBQUE7O0FBQUEsRUFDQyxjQUFBLFFBQUQsRUFBVyxVQUFBLElBQVgsRUFBaUIsd0JBQUEsa0JBQWpCLEVBQXFDLHdCQUFBLGtCQUFyQyxFQUF5RCxlQUFBLFNBRHpELENBQUE7O0FBQUEsRUFFQyxRQUFTLE9BQUEsQ0FBUSxNQUFSLEVBQVQsS0FGRCxDQUFBOztBQUFBLEVBS0EsR0FBQSxHQUFNLFNBQUMsQ0FBRCxHQUFBO1dBQ0osRUFBQSxDQUFHLENBQUMsQ0FBQyxRQUFGLENBQUEsQ0FBSCxFQUFpQixDQUFqQixFQURJO0VBQUEsQ0FMTixDQUFBOztBQUFBLEVBUUEsSUFBQSxHQUFPLFNBQUMsQ0FBRCxHQUFBO1dBQ0wsR0FBQSxDQUFJLENBQUMsQ0FBQyxRQUFGLENBQUEsQ0FBSixFQUFrQixDQUFsQixFQURLO0VBQUEsQ0FSUCxDQUFBOztBQUFBLEVBV0EsUUFBQSxDQUFTLFVBQVQsRUFBcUIsU0FBQSxHQUFBO0FBQ25CLFFBQUEsTUFBQTtBQUFBLElBQUEsTUFBQSxHQUFTLElBQVQsQ0FBQTtBQUFBLElBQ0EsUUFBQSxDQUFTLHFCQUFULEVBQWdDLFNBQUEsR0FBQTtBQUM5QixNQUFBLFVBQUEsQ0FBVyxTQUFBLEdBQUE7ZUFDVCxNQUFBLEdBQVMsUUFBQSxDQUFTLENBQUMsQ0FBRCxFQUFJLENBQUosRUFBTyxDQUFQLEVBQVUsQ0FBVixFQUFhLENBQWIsRUFBZ0IsQ0FBaEIsRUFBbUIsQ0FBbkIsRUFBc0IsQ0FBdEIsQ0FBVCxFQUFtQyxFQUFuQyxF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

//# sourceURL=/Users/bzittlau/.atom/packages/indent-guide-improved/spec/guides-spec.coffee
