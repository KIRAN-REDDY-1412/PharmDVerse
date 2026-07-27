import React from 'react';
import { useNavigate } from 'react-router-dom';
import AdminLayout from '../../components/admin/AdminLayout';
import { 
  ArrowLeft, Search, Filter, Download, FileText,
  CreditCard, CheckCircle, AlertTriangle, Clock
} from 'lucide-react';
import './SubscriptionList.css'; 
import './PaymentHistory.css';

const MOCK_PAYMENTS = [
  {
    invoiceId: 'INV-2026-8812',
    college: 'University of Texas Pharmacy',
    plan: 'Enterprise',
    amount: '$25,000.00',
    date: '2026-07-15',
    method: 'Wire Transfer',
    transactionId: 'TRX-9988221100',
    status: 'Paid'
  },
  {
    invoiceId: 'INV-2026-8813',
    college: 'Boston Healthcare College',
    plan: 'Professional',
    amount: '$12,000.00',
    date: '2026-07-10',
    method: 'Credit Card (*4432)',
    transactionId: 'ch_3N9XkK2eZvKYlo2C19R0Tq5',
    status: 'Paid'
  },
  {
    invoiceId: 'INV-2026-8815',
    college: 'Midwest Pharmacy Academy',
    plan: 'Basic',
    amount: '$5,000.00',
    date: '2026-07-01',
    method: 'ACH Transfer',
    transactionId: 'Pending',
    status: 'Pending'
  },
  {
    invoiceId: 'INV-2026-8700',
    college: 'Seattle Clinical Institute',
    plan: 'Enterprise',
    amount: '$25,000.00',
    date: '2026-06-15',
    method: 'Credit Card (*1192)',
    transactionId: 'Failed',
    status: 'Failed'
  }
];

const getStatusBadge = (status) => {
  switch(status) {
    case 'Paid': return <span className="status-badge success"><CheckCircle size={14} /> Paid</span>;
    case 'Failed': return <span className="status-badge danger"><AlertTriangle size={14} /> Failed</span>;
    case 'Pending': return <span className="status-badge warning"><Clock size={14} /> Pending</span>;
    default: return <span className="status-badge">{status}</span>;
  }
};

const PaymentHistory = () => {
  const navigate = useNavigate();

  return (
    <AdminLayout>
      <div className="payment-history-container">
        
        <div className="payment-header">
          <div className="payment-title-area">
            <button className="icon-btn-small" onClick={() => navigate('/super-admin/subscriptions')}>
              <ArrowLeft size={20} />
            </button>
            <div>
              <h1 className="page-title">Payment History & Invoices</h1>
              <p className="page-subtitle">Track all billing transactions across tenants.</p>
            </div>
          </div>
          <button className="btn btn-secondary"><Download size={18} /> Export Billing Data</button>
        </div>

        <div className="toolbar">
          <div className="search-box">
            <Search size={18} color="var(--text-secondary)" />
            <input type="text" placeholder="Search by Invoice ID or College..." />
          </div>
          <div className="filters">
            <input type="date" className="filter-btn" style={{ padding: '8px 12px' }}/>
            <button className="filter-btn"><Filter size={18} /> Plan</button>
            <button className="filter-btn"><Filter size={18} /> Status</button>
          </div>
        </div>

        <div className="data-grid-container">
          <table className="enterprise-table" style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                <th style={{ padding: '16px', borderBottom: '1px solid var(--border-color)', textAlign: 'left' }}>Invoice & Date</th>
                <th style={{ padding: '16px', borderBottom: '1px solid var(--border-color)', textAlign: 'left' }}>Tenant & Plan</th>
                <th style={{ padding: '16px', borderBottom: '1px solid var(--border-color)', textAlign: 'left' }}>Amount</th>
                <th style={{ padding: '16px', borderBottom: '1px solid var(--border-color)', textAlign: 'left' }}>Payment Details</th>
                <th style={{ padding: '16px', borderBottom: '1px solid var(--border-color)', textAlign: 'left' }}>Status</th>
                <th style={{ padding: '16px', borderBottom: '1px solid var(--border-color)', textAlign: 'left' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {MOCK_PAYMENTS.map((payment) => (
                <tr key={payment.invoiceId}>
                  <td style={{ padding: '16px', borderBottom: '1px solid var(--border-color)' }}>
                    <div className="invoice-badge">{payment.invoiceId}</div>
                    <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginTop: '8px' }}>{payment.date}</div>
                  </td>
                  <td style={{ padding: '16px', borderBottom: '1px solid var(--border-color)' }}>
                    <div style={{ fontWeight: 600 }}>{payment.college}</div>
                    <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>{payment.plan}</div>
                  </td>
                  <td style={{ padding: '16px', borderBottom: '1px solid var(--border-color)' }}>
                    <div className="amount-display">{payment.amount}</div>
                  </td>
                  <td style={{ padding: '16px', borderBottom: '1px solid var(--border-color)' }}>
                    <div className="payment-method">
                      <CreditCard size={14} /> {payment.method}
                    </div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', fontFamily: 'monospace', marginTop: '4px' }}>
                      Txn: {payment.transactionId}
                    </div>
                  </td>
                  <td style={{ padding: '16px', borderBottom: '1px solid var(--border-color)' }}>
                    {getStatusBadge(payment.status)}
                  </td>
                  <td style={{ padding: '16px', borderBottom: '1px solid var(--border-color)' }}>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <button className="btn btn-secondary" style={{ padding: '6px 12px', fontSize: '0.85rem' }} title="Download Invoice">
                        <FileText size={14} style={{ marginRight: '4px' }}/> Invoice
                      </button>
                      {payment.status === 'Paid' && (
                        <button className="btn btn-secondary" style={{ padding: '6px 12px', fontSize: '0.85rem' }} title="Download Receipt">
                          <Download size={14} style={{ marginRight: '4px' }}/> Receipt
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>
    </AdminLayout>
  );
};

export default PaymentHistory;
