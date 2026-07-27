import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminLayout from '../../components/admin/AdminLayout';
import { useDatabase } from '../../context/DatabaseContext';
import { exportToExcel, exportToPDF, exportToCSV } from '../../utils/ExportEngine';
import { 
  Search, Filter, Plus, MoreVertical, 
  CheckCircle, AlertTriangle, Activity, 
  Users, Shield, Calendar, Download, Eye, Edit, Key, FileText, ChevronLeft, ChevronRight,
  ArrowUpDown
} from 'lucide-react';
import './SubscriptionList.css';

const getStatusBadge = (status) => {
  const s = (status || '').toLowerCase();
  if (s.includes('active')) return <span className="status-badge success"><CheckCircle size={14} /> Active</span>;
  if (s.includes('expired')) return <span className="status-badge danger"><AlertTriangle size={14} /> Expired</span>;
  if (s.includes('pending') || s.includes('soon')) return <span className="status-badge warning"><Activity size={14} /> {status}</span>;
  return <span className="status-badge success"><CheckCircle size={14} /> Active</span>;
};

const getPlanPill = (plan) => {
  switch(plan) {
    case 'Enterprise': return <span className="plan-pill purple">{plan}</span>;
    case 'Professional': return <span className="plan-pill blue">{plan}</span>;
    case 'Standard': 
    case 'Basic': return <span className="plan-pill slate">{plan}</span>;
    default: return <span className="plan-pill green">{plan}</span>;
  }
};

