import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/lib/supabase';
import { Eye, EyeOff, Lock, Mail, Shield } from 'lucide-react';

const ADMIN_EMAIL = 'muhammadrakhasyamputra@gmail.com';
const ADMIN_PASSWORD = 'Rakha200505';

export default function AdminLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Simple credential check (no Supabase Auth required)
    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      // Store session in localStorage
      localStorage.setItem('admin_authenticated', 'true');
      localStorage.setItem('admin_email', email);
      navigate('/admin/dashboard');
    } else {
      // Try Supabase Auth as fallback
      try {
        const { error: authError } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (authError) {
          setError('Email atau password salah. Silakan coba lagi.');
        } else {
          localStorage.setItem('admin_authenticated', 'true');
          localStorage.setItem('admin_email', email);
          navigate('/admin/dashboard');
        }
      } catch {
        setError('Email atau password salah. Silakan coba lagi.');
      }
    }
    setLoading(false);
  };

  return (
    <div className="admin-login-page">
      <div className="login-bg">
        <div className="login-orb login-orb-1" />
        <div className="login-orb login-orb-2" />
        <div className="login-orb login-orb-3" />
        <div className="login-grid" />
      </div>

      <div className="login-container">
        <div className="login-card">
          {/* Header */}
          <div className="login-header">
            <div className="login-icon-wrap">
              <Shield size={32} className="login-icon" />
            </div>
            <h1 className="login-title">Admin Dashboard</h1>
            <p className="login-subtitle">Masuk untuk mengelola konten portofolio</p>
          </div>

          {/* Form */}
          <form onSubmit={handleLogin} className="login-form">
            {error && (
              <div className="login-error">
                <span>{error}</span>
              </div>
            )}

            <div className="form-group">
              <label className="form-label">Email</label>
              <div className="input-wrap">
                <Mail size={18} className="input-icon" />
                <input
                  id="admin-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@example.com"
                  className="form-input"
                  required
                  autoComplete="email"
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Password</label>
              <div className="input-wrap">
                <Lock size={18} className="input-icon" />
                <input
                  id="admin-password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="form-input"
                  required
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                  tabIndex={-1}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <button
              id="admin-login-btn"
              type="submit"
              className="login-btn"
              disabled={loading}
            >
              {loading ? (
                <span className="login-spinner" />
              ) : (
                'Masuk ke Dashboard'
              )}
            </button>
          </form>

          <p className="login-footer">
            © 2026 Muhammad Rakha Syam Putra
          </p>
        </div>
      </div>
    </div>
  );
}
