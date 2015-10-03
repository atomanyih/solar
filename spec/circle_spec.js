require('./spec-helper');

const Circle = require('../js/circle');

describe('Circle', () => {
  describe('#getPointAtAngle', () => {
    it('calculates angles clockwise from upwards where upwards is negative y', () => {
      const circle = new Circle({x: 0, y: 0}, 1);

      expect(circle.getPointAtAngle(0)).toBeApproximatelyAt({x: 0, y: -1});

      expect(circle.getPointAtAngle(Math.PI / 2)).toBeApproximatelyAt({x: 1, y: 0});

      expect(circle.getPointAtAngle(Math.PI)).toBeApproximatelyAt({x: 0, y: 1});

      expect(circle.getPointAtAngle(3 * Math.PI / 2)).toBeApproximatelyAt({x: -1, y: 0});
    });
  });

});