const SubscriptionList = () => {
  const navigate = useNavigate();
  const { subscriptions, colleges } = useDatabase();
  
  const [searchTerm, setSearchTerm] = useState('');
  const [planFilter, setPlanFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [sortField, setSortField] = useState('collegeName');
  const [sortDirection, setSortDirection] = useState('asc');

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [actionMenuOpen, setActionMenuOpen] = useState(null);

  const allSubscriptions = subscriptions || [];

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const filtered = allSubscriptions.filter(sub => {
    const colName = sub.collegeName || (colleges.find(c => c.id === sub.collegeId)?.name || '');
    const matchesSearch = (
      colName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (sub.id || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (sub.invoiceReference || '').toLowerCase().includes(searchTerm.toLowerCase())
    );

    const matchesPlan = !planFilter || (sub.plan || '').toLowerCase() === planFilter.toLowerCase();
    const matchesStatus = !statusFilter || (sub.status || '').toLowerCase() === statusFilter.toLowerCase();

    return matchesSearch && matchesPlan && matchesStatus;
  });

  const sorted = [...filtered].sort((a, b) => {
    let valA = a[sortField] || '';
    let valB = b[sortField] || '';
    if (typeof valA === 'string') valA = valA.toLowerCase();
    if (typeof valB === 'string') valB = valB.toLowerCase();

    if (valA < valB) return sortDirection === 'asc' ? -1 : 1;
    if (valA > valB) return sortDirection === 'asc' ? 1 : -1;
    return 0;
  });

  const totalPages = Math.ceil(sorted.length / pageSize) || 1;
  const paginated = sorted.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  const handleExport = (format) => {
    const cols = [
      { label: 'Sub ID', key: 'id' },
      { label: 'College', key: 'collegeName' },
      { label: 'Plan', key: 'plan' },
      { label: 'Status', key: 'status' },
      { label: 'Start Date', key: 'startDate' },
      { label: 'Expiry Date', key: 'expiryDate' },
      { label: 'Amount', key: 'amount' }
    ];

    if (format === 'excel') {
      exportToExcel({ title: 'Subscription Master List', collegeName: 'PharmDVerse ERP Platform', logoText: 'PDV', generatedBy: 'Super Admin', academicYear: '2026-2027', columns: cols, data: sorted, filename: 'Subscriptions_List' });
    } else if (format === 'pdf') {
      exportToPDF({ title: 'Subscription Master List', collegeName: 'PharmDVerse ERP Platform', logoText: 'PDV', generatedBy: 'Super Admin', academicYear: '2026-2027', columns: cols, data: sorted, filename: 'Subscriptions_List' });
    } else {
      exportToCSV({ title: 'Subscription Master List', collegeName: 'PharmDVerse ERP Platform', logoText: 'PDV', generatedBy: 'Super Admin', academicYear: '2026-2027', columns: cols, data: sorted, filename: 'Subscriptions_List' });
    }
  };

  return (
    <AdminLayout>
      <div className="sub-list-container">
        
        <div className="sub-list-header">
          <div>
            <h1 className="sub-list-title">Subscriptions Master List</h1>
            <p className="sub-list-subtitle">Manage all college subscriptions, licenses, and renewals.</p>
          </div>
          <div style={{ display: 'flex', gap: '8px' }}>
            <button className="btn btn-secondary" onClick={() => handleExport('excel')}><Download size={16} /> Excel</button>
            <button className="btn btn-secondary" onClick={() => handleExport('pdf')}><FileText size={16} /> PDF</button>
            <button className="btn btn-secondary" onClick={() => handleExport('csv')}><Download size={16} /> CSV</button>
            <button className="btn btn-primary" onClick={() => navigate('/super-admin/subscriptions/plans/create')}>
              <Plus size={18} /> Create Plan
            </button>
          </div>
        </div>

        <div className="toolbar" style={{ flexWrap: 'wrap', gap: '12px' }}>
          <div className="search-box">
            <Search size={18} color="var(--text-secondary)" />
            <input 
              type="text" 
              placeholder="Search by college name, ID, or invoice ref..." 
              value={searchTerm}
              onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
            />
          </div>

          <div className="filters" style={{ flexWrap: 'wrap', gap: '8px' }}>
            <select 
              className="form-select" 
              style={{ padding: '8px 12px', fontSize: '0.85rem' }}
              value={planFilter}
              onChange={(e) => { setPlanFilter(e.target.value); setCurrentPage(1); }}
            >
              <option value="">All Plans</option>
              <option value="enterprise">Enterprise</option>
              <option value="professional">Professional</option>
              <option value="standard">Standard</option>
            </select>

            <select 
              className="form-select" 
              style={{ padding: '8px 12px', fontSize: '0.85rem' }}
              value={statusFilter}
              onChange={(e) => { setStatusFilter(e.target.value); setCurrentPage(1); }}
            >
              <option value="">All Statuses</option>
              <option value="active">Active</option>
              <option value="expired">Expired</option>
            </select>

            {(searchTerm || planFilter || statusFilter) && (
              <button className="btn btn-secondary" onClick={() => { setSearchTerm(''); setPlanFilter(''); setStatusFilter(''); setCurrentPage(1); }} style={{ fontSize: '0.8rem', padding: '6px 12px' }}>
                Clear Filters
              </button>
            )}
          </div>
        </div>

        <div className="data-grid-container" style={{ overflowX: 'auto' }}>
          <table className="enterprise-table" style={{ width: '100%', minWidth: '1000px' }}>
            <thead>
              <tr>
                <th onClick={() => handleSort('collegeName')} style={{ cursor: 'pointer' }}>
                  College Name <ArrowUpDown size={12} />
                </th>
                <th onClick={() => handleSort('plan')} style={{ cursor: 'pointer' }}>
                  Plan <ArrowUpDown size={12} />
                </th>
                <th onClick={() => handleSort('status')} style={{ cursor: 'pointer' }}>
                  Status <ArrowUpDown size={12} />
                </th>
                <th>Validity & Dates</th>
                <th>Amount</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginated.length === 0 ? (
                <tr>
                  <td colSpan={6} style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-secondary)' }}>
                    <Shield size={40} style={{ opacity: 0.4, marginBottom: '0.5rem' }} />
                    <div style={{ fontWeight: 600 }}>No Subscriptions Found</div>
                    <div style={{ fontSize: '0.85rem', marginTop: '4px' }}>Try adjusting your search criteria.</div>
                  </td>
                </tr>
              ) : (
                paginated.map((sub) => (
                  <tr key={sub.id}>
                    <td>
                      <div style={{ fontWeight: 600, color: 'var(--text-color)' }}>{sub.collegeName}</div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Invoice: {sub.invoiceReference || sub.id}</div>
                    </td>
                    <td>{getPlanPill(sub.plan)}</td>
                    <td>{getStatusBadge(sub.status)}</td>
                    <td>
                      <div style={{ fontSize: '0.85rem' }}>Expires: <strong>{sub.expiryDate}</strong></div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Started: {sub.startDate}</div>
                    </td>
                    <td style={{ fontWeight: 600, color: 'var(--primary-color)' }}>{sub.amount || '₹2,50,000 / yr'}</td>
                    <td>
                      <button 
                        className="btn btn-secondary" 
                        style={{ padding: '4px 10px', fontSize: '0.8rem' }}
                        onClick={() => navigate(`/super-admin/subscriptions/renew/${sub.id}`)}
                      >
                        Renew Plan
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '16px', padding: '12px 16px', backgroundColor: 'var(--surface-color)', borderRadius: '8px', border: '1px solid var(--border-color)', flexWrap: 'wrap', gap: '12px' }}>
          <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
            Showing {filtered.length > 0 ? (currentPage - 1) * pageSize + 1 : 0} to {Math.min(currentPage * pageSize, filtered.length)} of {filtered.length} Subscriptions
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <select className="form-select" style={{ padding: '4px 8px', fontSize: '0.85rem' }} value={pageSize} onChange={(e) => { setPageSize(Number(e.target.value)); setCurrentPage(1); }}>
              <option value={5}>5 per page</option>
              <option value={10}>10 per page</option>
              <option value={20}>20 per page</option>
            </select>

            <div style={{ display: 'flex', gap: '4px' }}>
              <button className="btn btn-secondary" disabled={currentPage === 1} onClick={() => setCurrentPage(p => Math.max(p - 1, 1))} style={{ padding: '4px 10px' }}>
                <ChevronLeft size={16} />
              </button>
              <span style={{ padding: '6px 12px', fontSize: '0.85rem', fontWeight: 600 }}>Page {currentPage} of {totalPages}</span>
              <button className="btn btn-secondary" disabled={currentPage >= totalPages} onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))} style={{ padding: '4px 10px' }}>
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </div>

      </div>
    </AdminLayout>
  );
};

export default SubscriptionList;
