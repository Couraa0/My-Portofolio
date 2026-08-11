import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  FolderOpen,
  Trophy,
  Briefcase,
  TrendingUp,
  Plus,
  ArrowRight,
  Database,
  Activity,
  BarChart3,
  ScrollText,
} from 'lucide-react';
import { getProjects, getAchievements, getExperiences, getCompetitions, ADMIN_PATH } from '@/lib/supabase';
import { getLogs, type LogEntry } from '@/lib/logger';
import { computeRealAnalyticsMetrics, type AnalyticsSummary } from '@/lib/ga';

interface Stats {
  projects: number;
  achievements: number;
  experiences: number;
  competitions: number;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats>({ projects: 0, achievements: 0, experiences: 0, competitions: 0 });
  const [recentLogs, setRecentLogs] = useState<LogEntry[]>([]);
  const [analyticsMetrics, setAnalyticsMetrics] = useState<AnalyticsSummary>(computeRealAnalyticsMetrics([], '7d'));
  const [loading, setLoading] = useState(true);

  const fetchDashboardData = async () => {
    try {
      const [projects, achievements, experiences, competitions, realLogs] = await Promise.all([
        getProjects(),
        getAchievements(),
        getExperiences(),
        getCompetitions(),
        getLogs(),
      ]);

      setStats({
        projects: projects.length,
        achievements: achievements.length,
        experiences: experiences.length,
        competitions: competitions.length,
      });

      setRecentLogs(realLogs.slice(0, 3));
      setAnalyticsMetrics(computeRealAnalyticsMetrics(realLogs, '7d'));
    } catch (err) {
      console.error('Error fetching dashboard data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();

    // Auto-refresh real-time logs every 4 seconds
    const interval = setInterval(() => {
      fetchDashboardData();
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const cards = [
    {
      label: 'Total Projects',
      value: stats.projects,
      icon: FolderOpen,
      color: 'card-violet',
      link: `/${ADMIN_PATH}/projects`,
      gradient: 'from-violet-500 to-purple-600',
    },
    {
      label: 'Achievements',
      value: stats.achievements,
      icon: Trophy,
      color: 'card-amber',
      link: `/${ADMIN_PATH}/achievements`,
      gradient: 'from-amber-500 to-orange-500',
    },
    {
      label: 'Experiences',
      value: stats.experiences,
      icon: Briefcase,
      color: 'card-emerald',
      link: `/${ADMIN_PATH}/experience`,
      gradient: 'from-emerald-500 to-teal-500',
    },
    {
      label: 'Competitions',
      value: stats.competitions,
      icon: Trophy,
      color: 'card-indigo',
      link: `/${ADMIN_PATH}/competitions`,
      gradient: 'from-indigo-500 to-blue-500',
    },
    {
      label: 'Total Data',
      value: stats.projects + stats.achievements + stats.experiences + stats.competitions,
      icon: Database,
      color: 'card-cyan',
      link: '#',
      gradient: 'from-cyan-500 to-blue-500',
    },
  ];

  const quickActions = [
    { label: 'Tambah Project', to: `/${ADMIN_PATH}/projects`, icon: FolderOpen, color: '#8b5cf6' },
    { label: 'Tambah Achievement', to: `/${ADMIN_PATH}/achievements`, icon: Trophy, color: '#f59e0b' },
    { label: 'Tambah Experience', to: `/${ADMIN_PATH}/experience`, icon: Briefcase, color: '#10b981' },
    { label: 'Tambah Kompetisi', to: `/${ADMIN_PATH}/competitions`, icon: Trophy, color: '#6366f1' },
  ];

  return (
    <div className="dashboard-page">
      {/* Welcome Banner */}
      <div className="dashboard-banner">
        <div className="banner-content">
          <div className="banner-text">
            <h2 className="banner-title">Selamat Datang, Rakha! 👋</h2>
            <p className="banner-subtitle">
              Kelola konten portofolio Anda dari sini — pantau statistik pengunjung real-time dan log aktivitas website.
            </p>
          </div>
          <Activity size={64} className="banner-icon" />
        </div>
      </div>

      {/* Stats Cards */}
      <div className="stats-grid">
        {cards.map((card) => (
          <Link key={card.label} to={card.link} className={`stat-card ${card.color}`}>
            <div className="stat-card-inner">
              <div className="stat-icon-wrap">
                <card.icon size={24} />
              </div>
              <div className="stat-info">
                <p className="stat-label">{card.label}</p>
                <p className="stat-value">
                  {loading ? (
                    <span className="stat-loading" />
                  ) : (
                    card.value
                  )}
                </p>
              </div>
            </div>
            <TrendingUp size={16} className="stat-trend" />
          </Link>
        ))}
      </div>

      {/* Analytics & Activity Logs Overview Grid */}
      <div className="analytics-grid-2">
        {/* Analytics Card Preview */}
        <div className="analytics-card">
          <div className="analytics-card-title">
            <div className="flex items-center gap-2">
              <BarChart3 size={20} className="text-blue-500" />
              <span>Ringkasan Google Analytics (Real)</span>
            </div>
            <Link to={`/${ADMIN_PATH}/analytics`} className="text-xs text-blue-600 font-semibold hover:underline flex items-center gap-1">
              Selengkapnya <ArrowRight size={14} />
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-3 mb-4">
            <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
              <p className="text-xs text-slate-500 mb-1">Pengunjung Aktif</p>
              <div className="flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                <span className="font-bold text-slate-800 text-lg">{analyticsMetrics.activeUsersNow} Realtime</span>
              </div>
            </div>
            <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
              <p className="text-xs text-slate-500 mb-1">Pageviews 7 Hari</p>
              <span className="font-bold text-slate-800 text-lg">{analyticsMetrics.totalPageviews.toLocaleString('id-ID')}</span>
            </div>
          </div>

          <div className="text-xs text-slate-500 bg-blue-50/60 border border-blue-100 p-3 rounded-xl flex items-center justify-between">
            <span>Tracking status: <strong className="text-emerald-600">GA4 Tag Active</strong></span>
            <Link to={`/${ADMIN_PATH}/analytics`} className="btn-admin btn-admin-secondary text-xs py-1 px-2">
              Buka Analytics
            </Link>
          </div>
        </div>

        {/* Website Activity Logs Stream */}
        <div className="analytics-card">
          <div className="analytics-card-title">
            <div className="flex items-center gap-2">
              <ScrollText size={20} className="text-cyan-500" />
              <span>Aktivitas Terbaru Website (Live)</span>
            </div>
            <Link to={`/${ADMIN_PATH}/logs`} className="text-xs text-blue-600 font-semibold hover:underline flex items-center gap-1">
              Lihat Semua Log <ArrowRight size={14} />
            </Link>
          </div>

          <div className="flex flex-col gap-2.5">
            {recentLogs.length === 0 ? (
              <p className="text-xs text-slate-400 py-4 text-center">Belum ada aktivitas yang dicatat.</p>
            ) : (
              recentLogs.map((log) => (
                <div key={log.id} className="flex items-start gap-2 text-xs p-2 rounded-lg bg-slate-50 border border-slate-100">
                  <span
                    className={`px-2 py-0.5 rounded font-bold text-[10px] ${
                      log.level === 'SUCCESS'
                        ? 'bg-emerald-100 text-emerald-700'
                        : log.level === 'WARNING'
                        ? 'bg-amber-100 text-amber-700'
                        : log.level === 'ERROR'
                        ? 'bg-rose-100 text-rose-700'
                        : 'bg-blue-100 text-blue-700'
                    }`}
                  >
                    {log.level}
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-slate-800 margin-0 truncate">{log.action}</p>
                    <p className="text-slate-400 margin-0 text-[11px] truncate">
                      {new Date(log.created_at).toLocaleTimeString('id-ID')} • {log.page_url || '/'}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="dashboard-section">
        <h3 className="section-title">Quick Actions</h3>
        <div className="quick-actions">
          {quickActions.map((action) => (
            <Link key={action.label} to={action.to} className="quick-action-card">
              <div className="quick-action-icon" style={{ background: action.color + '22', color: action.color }}>
                <action.icon size={22} />
              </div>
              <span className="quick-action-label">{action.label}</span>
              <div className="quick-action-plus">
                <Plus size={16} />
              </div>
              <ArrowRight size={16} className="quick-action-arrow" />
            </Link>
          ))}
        </div>
      </div>

      {/* Info Panel */}
      <div className="dashboard-info">
        <h3 className="section-title">Informasi Database & Layanan</h3>
        <div className="info-grid">
          <div className="info-item">
            <div className="info-dot info-dot-green" />
            <div>
              <p className="info-label">Database Status</p>
              <p className="info-value">Supabase PostgreSQL & Real-time Logs — Connected</p>
            </div>
          </div>
          <div className="info-item">
            <div className="info-dot info-dot-blue" />
            <div>
              <p className="info-label">Analytics Integration</p>
              <p className="info-value">Google Analytics (GA4) + Live Telemetry Active</p>
            </div>
          </div>
          <div className="info-item">
            <div className="info-dot info-dot-purple" />
            <div>
              <p className="info-label">Sync Status</p>
              <p className="info-value">Real-time Auto Refresh — Data diperbarui setiap 4 detik</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

