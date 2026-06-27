import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// ===================== TYPES =====================

export interface Project {
  id?: string;
  title: string;
  category: string[];
  description: string;
  role?: string;
  tech: string[];
  live_url?: string;
  github_url?: string;
  featured?: boolean;
  color?: 'violet' | 'rose' | 'emerald' | 'amber' | 'cyan' | 'indigo';
  image_url?: string;
  live_url_label?: string;
  additional_desc?: string;
  project_output?: string[];
  created_at?: string;
}

export interface ProjectCategory {
  id?: string;
  name: string;
  created_at?: string;
}

export interface Achievement {
  id?: string;
  title: string;
  issuer: string;
  issue_date: string;
  credential_id?: string;
  credential_url?: string;
  images?: string[];
  type: string;
  category: string;
  created_at?: string;
}

export interface Experience {
  id?: string;
  company: string;
  role: string;
  period: string;
  location: string;
  logo_url?: string;
  description: string[];
  tools?: string[];
  sort_order?: number;
  created_at?: string;
}

export interface Education {
  id?: string;
  degree: string;
  school: string;
  location: string;
  period: string;
  gpa: string;
  logo_url?: string;
  description?: string;
  sort_order?: number;
  created_at?: string;
}

// ===================== PROJECTS =====================

export const getProjects = async (): Promise<Project[]> => {
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .order('created_at', { ascending: true });
  if (error) throw error;
  return data || [];
};

export const createProject = async (project: Omit<Project, 'id' | 'created_at'>): Promise<Project> => {
  const { data, error } = await supabase
    .from('projects')
    .insert([project])
    .select()
    .single();
  if (error) throw error;
  return data;
};

export const updateProject = async (id: string, project: Partial<Project>): Promise<Project> => {
  const { data, error } = await supabase
    .from('projects')
    .update(project)
    .eq('id', id)
    .select()
    .single();
  if (error) throw error;
  return data;
};

export const deleteProject = async (id: string): Promise<void> => {
  const { error } = await supabase.from('projects').delete().eq('id', id);
  if (error) throw error;
};

// ===================== PROJECT CATEGORIES =====================

export const getProjectCategories = async (): Promise<ProjectCategory[]> => {
  const { data, error } = await supabase
    .from('project_categories')
    .select('*')
    .order('created_at', { ascending: true });
  if (error) throw error;
  return data || [];
};

export const createProjectCategory = async (category: Omit<ProjectCategory, 'id' | 'created_at'>): Promise<ProjectCategory> => {
  const { data, error } = await supabase
    .from('project_categories')
    .insert([category])
    .select()
    .single();
  if (error) throw error;
  return data;
};

export const updateProjectCategory = async (id: string, category: Partial<ProjectCategory>): Promise<ProjectCategory> => {
  const { data, error } = await supabase
    .from('project_categories')
    .update(category)
    .eq('id', id)
    .select()
    .single();
  if (error) throw error;
  return data;
};

export const deleteProjectCategory = async (id: string): Promise<void> => {
  const { error } = await supabase.from('project_categories').delete().eq('id', id);
  if (error) throw error;
};

// ===================== ACHIEVEMENTS =====================

export const getAchievements = async (): Promise<Achievement[]> => {
  const { data, error } = await supabase
    .from('achievements')
    .select('*')
    .order('created_at', { ascending: true });
  if (error) throw error;
  return data || [];
};

export const createAchievement = async (achievement: Omit<Achievement, 'id' | 'created_at'>): Promise<Achievement> => {
  const { data, error } = await supabase
    .from('achievements')
    .insert([achievement])
    .select()
    .single();
  if (error) throw error;
  return data;
};

export const updateAchievement = async (id: string, achievement: Partial<Achievement>): Promise<Achievement> => {
  const { data, error } = await supabase
    .from('achievements')
    .update(achievement)
    .eq('id', id)
    .select()
    .single();
  if (error) throw error;
  return data;
};

export const deleteAchievement = async (id: string): Promise<void> => {
  const { error } = await supabase.from('achievements').delete().eq('id', id);
  if (error) throw error;
};

// ===================== EXPERIENCES =====================

