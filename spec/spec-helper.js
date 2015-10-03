const customMatchers = {
  toBeApproximatelyAt() {
    const EPSILON = 0.1;

    function withinTolerance(a, b) {
      console.log(Math.abs(a - b));
      return Math.abs(a - b) < EPSILON;
    }

    return {
      compare(actual, expected) {
        return {
          pass: withinTolerance(actual.x, expected.x) && withinTolerance(actual.y, expected.y)
        };
      }
    }
  }
};

beforeEach(() => {
  jasmine.addMatchers(customMatchers);
});
