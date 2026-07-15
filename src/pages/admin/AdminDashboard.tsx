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
} from 'lucide-react';
import { getProjects, getAchievements, getExperiences, getCompetitions, ADMIN_PATH } from '@/lib/supabase';

interface Stats {
  projects: number;
  achievements: number;
  experiences: number;
  competitions: number;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats>({ projects: 0, achievements: 0, experiences: 0, competitions: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [projects, achievements, experiences, competitions] = await Promise.all([
          getProjects(),
          getAchievements(),
          getExperiences(),
          getCompetitions(),
        ]);
        setStats({
          projects: projects.length,
          achievements: achievements.length,
          experiences: experiences.length,
          competitions: competitions.length,
        });
      } catch (err) {
        console.error('Error fetching stats:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
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
              Kelola konten portofolio Anda dari sini — tambah, edit, dan hapus data secara real-time.
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
        <h3 className="section-title">Informasi Database</h3>
        <div className="info-grid">
          <div className="info-item">
            <div className="info-dot info-dot-green" />
            <div>
              <p className="info-label">Database Status</p>
              <p className="info-value">Supabase PostgreSQL — Connected</p>
            </div>
          </div>
          <div className="info-item">
            <div className="info-dot info-dot-blue" />
            <div>
              <p className="info-label">Storage</p>
              <p className="info-value">Supabase Storage (projects, achievements, experiences)</p>
            </div>
          </div>
          <div className="info-item">
            <div className="info-dot info-dot-purple" />
            <div>
              <p className="info-label">Sync Status</p>
              <p className="info-value">Real-time — Data langsung tersimpan ke database</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
