const STATUSES = ['OPEN', 'IN_PROGRESS', 'CLOSED'];

export default function TicketStatusControls({ ticket, updatingId, onStatusChange }) {
  if (!ticket) {
    return null;
  }

  const isUpdating = updatingId === ticket.id;

  return (
    <section className="card">
      <div className="section-heading">
        <p className="eyebrow">Optimistic update</p>
        <h2>Quick status update</h2>
        <p>The UI updates immediately, then confirms with the backend. If the backend fails, it rolls back.</p>
      </div>
      <div className="status-option-row">
        {STATUSES.map((status) => {
          const isActive = status === ticket.status;

          return (
            <button
              key={status}
              type="button"
              className={`status-option status-${status.toLowerCase()}${isActive ? ' active' : ''}`}
              disabled={isUpdating || isActive}
              onClick={() => onStatusChange(ticket.id, status)}
            >
              {isActive ? '✓ ' : ''}{status}
            </button>
          );
        })}
      </div>
      {isUpdating && <p className="message loading-message">Saving status change...</p>}
    </section>
  );
}
