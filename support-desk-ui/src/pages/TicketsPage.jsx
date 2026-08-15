import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router';
import TicketList from '../components/TicketList.jsx';
import TicketDetail from '../components/TicketDetail.jsx';
import TicketFilterPanel from '../components/TicketFilterPanel.jsx';
import TicketDataControls from '../components/TicketDataControls.jsx';
import TicketPaginationControls from '../components/TicketPaginationControls.jsx';
import TicketStatusControls from '../components/TicketStatusControls.jsx';
import TicketSummaryCards from '../components/TicketSummaryCards.jsx';
import ApiInfoCard from '../components/ApiInfoCard.jsx';
import ErrorMessage from '../components/ErrorMessage.jsx';
import LoadingMessage from '../components/LoadingMessage.jsx';
import { useTicketData } from '../context/TicketDataContext.jsx';
import { fetchApiDocs } from '../services/api.js';

export default function TicketsPage() {
  const initialLoadRef = useRef(false);

  const {
    tickets,
    filteredTickets,
    selectedTicket,
    filters,
    loading,
    error,
    pageInfo,
    cacheMessage,
    updatingId,
    loadTicketsPage,
    refreshTickets,
    changeTicketStatus,
    selectTicket,
    setSearchText,
    setStatusFilter,
    setPriorityFilter
  } = useTicketData();

  const [apiDocs, setApiDocs] = useState(null);
  const [loadingApi, setLoadingApi] = useState(true);
  const [apiError, setApiError] = useState('');

  useEffect(() => {
    if (initialLoadRef.current) {
      return;
    }

    initialLoadRef.current = true;
    loadTicketsPage();
  }, [loadTicketsPage]);

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

      <TicketSummaryCards tickets={tickets} />

      <ApiInfoCard loading={loadingApi} error={apiError} apiDocs={apiDocs} />

      <TicketDataControls
        pageInfo={pageInfo}
        cacheMessage={cacheMessage}
        loading={loading}
        onRefresh={refreshTickets}
        onPageSizeChange={(size) => loadTicketsPage({ page: 0, size })}
        onSortChange={(sortBy, direction) => loadTicketsPage({ page: 0, sortBy, direction })}
      />

      <TicketFilterPanel
        searchText={filters.searchText}
        statusFilter={filters.statusFilter}
        priorityFilter={filters.priorityFilter}
        onSearchChange={setSearchText}
        onStatusChange={setStatusFilter}
        onPriorityChange={setPriorityFilter}
      />

      {loading && <LoadingMessage message="Loading protected tickets..." />}
      {error && <ErrorMessage message={error} />}

      {!loading && !error && (
        <section className="workspace-grid">
          <TicketList
            tickets={filteredTickets}
            selectedTicketId={selectedTicket?.id}
            onSelectTicket={(ticket) => selectTicket(ticket.id)}
          />
          <div className="ticket-detail-column">
            <TicketDetail ticket={selectedTicket} />
            <TicketStatusControls
              ticket={selectedTicket}
              updatingId={updatingId}
              onStatusChange={changeTicketStatus}
            />
          </div>
        </section>
      )}

      <TicketPaginationControls
        pageInfo={pageInfo}
        loading={loading}
        onPageChange={(page) => loadTicketsPage({ page })}
      />
    </>
  );
}
