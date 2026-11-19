import { describe, it, expect } from 'vitest';
import { equalWidthBins, equalFrequencyBins } from '../binning';

describe('Binning', () => {
  it('equalWidthBins(min=100, max=700, k=3) returns [[100, 300], [300, 500], [500, 700]]', () => {
    const bins = equalWidthBins(100, 700, 3);
    expect(bins).toEqual([
      [100, 300],
      [300, 500],
      [500, 700],
    ]);
  });

  it('equalFrequencyBins splits 12 sorted values into 3 bins of 4 items each', () => {
    const values = [5, 10, 11, 13, 15, 35, 50, 55, 72, 92, 204, 215];
    const bins = equalFrequencyBins(values, 3);
    expect(bins).toHaveLength(3);
    expect(bins[0]).toHaveLength(4);
    expect(bins[1]).toHaveLength(4);
    expect(bins[2]).toHaveLength(4);
    expect(bins[0]).toEqual([5, 10, 11, 13]);
    expect(bins[1]).toEqual([15, 35, 50, 55]);
    expect(bins[2]).toEqual([72, 92, 204, 215]);
  });
});
