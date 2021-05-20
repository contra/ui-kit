/**
 * This snapshot test is here to make sure we are intentional
 * about any updates to this file.
 *
 * 1. Did the format change? If so did we fix how that effects things down stream?
 * 2. Text style changes or removal need treated like a BREAKING change.
 */

import { textStyles } from '../textStyles';

describe('textStyles', () => {
  it('should match snapshot', () => {
    expect(textStyles).toMatchSnapshot();
  });
});
