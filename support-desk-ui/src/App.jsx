import { Route, Routes } from 'react-router';
import Layout from './components/Layout.jsx';
import LoginPage from './pages/LoginPage.jsx';
import DashboardPage from './pages/DashboardPage.jsx';
import TicketsPage from './pages/TicketsPage.jsx';

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />

      <Route
        path="/app/dashboard"
        element={
          <Layout>
            <DashboardPage />
          </Layout>
        }
      />

      <Route
        path="/app/tickets"
        element={
          <Layout>
            <TicketsPage />
          </Layout>
        }
      />
    </Routes>
  );
}
