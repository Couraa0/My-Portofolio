import { Navigate } from 'react-router-dom';
import { ReactNode } from 'react';

interface AdminGuardProps {
  children: ReactNode;
}

export default function AdminGuard({ children }: AdminGuardProps) {
  const isAuthenticated = localStorage.getItem('admin_authenticated') === 'true';

  if (!isAuthenticated) {
    return <Navigate to="/admin" replace />;
  }

  return <>{children}</>;
}
