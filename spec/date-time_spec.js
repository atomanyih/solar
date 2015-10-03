const DateTime = require('../js/date-time');

describe('DateTime', () => {
  describe('#toAngle', () => {
    it('is 0 at 12 midnight', () => {
      const date = new DateTime(new Date(1995, 11, 17, 0, 0, 0));

      expect(date.toAngle()).toEqual(0);
    });
  });
});
