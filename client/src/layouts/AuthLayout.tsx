import { Link } from '@tanstack/react-router';

interface Props {
  children: React.ReactNode;
}

export function AuthLayout({ children }: Props) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-muted/30 p-4">
      <Link to="/" className="mb-8 text-2xl font-bold text-primary">
        FullStack App
      </Link>
      <div className="w-full max-w-md">{children}</div>
    </div>
  );
}
