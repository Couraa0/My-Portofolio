import { Navigate } from 'react-router-dom';
import { ReactNode } from 'react';
import { useEffect, useState } from 'react';
import { supabase, ADMIN_PATH } from '@/lib/supabase';
import { logActivity } from '@/lib/logger';

interface AdminGuardProps {
  children: ReactNode;
}

export default function AdminGuard({ children }: AdminGuardProps) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    const checkAuth = async () => {
      // First Check
      const { data: { session } } = await supabase.auth.getSession();
      
      if (session) {
        setIsAuthenticated(true);
        // Fallback for UI elements that still read from localStorage
        localStorage.setItem('admin_authenticated', 'true');
        localStorage.setItem('admin_email', session.user.email || '');
      } else {
        setIsAuthenticated(false);
        localStorage.removeItem('admin_authenticated');
        localStorage.removeItem('admin_email');
      }
    };
    
    checkAuth();

    // Listen to changes (e.g., user gets logged out in another tab)
    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsAuthenticated(!!session);
      if (!session) {
        localStorage.removeItem('admin_authenticated');
        localStorage.removeItem('admin_email');
      }
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  if (isAuthenticated === null) {
    return (
      <div className="min-h-screen bg-[#000000] flex items-center justify-center">
        <div className="w-8 h-8 rounded-full border-2 border-primary border-t-transparent animate-spin" />
      </div>
    );
  }

  if (!isAuthenticated) {
    logActivity({
      category: 'SECURITY',
      level: 'WARNING',
      action: 'Akses Terlarang: Admin Ditolak (Unauthorized)',
      details: 'Pengunjung tanpa sesi aktif mencoba mengakses halaman admin terproteksi',
      page_url: window.location.pathname,
    });
    return <Navigate to={`/${ADMIN_PATH}`} replace />;
  }

  return <>{children}</>;
}