export const getExperiences = async (): Promise<Experience[]> => {
  const { data, error } = await supabase
    .from('experiences')
    .select('*')
    .order('sort_order', { ascending: true });
  if (error) throw error;
  return data || [];
};

export const createExperience = async (exp: Omit<Experience, 'id' | 'created_at'>): Promise<Experience> => {
  const { data, error } = await supabase
    .from('experiences')
    .insert([exp])
    .select()
    .single();
  if (error) throw error;
  return data;
};

export const updateExperience = async (id: string, exp: Partial<Experience>): Promise<Experience> => {
  const { data, error } = await supabase
    .from('experiences')
    .update(exp)
    .eq('id', id)
    .select()
    .single();
  if (error) throw error;
  return data;
};

export const deleteExperience = async (id: string): Promise<void> => {
  const { error } = await supabase.from('experiences').delete().eq('id', id);
  if (error) throw error;
};

// ===================== EDUCATION =====================

export const getEducation = async (): Promise<Education[]> => {
  const { data, error } = await supabase
    .from('education')
    .select('*')
    .order('sort_order', { ascending: true });
  if (error) throw error;
  return data || [];
};

export const createEducation = async (edu: Omit<Education, 'id' | 'created_at'>): Promise<Education> => {
  const { data, error } = await supabase
    .from('education')
    .insert([edu])
    .select()
    .single();
  if (error) throw error;
  return data;
};

export const updateEducation = async (id: string, edu: Partial<Education>): Promise<Education> => {
  const { data, error } = await supabase
    .from('education')
    .update(edu)
    .eq('id', id)
    .select()
    .single();
  if (error) throw error;
  return data;
};

export const deleteEducation = async (id: string): Promise<void> => {
  const { error } = await supabase.from('education').delete().eq('id', id);
  if (error) throw error;
};

// ===================== STORAGE =====================

export const uploadImage = async (
  bucket: 'projects' | 'achievements' | 'experiences',
  file: File,
  fileName: string
): Promise<string> => {
  const fileExt = file.name.split('.').pop();
  const filePath = `${fileName}-${Date.now()}.${fileExt}`;

  const { error } = await supabase.storage
    .from(bucket)
    .upload(filePath, file, { upsert: true });

  if (error) throw error;

  const { data } = supabase.storage.from(bucket).getPublicUrl(filePath);
  return data.publicUrl;
};

export const deleteImage = async (
  bucket: 'projects' | 'achievements' | 'experiences',
  url: string
): Promise<void> => {
  const filePath = url.split('/').pop();
  if (!filePath) return;
  await supabase.storage.from(bucket).remove([filePath]);
};

// ===================== CV SETTINGS =====================

export interface CVSettings {
  id: string;
  url: string;
  description?: string;
  updated_at?: string;
}

export const getCVSettings = async (): Promise<CVSettings[]> => {
  const { data, error } = await supabase
    .from('cv_settings')
    .select('*');
  if (error) throw error;
  return data || [];
};

export const updateCVSettings = async (id: string, url: string): Promise<CVSettings> => {
  const { data, error } = await supabase
    .from('cv_settings')
    .update({ url, updated_at: new Date().toISOString() })
    .eq('id', id)
    .select()
    .single();
  if (error) throw error;
  return data;
};

export const uploadCV = async (
  file: File,
  fileName: string
): Promise<string> => {
  const fileExt = file.name.split('.').pop();
  const filePath = `cv/${fileName}-${Date.now()}.${fileExt}`;

  const { error } = await supabase.storage
    .from('achievements')
    .upload(filePath, file, { upsert: true });

  if (error) throw error;

  const { data } = supabase.storage.from('achievements').getPublicUrl(filePath);
  return data.publicUrl;
};

export const deleteCVFile = async (url: string): Promise<void> => {
  if (!url || !url.includes('/storage/v1/object/public/achievements/cv/')) return;
  const parts = url.split('/public/achievements/');
  if (parts.length < 2) return;
  const filePath = parts[1];
  try {
    await supabase.storage.from('achievements').remove([filePath]);
  } catch (e) {
    console.error('Error deleting old CV file:', e);
  }
};


