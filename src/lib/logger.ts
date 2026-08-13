import { supabase } from './supabase';

export type LogCategory = 'SYSTEM' | 'VISITOR' | 'FORM' | 'SECURITY';
export type LogLevel = 'INFO' | 'SUCCESS' | 'WARNING' | 'ERROR';
export type LogTimeRange = '7D' | '30D' | '1Y' | 'ALL';

export interface LogEntry {
  id?: string;
  category: LogCategory;
  level: LogLevel;
  action: string;
  details?: string;
  page_url?: string;
  user_agent?: string;
  ip_address?: string;
  created_at: string;
}

export interface GetLogsResult {
  logs: LogEntry[];
  source: 'database' | 'local';
}

const LOCAL_STORAGE_KEY = 'portfolio_website_logs';
const MAX_LOCAL_LOGS = 500;
let cachedClientIP: string | null = null;

/**
 * Helper to calculate cutoff date for filtering logs
 */
export const getCutoffDate = (range: LogTimeRange): Date | null => {
  if (range === 'ALL') return null;
  const now = new Date();
  if (range === '7D') {
    now.setDate(now.getDate() - 7);
  } else if (range === '30D') {
    now.setDate(now.getDate() - 30);
  } else if (range === '1Y') {
    now.setFullYear(now.getFullYear() - 1);
  }
  return now;
};

/**
 * Dynamically fetch real public IP address of the client
 */
export const fetchClientIP = async (): Promise<string> => {
  if (cachedClientIP) return cachedClientIP;
  try {
    const res = await fetch('https://api.ipify.org?format=json');
    if (res.ok) {
      const data = await res.json();
      if (data && data.ip) {
        cachedClientIP = data.ip;
        return data.ip;
      }
    }
  } catch (e) {
    // Fallback to localhost / client browser
  }
  return '127.0.0.1';
};

// Start fetching IP immediately in client environment
if (typeof window !== 'undefined') {
  fetchClientIP();
}

// Helper to get cached local logs
const getLocalLogs = (): LogEntry[] => {
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    console.error('Error reading local logs:', e);
    return [];
  }
};

// Helper to save local logs
const saveLocalLogs = (logs: LogEntry[]) => {
  try {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(logs.slice(0, MAX_LOCAL_LOGS)));
  } catch (e) {
    console.error('Error saving local logs:', e);
  }
};

/**
 * Log a new website or system activity with real client IP & metadata
 */
export const logActivity = async (entry: {
  category: LogCategory;
  level?: LogLevel;
  action: string;
  details?: string;
  page_url?: string;
  ip_address?: string;
}): Promise<LogEntry> => {
  const referrer = typeof document !== 'undefined' && document.referrer ? document.referrer : 'Direct';
  const detailStr = entry.details
    ? `${entry.details} | Referrer: ${referrer}`
    : `Referrer: ${referrer}`;

  const clientIP = entry.ip_address || (await fetchClientIP());

  const newLog: LogEntry = {
    id: 'log_' + Date.now() + '_' + Math.random().toString(36).substr(2, 5),
    category: entry.category,
    level: entry.level || 'INFO',
    action: entry.action,
    details: detailStr,
    page_url: entry.page_url || (typeof window !== 'undefined' ? window.location.pathname : '/'),
    user_agent: typeof navigator !== 'undefined' ? navigator.userAgent : 'Unknown',
    ip_address: clientIP,
    created_at: new Date().toISOString(),
  };

  // Always save to LocalStorage for immediate real-time availability
  const currentLocal = getLocalLogs();
  saveLocalLogs([newLog, ...currentLocal]);

  // Write to Supabase website_logs table if accessible
  try {
    const { data, error } = await supabase
      .from('website_logs')
      .insert([
        {
          category: newLog.category,
          level: newLog.level,
          action: newLog.action,
          details: newLog.details,
          page_url: newLog.page_url,
          user_agent: newLog.user_agent,
          ip_address: newLog.ip_address,
          created_at: newLog.created_at,
        },
      ])
      .select()
      .single();

    if (!error && data) {
      return data;
    }
  } catch (err) {
    // Supabase table insertion notice; fallback to local storage
  }

  return newLog;
};

/**
 * Retrieve real logs with optional filtering and time range support
 */
