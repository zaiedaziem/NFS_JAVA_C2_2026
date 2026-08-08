import { useEffect, useMemo, useState } from 'react';
import Layout from './components/Layout.jsx';
import TicketList from './components/TicketList.jsx';
import TicketDetail from './components/TicketDetail.jsx';
import TicketFilterPanel from './components/TicketFilterPanel.jsx';
import ApiInfoCard from './components/ApiInfoCard.jsx';
import { sampleTickets } from './data/sampleTickets.js';
import { filterTickets } from './utils/tickets.js';
import { fetchApiDocs } from './services/api.js';

export default function App() {
  const [tickets] = useState(sampleTickets);
  const [selectedTicket, setSelectedTicket] = useState(sampleTickets[0]);
  const [searchText, setSearchText] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [priorityFilter, setPriorityFilter] = useState('ALL');

  const [apiDocs, setApiDocs] = useState(null);
  const [loadingApi, setLoadingApi] = useState(true);
  const [apiError, setApiError] = useState('');

  const filteredTickets = useMemo(
    () => filterTickets(tickets, searchText, statusFilter, priorityFilter),
    [tickets, searchText, statusFilter, priorityFilter]
  );

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
      } catch (error) {
        if (!ignore) {
          setApiError('Could not connect to backend. Start Spring Boot on port 8080 and try again.');
          console.error(error);
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
    <Layout>
      <ApiInfoCard loading={loadingApi} error={apiError} apiDocs={apiDocs} />

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
    </Layout>
  );
}