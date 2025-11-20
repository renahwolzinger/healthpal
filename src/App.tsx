import { useState } from 'react';
import { Layout } from './components/Layout';
import { Dashboard } from './pages/Dashboard';
import { ImportData } from './pages/ImportData';
import { HealthProvider } from './context/HealthContext';

function App() {
    const [currentPage, setCurrentPage] = useState<'dashboard' | 'import'>('dashboard');

    return (
        <HealthProvider>
            <Layout currentPage={currentPage} onNavigate={setCurrentPage}>
                {currentPage === 'dashboard' ? <Dashboard /> : <ImportData />}
            </Layout>
        </HealthProvider>
    );
}

export default App;