export const getLogs = async (options?: {
  category?: LogCategory | 'ALL';
  level?: LogLevel | 'ALL';
  timeRange?: LogTimeRange;
  search?: string;
  limit?: number;
}): Promise<GetLogsResult> => {
  let logs: LogEntry[] = [];
  let source: 'database' | 'local' = 'local';

  const cutoff = getCutoffDate(options?.timeRange || 'ALL');

  // Try fetching real logs from Supabase first
  try {
    let query = supabase.from('website_logs').select('*').order('created_at', { ascending: false });

    if (cutoff) {
      query = query.gte('created_at', cutoff.toISOString());
    }

    if (options?.category && options.category !== 'ALL') {
      query = query.eq('category', options.category);
    }

    if (options?.level && options.level !== 'ALL') {
      query = query.eq('level', options.level);
    }

    if (options?.limit) {
      query = query.limit(options.limit);
    }

    const { data, error } = await query;
    if (!error && data) {
      logs = data;
      source = 'database';
    } else {
      logs = getLocalLogs();
      source = 'local';
    }
  } catch (err) {
    logs = getLocalLogs();
    source = 'local';
  }

  // Filter in memory for local storage fallback or search query
  let filtered = [...logs];

  if (source === 'local') {
    if (cutoff) {
      filtered = filtered.filter((l) => new Date(l.created_at) >= cutoff);
    }

    if (options?.category && options.category !== 'ALL') {
      filtered = filtered.filter((l) => l.category === options.category);
    }

    if (options?.level && options.level !== 'ALL') {
      filtered = filtered.filter((l) => l.level === options.level);
    }
  }

  if (options?.search && options.search.trim() !== '') {
    const queryStr = options.search.toLowerCase();
    filtered = filtered.filter(
      (l) =>
        l.action.toLowerCase().includes(queryStr) ||
        (l.details && l.details.toLowerCase().includes(queryStr)) ||
        (l.page_url && l.page_url.toLowerCase().includes(queryStr)) ||
        (l.ip_address && l.ip_address.toLowerCase().includes(queryStr))
    );
  }

  if (options?.limit) {
    filtered = filtered.slice(0, options.limit);
  }

  return { logs: filtered, source };
};

/**
 * Delete a single log entry by ID from both Supabase DB and LocalStorage
 */
export const deleteLogEntry = async (id: string): Promise<void> => {
  // 1. Remove from LocalStorage
  const current = getLocalLogs();
  const updated = current.filter((l) => l.id !== id);
  saveLocalLogs(updated);

  // 2. Delete from Supabase website_logs table
  try {
    const { error } = await supabase.from('website_logs').delete().eq('id', id);
    if (error) {
      console.error('Error deleting log from Supabase DB:', error);
    }
  } catch (e) {
    console.error('Failed to delete log from Supabase DB:', e);
  }
};

/**
 * Clear all stored logs from both Supabase database and LocalStorage
 */
export const clearLogs = async (): Promise<void> => {
  // 1. Clear LocalStorage
  localStorage.removeItem(LOCAL_STORAGE_KEY);

  // 2. Delete all rows from Supabase website_logs
  try {
    const { error } = await supabase.from('website_logs').delete().gte('created_at', '1970-01-01T00:00:00Z');
    if (error) {
      console.warn('First delete attempt failed, trying fallback neq condition:', error);
      await supabase.from('website_logs').delete().neq('id', '00000000-0000-0000-0000-000000000000');
    }
  } catch (e) {
    console.warn('Could not clear Supabase website_logs table:', e);
  }
};

/**
 * Get aggregate statistics of logs
 */
export const getLogStats = (logs: LogEntry[]) => {
  const total = logs.length;
  const systemCount = logs.filter((l) => l.category === 'SYSTEM').length;
  const visitorCount = logs.filter((l) => l.category === 'VISITOR').length;
  const formCount = logs.filter((l) => l.category === 'FORM').length;
  const securityCount = logs.filter((l) => l.category === 'SECURITY').length;
  const errorCount = logs.filter((l) => l.level === 'ERROR' || l.level === 'WARNING').length;

  return {
    total,
    systemCount,
    visitorCount,
    formCount,
    securityCount,
    errorCount,
  };
};

