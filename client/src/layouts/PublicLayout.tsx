import { Link } from '@tanstack/react-router';
import { useAuthStore } from '@/store/auth.store';

interface Props {
  children: React.ReactNode;
}

export function PublicLayout({ children }: Props) {
  const { isAuthenticated } = useAuthStore();

  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b bg-white sticky top-0 z-10">
        <div className="container flex h-14 items-center justify-between">
          <Link to="/" className="text-lg font-bold text-primary">
            FullStack App
          </Link>
          <nav className="flex items-center gap-4">
            {isAuthenticated ? (
              <Link
                to="/dashboard"
                className="text-sm font-medium text-primary hover:underline"
              >
                Dashboard
              </Link>
            ) : (
              <>
                <Link to="/login" className="text-sm font-medium hover:underline">
                  Login
                </Link>
                <Link
                  to="/register"
                  className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary/90"
                >
                  Register
                </Link>
              </>
            )}
          </nav>
        </div>
      </header>

      <main className="flex-1">{children}</main>

      <footer className="border-t py-4 text-center text-sm text-muted-foreground">
        © {new Date().getFullYear()} FullStack App
      </footer>
    </div>
  );
}
