import { render } from '@testing-library/react';
import { Home } from './index.page';

describe('Home', () => {
  describe('Render properly', () => {
    it('should render the whole page', async () => {
      const { findByRole } = render(<Home />);

      expect(await findByRole('heading', { name: /send money/i })).toBeInTheDocument();
      expect(await findByRole('heading', { name: /my account/i })).toBeInTheDocument();
    });
  });
});
