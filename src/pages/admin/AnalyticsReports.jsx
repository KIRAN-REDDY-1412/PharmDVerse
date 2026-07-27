import React, { useState } from 'react';
import AdminLayout from '../../components/admin/AdminLayout';
import { 
  BarChart2, PieChart, Activity, Download, 
  Calendar, Filter, FileText, X, CheckSquare, 
  Users, Building, HardDrive, TrendingUp, ChevronRight
} from 'lucide-react';
import { useDatabase } from '../../context/DatabaseContext';
import { exportToExcel, exportToPDF, exportToCSV } from '../../utils/ExportEngine';
import './AnalyticsReports.css';

const AnalyticsReports = () => {
  const { colleges, cases, users, subscriptions } = useDatabase();
  const [activeTab, setActiveTab] = useState('platform');
  const [reportModalOpen, setReportModalOpen] = useState(false);
  const [reportType, setReportType] = useState('clinical');

  return (
    <AdminLayout>
      <div className="analytics-container">
        
        {/* Global Control Bar (Sticky) */}
        <div className="global-control-bar">
          <div className="control-left">
            <h1 className="page-title">Analytics & Reports</h1>
            <p className="page-subtitle">Global intelligence and telemetry engine.</p>
          </div>
          <div className="control-right">
            <div className="date-picker-mock">
              <Calendar size={16} /> 
              <span>Last 30 Days</span>
            </div>
            <div className="date-picker-mock">
              <Filter size={16} /> 
              <span>Global Filters: All Colleges</span>
            </div>
            <button className="btn btn-primary ml-2" onClick={() => setReportModalOpen(true)}>
              <FileText size={18} /> Generate Reports
            </button>
          </div>
        </div>

        {/* Intelligence Tabs */}
        <div className="analytics-tabs mt-4">
          <button className={`analytics-tab ${activeTab === 'platform' ? 'active' : ''}`} onClick={() => setActiveTab('platform')}>
            <Building size={18}/> Platform & Subscriptions
          </button>
          <button className={`analytics-tab ${activeTab === 'users' ? 'active' : ''}`} onClick={() => setActiveTab('users')}>
            <Users size={18}/> User Telemetry
          </button>
          <button className={`analytics-tab ${activeTab === 'clinical' ? 'active' : ''}`} onClick={() => setActiveTab('clinical')}>
            <Activity size={18}/> Clinical Engine
          </button>
          <button className={`analytics-tab ${activeTab === 'vitals' ? 'active' : ''}`} onClick={() => setActiveTab('vitals')}>
            <HardDrive size={18}/> System Vitals
          </button>
        </div>

        <div className="analytics-content">
          
          {/* TAB 1: PLATFORM & SUBSCRIPTIONS */}
          {activeTab === 'platform' && (
            <div className="tab-pane fade-in">
              <div className="kpi-grid mb-4">
                <div className="kpi-box">
                  <div className="kpi-header">Total Colleges</div>
                  <div className="kpi-val">142</div>
                  <div className="kpi-trend positive"><TrendingUp size={14}/> +12% YoY</div>
                </div>
                <div className="kpi-box">
                  <div className="kpi-header">Active Subscriptions</div>
                  <div className="kpi-val">138</div>
                  <div className="kpi-trend positive"><TrendingUp size={14}/> +8% YoY</div>
                </div>
                <div className="kpi-box">
                  <div className="kpi-header">Trial Pipelines</div>
                  <div className="kpi-val">4</div>
                  <div className="kpi-trend neutral"><TrendingUp size={14}/> 0% MoM</div>
                </div>
                <div className="kpi-box">
                  <div className="kpi-header">Suspended/Churn</div>
                  <div className="kpi-val">0</div>
                  <div className="kpi-trend positive">Healthy</div>
                </div>
              </div>

              <div className="chart-grid">
                <div className="chart-card">
                  <h3>Subscription Tier Distribution</h3>
                  <div className="mock-pie-chart-container">
                    {/* CSS Pie Chart Mock */}
                    <div className="css-pie-chart"></div>
                    <div className="pie-legend">
                      <div className="legend-item"><span className="dot enterprise"></span> Enterprise (45%)</div>
                      <div className="legend-item"><span className="dot pro"></span> Professional (35%)</div>
                      <div className="legend-item"><span className="dot basic"></span> Basic (15%)</div>
                      <div className="legend-item"><span className="dot trial"></span> Trial (5%)</div>
                    </div>
                  </div>
                </div>
                
                <div className="chart-card">
                  <h3>Monthly College Growth</h3>
                  <div className="mock-bar-chart">
                    <div className="bar-wrapper"><div className="bar" style={{height: '40%'}}></div><span className="bar-label">Jan</span></div>
                    <div className="bar-wrapper"><div className="bar" style={{height: '60%'}}></div><span className="bar-label">Feb</span></div>
                    <div className="bar-wrapper"><div className="bar" style={{height: '45%'}}></div><span className="bar-label">Mar</span></div>
                    <div className="bar-wrapper"><div className="bar" style={{height: '80%'}}></div><span className="bar-label">Apr</span></div>
                    <div className="bar-wrapper"><div className="bar" style={{height: '65%'}}></div><span className="bar-label">May</span></div>
                    <div className="bar-wrapper"><div className="bar" style={{height: '90%'}}></div><span className="bar-label">Jun</span></div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: USER TELEMETRY */}
          {activeTab === 'users' && (
            <div className="tab-pane fade-in">
              <div className="kpi-grid mb-4">
                <div className="kpi-box">
                  <div className="kpi-header">Total Global Users</div>
                  <div className="kpi-val">46,250</div>
                </div>
                <div className="kpi-box">
                  <div className="kpi-header">Active Students</div>
                  <div className="kpi-val">42,800</div>
                </div>
                <div className="kpi-box">
                  <div className="kpi-header">Active Preceptors</div>
                  <div className="kpi-val">3,250</div>
                </div>
                <div className="kpi-box">
                  <div className="kpi-header">College Admins</div>
                  <div className="kpi-val">142</div>
                </div>
              </div>
              
              <div className="chart-card full-width">
                <h3>User Activity Trends (DAU/MAU)</h3>
                <p className="text-muted mb-4">Daily Active Users across the platform over the last 30 days.</p>
                <div className="mock-line-chart">
                  <svg viewBox="0 0 100 20" className="sparkline">
                    <path d="M0,15 Q5,10 10,12 T20,8 T30,10 T40,5 T50,8 T60,3 T70,5 T80,2 T90,4 T100,0" fill="none" stroke="var(--color-primary)" strokeWidth="0.5"/>
                    <path d="M0,15 Q5,10 10,12 T20,8 T30,10 T40,5 T50,8 T60,3 T70,5 T80,2 T90,4 T100,0 L100,20 L0,20 Z" fill="rgba(79, 70, 229, 0.1)" stroke="none"/>
                  </svg>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: CLINICAL ENGINE */}
          {activeTab === 'clinical' && (
            <div className="tab-pane fade-in">
              <div className="kpi-grid mb-4">
                <div className="kpi-box">
                  <div className="kpi-header">Total Clinical Cases</div>
                  <div className="kpi-val">1.24M</div>
                </div>
                <div className="kpi-box">
                  <div className="kpi-header">Avg Cases / Student</div>
                  <div className="kpi-val">28</div>
                </div>
                <div className="kpi-box">
                  <div className="kpi-header">Avg Preceptor Review Time</div>
                  <div className="kpi-val">2.4 Days</div>
                </div>
              </div>

              <div className="chart-card full-width">
                <h3>Global Case Status Pipeline</h3>
                <div className="pipeline-bar mt-4">
                  <div className="pipe approved" style={{width: '78%'}}>Approved (78%)</div>
                  <div className="pipe pending" style={{width: '15%'}}>Pending (15%)</div>
                  <div className="pipe returned" style={{width: '7%'}}>Returned (7%)</div>
                </div>
                
                <div className="mt-6" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
                   <div>
                     <h4 className="mb-2" style={{fontSize: '0.9rem', color: 'var(--text-secondary)'}}>Top Performing Colleges (Volume)</h4>
                     <ul className="leaderboard-list">
                       <li><span>1. University of Texas Pharmacy</span> <span>45,200 Cases</span></li>
                       <li><span>2. Boston Healthcare College</span> <span>38,150 Cases</span></li>
                       <li><span>3. Midwest Pharmacy Academy</span> <span>32,900 Cases</span></li>
                     </ul>
                   </div>
                   <div>
                     <h4 className="mb-2" style={{fontSize: '0.9rem', color: 'var(--text-secondary)'}}>Review Bottleneck Alerts</h4>
                     <div className="alert-box warning mt-2">
                       <strong>Seattle Clinical Institute:</strong> Preceptor review times have increased by 40% (Current Avg: 6.2 Days).
                     </div>
                   </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: SYSTEM VITALS */}
          {activeTab === 'vitals' && (
            <div className="tab-pane fade-in">
              <div className="chart-grid">
                 <div className="chart-card">
                    <h3>Global Storage Analytics</h3>
                    <div className="storage-meter mt-4">
                      <div className="flex-between mb-2"><span>Allocated Capacity</span> <span>850 GB / 2.5 TB</span></div>
                      <div className="progress-bg"><div className="progress-fill" style={{width: '34%'}}></div></div>
                    </div>
                    <div className="storage-meter mt-4">
                      <div className="flex-between mb-2"><span>Database Row Load</span> <span>45M Rows</span></div>
                      <div className="progress-bg"><div className="progress-fill warning" style={{width: '65%'}}></div></div>
                    </div>
                 </div>
                 <div className="chart-card">
                    <h3>AI Token Consumption (MRR)</h3>
                    <div className="storage-meter mt-4">
                      <div className="flex-between mb-2"><span>SOAP Analysis Tokens</span> <span>1.2M / 5M Monthly Pool</span></div>
                      <div className="progress-bg"><div className="progress-fill purple" style={{width: '24%'}}></div></div>
                    </div>
                 </div>
              </div>
            </div>
          )}

        </div>
      </div>

      {/* Reporting Engine Slide-out Modal */}
      {reportModalOpen && (
        <>
          <div className="modal-backdrop" onClick={() => setReportModalOpen(false)}></div>
          <div className="slide-out-modal" style={{width: '600px'}}>
            <div className="modal-header">
              <div>
                <h2 className="modal-title">Report Generation Engine</h2>
                <div className="modal-subtitle">Configure, filter, and export global telemetry.</div>
              </div>
              <button className="close-btn" onClick={() => setReportModalOpen(false)}>
                <X size={24} />
              </button>
            </div>

            <div className="modal-body">
              <div className="form-group mb-4">
                <label>Select Report Type</label>
                <div className="report-type-selector">
                  <button className={`report-type-btn ${reportType === 'clinical' ? 'active' : ''}`} onClick={() => setReportType('clinical')}>
                    <Activity size={18}/> Clinical Cases
                  </button>
                  <button className={`report-type-btn ${reportType === 'users' ? 'active' : ''}`} onClick={() => setReportType('users')}>
                    <Users size={18}/> Users & Activity
                  </button>
                  <button className={`report-type-btn ${reportType === 'billing' ? 'active' : ''}`} onClick={() => setReportType('billing')}>
                    <Building size={18}/> Billing & Subs
                  </button>
                </div>
              </div>

              <div className="info-card mb-4">
                <h3>Global Filters</h3>
                <div className="form-group mt-3">
                  <label>Date Range</label>
                  <select className="form-input">
                    <option>Last 30 Days</option>
                    <option>Year to Date (YTD)</option>
                    <option>Previous Academic Year</option>
                    <option>Custom Range...</option>
                  </select>
                </div>
                <div className="form-group mt-3">
                  <label>Target College (Optional)</label>
                  <select className="form-input">
                    <option>All Colleges (Aggregate)</option>
                    <option>University of Texas Pharmacy</option>
                    <option>Boston Healthcare College</option>
                  </select>
                </div>
                {reportType === 'clinical' && (
                  <div className="form-group mt-3">
                    <label>Case Status</label>
                    <div style={{display: 'flex', gap: '1rem', marginTop: '0.5rem'}}>
                      <label style={{display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 400}}><input type="checkbox" defaultChecked /> Approved</label>
                      <label style={{display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 400}}><input type="checkbox" defaultChecked /> Pending</label>
                      <label style={{display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 400}}><input type="checkbox" defaultChecked /> Returned</label>
                    </div>
                  </div>
                )}
              </div>

              <div className="info-card bg-slate-50 mb-4" style={{background: 'var(--bg-main)'}}>
                <h3 className="mb-2">Data Preview</h3>
                <p className="text-muted text-sm mb-3">Estimated 1.2M rows match this query. Exporting via CSV will queue a background background job.</p>
                <div className="preview-table-mock">
                   <div className="preview-row header"><span>ID</span> <span>College</span> <span>Value</span></div>
                   <div className="preview-row"><span>#1044</span> <span>UT Pharmacy</span> <span>SOAP Note</span></div>
                   <div className="preview-row"><span>#1045</span> <span>Boston HC</span> <span>ADR Report</span></div>
                   <div className="preview-row"><span>#1046</span> <span>Midwest</span> <span>Intervention</span></div>
                </div>
              </div>

              <div className="export-actions">
                <button 
                  className="btn btn-secondary flex-1" 
                  style={{justifyContent: 'center'}}
                  onClick={() => {
                    const sampleCols = [
                      { label: 'College ID', key: 'id' },
                      { label: 'College Name', key: 'name' },
                      { label: 'Domain', key: 'domain' },
                      { label: 'Status', key: 'status' },
                      { label: 'Plan', key: 'plan' },
                      { label: 'Students', key: 'students' },
                      { label: 'Cases', key: 'cases' }
                    ];
                    exportToCSV({
                      title: `Super Admin ${reportType.toUpperCase()} Report`,
                      collegeName: 'PharmDVerse ERP Platform',
                      logoText: 'PDV',
                      generatedBy: 'Super Admin',
                      academicYear: '2026-2027',
                      columns: sampleCols,
                      data: colleges || [],
                      filename: `SuperAdmin_${reportType}_Report`
                    });
                    setReportModalOpen(false);
                  }}
                >
                  <Download size={18}/> Export CSV
                </button>
                
                <button 
                  className="btn btn-secondary flex-1" 
                  style={{justifyContent: 'center'}}
                  onClick={() => {
                    const sampleCols = [
                      { label: 'College ID', key: 'id' },
                      { label: 'College Name', key: 'name' },
                      { label: 'Domain', key: 'domain' },
                      { label: 'Status', key: 'status' },
                      { label: 'Plan', key: 'plan' },
                      { label: 'Students', key: 'students' },
                      { label: 'Cases', key: 'cases' }
                    ];
                    exportToExcel({
                      title: `Super Admin ${reportType.toUpperCase()} Report`,
                      collegeName: 'PharmDVerse ERP Platform',
                      logoText: 'PDV',
                      generatedBy: 'Super Admin',
                      academicYear: '2026-2027',
                      columns: sampleCols,
                      data: colleges || [],
                      filename: `SuperAdmin_${reportType}_Report`
                    });
                    setReportModalOpen(false);
                  }}
                >
                  <Download size={18}/> Export Excel
                </button>

                <button 
                  className="btn btn-primary flex-1" 
                  style={{justifyContent: 'center'}}
                  onClick={() => {
                    const sampleCols = [
                      { label: 'College ID', key: 'id' },
                      { label: 'College Name', key: 'name' },
                      { label: 'Domain', key: 'domain' },
                      { label: 'Status', key: 'status' },
                      { label: 'Plan', key: 'plan' },
                      { label: 'Students', key: 'students' },
                      { label: 'Cases', key: 'cases' }
                    ];
                    exportToPDF({
                      title: `Super Admin ${reportType.toUpperCase()} Report`,
                      collegeName: 'PharmDVerse ERP Platform',
                      logoText: 'PDV',
                      generatedBy: 'Super Admin',
                      academicYear: '2026-2027',
                      columns: sampleCols,
                      data: colleges || [],
                      filename: `SuperAdmin_${reportType}_Report`
                    });
                    setReportModalOpen(false);
                  }}
                >
                  <FileText size={18}/> Generate PDF
                </button>
              </div>

            </div>
          </div>
        </>
      )}

    </AdminLayout>
  );
};

export default AnalyticsReports;
