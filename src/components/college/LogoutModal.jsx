import React from 'react';
import { LogOut, X } from 'lucide-react';
import './CollegeSidebar.css'; // Reusing some base styles if needed, or inline

const LogoutModal = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose} style={{
      position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
      backgroundColor: 'rgba(15, 23, 42, 0.6)', backdropFilter: 'blur(4px)',
      display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9999
    }}>
      <div className="student-modal" onClick={e => e.stopPropagation()} style={{
        backgroundColor: 'var(--bg-surface)', borderRadius: '16px',
        width: '100%', maxWidth: '400px', boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
        overflow: 'hidden'
      }}>
        
        {/* Header */}
        <div className="modal-header" style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start',
          padding: '1.5rem', borderBottom: '1px solid var(--border-color)', backgroundColor: 'var(--bg-surface)'
        }}>
          <div className="modal-title-group" style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
            <div className="modal-title-icon" style={{
              width: '48px', height: '48px', borderRadius: '12px',
              backgroundColor: 'rgba(239, 68, 68, 0.1)', color: '#ef4444',
              display: 'flex', alignItems: 'center', justifyContent: 'center'
            }}>
              <LogOut size={24} />
            </div>
            <div className="modal-title-text" style={{ display: 'flex', flexDirection: 'column' }}>
              <h2 style={{ fontSize: '1.25rem', fontWeight: 600, color: 'var(--text-primary)', margin: 0 }}>Logout</h2>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', margin: '0.25rem 0 0 0' }}>Confirm action</p>
            </div>
          </div>
          <button className="close-button" onClick={onClose} style={{
            background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer'
          }}>
            <X size={24} />
          </button>
        </div>

        {/* Body */}
        <div className="modal-body" style={{ padding: '2rem 1.5rem', textAlign: 'center' }}>
          <p style={{ fontSize: '1rem', color: 'var(--text-primary)', margin: 0, fontWeight: 500 }}>
            Are you sure you want to log out of PharmDVerse?
          </p>
        </div>

        {/* Footer */}
        <div className="modal-footer" style={{
          display: 'flex', gap: '1rem', padding: '1.25rem 1.5rem',
          backgroundColor: 'var(--bg-surface-alt)', borderTop: '1px solid var(--border-color)',
          justifyContent: 'flex-end'
        }}>
          <button className="btn-cancel" onClick={onClose} style={{
            padding: '0.6rem 1.25rem', borderRadius: '8px', border: '1px solid var(--border-color)',
            backgroundColor: 'var(--bg-surface)', color: 'var(--text-primary)', fontWeight: 600, cursor: 'pointer'
          }}>
            Cancel
          </button>
          <button className="btn-save" onClick={onConfirm} style={{
            padding: '0.6rem 1.25rem', borderRadius: '8px', border: 'none',
            backgroundColor: '#ef4444', color: 'white', fontWeight: 600, cursor: 'pointer',
            display: 'flex', alignItems: 'center', gap: '0.5rem'
          }}>
            <LogOut size={18} /> Logout
          </button>
        </div>

      </div>
    </div>
  );
};

export default LogoutModal;
