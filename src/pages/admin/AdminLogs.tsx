import { useState, useEffect } from 'react';
import {
  ScrollText,
  Search,
  Trash2,
  FileSpreadsheet,
  Filter,
  RefreshCw,
  Terminal,
  Globe,
  Mail,
  Shield,
  Info,
  CheckCircle2,
  AlertTriangle,
  AlertOctagon,
  X,
  Eye,
  Copy,
  Check,
  Calendar,
  Database,
  HardDrive,
  Loader2,
} from 'lucide-react';
import {
  getLogs,
  clearLogs,
  deleteLogEntry,
  getLogStats,
  type LogEntry,
  type LogCategory,
  type LogLevel,
  type LogTimeRange,
} from '@/lib/logger';
import { toast } from 'sonner';

export default function AdminLogs() {
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [isClearingAll, setIsClearingAll] = useState(false);
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<LogCategory | 'ALL'>('ALL');
  const [selectedLevel, setSelectedLevel] = useState<LogLevel | 'ALL'>('ALL');
  const [timeRange, setTimeRange] = useState<LogTimeRange>('ALL');
  const [dataSource, setDataSource] = useState<'database' | 'local'>('database');
  const [activeLog, setActiveLog] = useState<LogEntry | null>(null);
  const [showConfirmClear, setShowConfirmClear] = useState(false);
  const [copiedId, setCopiedId] = useState(false);

  const fetchLogs = async () => {
    setLoading(true);
    try {
      const { logs: data, source } = await getLogs({
        category: selectedCategory,
        level: selectedLevel,
        timeRange,
        search,
      });
      setLogs(data);
      setDataSource(source);
    } catch (e) {
      console.error('Error fetching logs:', e);
      toast.error('Gagal mengambil data log website');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLogs();
  }, [selectedCategory, selectedLevel, timeRange, search]);

  const stats = getLogStats(logs);

  // Delete a single log entry from both Supabase DB and LocalStorage
  const handleDeleteSingleLog = async (id: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setDeletingId(id);
    try {
      await deleteLogEntry(id);
      setLogs((prev) => prev.filter((l) => l.id !== id));
      if (activeLog?.id === id) setActiveLog(null);
      toast.success('Catatan log berhasil dihapus dari database & storage!');
    } catch (err) {
      console.error('Error deleting single log:', err);
      toast.error('Gagal menghapus catatan log');
    } finally {
      setDeletingId(null);
    }
  };

  // Delete ALL logs from both Supabase DB and LocalStorage
  const handleClearAll = async () => {
    setIsClearingAll(true);
    try {
      await clearLogs();
      setLogs([]);
      setShowConfirmClear(false);
      if (activeLog) setActiveLog(null);
      toast.success('Semua catatan log website berhasil dihapus permanen dari Supabase & local storage!');
    } catch (e) {
      console.error('Error clearing logs:', e);
      toast.error('Gagal menghapus log website');
    } finally {
      setIsClearingAll(false);
    }
  };

  // Export logs directly to Spreadsheet CSV format
  const handleExportSpreadsheet = () => {
    if (logs.length === 0) {
      toast.warning('Tidak ada data log untuk diunduh');
      return;
    }

    const headers = ['Log ID', 'Waktu', 'IP Address', 'Kategori', 'Status Level', 'Tindakan / Action', 'Halaman Target', 'Detail Catatan', 'User Agent'];
    const rows = logs.map((log) => [
      `"${(log.id || '').replace(/"/g, '""')}"`,
      `"${new Date(log.created_at).toLocaleString('id-ID').replace(/"/g, '""')}"`,
      `"${(log.ip_address || '127.0.0.1').replace(/"/g, '""')}"`,
      `"${(log.category || '').replace(/"/g, '""')}"`,
      `"${(log.level || '').replace(/"/g, '""')}"`,
      `"${(log.action || '').replace(/"/g, '""')}"`,
      `"${(log.page_url || '/').replace(/"/g, '""')}"`,
      `"${(log.details || '').replace(/"/g, '""')}"`,
      `"${(log.user_agent || '').replace(/"/g, '""')}"`,
    ]);

    const csvString = '\uFEFF' + [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `website_logs_spreadsheet_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    toast.success('Spreadsheet (.csv) log website berhasil diunduh!');
  };

  const copyToClipboard = (text: string, setStatus: (val: boolean) => void) => {
    navigator.clipboard.writeText(text);
    setStatus(true);
    toast.success('Teks berhasil disalin ke clipboard!');
    setTimeout(() => setStatus(false), 2000);
  };

  const getCategoryIcon = (cat: LogCategory) => {
    switch (cat) {
      case 'SYSTEM': return <Terminal size={14} className="text-purple-600" />;
      case 'VISITOR': return <Globe size={14} className="text-cyan-600" />;
      case 'FORM': return <Mail size={14} className="text-emerald-600" />;
      case 'SECURITY': return <Shield size={14} className="text-amber-600" />;
    }
  };

  const getLevelBadgeClass = (lvl: LogLevel) => {
    switch (lvl) {
      case 'INFO': return 'badge-level-info';
      case 'SUCCESS': return 'badge-level-success';
      case 'WARNING': return 'badge-level-warning';
      case 'ERROR': return 'badge-level-error';
    }
  };

  const getLevelIcon = (lvl: LogLevel) => {
    switch (lvl) {
      case 'INFO': return <Info size={12} />;
      case 'SUCCESS': return <CheckCircle2 size={12} />;
      case 'WARNING': return <AlertTriangle size={12} />;
      case 'ERROR': return <AlertOctagon size={12} />;
    }
  };

  return (
    <div className="analytics-container">
      {/* Top Header Banner */}
      <div className="admin-header-banner">
        <div className="header-banner-content">
          <div className="header-banner-left">
            <div className="header-banner-icon-wrap header-banner-icon-cyan">
              <ScrollText size={24} />
            </div>
            <div>
              <div className="flex items-center gap-2.5 flex-wrap">
                <h2 className="header-banner-title">Website Activity Logs</h2>
                
                {dataSource === 'database' ? (
                  <span className="live-status-pill bg-emerald-50 text-emerald-700 border border-emerald-200">
                    <span className="live-status-dot bg-emerald-500 animate-ping"></span>
                    <span className="live-status-dot bg-emerald-500"></span>
                    <Database size={13} className="text-emerald-600 ml-0.5" />
                    Supabase DB Active
                  </span>
                ) : (
                  <span className="live-status-pill bg-amber-50 text-amber-700 border border-amber-200">
                    <HardDrive size={13} className="text-amber-600" />
                    Local Cache (FallBack)
                  </span>
                )}
              </div>
              <p className="header-banner-subtitle">
                Catatan aktivitas real-time pengunjung, kiriman formulir, keamanan, dan audit log sistem portofolio Anda.
              </p>
            </div>
          </div>
          <div className="header-banner-actions flex items-center gap-2">
            <button
              onClick={fetchLogs}
              className="btn-secondary !p-2.5 rounded-lg border border-slate-200 text-slate-700 hover:bg-blue-50 hover:text-blue-600 hover:border-blue-200 transition-all flex items-center justify-center"
              title="Refresh / Muat Ulang Data Log"
              aria-label="Refresh Log"
            >
              <RefreshCw size={18} className={loading ? 'spin' : ''} />
            </button>
            <button
              onClick={handleExportSpreadsheet}
              className="btn-secondary !p-2.5 rounded-lg border border-slate-200 text-slate-700 hover:bg-emerald-50 hover:text-emerald-600 hover:border-emerald-200 transition-all flex items-center justify-center gap-1.5 text-xs font-semibold"
              title="Download Log sebagai File Spreadsheet (.csv)"
              aria-label="Export Spreadsheet"
            >
              <FileSpreadsheet size={18} className="text-emerald-600" />
              <span className="hidden sm:inline">Export Spreadsheet</span>
            </button>
            <button
              onClick={() => setShowConfirmClear(true)}
              className="btn-danger !p-2.5 rounded-lg border border-rose-200 text-rose-600 hover:bg-rose-50 hover:border-rose-300 transition-all flex items-center justify-center"
              title="Bersihkan Semua Catatan Log"
              aria-label="Bersihkan Log"
            >
              <Trash2 size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="stats-grid">
        <div className="stat-card card-violet">
          <div className="stat-card-inner">
            <div className="stat-icon-wrap">
              <ScrollText size={24} />
            </div>
            <div className="stat-info">
              <p className="stat-label">Total Catatan Log</p>
              <p className="stat-value">{stats.total}</p>
            </div>
          </div>
        </div>

        <div className="stat-card card-cyan">
          <div className="stat-card-inner">
            <div className="stat-icon-wrap">
              <Globe size={24} />
            </div>
            <div className="stat-info">
              <p className="stat-label">Aktivitas Pengunjung</p>
              <p className="stat-value">{stats.visitorCount}</p>
            </div>
          </div>
        </div>

        <div className="stat-card card-emerald">
          <div className="stat-card-inner">
            <div className="stat-icon-wrap">
              <Mail size={24} />
            </div>
            <div className="stat-info">
              <p className="stat-label">Kiriman Form / Pesan</p>
              <p className="stat-value">{stats.formCount}</p>
            </div>
          </div>
        </div>

        <div className="stat-card card-amber">
          <div className="stat-card-inner">
            <div className="stat-icon-wrap">
              <Shield size={24} />
            </div>
            <div className="stat-info">
              <p className="stat-label">Security & Warning</p>
              <p className="stat-value">{stats.securityCount + stats.errorCount}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Toolbar & Filters */}
      <div className="logs-toolbar flex-wrap">
        <div className="logs-search-wrap">
          <Search size={18} className="input-icon text-slate-400" />
          <input
            type="text"
            className="form-input"
            placeholder="Cari kata kunci tindakan, URL, atau detail..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="logs-filters flex-wrap gap-2">
          {/* Time Range Selector */}
          <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-500">
            <Calendar size={14} className="text-blue-600" />
            <span>Rentang Waktu:</span>
          </div>
          <select
            className="analytics-select"
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value as LogTimeRange)}
          >
            <option value="ALL">Semua Riwayat Log</option>
            <option value="7D">7 Hari Terakhir</option>
            <option value="30D">30 Hari Terakhir</option>
            <option value="1Y">1 Tahun Terakhir</option>
          </select>

          <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-500">
            <Filter size={14} />
            <span>Kategori:</span>
          </div>
          <select
            className="analytics-select"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value as any)}
          >
            <option value="ALL">Semua Kategori</option>
            <option value="VISITOR">Visitor (Pengunjung)</option>
            <option value="SYSTEM">System (Admin/Database)</option>
            <option value="FORM">Form (Kontak/Guestbook)</option>
            <option value="SECURITY">Security (Keamanan)</option>
          </select>

          <select
            className="analytics-select"
            value={selectedLevel}
            onChange={(e) => setSelectedLevel(e.target.value as any)}
          >
            <option value="ALL">Semua Level Status</option>
            <option value="INFO">INFO</option>
            <option value="SUCCESS">SUCCESS</option>
            <option value="WARNING">WARNING</option>
            <option value="ERROR">ERROR</option>
          </select>
        </div>
      </div>

      {/* Logs Table */}
      <div className="logs-table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>Waktu</th>
              <th>IP Pengunjung</th>
              <th>Kategori</th>
              <th>Status Level</th>
              <th>Aktivitas / Tindakan</th>
              <th>Halaman Target</th>
              <th className="text-right">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={7} className="text-center py-10 text-slate-400">
                  <RefreshCw size={24} className="spin mx-auto mb-2 text-blue-600" />
                  Memuat data log website...
                </td>
              </tr>
            ) : logs.length === 0 ? (
              <tr>
                <td colSpan={7} className="text-center py-10 text-slate-400">
                  Tidak ditemukan catatan log aktivitas website yang cocok dengan filter.
                </td>
              </tr>
            ) : (
              logs.map((log) => (
                <tr key={log.id} onClick={() => setActiveLog(log)} className="log-row">
                  <td className="whitespace-nowrap text-xs text-slate-500 font-medium">
                    {new Date(log.created_at).toLocaleString('id-ID', {
                      dateStyle: 'short',
                      timeStyle: 'medium',
                    })}
                  </td>
                  <td className="whitespace-nowrap">
                    <code className="text-xs bg-slate-100 px-2.5 py-0.5 rounded border border-slate-200 text-slate-700 font-mono font-semibold">
                      {log.ip_address || '127.0.0.1'}
                    </code>
                  </td>
                  <td>
                    <span className="badge-category">
                      {getCategoryIcon(log.category)}
                      {log.category}
                    </span>
                  </td>
                  <td>
                    <span className={`badge-level ${getLevelBadgeClass(log.level)}`}>
                      {getLevelIcon(log.level)}
                      {log.level}
                    </span>
                  </td>
                  <td className="font-medium text-slate-800">
                    <div>{log.action}</div>
                    {log.details && (
                      <div className="text-xs text-slate-400 font-normal truncate max-w-[340px]">
                        {log.details}
                      </div>
                    )}
                  </td>
                  <td>
                    <code className="text-xs bg-blue-50 px-2 py-0.5 rounded text-blue-600 font-semibold border border-blue-100">
                      {log.page_url || '/'}
                    </code>
                  </td>
                  <td className="text-right">
                    <div className="flex items-center justify-end gap-1.5" onClick={(e) => e.stopPropagation()}>
                      <button
                        onClick={() => setActiveLog(log)}
                        className="btn-action-view"
                        title="Lihat Detail Log"
                      >
                        <Eye size={15} />
                      </button>
                      <button
                        onClick={(e) => log.id && handleDeleteSingleLog(log.id, e)}
                        disabled={deletingId === log.id}
                        className="btn-action-delete text-rose-500 hover:bg-rose-50 p-1.5 rounded transition-all"
                        title="Hapus Catatan Log Ini"
                      >
                        {deletingId === log.id ? <Loader2 size={15} className="spin" /> : <Trash2 size={15} />}
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Log Detail Modal */}
      {activeLog && (
        <div className="modal-overlay" onClick={() => setActiveLog(null)}>
          <div className="modal" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '620px' }}>
            <div className="modal-header">
              <h3 className="modal-title flex items-center gap-2 text-slate-800">
                <ScrollText size={20} className="text-blue-600" />
                <span>Detail Catatan Log Activity</span>
              </h3>
              <button className="modal-close" onClick={() => setActiveLog(null)} title="Tutup Modal">
                <X size={18} />
              </button>
            </div>

            <div className="modal-body log-detail-modal-body bg-white">
              <div className="log-detail-grid">
                <span className="log-detail-label">Log ID:</span>
                <div className="flex items-center gap-2">
                  <code className="log-detail-value text-xs bg-slate-100 px-2.5 py-1 rounded border border-slate-200 text-slate-700 font-mono">
                    {activeLog.id}
                  </code>
                  <button
                    onClick={() => copyToClipboard(activeLog.id || '', setCopiedId)}
                    className="text-slate-400 hover:text-blue-600 transition-colors p-1"
                    title="Salin ID"
                  >
                    {copiedId ? <Check size={14} className="text-emerald-500" /> : <Copy size={14} />}
                  </button>
                </div>

                <span className="log-detail-label">IP Pengunjung:</span>
                <div className="flex items-center gap-2">
                  <code className="log-detail-value text-xs bg-cyan-50 px-2.5 py-1 rounded border border-cyan-200 text-cyan-800 font-mono font-bold">
                    {activeLog.ip_address || '127.0.0.1'}
                  </code>
                  <button
                    onClick={() => copyToClipboard(activeLog.ip_address || '127.0.0.1', () => {})}
                    className="text-slate-400 hover:text-cyan-600 transition-colors p-1"
                    title="Salin IP"
                  >
                    <Copy size={14} />
                  </button>
                </div>

                <span className="log-detail-label">Waktu Log:</span>
                <span className="log-detail-value font-semibold text-slate-800">
                  {new Date(activeLog.created_at).toLocaleString('id-ID', {
                    dateStyle: 'full',
                    timeStyle: 'medium',
                  })}
                </span>

                <span className="log-detail-label">Kategori:</span>
                <span className="log-detail-value">
                  <span className="badge-category font-medium">
                    {getCategoryIcon(activeLog.category)}
                    {activeLog.category}
                  </span>
                </span>

                <span className="log-detail-label">Status Level:</span>
                <span className="log-detail-value">
                  <span className={`badge-level ${getLevelBadgeClass(activeLog.level)}`}>
                    {getLevelIcon(activeLog.level)}
                    {activeLog.level}
                  </span>
                </span>

                <span className="log-detail-label">Aktivitas / Action:</span>
                <span className="log-detail-value font-bold text-slate-900">{activeLog.action}</span>

                <span className="log-detail-label">Detail Catatan:</span>
                <div className="log-detail-value bg-slate-50 border border-slate-200 p-3 rounded-lg text-sm text-slate-700 leading-relaxed">
                  {activeLog.details || 'Tidak ada catatan rincian tambahan.'}
                </div>

                <span className="log-detail-label">Halaman Target:</span>
                <code className="log-detail-value text-xs text-blue-600 font-semibold bg-blue-50 px-2.5 py-1 rounded border border-blue-100 inline-block">
                  {activeLog.page_url}
                </code>

                <span className="log-detail-label">User Agent:</span>
                <span className="log-detail-value text-xs text-slate-500 font-mono break-all bg-slate-50 p-2 rounded border border-slate-100">
                  {activeLog.user_agent}
                </span>
              </div>
            </div>

            <div className="modal-footer justify-between">
              <button
                onClick={() => activeLog.id && handleDeleteSingleLog(activeLog.id)}
                className="btn-admin-danger text-xs !py-2 !px-3"
              >
                <Trash2 size={15} />
                <span>Hapus Log Ini</span>
              </button>
              <button className="btn-admin-secondary text-xs !py-2 !px-3" onClick={() => setActiveLog(null)}>
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Confirm Clear Modal */}
      {showConfirmClear && (
        <div className="modal-overlay" onClick={() => !isClearingAll && setShowConfirmClear(false)}>
          <div className="confirm-modal" onClick={(e) => e.stopPropagation()}>
            <div className="confirm-icon-wrap">
              <AlertOctagon size={28} />
            </div>
            <h3 className="confirm-title">Bersihkan Semua Log Website?</h3>
            <p className="confirm-desc">
              Tindakan ini akan menghapus <strong>seluruh catatan log aktivitas</strong> secara permanen dari database Supabase dan local storage. Data yang dihapus tidak dapat dikembalikan.
            </p>
            <div className="confirm-actions">
              <button
                className="btn-admin-secondary"
                onClick={() => setShowConfirmClear(false)}
                disabled={isClearingAll}
              >
                Batal
              </button>
              <button
                className="btn-admin-danger"
                onClick={handleClearAll}
                disabled={isClearingAll}
              >
                {isClearingAll ? <Loader2 size={16} className="spin" /> : <Trash2 size={16} />}
                <span>{isClearingAll ? 'Menghapus DB...' : 'Ya, Hapus Semua Log'}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}



