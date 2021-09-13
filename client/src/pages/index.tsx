import type { NextPage } from 'next';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Index } from '../components/pages/Index';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

export const Home: NextPage = () => (
  <QueryClientProvider client={queryClient}>
    <Index />
  </QueryClientProvider>
);

// eslint-disable-next-line import/no-default-export
export default Home;
