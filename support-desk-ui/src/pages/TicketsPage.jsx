import { useEffect, useState } from 'react';
import { Link } from 'react-router';
import TicketList from '../components/TicketList.jsx';
import TicketDetail from '../components/TicketDetail.jsx';
import TicketFilterPanel from '../components/TicketFilterPanel.jsx';
import ApiInfoCard from '../components/ApiInfoCard.jsx';
import ErrorMessage from '../components/ErrorMessage.jsx';
import LoadingMessage from '../components/LoadingMessage.jsx';
import { useTicketData } from '../context/TicketDataContext.jsx';
import { fetchApiDocs } from '../services/api.js';

export default function TicketsPage() {
  const {
    filteredTickets,
    selectedTicket,
    filters,
    loading,
    error,
    selectTicket,
    setSearchText,
    setStatusFilter,
    setPriorityFilter
  } = useTicketData();

  const [apiDocs, setApiDocs] = useState(null);
  const [loadingApi, setLoadingApi] = useState(true);
  const [apiError, setApiError] = useState('');

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
          {selectedTicket && (
            <Link className="button-link secondary" to={`/app/tickets/${selectedTicket.id}/edit`}>
              Edit Selected
            </Link>
          )}
        </div>
      </section>

      <ApiInfoCard loading={loadingApi} error={apiError} apiDocs={apiDocs} />

      {loading && <LoadingMessage message="Loading protected tickets..." />}
      {error && <ErrorMessage message={error} />}

      {!loading && !error && (
        <>
          <TicketFilterPanel
            searchText={filters.searchText}
            statusFilter={filters.statusFilter}
            priorityFilter={filters.priorityFilter}
            onSearchChange={setSearchText}
            onStatusChange={setStatusFilter}
            onPriorityChange={setPriorityFilter}
          />

          <section className="workspace-grid">
            <TicketList
              tickets={filteredTickets}
              selectedTicketId={selectedTicket?.id}
              onSelectTicket={(ticket) => selectTicket(ticket.id)}
            />
            <TicketDetail ticket={selectedTicket} />
          </section>
        </>
      )}
    </>
  );
}
