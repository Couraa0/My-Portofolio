import { useState, useEffect, useRef } from 'react';
import {
  Plus, Pencil, Trash2, X, Check, Upload, Loader2,
  Search, ExternalLink, Github, Star
} from 'lucide-react';
import {
  getProjects, createProject, updateProject, deleteProject,
  uploadImage, Project
} from '@/lib/supabase';

const CATEGORY_OPTIONS = ['Professional', 'Personal', 'IOT'] as const;
const COLOR_OPTIONS = ['violet', 'rose', 'emerald', 'amber', 'cyan', 'indigo'] as const;

const emptyForm: Omit<Project, 'id' | 'created_at'> = {
  title: '',
  category: 'Professional',
  description: '',
  role: '',
  tech: [],
  live_url: '',
  github_url: '',
  featured: false,
  color: 'violet',
  image_url: '',
  live_url_label: '',
  additional_desc: '',
  project_output: [],
};

export default function AdminProjects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [techInput, setTechInput] = useState('');
  const [outputInput, setOutputInput] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState('');
  const [uploading, setUploading] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [error, setError] = useState('');
  const fileRef = useRef<HTMLInputElement>(null);

  const fetchProjects = async () => {
    setLoading(true);
    try {
      const data = await getProjects();
      setProjects(data);
    } catch (e: unknown) {
      setError((e as Error).message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchProjects(); }, []);

  const openCreate = () => {
    setForm(emptyForm);
    setEditId(null);
    setImageFile(null);
    setImagePreview('');
    setTechInput('');
    setOutputInput('');
    setError('');
    setShowModal(true);
  };

  const openEdit = (project: Project) => {
    setForm({
      title: project.title,
      category: project.category,
      description: project.description,
      role: project.role || '',
      tech: project.tech || [],
      live_url: project.live_url || '',
      github_url: project.github_url || '',
      featured: project.featured || false,
      color: project.color || 'violet',
      image_url: project.image_url || '',
      live_url_label: project.live_url_label || '',
      additional_desc: project.additional_desc || '',
      project_output: project.project_output || [],
    });
    setEditId(project.id!);
    setImageFile(null);
    setImagePreview(project.image_url || '');
    setTechInput('');
    setOutputInput('');
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

  const addTech = () => {
    if (techInput.trim() && !form.tech.includes(techInput.trim())) {
      setForm((f) => ({ ...f, tech: [...f.tech, techInput.trim()] }));
    }
    setTechInput('');
  };

  const removeTech = (t: string) => setForm((f) => ({ ...f, tech: f.tech.filter((x) => x !== t) }));

  const addOutput = () => {
    if (outputInput.trim() && !(form.project_output || []).includes(outputInput.trim())) {
      setForm((f) => ({ ...f, project_output: [...(f.project_output || []), outputInput.trim()] }));
    }
    setOutputInput('');
  };

  const removeOutput = (t: string) => setForm((f) => ({ ...f, project_output: (f.project_output || []).filter((x) => x !== t) }));

  const handleSave = async () => {
    if (!form.title || !form.description) {
      setError('Title dan Description wajib diisi.');
      return;
    }
    setSaving(true);
    setError('');
    try {
      let imageUrl = form.image_url;
      if (imageFile) {
        setUploading(true);
        imageUrl = await uploadImage('projects', imageFile, form.title.replace(/\s+/g, '-').toLowerCase());
        setUploading(false);
      }

      const payload = { ...form, image_url: imageUrl };

      if (editId) {
        await updateProject(editId, payload);
      } else {
        await createProject(payload);
      }
      await fetchProjects();
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
      await deleteProject(id);
      await fetchProjects();
      setDeleteId(null);
    } catch (e: unknown) {
      setError((e as Error).message);
    }
  };

  const filtered = projects.filter(
    (p) =>
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="admin-section">
      {/* Header */}
      <div className="section-header">
        <div>
          <h2 className="section-heading">Projects</h2>
          <p className="section-desc">{projects.length} project tersimpan di database</p>
        </div>
        <button id="add-project-btn" className="btn-primary" onClick={openCreate}>
          <Plus size={18} /> Tambah Project
        </button>
      </div>

      {/* Search */}
      <div className="search-wrap">
        <Search size={18} className="search-icon" />
        <input
          type="search"
          placeholder="Cari project..."
          className="search-input"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Table */}
      {loading ? (
        <div className="loading-wrap"><Loader2 size={32} className="spin" /></div>
      ) : (
        <div className="table-wrap">
          <table className="data-table">
            <thead>
              <tr>
                <th>Image</th>
                <th>Title</th>
                <th>Category</th>
                <th>Role</th>
                <th>Tech</th>
                <th>Featured</th>
                <th>Links</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={8} className="table-empty">Belum ada data project</td>
                </tr>
              ) : (
                filtered.map((project) => (
                  <tr key={project.id} className="table-row">
                    <td>
                      {project.image_url ? (
                        <img src={project.image_url} alt={project.title} className="table-img" />
                      ) : (
                        <div className="table-img-placeholder">No Img</div>
                      )}
                    </td>
                    <td>
                      <p className="table-primary">{project.title}</p>
                      <p className="table-secondary">{project.description.slice(0, 50)}...</p>
                    </td>
                    <td>
                      <span className={`badge badge-${project.category.toLowerCase()}`}>
                        {project.category}
                      </span>
                    </td>
                    <td className="table-secondary">{project.role}</td>
                    <td>
                      <div className="tech-tags">
                        {(project.tech || []).slice(0, 3).map((t) => (
                          <span key={t} className="tech-tag">{t}</span>
                        ))}
                        {(project.tech || []).length > 3 && (
                          <span className="tech-tag">+{project.tech.length - 3}</span>
                        )}
                      </div>
                    </td>
                    <td>
                      {project.featured ? (
                        <Star size={16} className="text-amber-400 fill-amber-400" />
                      ) : (
                        <span className="table-secondary">—</span>
                      )}
                    </td>
                    <td>
                      <div className="link-btns">
                        {project.live_url && (
                          <a href={project.live_url} target="_blank" rel="noreferrer" className="link-btn">
                            <ExternalLink size={14} />
                          </a>
                        )}
                        {project.github_url && (
                          <a href={project.github_url} target="_blank" rel="noreferrer" className="link-btn">
                            <Github size={14} />
                          </a>
                        )}
                      </div>
                    </td>
                    <td>
                      <div className="action-btns">
                        <button className="btn-edit" onClick={() => openEdit(project)} title="Edit">
                          <Pencil size={15} />
                        </button>
                        <button className="btn-delete" onClick={() => setDeleteId(project.id!)} title="Hapus">
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
            <h3 className="confirm-title">Hapus Project?</h3>
            <p className="confirm-desc">Data akan dihapus permanen dari database dan tidak bisa dikembalikan.</p>
            <div className="confirm-actions">
              <button className="btn-secondary" onClick={() => setDeleteId(null)}>Batal</button>
              <button className="btn-danger" onClick={() => handleDelete(deleteId)}>Ya, Hapus</button>
            </div>
          </div>
        </div>
      )}

      {/* CREATE / EDIT MODAL */}
      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3 className="modal-title">{editId ? 'Edit Project' : 'Tambah Project'}</h3>
              <button className="modal-close" onClick={() => setShowModal(false)}><X size={20} /></button>
            </div>
            <div className="modal-body">
              {error && <div className="form-error">{error}</div>}

              <div className="form-grid-2">
                <div className="form-group">
                  <label className="form-label">Title *</label>
                  <input className="form-input" value={form.title} onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))} placeholder="Nama Project" />
                </div>
                <div className="form-group">
                  <label className="form-label">Role</label>
                  <input className="form-input" value={form.role} onChange={(e) => setForm((f) => ({ ...f, role: e.target.value }))} placeholder="e.g. Fullstack Developer" />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Description *</label>
                <textarea className="form-textarea" value={form.description} onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))} placeholder="Deskripsi project utama..." rows={3} />
              </div>

              <div className="form-group">
                <label className="form-label">Approach & Solution</label>
                <textarea className="form-textarea" value={form.additional_desc} onChange={(e) => setForm((f) => ({ ...f, additional_desc: e.target.value }))} placeholder="Latar belakang, tantangan, atau solusi yang Anda pecahkan..." rows={3} />
              </div>

              <div className="form-group">
                <label className="form-label">Key Features</label>
                <div className="tech-input-wrap">
                  <input className="form-input" value={outputInput} onChange={(e) => setOutputInput(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addOutput())} placeholder="Ketik fitur utama lalu Enter..." />
                  <button type="button" className="btn-secondary btn-sm" onClick={addOutput}>Add</button>
                </div>
                <div className="tech-tags mt-2">
                  {(form.project_output || []).map((t) => (
                    <span key={t} className="tech-tag tech-tag-removable">
                      {t}
                      <button type="button" onClick={() => removeOutput(t)}><X size={12} /></button>
                    </span>
                  ))}
                </div>
              </div>

              <div className="form-grid-2">
                <div className="form-group">
                  <label className="form-label">Category</label>
                  <select className="form-select" value={form.category} onChange={(e) => setForm((f) => ({ ...f, category: e.target.value as typeof form.category }))}>
                    {CATEGORY_OPTIONS.map((c) => <option key={c}>{c}</option>)}
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label">Color</label>
                  <select className="form-select" value={form.color} onChange={(e) => setForm((f) => ({ ...f, color: e.target.value as typeof form.color }))}>
                    {COLOR_OPTIONS.map((c) => <option key={c}>{c}</option>)}
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Technologies</label>
                <div className="tech-input-wrap">
                  <input className="form-input" value={techInput} onChange={(e) => setTechInput(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addTech())} placeholder="Ketik tech lalu Enter..." />
                  <button type="button" className="btn-secondary btn-sm" onClick={addTech}>Add</button>
                </div>
                <div className="tech-tags mt-2">
                  {form.tech.map((t) => (
                    <span key={t} className="tech-tag tech-tag-removable">
                      {t}
                      <button type="button" onClick={() => removeTech(t)}><X size={12} /></button>
                    </span>
                  ))}
                </div>
              </div>

              <div className="form-grid-2">
                <div className="form-group">
                  <label className="form-label">Live URL</label>
                  <input className="form-input" value={form.live_url} onChange={(e) => setForm((f) => ({ ...f, live_url: e.target.value }))} placeholder="https://..." />
                </div>
                <div className="form-group">
                  <label className="form-label">Live URL Label</label>
                  <input className="form-input" value={form.live_url_label} onChange={(e) => setForm((f) => ({ ...f, live_url_label: e.target.value }))} placeholder="e.g. Live Demo" />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">GitHub URL</label>
                <input className="form-input" value={form.github_url} onChange={(e) => setForm((f) => ({ ...f, github_url: e.target.value }))} placeholder="https://github.com/..." />
              </div>

              <div className="form-check">
                <input type="checkbox" id="featured" checked={form.featured} onChange={(e) => setForm((f) => ({ ...f, featured: e.target.checked }))} className="form-checkbox" />
                <label htmlFor="featured" className="form-label">Featured Project</label>
              </div>

              {/* Image Upload */}
              <div className="form-group">
                <label className="form-label">Gambar Project</label>
                <div className="upload-area" onClick={() => fileRef.current?.click()}>
                  {imagePreview ? (
                    <img src={imagePreview} alt="preview" className="upload-preview" />
                  ) : (
                    <div className="upload-placeholder">
                      <Upload size={24} />
                      <p>Klik untuk upload gambar</p>
                      <span>PNG, JPG, WEBP — Max 5MB</span>
                    </div>
                  )}
                </div>
                <input ref={fileRef} type="file" accept="image/*" style={{ display: 'none' }} onChange={handleImageChange} />
                {imagePreview && (
                  <button type="button" className="btn-secondary btn-sm mt-2" onClick={() => { setImageFile(null); setImagePreview(''); setForm((f) => ({ ...f, image_url: '' })); }}>
                    Hapus Gambar
                  </button>
                )}
              </div>
            </div>

            <div className="modal-footer">
              <button className="btn-secondary" onClick={() => setShowModal(false)}>Batal</button>
              <button id="save-project-btn" className="btn-primary" onClick={handleSave} disabled={saving}>
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
