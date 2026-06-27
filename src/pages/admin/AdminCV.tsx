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
      // Perform updates for both IDs
      await Promise.all([
        updateCVSettings('cv_en', links.cv_en),
        updateCVSettings('cv_id', links.cv_id),
      ]);
      toast.success('Link CV berhasil diperbarui!');
      fetchCVLinks();
    } catch (err: any) {
      console.error('Error saving CV links:', err);
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
      
      // Delete old storage file if it exists and is on Supabase
      if (oldUrl) {
        await deleteCVFile(oldUrl);
      }
      
      setLinks(prev => ({
        ...prev,
        [lang === 'en' ? 'cv_en' : 'cv_id']: newUrl
      }));
      
      toast.success(`File CV (${lang === 'en' ? 'English' : 'Indonesia'}) berhasil diunggah!`);
    } catch (err: any) {
      console.error('File upload error:', err);
      toast.error('Gagal mengunggah file CV: ' + err.message);
    } finally {
      if (lang === 'en') setUploadingEn(false);
      else setUploadingId(false);
      
      // Reset input element value to allow re-uploading same file
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
    toast.success('Query SQL berhasil disalin ke clipboard!');
  };

  return (
    <div className="admin-section">
      <div className="section-header">
        <div>
          <h2 className="section-heading">CV / Resume Settings</h2>
          <p className="section-desc">Kelola link Google Drive atau unggah file CV Anda langsung untuk versi Bahasa Inggris dan Bahasa Indonesia</p>
        </div>
        <button className="btn-secondary flex items-center gap-2" onClick={fetchCVLinks} disabled={loading}>
          <RefreshCw size={16} className={loading ? 'animate-spin' : ''} />
          Refresh
        </button>
      </div>

      {loading ? (
        <div className="loading-wrap">
          <Loader2 size={32} className="spin" />
        </div>
      ) : tableMissing ? (
        <div className="p-6 rounded-2xl bg-amber-500/10 border border-amber-500/20 max-w-3xl space-y-4">
          <div className="flex gap-3 items-start">
            <AlertTriangle className="text-amber-500 shrink-0 mt-1" size={24} />
            <div>
              <h3 className="text-base font-bold text-foreground">Tabel Database Belum Dibuat</h3>
              <p className="text-sm text-muted-foreground mt-1 leading-relaxed">
                Tabel <code className="px-1.5 py-0.5 rounded bg-muted font-mono text-xs">cv_settings</code> tidak ditemukan di database Supabase Anda. Anda perlu membuatnya terlebih dahulu di dashboard Supabase.
              </p>
            </div>
          </div>

          <div className="space-y-2 pt-2">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">SQL QUERY UNTUK SUPABASE SQL EDITOR</p>
            <div className="relative rounded-xl overflow-hidden border border-border bg-slate-950 p-4 font-mono text-[11px] text-slate-300 leading-normal select-all">
              <button 
                onClick={copySQL}
                className="absolute top-2.5 right-2.5 p-2 rounded-lg bg-slate-900 border border-slate-800 hover:bg-slate-800 transition-all text-slate-400 hover:text-foreground"
                title="Salin Query"
              >
                <Copy size={14} />
              </button>
              <pre style={{ margin: 0, overflowX: 'auto' }}>{`CREATE TABLE IF NOT EXISTS cv_settings (
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
ON CONFLICT (id) DO NOTHING;`}</pre>
            </div>
            <p className="text-[11px] text-muted-foreground italic">
              * Silakan salin query di atas, buka dashboard Supabase Anda, masuk ke menu <strong>SQL Editor</strong>, buat query baru, paste query tersebut, lalu jalankan (run). Setelah itu, klik tombol <strong>Refresh</strong> di halaman ini.
            </p>
          </div>
        </div>
      ) : (
        <div className="max-w-3xl">
          {error && <div className="form-error mb-4">{error}</div>}

          <form onSubmit={handleSave} className="space-y-6">
            {/* English CV Card */}
            <div className="p-6 rounded-2xl bg-card border border-border shadow-sm space-y-4 hover:border-blue-500/20 transition-all">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-500 flex items-center justify-center">
                  <Globe size={20} />
                </div>
                <div className="text-left">
                  <h3 className="text-sm font-bold text-foreground">CV / Resume Link (English / Default)</h3>
                  <p className="text-xs text-muted-foreground">Tautan ini akan digunakan ketika pengunjung memilih bahasa Inggris atau sebagai opsi default.</p>
                </div>
              </div>

              <div className="form-group text-left">
                <label className="form-label font-semibold">Tautan URL CV *</label>
                <input
                  type="url"
                  className="form-input"
                  value={links.cv_en}
                  onChange={(e) => setLinks(prev => ({ ...prev, cv_en: e.target.value }))}
                  placeholder="https://drive.google.com/file/d/.../view?usp=sharing"
                  required
                />
              </div>

              <div className="form-group text-left mt-2 pt-2 border-t border-border/40">
                <label className="form-label font-semibold text-xs text-muted-foreground block mb-2">Atau Unggah File CV Baru (PDF)</label>
                <div className="flex items-center gap-3">
                  <input
                    type="file"
                    accept=".pdf,application/pdf"
                    id="file-upload-en"
                    className="hidden"
                    onChange={(e) => handleFileUpload(e, 'en')}
                    disabled={uploadingEn}
                  />
                  <label
                    htmlFor="file-upload-en"
                    className="btn-secondary flex items-center gap-2 cursor-pointer text-xs font-semibold px-4 py-2 hover:bg-muted transition-all"
                  >
                    {uploadingEn ? <Loader2 size={14} className="spin" /> : <Upload size={14} />}
                    {uploadingEn ? 'Mengunggah...' : 'Pilih File PDF'}
                  </label>
                  {links.cv_en && links.cv_en.includes('/storage/v1/object/public/') && (
                    <span className="text-[11px] text-emerald-500 flex items-center gap-1 font-semibold">
                      <Check size={14} /> Terunggah di Storage Supabase
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Indonesian CV Card */}
            <div className="p-6 rounded-2xl bg-card border border-border shadow-sm space-y-4 hover:border-emerald-500/20 transition-all">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center">
                  <FileText size={20} />
                </div>
                <div className="text-left">
                  <h3 className="text-sm font-bold text-foreground">CV / Resume Link (Bahasa Indonesia)</h3>
                  <p className="text-xs text-muted-foreground">Tautan ini akan digunakan ketika pengunjung memilih Bahasa Indonesia di toolbar.</p>
                </div>
              </div>

              <div className="form-group text-left">
                <label className="form-label font-semibold">Tautan URL CV *</label>
                <input
                  type="url"
                  className="form-input"
                  value={links.cv_id}
                  onChange={(e) => setLinks(prev => ({ ...prev, cv_id: e.target.value }))}
                  placeholder="https://drive.google.com/file/d/.../view?usp=sharing"
                  required
                />
              </div>

              <div className="form-group text-left mt-2 pt-2 border-t border-border/40">
                <label className="form-label font-semibold text-xs text-muted-foreground block mb-2">Atau Unggah File CV Baru (PDF)</label>
                <div className="flex items-center gap-3">
                  <input
                    type="file"
                    accept=".pdf,application/pdf"
                    id="file-upload-id"
                    className="hidden"
                    onChange={(e) => handleFileUpload(e, 'id')}
                    disabled={uploadingId}
                  />
                  <label
                    htmlFor="file-upload-id"
                    className="btn-secondary flex items-center gap-2 cursor-pointer text-xs font-semibold px-4 py-2 hover:bg-muted transition-all"
                  >
                    {uploadingId ? <Loader2 size={14} className="spin" /> : <Upload size={14} />}
                    {uploadingId ? 'Mengunggah...' : 'Pilih File PDF'}
                  </label>
                  {links.cv_id && links.cv_id.includes('/storage/v1/object/public/') && (
                    <span className="text-[11px] text-emerald-500 flex items-center gap-1 font-semibold">
                      <Check size={14} /> Terunggah di Storage Supabase
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Form Actions */}
            <div className="flex justify-end gap-3 pt-2">
              <button
                type="submit"
                id="save-cv-btn"
                className="btn-primary flex items-center gap-2"
                disabled={saving || uploadingEn || uploadingId}
              >
                {saving ? <Loader2 size={16} className="spin" /> : <Save size={16} />}
                {saving ? 'Menyimpan...' : 'Simpan Tautan CV'}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
