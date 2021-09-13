import { currencyFormatter } from '.';

describe('Utils', () => {
  describe('currencyFormatter', () => {
    it('should format the number in gbp currency', () => {
      expect(currencyFormatter(3000)).toEqual('£3,000.00');
    });
  });
});
