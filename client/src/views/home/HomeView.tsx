import { Link } from '@tanstack/react-router';
import { Shield, Users, BarChart3 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function HomeView() {
  return (
    <div className="container py-16">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold tracking-tight mb-4">Fullstack Boilerplate</h1>
        <p className="text-xl text-muted-foreground mb-8">
          React + NestJS + PostgreSQL — Role-based Access Control
        </p>
        <div className="flex justify-center gap-4">
          <Button asChild size="lg">
            <Link to="/login">Get Started</Link>
          </Button>
          <Button variant="outline" size="lg" asChild>
            <Link to="/register">Register</Link>
          </Button>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <Shield className="h-8 w-8 text-primary mb-2" />
            <CardTitle>Admin</CardTitle>
          </CardHeader>
          <CardContent className="text-muted-foreground">
            Full access to all routes, user management, and system settings.
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <BarChart3 className="h-8 w-8 text-primary mb-2" />
            <CardTitle>Manager</CardTitle>
          </CardHeader>
          <CardContent className="text-muted-foreground">
            Access to reports, team overview, and manager dashboard.
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <Users className="h-8 w-8 text-primary mb-2" />
            <CardTitle>User</CardTitle>
          </CardHeader>
          <CardContent className="text-muted-foreground">
            Personal dashboard with profile management.
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
