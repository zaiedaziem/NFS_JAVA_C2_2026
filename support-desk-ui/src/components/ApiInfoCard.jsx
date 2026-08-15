import LoadingMessage from './LoadingMessage.jsx';
import ErrorMessage from './ErrorMessage.jsx';

export default function ApiInfoCard({ loading, error, apiDocs }) {
  return (
    <section className="card api-card">
      <div className="section-heading">
        <h2>Backend Connection</h2>
        <p>Fetched using useEffect from the public backend endpoints.</p>
      </div>

      {loading && <LoadingMessage message="Loading API information..." />}
      {error && <ErrorMessage message={error} />}

      {!loading && !error && apiDocs && (
        <div className="api-info-grid">
          <InfoItem label="Application" value={apiDocs.application} />
          <InfoItem label="Version" value={apiDocs.version} />
          <InfoItem label="Base URL" value={apiDocs.baseUrl} />
          <InfoItem label="Documented Endpoints" value={apiDocs.endpoints?.length ?? 0} />
        </div>
      )}
    </section>
  );
}

function InfoItem({ label, value }) {
  return (
    <div className="info-item">
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}