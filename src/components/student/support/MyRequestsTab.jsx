import React, { useState } from 'react';
import { Eye, X } from 'lucide-react';

const MyRequestsTab = ({ user }) => {
  const [selectedRequest, setSelectedRequest] = useState(null);
  
  const requests = user.supportRequests || [];

  const getStatusClass = (status) => {
    switch (status) {
      case 'Open': return 'status-open';
      case 'In Progress': return 'status-inprogress';
      case 'Resolved': return 'status-resolved';
      case 'Closed': return 'status-closed';
      default: return 'status-open';
    }
  };

  const formatDate = (isoString) => {
    return new Date(isoString).toLocaleDateString('en-US', {
      year: 'numeric', month: 'short', day: 'numeric',
      hour: '2-digit', minute: '2-digit'
    });
  };

  return (
    <div>
      <div style={{ marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '1.25rem', marginBottom: '0.5rem', color: 'var(--text-primary)' }}>My Requests</h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Track the status of your submitted support requests.</p>
      </div>

      {requests.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '3rem', backgroundColor: 'var(--bg-main)', borderRadius: '8px' }}>
          <p style={{ color: 'var(--text-secondary)' }}>You have not submitted any support requests yet.</p>
        </div>
      ) : (
        <div style={{ overflowX: 'auto' }}>
          <table className="requests-table">
            <thead>
              <tr>
                <th>Request ID</th>
                <th>Subject</th>
                <th>Category</th>
                <th>Status</th>
                <th>Submitted Date</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {requests.sort((a, b) => new Date(b.submittedDate) - new Date(a.submittedDate)).map(req => (
                <tr key={req.id}>
                  <td style={{ fontWeight: 500 }}>{req.id}</td>
                  <td>{req.subject.length > 30 ? req.subject.substring(0, 30) + '...' : req.subject}</td>
                  <td>{req.category}</td>
                  <td>
                    <span className={`status-badge ${getStatusClass(req.status)}`}>
                      {req.status}
                    </span>
                  </td>
                  <td>{formatDate(req.submittedDate)}</td>
                  <td>
                    <button 
                      onClick={() => setSelectedRequest(req)}
                      style={{ background: 'none', border: 'none', color: 'var(--color-primary)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.25rem' }}
                    >
                      <Eye size={16} /> View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* View Request Modal */}
      {selectedRequest && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, 
          backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1000, 
          display: 'flex', alignItems: 'center', justifyContent: 'center'
        }}>
          <div style={{
            backgroundColor: 'var(--bg-surface)', width: '90%', maxWidth: '600px', 
            borderRadius: '12px', padding: '2rem', maxHeight: '90vh', overflowY: 'auto'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '1rem' }}>
              <h3 style={{ margin: 0, fontSize: '1.25rem' }}>Request Details: {selectedRequest.id}</h3>
              <button onClick={() => setSelectedRequest(null)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-secondary)' }}>
                <X size={24} />
              </button>
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', display: 'block' }}>Status</span>
                <span className={`status-badge ${getStatusClass(selectedRequest.status)}`} style={{ marginTop: '0.25rem' }}>
                  {selectedRequest.status}
                </span>
              </div>
              
              <div>
                <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', display: 'block' }}>Submitted On</span>
                <span>{formatDate(selectedRequest.submittedDate)}</span>
              </div>
              
              <div>
                <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', display: 'block' }}>Category</span>
                <span style={{ fontWeight: 500 }}>{selectedRequest.category}</span>
              </div>

              <div>
                <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', display: 'block' }}>Subject</span>
                <span style={{ fontWeight: 500 }}>{selectedRequest.subject}</span>
              </div>

              <div>
                <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', display: 'block' }}>Description</span>
                <div style={{ padding: '1rem', backgroundColor: 'var(--bg-main)', borderRadius: '8px', marginTop: '0.5rem', whiteSpace: 'pre-wrap' }}>
                  {selectedRequest.description}
                </div>
              </div>

              {selectedRequest.attachment && (
                <div>
                  <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', display: 'block' }}>Attachment</span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem', backgroundColor: 'var(--bg-main)', borderRadius: '6px', marginTop: '0.5rem', display: 'inline-flex' }}>
                    <span style={{ fontSize: '0.9rem' }}>{selectedRequest.attachment}</span>
                  </div>
                </div>
              )}
            </div>

            <div style={{ marginTop: '2rem', textAlign: 'right' }}>
              <button onClick={() => setSelectedRequest(null)} className="btn-outline">Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyRequestsTab;
