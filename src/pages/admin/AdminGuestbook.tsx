import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import {
  MessageSquare,
  Trash2,
  Reply,
  Search,
  RefreshCw,
  AlertCircle,
  X,
  Check,
  BadgeCheck,
  Heart,
  Filter,
  LayoutGrid,
  Table as TableIcon,
  Sparkles,
  MessageCircleQuestion,
  CheckCircle2,
  Clock,
  CornerDownRight,
  Save,
} from 'lucide-react';
import { toast } from 'sonner';
import { GenzAvatar, parseNameAndAvatar } from '@/components/GenzAvatars';

interface GuestbookMessage {
  id: string;
  name: string;
  text: string;
  created_at: string;
  reactions: number;
  reply?: string;
}

type FilterTab = 'ALL' | 'UNREPLIED' | 'REPLIED';

export default function AdminGuestbook() {
  const [messages, setMessages] = useState<GuestbookMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState<FilterTab>('ALL');
  const [viewMode, setViewMode] = useState<'card' | 'table'>('card');

  // Reply Modal State
  const [replyInput, setReplyInput] = useState('');
  const [activeMessage, setActiveMessage] = useState<GuestbookMessage | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Delete Modal State
  const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const fetchMessages = async () => {
    try {
      setLoading(true);
      setError(null);
      const { data, error: err } = await supabase
        .from('guestbook')
        .select('*')
        .order('created_at', { ascending: false });

      if (err) throw err;
      setMessages(data || []);
    } catch (err: any) {
      console.error('Error fetching guestbook:', err);
      setError(err.message || 'Gagal memuat data guestbook');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const handleDeleteConfirm = async () => {
    if (!deleteTargetId) return;

    try {
      setIsDeleting(true);
      const { error: err } = await supabase
        .from('guestbook')
        .delete()
        .eq('id', deleteTargetId);

      if (err) throw err;

      toast.success('Pesan guestbook berhasil dihapus!');
      setMessages((prev) => prev.filter((m) => m.id !== deleteTargetId));
      setDeleteTargetId(null);
    } catch (err: any) {
      toast.error('Gagal menghapus pesan: ' + err.message);
    } finally {
      setIsDeleting(false);
    }
  };

  const handleReplySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeMessage) return;

    try {
      setIsSubmitting(true);
      const cleanReply = replyInput.trim() || null;
      const { error: err } = await supabase
        .from('guestbook')
        .update({ reply: cleanReply })
        .eq('id', activeMessage.id);

      if (err) throw err;

      toast.success(cleanReply ? 'Balasan berhasil disimpan!' : 'Balasan berhasil dihapus');

      // Update local state
      setMessages((prev) =>
        prev.map((m) =>
          m.id === activeMessage.id ? { ...m, reply: cleanReply || undefined } : m
        )
      );
      setActiveMessage(null);
      setReplyInput('');
    } catch (err: any) {
      toast.error('Gagal menyimpan balasan: ' + err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const openReplyModal = (msg: GuestbookMessage) => {
    setActiveMessage(msg);
    setReplyInput(msg.reply || '');
  };

  const applyTemplate = (templateText: string) => {
    setReplyInput(templateText);
  };

  // Compute Statistics
  const totalCount = messages.length;
  const unrepliedCount = messages.filter((m) => !m.reply).length;
  const repliedCount = messages.filter((m) => !!m.reply).length;
  const totalReactions = messages.reduce((acc, m) => acc + (m.reactions || 0), 0);

  // Filter messages
  const filteredMessages = messages.filter((m) => {
    const { name: cleanName } = parseNameAndAvatar(m.name);
    const matchesSearch =
      cleanName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      m.text.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (m.reply && m.reply.toLowerCase().includes(searchTerm.toLowerCase()));

    if (!matchesSearch) return false;

    if (activeTab === 'UNREPLIED') return !m.reply;
    if (activeTab === 'REPLIED') return !!m.reply;
    return true;
  });

  return (
    <div className="analytics-container">
      {/* Top Header Banner */}
      <div className="admin-header-banner">
        <div className="header-banner-content">
          <div className="header-banner-left">
            <div className="header-banner-icon-wrap header-banner-icon-rose">
              <MessageSquare size={24} />
            </div>
            <div>
              <div className="flex items-center gap-2.5 flex-wrap">
                <h2 className="header-banner-title">Guestbook Messages</h2>
                <span className="live-status-pill">
                  <span className="live-status-dot bg-rose-500 animate-ping"></span>
                  <span className="live-status-dot bg-rose-500"></span>
                  Pesan Pengunjung ({totalCount})
                </span>
              </div>
              <p className="header-banner-subtitle">
                Kelola ucapan, tanggapan, dan berikan balasan langsung untuk para pengunjung portofolio Anda.
              </p>
            </div>
          </div>
          <div className="header-banner-actions flex items-center gap-2">
            <button
              onClick={fetchMessages}
              className="btn-secondary !p-2.5 rounded-lg border border-slate-200 text-slate-700 hover:bg-rose-50 hover:text-rose-600 hover:border-rose-200 transition-all flex items-center justify-center"
              title="Refresh / Muat Ulang Pesan"
              aria-label="Refresh Pesan"
              disabled={loading}
            >
              <RefreshCw size={18} className={loading ? 'spin' : ''} />
            </button>
          </div>
        </div>
      </div>

      {/* KPI Stats Cards */}
      <div className="stats-grid">
        <div className="stat-card card-violet">
          <div className="stat-card-inner">
            <div className="stat-icon-wrap">
              <MessageSquare size={24} />
            </div>
            <div className="stat-info">
              <p className="stat-label">Total Pesan Masuk</p>
              <p className="stat-value">{totalCount}</p>
            </div>
          </div>
        </div>

        <div className="stat-card card-amber">
          <div className="stat-card-inner">
            <div className="stat-icon-wrap">
              <Clock size={24} />
            </div>
            <div className="stat-info">
              <p className="stat-label">Belum Dibalas</p>
              <p className="stat-value text-amber-600">{unrepliedCount}</p>
            </div>
          </div>
        </div>

        <div className="stat-card card-emerald">
          <div className="stat-card-inner">
            <div className="stat-icon-wrap">
              <CheckCircle2 size={24} />
            </div>
            <div className="stat-info">
              <p className="stat-label">Sudah Dibalas</p>
              <p className="stat-value text-emerald-600">{repliedCount}</p>
            </div>
          </div>
        </div>

        <div className="stat-card card-cyan">
          <div className="stat-card-inner">
            <div className="stat-icon-wrap">
              <Heart size={24} />
            </div>
            <div className="stat-info">
              <p className="stat-label">Total Reaksi Suka</p>
              <p className="stat-value">{totalReactions}</p>
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
            placeholder="Cari pengirim, isi pesan, atau balasan..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="logs-filters flex-wrap gap-2">
          {/* Filter Tabs */}
          <div className="gb-filter-container">
            <button
              type="button"
              onClick={() => setActiveTab('ALL')}
              className={`gb-tab-btn ${
                activeTab === 'ALL' ? 'gb-tab-active-all' : 'gb-tab-inactive'
              }`}
            >
              Semua ({totalCount})
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('UNREPLIED')}
              className={`gb-tab-btn ${
                activeTab === 'UNREPLIED' ? 'gb-tab-active-unreplied' : 'gb-tab-inactive'
              }`}
            >
              <span>Belum Dibalas</span>
              {unrepliedCount > 0 && (
                <span
                  className={`gb-pill-badge ${
                    activeTab === 'UNREPLIED' ? 'gb-pill-badge-active' : 'gb-pill-badge-inactive'
                  }`}
                >
                  {unrepliedCount}
                </span>
              )}
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('REPLIED')}
              className={`gb-tab-btn ${
                activeTab === 'REPLIED' ? 'gb-tab-active-replied' : 'gb-tab-inactive'
              }`}
            >
              Sudah Dibalas ({repliedCount})
            </button>
          </div>

          {/* View Switcher */}
          <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200">
            <button
              onClick={() => setViewMode('card')}
              className={`p-1.5 rounded-lg transition-all ${
                viewMode === 'card'
                  ? 'bg-white text-blue-600 shadow-sm'
                  : 'text-slate-500 hover:text-slate-900'
              }`}
              title="Tampilan Kartu / Feed Card"
            >
              <LayoutGrid size={16} />
            </button>
            <button
              onClick={() => setViewMode('table')}
              className={`p-1.5 rounded-lg transition-all ${
                viewMode === 'table'
                  ? 'bg-white text-blue-600 shadow-sm'
                  : 'text-slate-500 hover:text-slate-900'
              }`}
              title="Tampilan Tabel"
            >
              <TableIcon size={16} />
            </button>
          </div>
        </div>
      </div>

      {error ? (
        <div className="form-error flex items-center justify-between">
          <div className="flex items-center gap-2">
            <AlertCircle size={20} />
            <p>{error}</p>
          </div>
          <button className="underline text-sm font-bold" onClick={fetchMessages}>
            Coba Lagi
          </button>
        </div>
      ) : loading ? (
        <div className="bg-white p-12 rounded-2xl border border-slate-200 text-center text-slate-400">
          <RefreshCw size={28} className="spin mx-auto mb-3 text-rose-500" />
          <p className="font-semibold text-sm">Memuat data pesan guestbook...</p>
        </div>
      ) : filteredMessages.length === 0 ? (
        <div className="bg-white p-12 rounded-2xl border border-slate-200 text-center text-slate-400">
          <MessageCircleQuestion size={36} className="mx-auto mb-3 text-slate-300" />
          <p className="font-bold text-slate-700 text-base mb-1">Pesan Tidak Ditemukan</p>
          <p className="text-xs text-slate-500">
            Tidak ada pesan yang sesuai dengan kata kunci pencarian atau filter yang dipilih.
          </p>
        </div>
      ) : viewMode === 'card' ? (
        /* CARD FEED VIEW */
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredMessages.map((msg) => {
            const { name: cleanName, avatarId } = parseNameAndAvatar(msg.name, msg.id);
            const isReplied = !!msg.reply;

            return (
              <div
                key={msg.id}
                className={`bg-white rounded-2xl border p-5 transition-all shadow-sm hover:shadow-md relative flex flex-col justify-between ${
                  isReplied ? 'border-slate-200' : 'border-amber-200 bg-amber-50/20'
                }`}
              >
                <div>
                  {/* Card Header */}
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="flex items-center gap-3">
                      <GenzAvatar
                        avatarId={avatarId}
                        size={40}
                        className="rounded-full border border-slate-200 shadow-sm shrink-0"
                      />
                      <div>
                        <h4 className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
                          <span>{cleanName}</span>
                          <span className="text-[11px] font-mono text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded border border-blue-100 font-normal">
                            @{cleanName.toLowerCase().replace(/\s+/g, '')}
                          </span>
                        </h4>
                        <p className="text-xs text-slate-400 font-medium">
                          {new Date(msg.created_at).toLocaleString('id-ID', {
                            dateStyle: 'medium',
                            timeStyle: 'short',
                          })}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <span className="inline-flex items-center gap-1 bg-rose-50 text-rose-600 px-2 py-0.5 rounded-full text-xs font-semibold border border-rose-100">
                        <Heart size={12} className="fill-rose-500 text-rose-500" />
                        {msg.reactions || 0}
                      </span>
                    </div>
                  </div>

                  {/* Message Bubble Text */}
                  <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200/80 text-sm text-slate-800 leading-relaxed font-sans mb-3 whitespace-pre-wrap">
                    {msg.text}
                  </div>

                  {/* Admin Reply Section */}
                  {msg.reply ? (
                    <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs mb-3 relative">
                      <div className="flex items-center justify-between mb-1.5">
                        <div className="flex items-center gap-1.5 font-bold text-slate-900">
                          <CornerDownRight size={14} className="text-amber-600" />
                          <span>Balasan Anda (Rakha)</span>
                          <BadgeCheck size={14} className="text-blue-500 fill-blue-500 text-white" />
                        </div>
                        <button
                          onClick={() => openReplyModal(msg)}
                          className="text-[11px] text-amber-700 hover:text-amber-900 underline font-semibold"
                        >
                          Edit Balasan
                        </button>
                      </div>
                      <p className="text-slate-700 italic leading-relaxed pl-3 border-l-2 border-amber-400">
                        "{msg.reply}"
                      </p>
                    </div>
                  ) : (
                    <div className="mb-3 flex items-center gap-2 text-xs text-amber-600 bg-amber-50 px-3 py-1.5 rounded-lg border border-amber-200">
                      <Clock size={14} className="shrink-0" />
                      <span>Pesan ini belum memiliki balasan dari Admin.</span>
                    </div>
                  )}
                </div>

                {/* Card Action Footer */}
                <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-[11px] text-slate-500 font-mono select-all break-all" title={msg.id}>
                    ID: {msg.id}
                  </span>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => openReplyModal(msg)}
                      className={`px-3 py-1.5 rounded-lg text-xs flex items-center gap-1.5 transition-all cursor-pointer ${
                        isReplied ? 'btn-reply-replied' : 'btn-reply-unreplied'
                      }`}
                      style={
                        isReplied
                          ? { backgroundColor: '#f1f5f9', color: '#1e293b', border: '1px solid #cbd5e1', fontWeight: 700 }
                          : { backgroundColor: '#d97706', color: '#ffffff', border: '1px solid #b45309', fontWeight: 700 }
                      }
                    >
                      <Reply size={14} style={{ color: isReplied ? '#1e293b' : '#ffffff' }} />
                      <span style={{ color: isReplied ? '#1e293b' : '#ffffff', fontWeight: 700 }}>
                        {isReplied ? 'Edit Balasan' : 'Balas Pesan'}
                      </span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setDeleteTargetId(msg.id)}
                      className="p-1.5 rounded-lg border border-rose-200 bg-rose-50 text-rose-600 hover:bg-rose-100 hover:border-rose-300 transition-all flex items-center justify-center cursor-pointer"
                      title="Hapus Pesan"
                      aria-label="Hapus Pesan"
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* TABLE VIEW */
        <div className="table-wrap">
          <table className="data-table">
            <thead>
              <tr>
                <th className="w-[18%]">Waktu Tanggal</th>
                <th className="w-[22%]">Pengirim</th>
                <th>Pesan & Balasan</th>
                <th className="w-[10%] text-center">Reaksi</th>
                <th className="w-[12%] text-right">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {filteredMessages.map((msg) => {
                const { name: cleanName, avatarId } = parseNameAndAvatar(msg.name, msg.id);
                const isMsgReplied = !!msg.reply;
                return (
                  <tr key={msg.id} className="log-row">
                    <td className="whitespace-nowrap text-xs text-slate-500 font-medium">
                      {new Date(msg.created_at).toLocaleString('id-ID', {
                        dateStyle: 'short',
                        timeStyle: 'short',
                      })}
                    </td>
                    <td className="font-semibold text-slate-800">
                      <div className="flex items-center gap-2.5">
                        <GenzAvatar avatarId={avatarId} size={28} className="rounded-full border border-slate-200" />
                        <div className="truncate max-w-[140px]" title={cleanName}>
                          <div>{cleanName}</div>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div className="text-xs text-slate-800 space-y-1">
                        <p className="line-clamp-2 font-medium" title={msg.text}>
                          {msg.text}
                        </p>
                        {msg.reply && (
                          <div className="text-[11px] bg-amber-50 text-amber-900 p-2 rounded-lg border border-amber-200 flex items-start gap-1.5">
                            <BadgeCheck size={13} className="text-blue-500 fill-blue-500 text-white shrink-0 mt-0.5" />
                            <span className="italic font-normal">"{msg.reply}"</span>
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="text-center">
                      <span className="inline-flex items-center gap-1 bg-rose-50 text-rose-600 px-2 py-0.5 rounded-full text-xs font-semibold border border-rose-100">
                        ♥ {msg.reactions || 0}
                      </span>
                    </td>
                    <td className="text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          type="button"
                          className={`p-1.5 rounded-lg border transition-all flex items-center justify-center cursor-pointer ${
                            isMsgReplied ? 'btn-reply-replied' : 'btn-reply-unreplied'
                          }`}
                          style={
                            isMsgReplied
                              ? { backgroundColor: '#f1f5f9', color: '#1e293b', border: '1px solid #cbd5e1' }
                              : { backgroundColor: '#d97706', color: '#ffffff', border: '1px solid #b45309' }
                          }
                          title={isMsgReplied ? 'Edit Balasan' : 'Balas Pesan'}
                          onClick={() => openReplyModal(msg)}
                        >
                          <Reply size={16} style={{ color: isMsgReplied ? '#1e293b' : '#ffffff' }} />
                        </button>
                        <button
                          type="button"
                          className="p-1.5 rounded-lg border border-rose-200 bg-rose-50 text-rose-600 hover:bg-rose-100 transition-all flex items-center justify-center cursor-pointer"
                          title="Hapus Pesan"
                          onClick={() => setDeleteTargetId(msg.id)}
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* Reply Modal */}
      {activeMessage && (
        <div className="modal-overlay" onClick={() => setActiveMessage(null)}>
          <div className="modal" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '580px' }}>
            <div className="modal-header">
              <h3 className="modal-title flex items-center gap-2 text-slate-800">
                <Reply size={20} className="text-blue-600" />
                <span>Balas Pesan dari {parseNameAndAvatar(activeMessage.name).name}</span>
              </h3>
              <button onClick={() => setActiveMessage(null)} className="modal-close" title="Tutup Modal">
                <X size={18} />
              </button>
            </div>

            <div className="modal-body bg-white space-y-4">
              {/* Original Message Preview */}
              <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 text-xs text-slate-700 space-y-1">
                <span className="font-bold text-slate-500 uppercase tracking-wider text-[10px] block">
                  Pesan Asli Pengunjung:
                </span>
                <p className="italic font-sans text-sm text-slate-800 leading-relaxed">
                  "{activeMessage.text}"
                </p>
              </div>

              {/* Quick Template Suggestion Chips */}
              <div className="space-y-1.5">
                <span className="text-xs font-semibold text-slate-500 flex items-center gap-1">
                  <Sparkles size={13} className="text-amber-500" /> Cepat Pakai Template Balasan:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  <button
                    type="button"
                    onClick={() => applyTemplate('Terima kasih banyak atas dukungannya! 🙏✨')}
                    className="text-xs bg-slate-100 hover:bg-blue-50 hover:text-blue-600 hover:border-blue-200 border border-slate-200 px-2.5 py-1 rounded-lg transition-all"
                  >
                    🙏 Terima kasih dukungannya!
                  </button>
                  <button
                    type="button"
                    onClick={() => applyTemplate('Halo! Senang sekali Anda berkunjung ke portofolio saya 🎉')}
                    className="text-xs bg-slate-100 hover:bg-blue-50 hover:text-blue-600 hover:border-blue-200 border border-slate-200 px-2.5 py-1 rounded-lg transition-all"
                  >
                    🎉 Senang Anda berkunjung!
                  </button>
                  <button
                    type="button"
                    onClick={() => applyTemplate('Terima kasih atas apresiasi dan pesan hangatnya! 🚀')}
                    className="text-xs bg-slate-100 hover:bg-blue-50 hover:text-blue-600 hover:border-blue-200 border border-slate-200 px-2.5 py-1 rounded-lg transition-all"
                  >
                    🚀 Pesan hangat
                  </button>
                </div>
              </div>

              {/* Reply Textarea */}
              <div className="form-group">
                <label className="form-label">Teks Balasan Admin (Rakha)</label>
                <textarea
                  value={replyInput}
                  onChange={(e) => setReplyInput(e.target.value)}
                  placeholder="Ketik pesan balasan Anda di sini..."
                  className="form-textarea min-h-[110px]"
                />
                <p className="text-xs text-slate-400 mt-1.5 italic">
                  *Kosongkan isi teks lalu klik simpan jika ingin menghapus balasan yang sudah ada.
                </p>
              </div>
            </div>

            <div className="modal-footer justify-between flex-wrap gap-2">
              <button
                type="button"
                onClick={() => setActiveMessage(null)}
                className="btn-secondary flex items-center gap-1.5 font-semibold text-xs py-2 px-3.5"
              >
                <X size={16} />
                <span>Batal</span>
              </button>
              <button
                onClick={handleReplySubmit}
                disabled={isSubmitting}
                className="btn-primary flex items-center gap-1.5 font-semibold text-xs py-2 px-4 shadow-sm"
              >
                {isSubmitting ? <RefreshCw size={16} className="spin" /> : <Save size={16} />}
                <span>{replyInput.trim() ? 'Simpan Balasan' : 'Hapus Balasan'}</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteTargetId && (
        <div className="modal-overlay" onClick={() => setDeleteTargetId(null)}>
          <div className="confirm-modal" onClick={(e) => e.stopPropagation()}>
            <h3 className="confirm-title flex items-center gap-2 text-rose-600">
              <Trash2 size={20} />
              <span>Hapus Pesan Guestbook?</span>
            </h3>
            <p className="confirm-desc mt-2">
              Tindakan ini akan menghapus pesan pengunjung secara permanen dari database. Data yang dihapus tidak dapat dikembalikan.
            </p>
            <div className="confirm-actions flex items-center justify-end gap-2 mt-4">
              <button
                className="btn-secondary flex items-center gap-1.5 font-semibold text-xs py-2 px-3.5"
                onClick={() => setDeleteTargetId(null)}
                disabled={isDeleting}
              >
                <X size={16} />
                <span>Batal</span>
              </button>
              <button
                className="btn-danger flex items-center gap-1.5 font-semibold text-xs py-2 px-4 shadow-sm"
                onClick={handleDeleteConfirm}
                disabled={isDeleting}
              >
                {isDeleting ? <RefreshCw size={16} className="spin" /> : <Trash2 size={16} />}
                <span>Ya, Hapus</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
