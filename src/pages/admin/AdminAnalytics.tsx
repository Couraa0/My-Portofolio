import { useState, useEffect } from 'react';
import {
  BarChart3,
  Users,
  Eye,
  Clock,
  ExternalLink,
  Save,
  CheckCircle2,
  PieChart as PieIcon,
  TrendingUp,
  Activity,
  Layers,
  Settings,
  RefreshCw,
  Smartphone,
  Globe2,
} from 'lucide-react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import {
  getGAMeasurementId,
  setGAMeasurementId,
  computeRealAnalyticsMetrics,
  type AnalyticsSummary,
} from '@/lib/ga';
import { getLogs, type LogEntry } from '@/lib/logger';
import { toast } from 'sonner';

export default function AdminAnalytics() {
  const [timeRange, setTimeRange] = useState<'7d' | '30d' | '90d'>('7d');
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [metrics, setMetrics] = useState<AnalyticsSummary>(computeRealAnalyticsMetrics([], '7d'));
  const [gaId, setGaId] = useState<string>(getGAMeasurementId());
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [lastSync, setLastSync] = useState<Date>(new Date());
  const [loading, setLoading] = useState(true);

  // Fetch real logs and recompute metrics
  const refreshAnalyticsData = async () => {
    try {
      const realLogs = await getLogs();
      setLogs(realLogs);
      setMetrics(computeRealAnalyticsMetrics(realLogs, timeRange));
      setLastSync(new Date());
    } catch (err) {
      console.error('Error computing analytics:', err);
    } finally {
      setLoading(false);
    }
  };

  // Auto-refresh real-time analytics every 3 seconds
  useEffect(() => {
    refreshAnalyticsData();

    const interval = setInterval(() => {
      refreshAnalyticsData();
    }, 3000);

    return () => clearInterval(interval);
  }, [timeRange]);

  const handleSaveGaId = (e: React.FormEvent) => {
    e.preventDefault();
    setGAMeasurementId(gaId);
    setSavedSuccess(true);
    toast.success('Google Analytics Measurement ID berhasil diperbarui!');
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="analytics-container">
      {/* Top Header Banner */}
      <div className="admin-header-banner">
        <div className="header-banner-content">
          <div className="header-banner-left">
            <div className="header-banner-icon-wrap header-banner-icon-violet">
              <BarChart3 size={24} />
            </div>
            <div>
              <div className="flex items-center gap-2.5 flex-wrap">
                <h2 className="header-banner-title">Google Analytics Dashboard</h2>
                <span className="live-status-pill">
                  <span className="live-status-dot animate-ping"></span>
                  <span className="live-status-dot"></span>
                  Live Realtime Sync
                </span>
              </div>
              <p className="header-banner-subtitle">
                Statistik lalu lintas pengunjung dihitung 100% dari data log website real-time (Sync Terakhir: {lastSync.toLocaleTimeString('id-ID')}).
              </p>
            </div>
          </div>
          <div className="header-banner-actions">
            <button
              onClick={refreshAnalyticsData}
              className="btn-admin btn-admin-secondary"
              title="Muat ulang data analytics"
            >
              <RefreshCw size={16} className={loading ? 'spin' : ''} />
              <span>Refresh</span>
            </button>
            <select
              className="analytics-select"
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value as any)}
            >
              <option value="7d">7 Hari Terakhir</option>
              <option value="30d">30 Hari Terakhir</option>
              <option value="90d">90 Hari Terakhir</option>
            </select>
            <a
              href="https://analytics.google.com"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-admin btn-admin-primary"
              title="Buka Console Google Analytics Resmi"
            >
              <ExternalLink size={16} />
              <span>GA Console</span>
            </a>
          </div>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="stats-grid">
        {/* Realtime Active */}
        <div className="stat-card card-cyan">
          <div className="stat-card-inner">
            <div className="stat-icon-wrap" style={{ background: 'hsl(196 100% 47% / 0.12)', color: 'hsl(196 100% 47%)' }}>
              <Activity size={24} className="spin" style={{ animationDuration: '3s' }} />
            </div>
            <div className="stat-info">
              <div className="flex items-center gap-2">
                <span className="stat-label">Pengunjung Aktif (5m)</span>
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
              </div>
              <p className="stat-value">{metrics.activeUsersNow} <span className="text-xs text-emerald-500 font-medium">Realtime</span></p>
            </div>
          </div>
          <TrendingUp size={16} className="stat-trend" />
        </div>

        {/* Total Pageviews */}
        <div className="stat-card card-violet">
          <div className="stat-card-inner">
            <div className="stat-icon-wrap">
              <Eye size={24} />
            </div>
            <div className="stat-info">
              <p className="stat-label">Total Halaman Dilihat</p>
              <p className="stat-value">{metrics.totalPageviews.toLocaleString('id-ID')}</p>
            </div>
          </div>
          <TrendingUp size={16} className="stat-trend" />
        </div>

        {/* Unique Visitors */}
        <div className="stat-card card-indigo">
          <div className="stat-card-inner">
            <div className="stat-icon-wrap">
              <Users size={24} />
            </div>
            <div className="stat-info">
              <p className="stat-label">Pengunjung Unik</p>
              <p className="stat-value">{metrics.totalVisitors.toLocaleString('id-ID')}</p>
            </div>
          </div>
          <TrendingUp size={16} className="stat-trend" />
        </div>

        {/* Avg Session Duration */}
        <div className="stat-card card-amber">
          <div className="stat-card-inner">
            <div className="stat-icon-wrap">
              <Clock size={24} />
            </div>
            <div className="stat-info">
              <p className="stat-label">Rata-rata Durasi Sesi</p>
              <p className="stat-value">{metrics.avgSessionDuration}</p>
            </div>
          </div>
          <TrendingUp size={16} className="stat-trend" />
        </div>
      </div>

      {/* Main Traffic Trend Chart */}
      <div className="analytics-card">
        <div className="analytics-card-title">
          <div className="flex items-center gap-2">
            <BarChart3 size={20} className="text-blue-600" />
            <span>Tren Lalu Lintas Pengunjung ({timeRange === '7d' ? '7 Hari' : timeRange === '30d' ? '30 Hari' : '90 Hari'})</span>
          </div>
          <div className="flex items-center gap-4 text-xs font-semibold">
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-blue-600 inline-block shadow-sm"></span>
              Pageviews Real
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-cyan-500 inline-block shadow-sm"></span>
              Pengunjung Unik
            </span>
          </div>
        </div>

        <div style={{ width: '100%', height: 320 }}>
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={metrics.trafficTrend} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="colorPageviews" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(250, 84%, 60%)" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="hsl(250, 84%, 60%)" stopOpacity={0.0} />
                </linearGradient>
                <linearGradient id="colorVisitors" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(196, 100%, 47%)" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="hsl(196, 100%, 47%)" stopOpacity={0.0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
              <XAxis dataKey="date" stroke="#94a3b8" fontSize={12} tickLine={false} />
              <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} />
              <Tooltip
                contentStyle={{
                  background: '#ffffff',
                  border: '1px solid #e2e5f0',
                  borderRadius: '12px',
                  boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
                  fontSize: '12px',
                  fontWeight: 600,
                }}
              />
              <Area
                type="monotone"
                dataKey="pageviews"
                name="Pageviews"
                stroke="hsl(250, 84%, 60%)"
                strokeWidth={3}
                fillOpacity={1}
                fill="url(#colorPageviews)"
              />
              <Area
                type="monotone"
                dataKey="visitors"
                name="Pengunjung Unik"
                stroke="hsl(196, 100%, 47%)"
                strokeWidth={3}
                fillOpacity={1}
                fill="url(#colorVisitors)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Grid: Top Pages, Traffic Sources & Devices */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Top Pages */}
        <div className="analytics-card lg:col-span-1">
          <div className="analytics-card-title">
            <div className="flex items-center gap-2">
              <Layers size={18} className="text-blue-600" />
              <span>Halaman Terpopuler</span>
            </div>
            <span className="text-xs text-slate-400 font-normal">Kunjungan</span>
          </div>

          <div className="flex flex-col gap-3.5">
            {metrics.topPages.map((page, index) => (
              <div key={page.path} className="flex flex-col gap-1.5">
                <div className="flex justify-between items-center text-xs font-medium">
                  <span className="truncate max-w-[200px] text-slate-800" title={page.title}>
                    <span className="text-blue-600 font-bold mr-1.5">#{index + 1}</span>
                    {page.path}
                  </span>
                  <span className="text-slate-700 font-bold">{page.views.toLocaleString()} ({page.percentage}%)</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                  <div
                    className="bg-blue-600 h-2 rounded-full transition-all duration-500 shadow-sm"
                    style={{ width: `${page.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Traffic Sources */}
        <div className="analytics-card lg:col-span-1">
          <div className="analytics-card-title">
            <div className="flex items-center gap-2">
              <Globe2 size={18} className="text-cyan-500" />
              <span>Sumber Lalu Lintas (Referrer)</span>
            </div>
          </div>

          <div className="flex items-center justify-center py-1" style={{ height: 200 }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={metrics.trafficSources}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={75}
                  paddingAngle={4}
                  dataKey="count"
                  nameKey="source"
                >
                  {metrics.trafficSources.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="flex flex-col gap-2 mt-1">
            {metrics.trafficSources.map((src) => (
              <div key={src.source} className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ background: src.color }} />
                  <span className="truncate text-slate-700 font-medium">{src.source}</span>
                </div>
                <span className="font-bold text-slate-800">{src.percentage}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* Device Breakdown */}
        <div className="analytics-card lg:col-span-1">
          <div className="analytics-card-title">
            <div className="flex items-center gap-2">
              <Smartphone size={18} className="text-emerald-500" />
              <span>Tipe Perangkat (Devices)</span>
            </div>
          </div>

          <div className="flex items-center justify-center py-1" style={{ height: 200 }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={metrics.deviceBreakdown}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={75}
                  paddingAngle={4}
                  dataKey="count"
                  nameKey="device"
                >
                  {metrics.deviceBreakdown.map((entry, index) => (
                    <Cell key={`cell-dev-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="flex flex-col gap-2 mt-1">
            {metrics.deviceBreakdown.map((dev) => (
              <div key={dev.device} className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ background: dev.color }} />
                  <span className="truncate text-slate-700 font-medium">{dev.device}</span>
                </div>
                <span className="font-bold text-slate-800">{dev.percentage}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* GA Configuration Box */}
      <div className="analytics-card">
        <div className="analytics-card-title">
          <div className="flex items-center gap-2">
            <Settings size={18} className="text-emerald-600" />
            <span>Pengaturan Google Analytics (GA4 Tag ID)</span>
          </div>
        </div>

        <form onSubmit={handleSaveGaId} className="analytics-config-box">
          <p className="text-sm text-slate-600 margin-0">
            Masukkan <strong>Google Analytics 4 Measurement ID</strong> (contoh: <code>G-XXXXXXXXXX</code>) untuk menyambungkan tag pelacak resmi Google Analytics secara otomatis.
          </p>
          <div className="analytics-config-row">
            <div className="input-wrap flex-1">
              <input
                type="text"
                className="form-input"
                placeholder="Contoh: G-XXXXXXXXXX"
                value={gaId}
                onChange={(e) => setGaId(e.target.value)}
              />
            </div>
            <button type="submit" className="btn-admin btn-admin-primary">
              {savedSuccess ? <CheckCircle2 size={16} /> : <Save size={16} />}
              <span>{savedSuccess ? 'Tersimpan!' : 'Simpan ID GA'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

