require ('./spec-helper');

const {cartesianToAngle, polarToCartesian} = require('../js/polar');

describe('cartesianToAngle', () => {
  it('is positive on axes', () => {
    expect(cartesianToAngle(0, 1)).toEqual(0);
    expect(cartesianToAngle(1, 0)).toEqual(Math.PI / 2);
    expect(cartesianToAngle(0, -1)).toEqual(Math.PI);
    expect(cartesianToAngle(-1, 0)).toEqual(3 * Math.PI / 2);
  });

  it('is positive in quadrant 1', () => {
    expect(cartesianToAngle(1, 1)).toEqual(Math.PI / 4);
  });


  it('is positive in quadrant 2', () => {
    expect(cartesianToAngle(1, -1)).toEqual(3 * Math.PI / 4);
  });


  it('is positive in quadrant 3', () => {
    expect(cartesianToAngle(-1, -1)).toEqual(5 * Math.PI / 4);
  });

  it('is positive in quadrant 4', () => {
    expect(cartesianToAngle(-1, 1)).toEqual(7 * Math.PI / 4);
  })
});

