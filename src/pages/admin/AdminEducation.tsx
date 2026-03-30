import { useState, useEffect, useRef } from 'react';
import {
  Plus, Pencil, Trash2, X, Check, Upload, Loader2, Search
} from 'lucide-react';
import {
  getEducation, createEducation, updateEducation, deleteEducation,
  uploadImage, Education
} from '@/lib/supabase';

const emptyForm: Omit<Education, 'id' | 'created_at'> = {
  school: '',
  degree: '',
  period: '',
  location: '',
  gpa: '',
  logo_url: '',
  description: '',
  sort_order: 0,
};

export default function AdminEducation() {
  const [educations, setEducations] = useState<Education[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState('');
  const [uploading, setUploading] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [error, setError] = useState('');
  const fileRef = useRef<HTMLInputElement>(null);

  const fetchEducations = async () => {
    setLoading(true);
    try {
      const data = await getEducation();
      setEducations(data);
    } catch (e: unknown) {
      setError((e as Error).message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchEducations(); }, []);

  const openCreate = () => {
    setForm(emptyForm);
    setEditId(null);
    setImageFile(null);
    setImagePreview('');
    setError('');
    setShowModal(true);
  };

  const openEdit = (edu: Education) => {
    setForm({
      school: edu.school,
      degree: edu.degree,
      period: edu.period,
      location: edu.location,
      gpa: edu.gpa || '',
      logo_url: edu.logo_url || '',
      description: edu.description || '',
      sort_order: edu.sort_order || 0,
    });
    setEditId(edu.id!);
    setImageFile(null);
    setImagePreview(edu.logo_url || '');
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
    if (!form.school || !form.degree || !form.period) {
      setError('School, Degree, dan Period wajib diisi.');
      return;
    }
    setSaving(true);
    setError('');
    try {
      let logoUrl = form.logo_url;
      if (imageFile) {
        setUploading(true);
        // Using 'experiences' bucket as it acts as a generic bucket for logos
        logoUrl = await uploadImage('experiences', imageFile, form.school.replace(/\s+/g, '-').toLowerCase());
        setUploading(false);
      }

      const payload = { ...form, logo_url: logoUrl };

      if (editId) {
        await updateEducation(editId, payload);
      } else {
        await createEducation(payload);
      }
      await fetchEducations();
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
      await deleteEducation(id);
      await fetchEducations();
      setDeleteId(null);
    } catch (e: unknown) {
      setError((e as Error).message);
    }
  };

  const filtered = educations.filter(
    (e) =>
      e.school.toLowerCase().includes(search.toLowerCase()) ||
      e.degree.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="admin-section">
      <div className="section-header">
        <div>
          <h2 className="section-heading">Education</h2>
          <p className="section-desc">{educations.length} riwayat pendidikan tersimpan di database</p>
        </div>
        <button id="add-education-btn" className="btn-primary" onClick={openCreate}>
          <Plus size={18} /> Tambah Pendidikan
        </button>
      </div>

      <div className="search-wrap">
        <Search size={18} className="search-icon" />
        <input
          type="search"
          placeholder="Cari pendidikan..."
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
                <th>Logo</th>
                <th>School</th>
                <th>Degree</th>
                <th>Period</th>
                <th>GPA</th>
                <th>Order</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={7} className="table-empty">Belum ada data pendidikan</td>
                </tr>
              ) : (
                filtered.map((edu) => (
                  <tr key={edu.id} className="table-row">
                    <td>
                      {edu.logo_url ? (
                        <img src={edu.logo_url} alt={edu.school} className="table-img table-img-round" />
                      ) : (
                        <div className="table-img-placeholder table-img-round">
                          {edu.school.charAt(0)}
                        </div>
                      )}
                    </td>
                    <td>
                      <p className="table-primary">{edu.school}</p>
                      <p className="text-xs text-muted-foreground">{edu.location}</p>
                    </td>
                    <td className="table-secondary max-w-xs truncate" title={edu.degree}>{edu.degree}</td>
                    <td className="table-secondary">{edu.period}</td>
                    <td className="table-secondary">{edu.gpa || '-'}</td>
                    <td className="table-secondary">{edu.sort_order ?? 0}</td>
                    <td>
                      <div className="action-btns">
                        <button className="btn-edit" onClick={() => openEdit(edu)} title="Edit">
                          <Pencil size={15} />
                        </button>
                        <button className="btn-delete" onClick={() => setDeleteId(edu.id!)} title="Hapus">
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
            <h3 className="confirm-title">Hapus Pendidikan?</h3>
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
              <h3 className="modal-title">{editId ? 'Edit Pendidikan' : 'Tambah Pendidikan'}</h3>
              <button className="modal-close" onClick={() => setShowModal(false)}><X size={20} /></button>
            </div>
            <div className="modal-body">
              {error && <div className="form-error">{error}</div>}

              <div className="form-grid-2">
                <div className="form-group">
                  <label className="form-label">School / University *</label>
                  <input className="form-input" value={form.school} onChange={(e) => setForm((f) => ({ ...f, school: e.target.value }))} placeholder="Nama institusi pendidikan" />
                </div>
                <div className="form-group">
                  <label className="form-label">Degree / Jurusan *</label>
                  <input className="form-input" value={form.degree} onChange={(e) => setForm((f) => ({ ...f, degree: e.target.value }))} placeholder="e.g. Teknik Informatika" />
                </div>
              </div>

              <div className="form-grid-2">
                <div className="form-group">
                  <label className="form-label">Period *</label>
                  <input className="form-input" value={form.period} onChange={(e) => setForm((f) => ({ ...f, period: e.target.value }))} placeholder="e.g. 2021 - 2025" />
                </div>
                <div className="form-group">
                  <label className="form-label">Location</label>
                  <input className="form-input" value={form.location} onChange={(e) => setForm((f) => ({ ...f, location: e.target.value }))} placeholder="e.g. Karawang, Indonesia" />
                </div>
              </div>

              <div className="form-grid-2">
                <div className="form-group">
                  <label className="form-label">GPA / Nilai</label>
                  <input className="form-input" value={form.gpa} onChange={(e) => setForm((f) => ({ ...f, gpa: e.target.value }))} placeholder="e.g. 3.97" />
                </div>
                <div className="form-group">
                  <label className="form-label">Sort Order</label>
                  <input className="form-input" type="number" value={form.sort_order} onChange={(e) => setForm((f) => ({ ...f, sort_order: parseInt(e.target.value) || 0 }))} placeholder="0" />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Deskripsi Tambahan</label>
                <textarea className="form-input h-24 resize-none" value={form.description} onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))} placeholder="Informasi tambahan mengenai pendidikan ini..." />
              </div>

              {/* Logo Upload */}
              <div className="form-group">
                <label className="form-label">Logo Institusi</label>
                <div className="upload-area upload-area-sm" onClick={() => fileRef.current?.click()}>
                  {imagePreview ? (
                    <img src={imagePreview} alt="preview" className="upload-preview-sm" />
                  ) : (
                    <div className="upload-placeholder">
                      <Upload size={20} />
                      <p>Klik untuk upload logo institusi</p>
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
              <button id="save-education-btn" className="btn-primary" onClick={handleSave} disabled={saving}>
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
