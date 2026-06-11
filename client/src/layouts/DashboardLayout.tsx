import { Sidebar } from '@/components/Sidebar';

interface Props {
  children: React.ReactNode;
}

export function DashboardLayout({ children }: Props) {
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <main className="flex-1 overflow-y-auto bg-muted/10 p-6">{children}</main>
    </div>
  );
}
