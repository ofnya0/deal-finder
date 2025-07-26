// scoreParcel.test.js

const scoreParcel = require('../src/utils/scoreParcel');

describe('scoreParcel', () => {
  it('should score a flat, LMR parcel with good frontage and no constraints', () => {
    const mockParcel = {
      zone: 'LMR',
      frontage: 11,
      slope: 4,
      overlays: [],
      floodZone: false,
      heritageListed: false
    };
    expect(scoreParcel(mockParcel)).toBe(20);
  });

  it('should apply overlay and flood penalties correctly', () => {
    const mockParcel = {
      zone: 'MDR',
      frontage: 8,
      slope: 6,
      overlays: ['character'],
      floodZone: true,
      heritageListed: false
    };
    expect(scoreParcel(mockParcel)).toBe(4); // +5 +2 +2 -5 -5 = 4
  });

  it('should penalize steep slope and poor zoning', () => {
    const mockParcel = {
      zone: 'CR',
      frontage: 6,
      slope: 16,
      overlays: [],
      floodZone: false,
      heritageListed: true
    };
    expect(scoreParcel(mockParcel)).toBe(-20); // -5 +0 -5 -0 -0 -10 = -20
  });
});
