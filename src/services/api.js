import { supabase, isSupabaseConfigured } from './supabaseClient';

const getApiBaseUrl = () => {
  if (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.VITE_API_URL) {
    return import.meta.env.VITE_API_URL;
  }
  if (typeof window !== 'undefined' && window.location?.origin) {
    return `${window.location.origin}/api/v1`;
  }
  return 'http://localhost:5000/api/v1';
};

const getSupabaseAnonKey = () => {
  if (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.VITE_SUPABASE_ANON_KEY) {
    return import.meta.env.VITE_SUPABASE_ANON_KEY;
  }
  return 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imdjc2NreG12aGRua3FudGd4YXpxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODUxNTczODYsImV4cCI6MjEwMDczMzM4Nn0.yuJ0R4wcwa5tkSQ6KUhVHPnRfB3Y2d1Y2coCJbVAfzM';
};

class ApiService {
  static getAuthHeaders() {
    const token = typeof localStorage !== 'undefined' ? (localStorage.getItem('erp_token') || sessionStorage.getItem('erp_token')) : null;
    const anonKey = getSupabaseAnonKey();
    return {
      'Content-Type': 'application/json',
      'apikey': anonKey,
      ...(token ? { Authorization: `Bearer ${token}` } : { Authorization: `Bearer ${anonKey}` })
    };
  }

  static async request(endpoint, options = {}) {
    const baseUrl = getApiBaseUrl();
    const url = `${baseUrl}${endpoint}`;
    const headers = { ...this.getAuthHeaders(), ...options.headers };

    try {
      const response = await fetch(url, { ...options, headers });
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      const message = error.message || 'Unable to reach backend server';
      console.warn(`[API WARNING] Endpoint ${endpoint} unreachable: ${message}`);
      throw new Error(`Backend unavailable: ${message}`);
    }
  }

  // Auth APIs
  static login(credentials) {
    return this.request('/auth/login', { method: 'POST', body: JSON.stringify(credentials) });
  }

  static getMe() {
    return this.request('/auth/me');
  }

  // College APIs (Supabase + Express)
  static async getColleges() {
    if (isSupabaseConfigured) {
      try {
        const { data, error } = await supabase.from('colleges').select('*').order('createdAt', { ascending: false });
        if (!error && data) {
          return { success: true, count: data.length, data };
        }
      } catch (err) {
        console.warn('Supabase getColleges error:', err.message);
      }
    }
    return this.request('/colleges');
  }

  static async createCollege(collegeData) {
    if (isSupabaseConfigured) {
      try {
        const slug = (collegeData.slug || collegeData.name).toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '');
        const payload = {
          id: collegeData.id || `COL-${Date.now()}`,
          name: collegeData.name,
          slug: slug,
          code: collegeData.code || slug.toUpperCase().slice(0, 20),
          domain: collegeData.domain || `${slug}.pharmdverse.com`,
          principalName: collegeData.principalName || collegeData.adminName,
          principalEmail: collegeData.principalEmail || collegeData.email,
          contactMobile: collegeData.contactMobile || collegeData.phone,
          address: collegeData.address || '',
          status: 'ACTIVE'
        };

        const { data, error } = await supabase.from('colleges').insert([payload]).select().single();
        if (!error && data) {
          return { success: true, data };
        }
      } catch (err) {
        console.warn('Supabase createCollege error:', err.message);
      }
    }

    return this.request('/colleges', { method: 'POST', body: JSON.stringify(collegeData) });
  }

  // User Directory APIs (Supabase + Express)
  static async getUsers(params = {}) {
    if (isSupabaseConfigured) {
      try {
        let query = supabase.from('users').select('*, colleges(name)').order('createdAt', { ascending: false });
        if (params.role) {
          query = query.eq('role', params.role.toUpperCase());
        }
        const { data, error } = await query;
        if (!error && data) {
          const mapped = data.map(u => ({ ...u, role: u.role.toLowerCase(), collegeName: u.colleges ? u.colleges.name : null }));
          return { success: true, count: mapped.length, data: mapped };
        }
      } catch (err) {
        console.warn('Supabase getUsers error:', err.message);
      }
    }
    const queryString = new URLSearchParams(params).toString();
    return this.request(`/users${queryString ? `?${queryString}` : ''}`);
  }

  static async createUser(userData) {
    if (isSupabaseConfigured) {
      try {
        const payload = {
          id: userData.id || userData.studentId || userData.preceptorId || `USR-${Date.now()}`,
          name: userData.fullName || userData.name,
          role: (userData.role || 'student').toUpperCase(),
          email: userData.email,
          passwordHash: '$2a$10$w4rYv0...demoHash',
          phone: userData.mobileNumber || userData.phone,
          collegeId: userData.collegeId || null,
          status: userData.status || 'Active',
          department: userData.department,
          designation: userData.designation,
          qualification: userData.qualification,
          course: userData.course,
          batch: userData.batch || userData.year,
          assignedPreceptorId: userData.assignedPreceptorId || userData.preceptorId
        };

        const { data, error } = await supabase.from('users').insert([payload]).select().single();
        if (!error && data) {
          return { success: true, data: { ...data, role: data.role.toLowerCase() } };
        }
      } catch (err) {
        console.warn('Supabase createUser error:', err.message);
      }
    }

    return this.request('/users', { method: 'POST', body: JSON.stringify(userData) });
  }

  // Clinical Case APIs
  static async getCases() {
    if (isSupabaseConfigured) {
      try {
        const { data, error } = await supabase.from('clinical_cases').select('*').order('updatedAt', { ascending: false });
        if (!error && data) {
          return { success: true, count: data.length, data };
        }
      } catch (err) {
        console.warn('Supabase getCases error:', err.message);
      }
    }
    return this.request('/cases');
  }

  static async createCase(caseData) {
    if (isSupabaseConfigured) {
      try {
        const payload = {
          id: caseData.id || `CAS-26-${Date.now().toString().slice(-4)}`,
          collegeId: caseData.collegeId || 'COL-001',
          studentId: caseData.studentId || 'USR-26-441',
          preceptorId: caseData.preceptorId,
          caseTitle: caseData.caseTitle || caseData.title || 'New Clinical Case',
          patientName: caseData.patientName,
          patientAge: caseData.patientAge ? parseInt(caseData.patientAge, 10) : null,
          gender: caseData.gender,
          ward: caseData.ward,
          diagnosis: caseData.diagnosis,
          overallStatus: (caseData.status || 'DRAFT').toUpperCase(),
          clinicalData: caseData.forms || caseData.clinicalData || {}
        };

        const { data, error } = await supabase.from('clinical_cases').insert([payload]).select().single();
        if (!error && data) {
          return { success: true, data };
        }
      } catch (err) {
        console.warn('Supabase createCase error:', err.message);
      }
    }

    return this.request('/cases', { method: 'POST', body: JSON.stringify(caseData) });
  }

  static updateCaseStatus(caseId, statusData) {
    return this.request(`/cases/${caseId}/status`, { method: 'PUT', body: JSON.stringify(statusData) });
  }

  // Platform & Settings
  static getPlatformSettings() {
    return this.request('/platform/settings');
  }

  static getBackups() {
    return this.request('/platform/backups');
  }

  static createBackup(backupData) {
    return this.request('/platform/backups', { method: 'POST', body: JSON.stringify(backupData) });
  }
}

export default ApiService;
