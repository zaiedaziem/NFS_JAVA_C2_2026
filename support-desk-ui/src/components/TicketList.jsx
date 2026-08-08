import StatusBadge from './StatusBadge.jsx';
import PriorityBadge from './PriorityBadge.jsx';

export default function TicketList({ tickets, selectedTicketId, onSelectTicket }) {
  return (
    <section className="card list-card">
      <div className="section-heading">
        <h2>Ticket List</h2>
        <p>Select a ticket to view details.</p>
      </div>

      <div className="ticket-list">
        {tickets.map((ticket) => (
          <button
            key={ticket.id}
            className={ticket.id === selectedTicketId ? 'ticket-row selected' : 'ticket-row'}
            onClick={() => onSelectTicket(ticket)}
            type="button"
          >
            <div>
              <strong>{ticket.title}</strong>
              <span>{ticket.category}</span>
            </div>
            <PriorityBadge priority={ticket.priority} />
            <StatusBadge status={ticket.status} />
          </button>
        ))}
      </div>
    </section>
  );
}