import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router';
import { describe, expect, it } from 'vitest';
import ProtectedRoute from './ProtectedRoute.jsx';
import { AuthProvider } from '../context/AuthContext.jsx';

function renderProtectedTicketsRoute() {
  return render(
    <MemoryRouter initialEntries={['/app/tickets']}>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<h1>Login Page</h1>} />
          <Route element={<ProtectedRoute />}>
            <Route path="/app/tickets" element={<h1>Protected Tickets</h1>} />
          </Route>
        </Routes>
      </AuthProvider>
    </MemoryRouter>
  );
}

describe('ProtectedRoute', () => {
  it('redirects a user without a token to /login', () => {
    renderProtectedTicketsRoute();

    expect(screen.getByText('Login Page')).toBeInTheDocument();
    expect(screen.queryByText('Protected Tickets')).not.toBeInTheDocument();
  });

  it('renders the protected ticket page for a user with stored authentication', () => {
    localStorage.setItem('supportDeskAuth', JSON.stringify({
      token: 'fake-jwt-token',
      tokenType: 'Bearer',
      user: { id: 'u1', name: 'Admin User', email: 'admin@example.com', role: 'ADMIN' }
    }));

    renderProtectedTicketsRoute();

    expect(screen.getByText('Protected Tickets')).toBeInTheDocument();
    expect(screen.queryByText('Login Page')).not.toBeInTheDocument();
  });
});
