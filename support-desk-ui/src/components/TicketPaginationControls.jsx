export default function TicketPaginationControls({ pageInfo, loading, onPageChange }) {
  const currentPage = pageInfo.page;
  const totalPages = pageInfo.totalPages;
  const isFirstPage = currentPage <= 0;
  const isLastPage = totalPages === 0 || currentPage >= totalPages - 1;

  return (
    <section className="card welcome-card">
      <div>
        <p className="eyebrow">Pagination</p>
        <span className="pagination-badge">
          Page {totalPages === 0 ? 0 : currentPage + 1} of {totalPages}
        </span>
        <p>{pageInfo.totalElements} total ticket record(s) available from the backend.</p>
      </div>
      <div className="action-row">
        <button
          className="button-link secondary"
          type="button"
          disabled={loading || isFirstPage}
          onClick={() => onPageChange(currentPage - 1)}
        >
          Previous
        </button>
        <button
          className="button-link"
          type="button"
          disabled={loading || isLastPage}
          onClick={() => onPageChange(currentPage + 1)}
        >
          Next
        </button>
      </div>
    </section>
  );
}
