import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router';
import TicketFormWizard, { emptyTicketForm } from '../components/TicketFormWizard.jsx';
import ErrorMessage from '../components/ErrorMessage.jsx';
import LoadingMessage from '../components/LoadingMessage.jsx';
import { useAuth } from '../context/AuthContext.jsx';
import { createTicket, fetchTicketById, updateTicket } from '../services/api.js';

export default function TicketFormPage() {
  const { ticketId } = useParams();
  const navigate = useNavigate();
  const { token, user } = useAuth();
  const [initialValues, setInitialValues] = useState(emptyTicketForm);
  const [loading, setLoading] = useState(Boolean(ticketId));
  const [loadError, setLoadError] = useState('');
  const [saving, setSaving] = useState(false);
  const [serverError, setServerError] = useState('');

  const isEditMode = Boolean(ticketId);

  useEffect(() => {
    let ignore = false;

    async function loadTicketForEdit() {
      if (!ticketId) {
        return;
      }

      try {
        setLoading(true);
        setLoadError('');
        const ticket = await fetchTicketById(ticketId, token);

        if (!ignore) {
          setInitialValues({
            title: ticket.title ?? '',
            description: ticket.description ?? '',
            category: ticket.category ?? '',
            priority: ticket.priority ?? 'MEDIUM',
            status: ticket.status ?? 'OPEN'
          });
        }
      } catch (err) {
        if (!ignore) {
          setLoadError(err.message || 'Could not load ticket for editing.');
          console.error(err);
        }
      } finally {
        if (!ignore) {
          setLoading(false);
        }
      }
    }

    loadTicketForEdit();

    return () => {
      ignore = true;
    };
  }, [ticketId, token]);

  async function handleSubmit(payload) {
    try {
      setSaving(true);
      setServerError('');

      if (isEditMode) {
        await updateTicket(ticketId, token, payload);
      } else {
        await createTicket(token, {
          title: payload.title,
          description: payload.description,
          category: payload.category,
          priority: payload.priority,
          createdBy: user.email
        });
      }

      navigate('/app/tickets');
    } catch (err) {
      setServerError(err.message || 'Could not save ticket.');
      setSaving(false);
    }
  }

  if (loading) {
    return <LoadingMessage message="Loading ticket form..." />;
  }

  if (loadError) {
    return <ErrorMessage message={loadError} />;
  }

  return (
    <>
      <section className="card welcome-card">
        <div>
          <p className="eyebrow">Forms & validation</p>
          <h2>{isEditMode ? 'Edit existing ticket' : 'Create a new ticket'}</h2>
          <p>The visual style is intentionally kept close to Day 12. Today focuses on form behaviour.</p>
        </div>
        <div className="action-row">
          <Link className="button-link secondary" to="/app/tickets">Back to Tickets</Link>
        </div>
      </section>

      <TicketFormWizard
        key={ticketId || 'create'}
        mode={isEditMode ? 'edit' : 'create'}
        initialValues={initialValues}
        onSubmit={handleSubmit}
        saving={saving}
        serverError={serverError}
      />
    </>
  );
}
