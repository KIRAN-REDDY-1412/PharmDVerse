import React from 'react';
import { Stethoscope, RefreshCw, Home } from 'lucide-react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('[CRITICAL FRONTEND ERROR]', error, errorInfo);
  }

  handleReload = () => {
    window.location.href = '/';
  };

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justify: 'center',
          backgroundColor: '#0f172a',
          color: '#f8fafc',
          fontFamily: 'system-ui, -apple-system, sans-serif',
          padding: '2rem'
        }}>
          <div style={{
            maxWidth: '480px',
            width: '100%',
            backgroundColor: '#1e293b',
            padding: '2.5rem',
            borderRadius: '16px',
            border: '1px solid #334155',
            textAlign: 'center',
            boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.5)'
          }}>
            <div style={{
              width: '64px',
              height: '64px',
              borderRadius: '50%',
              backgroundColor: 'rgba(139, 92, 246, 0.15)',
              color: '#a78bfa',
              display: 'flex',
              alignItems: 'center',
              justify: 'center',
              margin: '0 auto 1.5rem'
            }}>
              <Stethoscope size={32} />
            </div>

            <h1 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '0.75rem' }}>
              PharmDVerse ERP
            </h1>

            <p style={{ color: '#94a3b8', fontSize: '0.95rem', lineHeight: 1.5, marginBottom: '1.75rem' }}>
              The application encountered a temporary display issue. Click below to return home.
            </p>

            <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
              <button
                onClick={this.handleReload}
                style={{
                  backgroundColor: '#8b5cf6',
                  color: '#ffffff',
                  border: 'none',
                  padding: '10px 20px',
                  borderRadius: '8px',
                  fontWeight: 600,
                  fontSize: '0.9rem',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}
              >
                <RefreshCw size={16} /> Reload Application
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
