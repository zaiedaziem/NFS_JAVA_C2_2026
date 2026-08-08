import { useMemo, useState } from 'react';
import Layout from './components/Layout.jsx';
import TicketList from './components/TicketList.jsx';
import TicketDetail from './components/TicketDetail.jsx';
import TicketFilterPanel from './components/TicketFilterPanel.jsx';
import { sampleTickets } from './data/sampleTickets.js';
import { filterTickets } from './utils/tickets.js';

export default function App() {
  const [tickets] = useState(sampleTickets);
  const [selectedTicket, setSelectedTicket] = useState(sampleTickets[0]);
  const [searchText, setSearchText] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [priorityFilter, setPriorityFilter] = useState('ALL');

  const filteredTickets = useMemo(
    () => filterTickets(tickets, searchText, statusFilter, priorityFilter),
    [tickets, searchText, statusFilter, priorityFilter]
  );

  return (
    <Layout>
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