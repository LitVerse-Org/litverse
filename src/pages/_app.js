import '../styles/globals.css';
import 'font-awesome/css/font-awesome.min.css';
import { SessionProvider } from 'next-auth/react';
import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient();

function MyApp({ Component, pageProps: { session, ...pageProps }, }) {
  return (
      <SessionProvider session={session}>
        <QueryClientProvider client = {queryClient}>
        <Component {...pageProps} />
        </QueryClientProvider>
      </SessionProvider>
  );
}

export default MyApp;
