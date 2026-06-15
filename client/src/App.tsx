import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RouterProvider } from '@tanstack/react-router';
import { router } from './router';
import { useInitAuth } from './hooks/useInitAuth';
import { useAuthStore } from './store/auth.store';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      staleTime: 1000 * 60, // 1 minute
    },
  },
});

export default function App() {
  useInitAuth(); // silently refresh token on mount

  const { isAuthenticated, user, isLoading } = useAuthStore();

  // Block rendering until the silent refresh attempt finishes,
  // so beforeLoad guards see the correct auth state.
  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    );
  }

  return (
    <QueryClientProvider client={queryClient}>
      {/* Auth state được bơm vào router context — beforeLoad guards đọc từ đây */}
      <RouterProvider router={router} context={{ auth: { isAuthed: isAuthenticated, user } }} />
    </QueryClientProvider>
  );
}
