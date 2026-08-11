import { useState, useEffect } from 'react';
import { getCVSettings, updateCVSettings, uploadCV, deleteCVFile, type CVSettings } from '@/lib/supabase';
import { toast } from 'sonner';
import {
  FileText,
  Save,
  Loader2,
  AlertTriangle,
  Globe,
  Check,
  RefreshCw,
  Copy,
  Upload,
  ExternalLink,
} from 'lucide-react';

export default function AdminCV() {
  const [links, setLinks] = useState<{ cv_en: string; cv_id: string }>({
    cv_en: '',
    cv_id: '',
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploadingEn, setUploadingEn] = useState(false);
  const [uploadingId, setUploadingId] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [tableMissing, setTableMissing] = useState(false);

  const fetchCVLinks = async () => {
    setLoading(true);
    setError(null);
    setTableMissing(false);
    try {
      const data = await getCVSettings();
      const mapped = { cv_en: '', cv_id: '' };
      data.forEach((item) => {
        if (item.id === 'cv_en') mapped.cv_en = item.url;
        if (item.id === 'cv_id') mapped.cv_id = item.url;
      });
      setLinks(mapped);
    } catch (err: any) {
      console.error('Error fetching CV links:', err);
      if (err.code === 'PGRST116' || err.message?.includes('relation') || err.message?.includes('does not exist')) {
        setTableMissing(true);
      } else {
        setError(err.message || 'Gagal memuat data CV.');
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCVLinks();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      await Promise.all([
        updateCVSettings('cv_en', links.cv_en),
        updateCVSettings('cv_id', links.cv_id),
      ]);
      toast.success('Link CV berhasil diperbarui!');
      fetchCVLinks();
    } catch (err: any) {
      toast.error('Gagal menyimpan link CV: ' + err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, lang: 'en' | 'id') => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.type !== 'application/pdf') {
      toast.error('Hanya file PDF yang diperbolehkan untuk CV.');
      return;
    }

    if (lang === 'en') setUploadingEn(true);
    else setUploadingId(true);

    try {
      const oldUrl = lang === 'en' ? links.cv_en : links.cv_id;
      const fileName = lang === 'en' ? 'cv-english' : 'cv-indonesia';
      const newUrl = await uploadCV(file, fileName);
      if (oldUrl) await deleteCVFile(oldUrl);
      setLinks(prev => ({
        ...prev,
        [lang === 'en' ? 'cv_en' : 'cv_id']: newUrl,
      }));
      toast.success(`File CV (${lang === 'en' ? 'English' : 'Indonesia'}) berhasil diunggah!`);
    } catch (err: any) {
      toast.error('Gagal mengunggah file CV: ' + err.message);
    } finally {
      if (lang === 'en') setUploadingEn(false);
      else setUploadingId(false);
      e.target.value = '';
    }
  };

  const copySQL = () => {
    const sql = `CREATE TABLE IF NOT EXISTS cv_settings (
  id VARCHAR(50) PRIMARY KEY,
  url TEXT NOT NULL,
  description TEXT,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE cv_settings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read access" ON cv_settings FOR SELECT USING (true);
CREATE POLICY "Allow authenticated all" ON cv_settings FOR ALL TO authenticated USING (true);

INSERT INTO cv_settings (id, url, description) VALUES
('cv_en', 'https://drive.google.com/file/d/11IWyd4FVIs1QjJGyMLBSaVOV83W-2fwe/view?usp=sharing', 'CV English / Default'),
('cv_id', 'https://drive.google.com/file/d/11IWyd4FVIs1QjJGyMLBSaVOV83W-2fwe/view?usp=sharing', 'CV Indonesia')
ON CONFLICT (id) DO NOTHING;`;
    navigator.clipboard.writeText(sql);
    toast.success('Query SQL berhasil disalin!');
  };

  return (
    <div className="admin-section">

      {/* Page Hero Header */}
      <div className="page-hero">
        <div className="page-hero-inner">
          <div className="page-hero-left">
            <div className="page-hero-icon page-hero-icon-indigo">
              <FileText size={24} />
            </div>
            <div>
              <h2 className="page-hero-title">
                CV / Resume Settings
              </h2>
              <p className="page-hero-desc">Kelola link dan file CV untuk versi Bahasa Inggris & Indonesia</p>
            </div>
          </div>
          <div className="page-hero-actions">
            <button className="btn-secondary" onClick={fetchCVLinks} disabled={loading}>
              <RefreshCw size={16} className={loading ? 'spin' : ''} />
              Refresh
            </button>
            <button
              id="save-cv-btn"
              className="btn-primary"
              onClick={handleSave as any}
              disabled={saving || uploadingEn || uploadingId}
            >
              {saving ? <Loader2 size={16} className="spin" /> : <Save size={16} />}
              {saving ? 'Menyimpan...' : 'Simpan CV'}
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      {loading ? (
        <div className="loading-wrap"><Loader2 size={32} className="spin" /></div>
      ) : tableMissing ? (
        <div className="table-wrap" style={{ padding: '1.5rem' }}>
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start', marginBottom: '1.25rem' }}>
            <div style={{ width: 44, height: 44, borderRadius: 12, background: 'hsl(37 100% 50% / 0.1)', color: 'hsl(37 100% 44%)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <AlertTriangle size={22} />
            </div>
            <div>
              <h3 style={{ fontFamily: 'var(--a-font-head)', fontSize: '0.95rem', fontWeight: 700, color: 'var(--a-text)', margin: '0 0 0.375rem' }}>Tabel Database Belum Dibuat</h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--a-text-sub)', margin: 0 }}>
                Tabel <code style={{ padding: '2px 6px', borderRadius: 4, background: 'var(--a-surface2)', fontFamily: 'monospace', fontSize: '0.8em' }}>cv_settings</code> tidak ditemukan. Buat terlebih dahulu di Supabase SQL Editor.
              </p>
            </div>
          </div>
          <p style={{ fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--a-text-light)', marginBottom: '0.625rem' }}>SQL Query untuk Supabase</p>
          <div style={{ position: 'relative', borderRadius: 10, overflow: 'hidden', border: '1px solid var(--a-border)', background: '#0f172a', padding: '1rem' }}>
            <button onClick={copySQL} style={{ position: 'absolute', top: 10, right: 10, padding: '6px 8px', borderRadius: 8, background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.12)', color: '#94a3b8', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4, fontSize: '0.75rem' }}>
              <Copy size={14} /> Salin
            </button>
            <pre style={{ margin: 0, color: '#e2e8f0', fontFamily: 'monospace', fontSize: '0.8rem', overflowX: 'auto', whiteSpace: 'pre-wrap' }}>{`CREATE TABLE IF NOT EXISTS cv_settings (
  id VARCHAR(50) PRIMARY KEY,
  url TEXT NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
ALTER TABLE cv_settings ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public read" ON cv_settings FOR SELECT USING (true);
CREATE POLICY "Allow auth all"    ON cv_settings FOR ALL TO authenticated USING (true);

INSERT INTO cv_settings (id, url) VALUES
  ('cv_en', 'https://your-cv-link-en'),
  ('cv_id', 'https://your-cv-link-id')
ON CONFLICT (id) DO NOTHING;`}</pre>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSave}>
          {error && <div className="form-error">{error}</div>}

          {/* 2-Column CV Grid */}
          <div className="cv-page-grid">

            {/* English CV Card */}
            <div className="cv-card">
              <div className="cv-card-header">
                <div className="cv-card-icon cv-card-icon-blue">
                  <Globe size={22} />
                </div>
                <div>
                  <h3 className="cv-card-title">CV (English / Default)</h3>
                  <p className="cv-card-desc">Digunakan saat pengunjung memilih bahasa Inggris</p>
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Tautan URL CV *</label>
                <input
                  type="url"
                  className="form-input"
                  value={links.cv_en}
                  onChange={(e) => setLinks(prev => ({ ...prev, cv_en: e.target.value }))}
                  placeholder="https://drive.google.com/file/d/.../view"
                  required
                />
                {links.cv_en && (
                  <a href={links.cv_en} target="_blank" rel="noreferrer" className="link-btn" style={{ marginTop: 6, width: 'auto', padding: '4px 10px', gap: 6, fontSize: '0.78rem', borderRadius: 6 }}>
                    <ExternalLink size={13} /> Buka Link
                  </a>
                )}
              </div>

              <div className="cv-upload-zone" onClick={() => document.getElementById('file-en')?.click()}>
                {uploadingEn ? (
                  <><Loader2 size={20} className="spin" style={{ color: 'var(--a-primary)' }} /><p>Sedang mengunggah...</p></>
                ) : (
                  <><Upload size={20} style={{ color: 'var(--a-primary)' }} /><p>Klik untuk upload PDF baru</p></>
                )}
              </div>
              <input id="file-en" type="file" accept=".pdf" className="hidden" style={{ display: 'none' }} onChange={(e) => handleFileUpload(e, 'en')} disabled={uploadingEn} />

              {links.cv_en?.includes('/storage/v1/object/public/') && (
                <div style={{ marginTop: '0.75rem', display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.8rem', color: 'var(--a-success)', fontWeight: 600 }}>
                  <Check size={14} /> Terunggah di Supabase Storage
                </div>
              )}
            </div>

            {/* Indonesian CV Card */}
            <div className="cv-card">
              <div className="cv-card-header">
                <div className="cv-card-icon cv-card-icon-emerald">
                  <FileText size={22} />
                </div>
                <div>
                  <h3 className="cv-card-title">CV (Bahasa Indonesia)</h3>
                  <p className="cv-card-desc">Digunakan saat pengunjung memilih Bahasa Indonesia</p>
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Tautan URL CV *</label>
                <input
                  type="url"
                  className="form-input"
                  value={links.cv_id}
                  onChange={(e) => setLinks(prev => ({ ...prev, cv_id: e.target.value }))}
                  placeholder="https://drive.google.com/file/d/.../view"
                  required
                />
                {links.cv_id && (
                  <a href={links.cv_id} target="_blank" rel="noreferrer" className="link-btn" style={{ marginTop: 6, width: 'auto', padding: '4px 10px', gap: 6, fontSize: '0.78rem', borderRadius: 6 }}>
                    <ExternalLink size={13} /> Buka Link
                  </a>
                )}
              </div>

              <div className="cv-upload-zone" onClick={() => document.getElementById('file-id')?.click()}>
                {uploadingId ? (
                  <><Loader2 size={20} className="spin" style={{ color: 'var(--a-success)' }} /><p>Sedang mengunggah...</p></>
                ) : (
                  <><Upload size={20} style={{ color: 'var(--a-success)' }} /><p>Klik untuk upload PDF baru</p></>
                )}
              </div>
              <input id="file-id" type="file" accept=".pdf" className="hidden" style={{ display: 'none' }} onChange={(e) => handleFileUpload(e, 'id')} disabled={uploadingId} />

              {links.cv_id?.includes('/storage/v1/object/public/') && (
                <div style={{ marginTop: '0.75rem', display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.8rem', color: 'var(--a-success)', fontWeight: 600 }}>
                  <Check size={14} /> Terunggah di Supabase Storage
                </div>
              )}
            </div>
          </div>
        </form>
      )}
    </div>
  );
}
