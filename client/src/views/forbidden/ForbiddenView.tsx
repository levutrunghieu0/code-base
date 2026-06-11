import { Link } from '@tanstack/react-router';
import { ShieldX } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function ForbiddenView() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 text-center">
      <ShieldX className="h-16 w-16 text-destructive" />
      <h1 className="text-6xl font-bold text-muted-foreground">403</h1>
      <h2 className="text-2xl font-semibold">Access denied</h2>
      <p className="text-muted-foreground">You don't have permission to access this page.</p>
      <Button asChild>
        <Link to="/dashboard">Back to dashboard</Link>
      </Button>
    </div>
  );
}
