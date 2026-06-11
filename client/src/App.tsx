import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AppRouter } from './routes/AppRouter';
import { useInitAuth } from './hooks/useInitAuth';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      staleTime: 1000 * 60, // 1 minute
    },
  },
});

function AuthInit({ children }: { children: React.ReactNode }) {
  useInitAuth(); // silently refresh token on mount
  return <>{children}</>;
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthInit>
        <AppRouter />
      </AuthInit>
    </QueryClientProvider>
  );
}
