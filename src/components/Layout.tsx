import React from 'react';

interface LayoutProps {
  children: React.ReactNode;
  currentPage: 'dashboard' | 'import';
  onNavigate: (page: 'dashboard' | 'import') => void;
}

export const Layout: React.FC<LayoutProps> = ({ children, currentPage, onNavigate }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <header style={{
        backgroundColor: 'var(--color-surface)',
        borderBottom: '1px solid rgba(255,255,255,0.05)',
        padding: 'var(--spacing-md) 0'
      }}>
        <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-sm)' }}>
            <div style={{
              width: '32px',
              height: '32px',
              backgroundColor: 'var(--color-primary)',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 'bold',
              color: 'white'
            }}>
              H
            </div>
            <h1 style={{ fontSize: '1.25rem', fontWeight: '700' }}>Health Pal</h1>
          </div>

          <nav>
            <ul style={{ display: 'flex', gap: 'var(--spacing-lg)', listStyle: 'none' }}>
              <li>
                <button
                  onClick={() => onNavigate('dashboard')}
                  style={{
                    color: currentPage === 'dashboard' ? 'var(--color-primary)' : 'var(--color-text-secondary)',
                    fontWeight: currentPage === 'dashboard' ? '600' : '400',
                    transition: 'color 0.2s'
                  }}
                >
                  Dashboard
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('import')}
                  style={{
                    color: currentPage === 'import' ? 'var(--color-primary)' : 'var(--color-text-secondary)',
                    fontWeight: currentPage === 'import' ? '600' : '400',
                    transition: 'color 0.2s'
                  }}
                >
                  Import Data
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      <main style={{ flex: 1, padding: 'var(--spacing-xl) 0' }}>
        <div className="container">
          {children}
        </div>
      </main>

      <footer style={{
        backgroundColor: 'var(--color-surface)',
        borderTop: '1px solid rgba(255,255,255,0.05)',
        padding: 'var(--spacing-lg) 0',
        marginTop: 'auto'
      }}>
        <div className="container" style={{ textAlign: 'center', color: 'var(--color-text-secondary)', fontSize: '0.875rem' }}>
          &copy; 2025 Eduvators. All rights reserved.
        </div>
      </footer>
    </div>
  );
};
