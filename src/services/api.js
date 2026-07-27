const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api/v1';
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imdjc2NreG12aGRua3FudGd4YXpxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODUxNTczODYsImV4cCI6MjEwMDczMzM4Nn0.yuJ0R4wcwa5tkSQ6KUhVHPnRfB3Y2d1Y2coCJbVAfzM';

class ApiService {
  static getAuthHeaders() {
    const token = localStorage.getItem('erp_token') || sessionStorage.getItem('erp_token');
    return {
      'Content-Type': 'application/json',
      'apikey': SUPABASE_ANON_KEY,
      ...(token ? { Authorization: `Bearer ${token}` } : { Authorization: `Bearer ${SUPABASE_ANON_KEY}` })
    };
  }

  static async request(endpoint, options = {}) {
    const url = `${API_BASE_URL}${endpoint}`;
    const headers = { ...this.getAuthHeaders(), ...options.headers };

    try {
      const response = await fetch(url, { ...options, headers });
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.warn(`[API WARNING] Endpoint ${endpoint} unreachable or error: ${error.message}. Falling back to context handler.`);
      throw error;
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
