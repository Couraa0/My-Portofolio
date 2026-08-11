import { useState, useEffect, useRef } from 'react';
import {
  Plus, Pencil, Trash2, X, Check, Loader2, Search, Trophy, Upload
} from 'lucide-react';
import {
  getCompetitions, createCompetition, updateCompetition, deleteCompetition,
  uploadImage, Competition
} from '@/lib/supabase';

const emptyForm: Omit<Competition, 'id' | 'created_at'> = {
  title: '',
  role: '',
  award: '',
  project: '',
  skills: [],
  what_was_built: '',
  impact_achievements: [],
  period: '',
  sort_order: 0,
  logo_url: '',
};

export default function AdminCompetitions() {
  const [competitions, setCompetitions] = useState<Competition[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [error, setError] = useState('');

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState('');
  const [uploading, setUploading] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const fetchCompetitions = async () => {
    setLoading(true);
    try {
      const data = await getCompetitions();
      setCompetitions(data);
    } catch (e: unknown) {
      setError((e as Error).message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCompetitions();
  }, []);

  const openCreate = () => {
    setForm(emptyForm);
    setEditId(null);
    setImageFile(null);
    setImagePreview('');
    setError('');
    setShowModal(true);
  };

  const openEdit = (comp: Competition) => {
    setForm({
      title: comp.title,
      role: comp.role,
      award: comp.award,
      project: comp.project || '',
      skills: comp.skills || [],
      what_was_built: comp.what_was_built || '',
      impact_achievements: comp.impact_achievements || [],
      period: comp.period || '',
      sort_order: comp.sort_order || 0,
      logo_url: comp.logo_url || '',
    });
    setEditId(comp.id!);
    setImageFile(null);
    setImagePreview(comp.logo_url || '');
    setError('');
    setShowModal(true);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setImageFile(file);
    const reader = new FileReader();
    reader.onload = (ev) => setImagePreview(ev.target?.result as string);
    reader.readAsDataURL(file);
  };

  const handleSave = async () => {
    if (!form.title || !form.role || !form.award || !form.period) {
      setError('Nama Lomba, Role, Award, dan Period wajib diisi.');
      return;
    }
    setSaving(true);
    setError('');
    try {
      let logoUrl = form.logo_url;
      if (imageFile) {
        setUploading(true);
        logoUrl = await uploadImage('experiences', imageFile, form.title.replace(/\s+/g, '-').toLowerCase());
        setUploading(false);
      }

      const payload = { ...form, logo_url: logoUrl };

      if (editId) {
        await updateCompetition(editId, payload);
      } else {
        await createCompetition(payload);
      }
      await fetchCompetitions();
      setShowModal(false);
    } catch (e: unknown) {
      setError((e as Error).message);
      setUploading(false);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteCompetition(id);
      await fetchCompetitions();
      setDeleteId(null);
    } catch (e: unknown) {
      setError((e as Error).message);
    }
  };

  const filtered = competitions.filter(
    (c) =>
      c.title.toLowerCase().includes(search.toLowerCase()) ||
      c.role.toLowerCase().includes(search.toLowerCase()) ||
      c.award.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="admin-section">
      {/* Page Hero */}
      <div className="page-hero">
        <div className="page-hero-inner">
          <div className="page-hero-left">
            <div className="page-hero-icon page-hero-icon-amber">
              <Trophy size={24} />
            </div>
            <div>
              <h2 className="page-hero-title">
                Competitive Experience
                <span className="count-badge">{competitions.length}</span>
              </h2>
              <p className="page-hero-desc">Kompetisi, hackathon, dan lomba yang pernah diikuti</p>
            </div>
          </div>
          <div className="page-hero-actions">
            <button id="add-competition-btn" className="btn-primary" onClick={openCreate}>
              <Plus size={18} /> Tambah Kompetisi
            </button>
          </div>
        </div>
      </div>

      {/* Toolbar */}
      <div className="page-toolbar">
        <div className="toolbar-search">
          <Search size={16} className="search-icon" />
          <input
            type="search"
            placeholder="Cari nama lomba, role, atau award..."
            className="search-input"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {loading ? (
        <div className="loading-wrap"><Loader2 size={32} className="spin" /></div>
      ) : (
        <div className="table-wrap">
          <table className="data-table">
            <thead>
              <tr>
                <th>Logo</th>
                <th>Nama Lomba</th>
                <th>Role</th>
                <th>Award</th>
                <th>Period</th>
                <th>Skills</th>
                <th>Order</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={8} className="table-empty">Belum ada data kompetisi</td>
                </tr>
              ) : (
                filtered.map((comp) => (
                  <tr key={comp.id} className="table-row">
                    <td>
                      {comp.logo_url ? (
                        <img src={comp.logo_url} alt={comp.title} className="table-img table-img-round" />
                      ) : (
                        <div className="table-img-placeholder table-img-round bg-blue-50 dark:bg-slate-800 text-blue-500">
                          <Trophy size={18} />
                        </div>
                      )}
                    </td>
                    <td>
                      <p className="table-primary">{comp.title}</p>
                    </td>
                    <td className="table-secondary">{comp.role}</td>
                    <td className="table-secondary">
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-50 dark:bg-amber-950/20 text-amber-600 dark:text-amber-400 border border-amber-500/10">
                        🏆 {comp.award}
                      </span>
                    </td>
                    <td className="table-secondary">{comp.period}</td>
                    <td>
                      <div className="tech-tags">
                        {(comp.skills || []).slice(0, 2).map((s) => (
                          <span key={s} className="tech-tag">{s}</span>
                        ))}
                        {(comp.skills || []).length > 2 && (
                          <span className="tech-tag">+{comp.skills.length - 2}</span>
                        )}
                      </div>
                    </td>
                    <td className="table-secondary">{comp.sort_order ?? 0}</td>
                    <td>
                      <div className="action-btns">
                        <button className="btn-edit" onClick={() => openEdit(comp)} title="Edit">
                          <Pencil size={15} />
                        </button>
                        <button className="btn-delete" onClick={() => setDeleteId(comp.id!)} title="Hapus">
                          <Trash2 size={15} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* DELETE CONFIRM */}
      {deleteId && (
        <div className="modal-overlay">
          <div className="confirm-modal">
            <h3 className="confirm-title">Hapus Kompetisi?</h3>
            <p className="confirm-desc">Data akan dihapus permanen dari database.</p>
            <div className="confirm-actions">
              <button className="btn-secondary" onClick={() => setDeleteId(null)}>Batal</button>
              <button className="btn-danger" onClick={() => handleDelete(deleteId)}>Ya, Hapus</button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL */}
      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal modal-wide" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3 className="modal-title">{editId ? 'Edit Kompetisi' : 'Tambah Kompetisi'}</h3>
              <button className="modal-close" onClick={() => setShowModal(false)}><X size={20} /></button>
            </div>
            <div className="modal-body text-left">
              {error && <div className="form-error">{error}</div>}

              <div className="form-grid-2">
                <div className="form-group">
                  <label className="form-label">Nama Lomba *</label>
                  <input
                    className="form-input"
                    value={form.title}
                    onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
                    placeholder="e.g. Hackathon X Digdaya — Bank Indonesia"
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Role / Peran *</label>
                  <input
                    className="form-input"
                    value={form.role}
                    onChange={(e) => setForm((f) => ({ ...f, role: e.target.value }))}
                    placeholder="e.g. Generative AI Engineer"
                  />
                </div>
              </div>

              <div className="form-grid-2">
                <div className="form-group">
                  <label className="form-label">Award / Penghargaan *</label>
                  <input
                    className="form-input"
                    value={form.award}
                    onChange={(e) => setForm((f) => ({ ...f, award: e.target.value }))}
                    placeholder="e.g. Top 20% Nasional"
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Project Name</label>
                  <input
                    className="form-input"
                    value={form.project}
                    onChange={(e) => setForm((f) => ({ ...f, project: e.target.value }))}
                    placeholder="e.g. Solusi Generative AI QRIS Ecosystem"
                  />
                </div>
              </div>

              <div className="form-grid-2">
                <div className="form-group">
                  <label className="form-label">Period / Waktu *</label>
                  <input
                    className="form-input"
                    value={form.period}
                    onChange={(e) => setForm((f) => ({ ...f, period: e.target.value }))}
                    placeholder="e.g. Jan 2024"
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Sort Order</label>
                  <input
                    className="form-input"
                    type="number"
                    value={form.sort_order}
                    onChange={(e) => setForm((f) => ({ ...f, sort_order: parseInt(e.target.value) || 0 }))}
                    placeholder="0"
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">What Was Built (Deskripsi Ringkas)</label>
                <textarea
                  className="form-input min-h-[80px] py-2 resize-y"
                  value={form.what_was_built}
                  onChange={(e) => setForm((f) => ({ ...f, what_was_built: e.target.value }))}
                  placeholder="Jelaskan kontribusi / apa yang dibangun dalam kompetisi ini..."
                />
              </div>

              <div className="form-group">
                <label className="form-label">Skills (Pisahkan dengan koma)</label>
                <input
                  className="form-input"
                  value={(form.skills || []).join(', ')}
                  onChange={(e) => {
                    const list = e.target.value.split(',').map((s) => s.trim()).filter((s) => s !== '');
                    setForm((f) => ({ ...f, skills: list }));
                  }}
                  placeholder="e.g. Generative AI, Fintech, QRIS"
                />
                <div className="tech-tags mt-2">
                  {(form.skills || []).map((s) => (
                    <span key={s} className="tech-tag">{s}</span>
                  ))}
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Impact & Achievements (Satu per baris)</label>
                <textarea
                  className="form-input min-h-[100px] py-2 resize-y font-mono"
                  value={(form.impact_achievements || []).join('\n')}
                  onChange={(e) => {
                    const list = e.target.value.split('\n').map((s) => s.trim()).filter((s) => s !== '');
                    setForm((f) => ({ ...f, impact_achievements: list }));
                  }}
                  placeholder="Masukkan poin pencapaian, pisahkan dengan baris baru..."
                />
              </div>

              {/* Logo Upload */}
              <div className="form-group mt-4">
                <label className="form-label">Logo Kompetisi</label>
                <div className="upload-area upload-area-sm" onClick={() => fileRef.current?.click()}>
                  {imagePreview ? (
                    <img src={imagePreview} alt="preview" className="upload-preview-sm" />
                  ) : (
                    <div className="upload-placeholder">
                      <Upload size={20} />
                      <p>Klik untuk upload logo</p>
                    </div>
                  )}
                </div>
                <input ref={fileRef} type="file" accept="image/*" style={{ display: 'none' }} onChange={handleImageChange} />
                {imagePreview && (
                  <button type="button" className="btn-secondary btn-sm mt-2" onClick={() => { setImageFile(null); setImagePreview(''); setForm((f) => ({ ...f, logo_url: '' })); }}>
                    Hapus Logo
                  </button>
                )}
              </div>
            </div>

            <div className="modal-footer">
              <button className="btn-secondary" onClick={() => setShowModal(false)}>Batal</button>
              <button id="save-competition-btn" className="btn-primary" onClick={handleSave} disabled={saving}>
                {saving || uploading ? <Loader2 size={16} className="spin" /> : <Check size={16} />}
                {saving ? 'Menyimpan...' : 'Simpan'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

