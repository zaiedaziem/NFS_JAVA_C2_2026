import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router';
import TicketList from '../components/TicketList.jsx';
import TicketDetail from '../components/TicketDetail.jsx';
import TicketFilterPanel from '../components/TicketFilterPanel.jsx';
import ApiInfoCard from '../components/ApiInfoCard.jsx';
import ErrorMessage from '../components/ErrorMessage.jsx';
import LoadingMessage from '../components/LoadingMessage.jsx';
import { useAuth } from '../context/AuthContext.jsx';
import { fetchApiDocs, fetchTickets } from '../services/api.js';
import { filterTickets } from '../utils/tickets.js';

export default function TicketsPage() {
  const { token } = useAuth();
  const [tickets, setTickets] = useState([]);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [searchText, setSearchText] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [priorityFilter, setPriorityFilter] = useState('ALL');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [apiDocs, setApiDocs] = useState(null);
  const [loadingApi, setLoadingApi] = useState(true);
  const [apiError, setApiError] = useState('');

  const filteredTickets = useMemo(
    () => filterTickets(tickets, searchText, statusFilter, priorityFilter),
    [tickets, searchText, statusFilter, priorityFilter]
  );

  useEffect(() => {
    let ignore = false;

    async function loadTickets() {
      try {
        setLoading(true);
        setError('');

        const data = await fetchTickets(token);

        if (!ignore) {
          setTickets(data);
          setSelectedTicket(data[0] ?? null);
        }
      } catch (err) {
        if (!ignore) {
          setError(err.message || 'Could not load protected ticket data.');
          console.error(err);
        }
      } finally {
        if (!ignore) {
          setLoading(false);
        }
      }
    }

    loadTickets();

    return () => {
      ignore = true;
    };
  }, [token]);

  useEffect(() => {
    if (filteredTickets.length === 0) {
      setSelectedTicket(null);
      return;
    }

    const selectedStillVisible = filteredTickets.some((ticket) => ticket.id === selectedTicket?.id);

    if (!selectedStillVisible) {
      setSelectedTicket(filteredTickets[0]);
    }
  }, [filteredTickets, selectedTicket]);

  useEffect(() => {
    let ignore = false;

    async function loadApiInformation() {
      try {
        setLoadingApi(true);
        setApiError('');

        const docs = await fetchApiDocs();

        if (!ignore) {
          setApiDocs(docs);
        }
      } catch (err) {
        if (!ignore) {
          setApiError('Could not connect to backend. Start Spring Boot on port 8080 and try again.');
          console.error(err);
        }
      } finally {
        if (!ignore) {
          setLoadingApi(false);
        }
      }
    }

    loadApiInformation();

    return () => {
      ignore = true;
    };
  }, []);

  return (
    <>
      <section className="card welcome-card">
        <div>
          <p className="eyebrow">Protected ticket data</p>
          <h2>Tickets</h2>
          <p>Browse, search, and manage support tickets.</p>
        </div>
        <div className="action-row">
          <Link className="button-link" to="/app/tickets/new">+ New Ticket</Link>
        </div>
      </section>

      <ApiInfoCard loading={loadingApi} error={apiError} apiDocs={apiDocs} />

      {loading && <LoadingMessage message="Loading protected tickets..." />}
      {error && <ErrorMessage message={error} />}

      {!loading && !error && (
        <>
          <TicketFilterPanel
            searchText={searchText}
            statusFilter={statusFilter}
            priorityFilter={priorityFilter}
            onSearchChange={setSearchText}
            onStatusChange={setStatusFilter}
            onPriorityChange={setPriorityFilter}
          />

          <section className="workspace-grid">
            <TicketList
              tickets={filteredTickets}
              selectedTicketId={selectedTicket?.id}
              onSelectTicket={setSelectedTicket}
            />
            <TicketDetail ticket={selectedTicket} />
          </section>
        </>
      )}
    </>
  );
}
