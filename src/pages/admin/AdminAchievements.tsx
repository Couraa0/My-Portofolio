import { useState, useEffect, useRef } from 'react';
import {
  Plus, Pencil, Trash2, X, Check, Upload, Loader2, Search, ExternalLink, FileText
} from 'lucide-react';
import {
  getAchievements, createAchievement, updateAchievement, deleteAchievement,
  uploadImage, Achievement
} from '@/lib/supabase';

const emptyForm: Omit<Achievement, 'id' | 'created_at'> = {
  title: '',
  issuer: '',
  issue_date: '',
  credential_id: '',
  credential_url: '',
  images: [],
  type: 'Course',
  category: '',
};

const TYPE_OPTIONS = ['Course', 'Award', 'Profesional', 'Certification', 'Competition'];

const isPdf = (url: string) => url.toLowerCase().includes('.pdf') || url.startsWith('data:application/pdf');

export default function AdminAchievements() {
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [uploading, setUploading] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [error, setError] = useState('');
  const fileRef = useRef<HTMLInputElement>(null);

  const fetchAchievements = async () => {
    setLoading(true);
    try {
      const data = await getAchievements();
      setAchievements(data);
    } catch (e: unknown) {
      setError((e as Error).message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchAchievements(); }, []);

  const openCreate = () => {
    setForm(emptyForm);
    setEditId(null);
    setImageFiles([]);
    setImagePreviews([]);
    setError('');
    setShowModal(true);
  };

  const openEdit = (achievement: Achievement) => {
    setForm({
      title: achievement.title,
      issuer: achievement.issuer,
      issue_date: achievement.issue_date,
      credential_id: achievement.credential_id || '',
      credential_url: achievement.credential_url || '',
      images: achievement.images || [],
      type: achievement.type,
      category: achievement.category,
    });
    setEditId(achievement.id!);
    setImageFiles([]);
    setImagePreviews([]);
    setError('');
    setShowModal(true);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;
    setImageFiles((prev) => [...prev, ...files]);
    
    files.forEach(file => {
      const reader = new FileReader();
      reader.onload = (ev) => {
        setImagePreviews((prev) => [...prev, ev.target?.result as string]);
      };
      reader.readAsDataURL(file);
    });
  };

  const removeExistingImage = (index: number) => {
    setForm(f => ({ ...f, images: f.images?.filter((_, i) => i !== index) || [] }));
  };

  const removeNewImage = (index: number) => {
    setImageFiles(prev => prev.filter((_, i) => i !== index));
    setImagePreviews(prev => prev.filter((_, i) => i !== index));
  };

  const handleSave = async () => {
    if (!form.title || !form.issuer || !form.issue_date) {
      setError('Title, Issuer, dan Issue Date wajib diisi.');
      return;
    }
    setSaving(true);
    setError('');
    try {
      setUploading(true);
      const newImageUrls = await Promise.all(
        imageFiles.map((file, i) => 
          uploadImage('achievements', file, `${form.title.replace(/\s+/g, '-').toLowerCase()}-${Date.now()}-${i}`)
        )
      );
      setUploading(false);

      const payload = { ...form, images: [...(form.images || []), ...newImageUrls] };

      if (editId) {
        await updateAchievement(editId, payload);
      } else {
        await createAchievement(payload);
      }
      await fetchAchievements();
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
      await deleteAchievement(id);
      await fetchAchievements();
      setDeleteId(null);
    } catch (e: unknown) {
      setError((e as Error).message);
    }
  };

  const filtered = achievements.filter(
    (a) =>
      a.title.toLowerCase().includes(search.toLowerCase()) ||
      a.issuer.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="admin-section">
      <div className="section-header">
        <div>
          <h2 className="section-heading">Achievements</h2>
          <p className="section-desc">{achievements.length} achievement tersimpan di database</p>
        </div>
        <button id="add-achievement-btn" className="btn-primary" onClick={openCreate}>
          <Plus size={18} /> Tambah Achievement
        </button>
      </div>

      <div className="search-wrap">
        <Search size={18} className="search-icon" />
        <input
          type="search"
          placeholder="Cari achievement..."
          className="search-input"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {loading ? (
        <div className="loading-wrap"><Loader2 size={32} className="spin" /></div>
      ) : (
        <div className="table-wrap">
          <table className="data-table">
            <thead>
              <tr>
                <th>Image</th>
                <th>Title</th>
                <th>Issuer</th>
                <th>Type</th>
                <th>Category</th>
                <th>Issue Date</th>
                <th>Credential</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={8} className="table-empty">Belum ada data achievement</td>
                </tr>
              ) : (
                filtered.map((ach) => (
                  <tr key={ach.id} className="table-row">
                    <td>
                      {ach.images && ach.images.length > 0 ? (
                        <div className="table-img relative">
                          <img src={ach.images[0]} alt={ach.title} className="w-full h-full object-cover rounded" />
                          {ach.images.length > 1 && (
                            <span className="absolute bottom-0 right-0 bg-black/60 text-white text-[10px] px-1 rounded-tl">+{ach.images.length - 1}</span>
                          )}
                        </div>
                      ) : (
                        <div className="table-img-placeholder">No Img</div>
                      )}
                    </td>
                    <td>
                      <p className="table-primary">{ach.title}</p>
                      <p className="table-secondary">{ach.credential_id || '—'}</p>
                    </td>
                    <td className="table-secondary">{ach.issuer}</td>
                    <td>
                      <span className="badge badge-professional">{ach.type}</span>
                    </td>
                    <td>
                      <span className="badge badge-personal">{ach.category}</span>
                    </td>
                    <td className="table-secondary">{ach.issue_date}</td>
                    <td>
                      {ach.credential_url && ach.credential_url !== '#' ? (
                        <a href={ach.credential_url} target="_blank" rel="noreferrer" className="link-btn">
                          <ExternalLink size={14} />
                        </a>
                      ) : (
                        <span className="table-secondary">—</span>
                      )}
                    </td>
                    <td>
                      <div className="action-btns">
                        <button className="btn-edit" onClick={() => openEdit(ach)} title="Edit">
                          <Pencil size={15} />
                        </button>
                        <button className="btn-delete" onClick={() => setDeleteId(ach.id!)} title="Hapus">
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
            <h3 className="confirm-title">Hapus Achievement?</h3>
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
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3 className="modal-title">{editId ? 'Edit Achievement' : 'Tambah Achievement'}</h3>
              <button className="modal-close" onClick={() => setShowModal(false)}><X size={20} /></button>
            </div>
            <div className="modal-body">
              {error && <div className="form-error">{error}</div>}

              <div className="form-group">
                <label className="form-label">Title *</label>
                <input className="form-input" value={form.title} onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))} placeholder="Nama sertifikat / award" />
              </div>

              <div className="form-grid-2">
                <div className="form-group">
                  <label className="form-label">Issuer *</label>
                  <input className="form-input" value={form.issuer} onChange={(e) => setForm((f) => ({ ...f, issuer: e.target.value }))} placeholder="e.g. Dicoding Indonesia" />
                </div>
                <div className="form-group">
                  <label className="form-label">Issue Date *</label>
                  <input className="form-input" value={form.issue_date} onChange={(e) => setForm((f) => ({ ...f, issue_date: e.target.value }))} placeholder="e.g. January 2025" />
                </div>
              </div>

              <div className="form-grid-2">
                <div className="form-group">
                  <label className="form-label">Type</label>
                  <select className="form-select" value={form.type} onChange={(e) => setForm((f) => ({ ...f, type: e.target.value }))}>
                    {TYPE_OPTIONS.map((t) => <option key={t}>{t}</option>)}
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label">Category</label>
                  <input className="form-input" value={form.category} onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))} placeholder="e.g. Mobile, Backend, Web" />
                </div>
              </div>

              <div className="form-grid-2">
                <div className="form-group">
                  <label className="form-label">Credential ID</label>
                  <input className="form-input" value={form.credential_id} onChange={(e) => setForm((f) => ({ ...f, credential_id: e.target.value }))} placeholder="ID Sertifikat" />
                </div>
                <div className="form-group">
                  <label className="form-label">Credential URL</label>
                  <input className="form-input" value={form.credential_url} onChange={(e) => setForm((f) => ({ ...f, credential_url: e.target.value }))} placeholder="https://..." />
                </div>
              </div>

              {/* Multiple Images Upload */}
              <div className="form-group">
                <label className="form-label">Gambar Achievement (Bisa lebih dari satu)</label>
                
                {/* Existing Images */}
                {form.images && form.images.length > 0 && (
                  <div className="flex flex-wrap gap-3 mb-3">
                    {form.images.map((img, idx) => (
                      <div key={idx} className="relative w-20 h-20 border border-border/50 rounded overflow-hidden">
                        <img src={img} alt="existing" className="w-full h-full object-cover" />
                        <button type="button" onClick={() => removeExistingImage(idx)} className="absolute top-1 right-1 bg-black/60 text-white rounded-full p-0.5 hover:bg-black">
                          <X size={12} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}

                {/* New Images Previews */}
                {imagePreviews.length > 0 && (
                  <div className="flex flex-wrap gap-3 mb-3">
                    {imagePreviews.map((preview, idx) => (
                      <div key={idx} className="relative w-20 h-20 border border-border/50 rounded overflow-hidden opacity-70">
                        <img src={preview} alt="new-preview" className="w-full h-full object-cover" />
                        <button type="button" onClick={() => removeNewImage(idx)} className="absolute top-1 right-1 bg-black/60 text-white rounded-full p-0.5 hover:bg-red-500">
                          <X size={12} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}

                <div className="upload-area py-4" onClick={() => fileRef.current?.click()}>
                  <div className="upload-placeholder flex flex-col items-center">
                    <Upload size={24} className="mb-2" />
                    <p>Klik untuk tambah gambar baru</p>
                    <span className="text-xs">PNG, JPG, WEBP (Multiple allowed)</span>
                  </div>
                </div>
                <input ref={fileRef} type="file" accept="image/*" multiple style={{ display: 'none' }} onChange={handleImageChange} />
              </div>
            </div>

            <div className="modal-footer">
              <button className="btn-secondary" onClick={() => setShowModal(false)}>Batal</button>
              <button id="save-achievement-btn" className="btn-primary" onClick={handleSave} disabled={saving}>
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
