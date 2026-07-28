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

  // College APIs
  static getColleges() {
    return this.request('/colleges');
  }

  static getCollegeBySlug(slug) {
    return this.request(`/colleges/by-slug/${slug}`);
  }

  static createCollege(collegeData) {
    return this.request('/colleges', { method: 'POST', body: JSON.stringify(collegeData) });
  }

  // User Directory APIs
  static getUsers(params = {}) {
    const query = new URLSearchParams(params).toString();
    return this.request(`/users${query ? `?${query}` : ''}`);
  }

  static createUser(userData) {
    return this.request('/users', { method: 'POST', body: JSON.stringify(userData) });
  }

  // Clinical Case APIs
  static getCases() {
    return this.request('/cases');
  }

  static createCase(caseData) {
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

  static createBackup(scopeData) {
    return this.request('/platform/backups', { method: 'POST', body: JSON.stringify(scopeData) });
  }
}

export default ApiService;
