import { useState, useEffect, useRef } from 'react';
import {
  Plus, Pencil, Trash2, X, Check, Upload, Loader2, Search
} from 'lucide-react';
import {
  getExperiences, createExperience, updateExperience, deleteExperience,
  uploadImage, Experience, Competition
} from '@/lib/supabase';

const emptyForm: Omit<Experience, 'id' | 'created_at'> = {
  company: '',
  role: '',
  period: '',
  location: '',
  logo_url: '',
  description: [],
  tools: [],
  sort_order: 0,
  competitions: [],
};

export default function AdminExperience() {
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [descInput, setDescInput] = useState('');
  const [toolInput, setToolInput] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState('');
  const [uploading, setUploading] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [error, setError] = useState('');
  const fileRef = useRef<HTMLInputElement>(null);

  const fetchExperiences = async () => {
    setLoading(true);
    try {
      const data = await getExperiences();
      setExperiences(data);
    } catch (e: unknown) {
      setError((e as Error).message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchExperiences(); }, []);

  const openCreate = () => {
    setForm(emptyForm);
    setEditId(null);
    setImageFile(null);
    setImagePreview('');
    setDescInput('');
    setToolInput('');
    setError('');
    setShowModal(true);
  };

  const openEdit = (exp: Experience) => {
    setForm({
      company: exp.company,
      role: exp.role,
      period: exp.period,
      location: exp.location,
      logo_url: exp.logo_url || '',
      description: exp.description || [],
      tools: exp.tools || [],
      sort_order: exp.sort_order || 0,
      competitions: exp.competitions || [],
    });
    setEditId(exp.id!);
    setImageFile(null);
    setImagePreview(exp.logo_url || '');
    setDescInput('');
    setToolInput('');
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

  const addDesc = () => {
    if (descInput.trim()) {
      setForm((f) => ({ ...f, description: [...f.description, descInput.trim()] }));
      setDescInput('');
    }
  };

  const removeDesc = (i: number) =>
    setForm((f) => ({ ...f, description: f.description.filter((_, idx) => idx !== i) }));

  const addTool = () => {
    if (toolInput.trim() && !(form.tools || []).includes(toolInput.trim())) {
      setForm((f) => ({ ...f, tools: [...(f.tools || []), toolInput.trim()] }));
      setToolInput('');
    }
  };

  const removeTool = (t: string) =>
    setForm((f) => ({ ...f, tools: (f.tools || []).filter((x) => x !== t) }));

  const handleSave = async () => {
    if (!form.company || !form.role || !form.period) {
      setError('Company, Role, dan Period wajib diisi.');
      return;
    }
    setSaving(true);
    setError('');
    try {
      let logoUrl = form.logo_url;
      if (imageFile) {
        setUploading(true);
        logoUrl = await uploadImage('experiences', imageFile, form.company.replace(/\s+/g, '-').toLowerCase());
        setUploading(false);
      }

      const payload = { ...form, logo_url: logoUrl };

      if (editId) {
        await updateExperience(editId, payload);
      } else {
        await createExperience(payload);
      }
      await fetchExperiences();
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
      await deleteExperience(id);
      await fetchExperiences();
      setDeleteId(null);
    } catch (e: unknown) {
      setError((e as Error).message);
    }
  };

  const filtered = experiences.filter(
    (e) =>
      e.company.toLowerCase().includes(search.toLowerCase()) ||
      e.role.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="admin-section">
      <div className="section-header">
        <div>
          <h2 className="section-heading">Experience</h2>
          <p className="section-desc">{experiences.length} experience tersimpan di database</p>
        </div>
        <button id="add-experience-btn" className="btn-primary" onClick={openCreate}>
          <Plus size={18} /> Tambah Experience
        </button>
      </div>

      <div className="search-wrap">
        <Search size={18} className="search-icon" />
        <input
          type="search"
          placeholder="Cari experience..."
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
                <th>Company</th>
                <th>Role</th>
                <th>Period</th>
                <th>Location</th>
                <th>Skills</th>
                <th>Order</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={8} className="table-empty">Belum ada data experience</td>
                </tr>
              ) : (
                filtered.map((exp) => (
                  <tr key={exp.id} className="table-row">
                    <td>
                      {exp.logo_url ? (
                        <img src={exp.logo_url} alt={exp.company} className="table-img table-img-round" />
                      ) : (
                        <div className="table-img-placeholder table-img-round">
                          {exp.company.charAt(0)}
                        </div>
                      )}
                    </td>
                    <td>
                      <p className="table-primary">{exp.company}</p>
                    </td>
                    <td className="table-secondary">{exp.role}</td>
                    <td className="table-secondary">{exp.period}</td>
                    <td className="table-secondary">{exp.location}</td>
                    <td>
                      <div className="tech-tags">
                        {(exp.tools || []).slice(0, 2).map((t) => (
                          <span key={t} className="tech-tag">{t}</span>
                        ))}
                        {(exp.tools || []).length > 2 && (
                          <span className="tech-tag">+{(exp.tools || []).length - 2}</span>
                        )}
                      </div>
                    </td>
                    <td className="table-secondary">{exp.sort_order ?? 0}</td>
                    <td>
                      <div className="action-btns">
                        <button className="btn-edit" onClick={() => openEdit(exp)} title="Edit">
                          <Pencil size={15} />
                        </button>
                        <button className="btn-delete" onClick={() => setDeleteId(exp.id!)} title="Hapus">
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
            <h3 className="confirm-title">Hapus Experience?</h3>
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
              <h3 className="modal-title">{editId ? 'Edit Experience' : 'Tambah Experience'}</h3>
              <button className="modal-close" onClick={() => setShowModal(false)}><X size={20} /></button>
            </div>
            <div className="modal-body">
              {error && <div className="form-error">{error}</div>}

              <div className="form-grid-2">
                <div className="form-group">
                  <label className="form-label">Company *</label>
                  <input className="form-input" value={form.company} onChange={(e) => setForm((f) => ({ ...f, company: e.target.value }))} placeholder="Nama perusahaan / organisasi" />
                </div>
                <div className="form-group">
                  <label className="form-label">Role *</label>
                  <input className="form-input" value={form.role} onChange={(e) => setForm((f) => ({ ...f, role: e.target.value }))} placeholder="e.g. IT Project Manager" />
                </div>
              </div>

              <div className="form-grid-2">
                <div className="form-group">
                  <label className="form-label">Period *</label>
                  <input className="form-input" value={form.period} onChange={(e) => setForm((f) => ({ ...f, period: e.target.value }))} placeholder="e.g. Jan 2024 – Sekarang" />
                </div>
                <div className="form-group">
                  <label className="form-label">Location</label>
                  <input className="form-input" value={form.location} onChange={(e) => setForm((f) => ({ ...f, location: e.target.value }))} placeholder="e.g. Jakarta, Indonesia" />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Sort Order</label>
                <input className="form-input" type="number" value={form.sort_order} onChange={(e) => setForm((f) => ({ ...f, sort_order: parseInt(e.target.value) || 0 }))} placeholder="0" />
              </div>

              {/* Description Points */}
              <div className="form-group">
                <label className="form-label">Deskripsi (bullet points)</label>
                <div className="tech-input-wrap">
                  <input className="form-input" value={descInput} onChange={(e) => setDescInput(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addDesc())} placeholder="Ketik deskripsi lalu Enter..." />
                  <button type="button" className="btn-secondary btn-sm" onClick={addDesc}>Add</button>
                </div>
                <div className="desc-list mt-2">
                  {form.description.map((d, i) => (
                    <div key={i} className="desc-item">
                      <span className="desc-bullet">•</span>
                      <span className="desc-text">{d}</span>
                      <button type="button" className="desc-remove" onClick={() => removeDesc(i)}><X size={12} /></button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tools */}
              <div className="form-group">
                <label className="form-label">Skills / Tools</label>
                <div className="tech-input-wrap">
                  <input className="form-input" value={toolInput} onChange={(e) => setToolInput(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addTool())} placeholder="Ketik skill lalu Enter..." />
                  <button type="button" className="btn-secondary btn-sm" onClick={addTool}>Add</button>
                </div>
                <div className="tech-tags mt-2">
                  {(form.tools || []).map((t) => (
                    <span key={t} className="tech-tag tech-tag-removable">
                      {t}
                      <button type="button" onClick={() => removeTool(t)}><X size={12} /></button>
                    </span>
                  ))}
                </div>
              </div>

              {/* COMPETITIONS EDITOR */}
              <div className="form-group border-t border-border/40 pt-4 mt-4 text-left">
                <div className="flex justify-between items-center mb-3">
                  <label className="form-label font-bold text-slate-800 dark:text-slate-200">
                    Lomba / Kompetisi (Competitive Experience)
                  </label>
                  <button
                    type="button"
                    className="btn-secondary btn-sm flex items-center gap-1"
                    onClick={() => {
                      setForm((f) => ({
                        ...f,
                        competitions: [
                          ...(f.competitions || []),
                          {
                            title: '',
                            role: '',
                            award: '',
                            project: '',
                            skills: [],
                            what_was_built: '',
                            impact_achievements: []
                          }
                        ]
                      }));
                    }}
                  >
                    <Plus size={14} /> Tambah Kompetisi
                  </button>
                </div>

                <div className="flex flex-col gap-4">
                  {(form.competitions || []).map((comp, idx) => (
                    <div key={idx} className="p-4 rounded-xl border border-border bg-slate-50/50 dark:bg-slate-900/30 flex flex-col gap-3 relative">
                      <button
                        type="button"
                        className="absolute top-2 right-2 p-1 text-slate-400 hover:text-red-500 transition-colors"
                        onClick={() => {
                          setForm((f) => ({
                            ...f,
                            competitions: (f.competitions || []).filter((_, i) => i !== idx)
                          }));
                        }}
                        title="Hapus Kompetisi"
                      >
                        <Trash2 size={15} />
                      </button>

                      <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider font-mono">
                        Kompetisi #{idx + 1}
                      </h4>

                      <div className="form-grid-2">
                        <div className="form-group mb-0">
                          <label className="form-label text-[11px] mb-1">Nama Lomba *</label>
                          <input
                            className="form-input text-xs"
                            value={comp.title}
                            onChange={(e) => {
                              const updated = [...(form.competitions || [])];
                              updated[idx] = { ...updated[idx], title: e.target.value };
                              setForm((f) => ({ ...f, competitions: updated }));
                            }}
                            placeholder="e.g. Hackathon X Digdaya — Bank Indonesia"
                          />
                        </div>
                        <div className="form-group mb-0">
                          <label className="form-label text-[11px] mb-1">Role / Peran *</label>
                          <input
                            className="form-input text-xs"
                            value={comp.role}
                            onChange={(e) => {
                              const updated = [...(form.competitions || [])];
                              updated[idx] = { ...updated[idx], role: e.target.value };
                              setForm((f) => ({ ...f, competitions: updated }));
                            }}
                            placeholder="e.g. Generative AI Engineer"
                          />
                        </div>
                      </div>

                      <div className="form-grid-2">
                        <div className="form-group mb-0">
                          <label className="form-label text-[11px] mb-1">Award / Badge *</label>
                          <input
                            className="form-input text-xs"
                            value={comp.award}
                            onChange={(e) => {
                              const updated = [...(form.competitions || [])];
                              updated[idx] = { ...updated[idx], award: e.target.value };
                              setForm((f) => ({ ...f, competitions: updated }));
                            }}
                            placeholder="e.g. Top 20% Nasional"
                          />
                        </div>
                        <div className="form-group mb-0">
                          <label className="form-label text-[11px] mb-1">Project Name</label>
                          <input
                            className="form-input text-xs"
                            value={comp.project}
                            onChange={(e) => {
                              const updated = [...(form.competitions || [])];
                              updated[idx] = { ...updated[idx], project: e.target.value };
                              setForm((f) => ({ ...f, competitions: updated }));
                            }}
                            placeholder="e.g. Solusi Generative AI QRIS Ecosystem"
                          />
                        </div>
                      </div>

                      {/* What was built */}
                      <div className="form-group mb-0">
                        <label className="form-label text-[11px] mb-1">What Was Built (Deskripsi Ringkas)</label>
                        <textarea
                          className="form-input text-xs min-h-[60px] py-2 resize-y"
                          value={comp.what_was_built}
                          onChange={(e) => {
                            const updated = [...(form.competitions || [])];
                            updated[idx] = { ...updated[idx], what_was_built: e.target.value };
                            setForm((f) => ({ ...f, competitions: updated }));
                          }}
                          placeholder="Jelaskan kontribusi / apa yang dibangun dalam kompetisi ini..."
                        />
                      </div>

                      {/* Skills / Tech Tags */}
                      <div className="form-group mb-0">
                        <label className="form-label text-[11px] mb-1">Skills (Pisahkan dengan koma)</label>
                        <input
                          className="form-input text-xs"
                          value={(comp.skills || []).join(', ')}
                          onChange={(e) => {
                            const list = e.target.value.split(',').map(s => s.trim()).filter(s => s !== '');
                            const updated = [...(form.competitions || [])];
                            updated[idx] = { ...updated[idx], skills: list };
                            setForm((f) => ({ ...f, competitions: updated }));
                          }}
                          placeholder="e.g. Generative AI, Fintech, QRIS"
                        />
                      </div>

                      {/* Impact & Achievements bullet points */}
                      <div className="form-group mb-0">
                        <label className="form-label text-[11px] mb-1">Impact & Achievements (Satu per baris)</label>
                        <textarea
                          className="form-input text-xs min-h-[80px] py-2 resize-y font-mono"
                          value={(comp.impact_achievements || []).join('\n')}
                          onChange={(e) => {
                            const list = e.target.value.split('\n').map(s => s.trim()).filter(s => s !== '');
                            const updated = [...(form.competitions || [])];
                            updated[idx] = { ...updated[idx], impact_achievements: list };
                            setForm((f) => ({ ...f, competitions: updated }));
                          }}
                          placeholder="Masukkan poin pencapaian, pisahkan dengan baris baru..."
                        />
                      </div>

                    </div>
                  ))}
                  {(form.competitions || []).length === 0 && (
                    <p className="text-xs text-muted-foreground text-center py-4 border border-dashed border-border rounded-xl">
                      Belum ada data kompetisi ditambahkan
                    </p>
                  )}
                </div>
              </div>

              {/* Logo Upload */}
              <div className="form-group mt-4">
                <label className="form-label">Logo Perusahaan</label>
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
              <button id="save-experience-btn" className="btn-primary" onClick={handleSave} disabled={saving}>
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
