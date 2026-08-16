import { useRef, useState } from 'react';
import TicketFormStepIndicator from './TicketFormStepIndicator.jsx';
import InlineFieldError from './InlineFieldError.jsx';
import ErrorMessage from './ErrorMessage.jsx';
import {
  PRIORITY_OPTIONS,
  STATUS_OPTIONS,
  formatTicketFormLabel,
  normalizeTicketFormPayload,
  validateTicketFormStep
} from '../utils/ticketFormValidation.js';

export const emptyTicketForm = {
  title: '',
  description: '',
  category: '',
  priority: 'MEDIUM',
  status: 'OPEN'
};

export default function TicketFormWizard({
  mode = 'create',
  initialValues = emptyTicketForm,
  onSubmit,
  saving = false,
  serverError = '',
  successMessage = ''
}) {
  const [step, setStep] = useState(1);
  const [formValues, setFormValues] = useState({ ...emptyTicketForm, ...initialValues });
  const [fieldErrors, setFieldErrors] = useState({});
  const reviewCheckboxRef = useRef(null);

  const isEditMode = mode === 'edit';

  function updateField(fieldName, value) {
    setFormValues((current) => ({
      ...current,
      [fieldName]: value
    }));

    setFieldErrors((current) => ({
      ...current,
      [fieldName]: ''
    }));
  }

  function validateStep(stepToValidate) {
    const reviewConfirmed = Boolean(reviewCheckboxRef.current?.checked);
    const errors = validateTicketFormStep(formValues, stepToValidate, reviewConfirmed);

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  }

  function goToNextStep() {
    if (validateStep(step)) {
      setStep((current) => Math.min(current + 1, 3));
    }
  }

  function goToPreviousStep() {
    setFieldErrors({});
    setStep((current) => Math.max(current - 1, 1));
  }

  async function handleSubmit(event) {
    event.preventDefault();

    if (!validateStep(3)) {
      return;
    }

    await onSubmit(normalizeTicketFormPayload(formValues));
  }

  return (
    <form className="card ticket-form" onSubmit={handleSubmit} noValidate>
      <div className="section-heading">
        <p className="eyebrow">Day 13 form wizard</p>
        <h2>{isEditMode ? 'Update Ticket' : 'Create Ticket'}</h2>
        <p>Controlled inputs, client-side validation, and inline errors.</p>
      </div>

      <TicketFormStepIndicator currentStep={step} />

      {serverError && <ErrorMessage message={serverError} />}
      {successMessage && <p className="message success-message">{successMessage}</p>}

      {step === 1 && (
        <section className="form-grid" aria-label="Ticket details">
          <label htmlFor="title" className="form-grid-full">
            Title
            <input
              id="title"
              value={formValues.title}
              onChange={(event) => updateField('title', event.target.value)}
              aria-describedby="title-error"
            />
            <InlineFieldError message={fieldErrors.title} />
          </label>

          <label htmlFor="description" className="form-grid-full">
            Description
            <input
              id="description"
              value={formValues.description}
              onChange={(event) => updateField('description', event.target.value)}
              aria-describedby="description-error"
            />
            <InlineFieldError message={fieldErrors.description} />
          </label>

          <label htmlFor="category">
            Category
            <input
              id="category"
              value={formValues.category}
              onChange={(event) => updateField('category', event.target.value)}
              aria-describedby="category-error"
            />
            <InlineFieldError message={fieldErrors.category} />
          </label>
        </section>
      )}

      {step === 2 && (
        <section className="form-grid" aria-label="Priority and status">
          <label htmlFor="priority">
            Priority
            <select
              id="priority"
              value={formValues.priority}
              onChange={(event) => updateField('priority', event.target.value)}
              aria-describedby="priority-error"
            >
              {PRIORITY_OPTIONS.map((priority) => (
                <option key={priority} value={priority}>{priority}</option>
              ))}
            </select>
            <InlineFieldError message={fieldErrors.priority} />
          </label>

          <label htmlFor="status">
            Status
            <select
              id="status"
              value={formValues.status}
              onChange={(event) => updateField('status', event.target.value)}
              aria-describedby="status-error"
            >
              {STATUS_OPTIONS.map((status) => (
                <option key={status} value={status}>{status}</option>
              ))}
            </select>
            <InlineFieldError message={fieldErrors.status} />
          </label>
        </section>
      )}

      {step === 3 && (
        <section aria-label="Review ticket details">
          <div className="review-grid">
            {Object.entries(formValues).map(([key, value]) => (
              <div key={key} className="info-item">
                <span>{formatTicketFormLabel(key)}</span>
                <strong>{value || 'Not set'}</strong>
              </div>
            ))}
          </div>

          <label className="review-check">
            <input ref={reviewCheckboxRef} type="checkbox" />
            I have reviewed the ticket details and they are ready to submit.
          </label>
          <InlineFieldError message={fieldErrors.review} />
        </section>
      )}

      <div className="form-actions">
        {step > 1 && (
          <button type="button" className="button-link secondary" onClick={goToPreviousStep}>
            Back
          </button>
        )}

        {step < 3 && (
          <button type="button" className="button-link" onClick={goToNextStep}>
            Continue
          </button>
        )}

        {step === 3 && (
          <button type="submit" className="button-link" disabled={saving}>
            {saving ? 'Saving...' : isEditMode ? 'Update Ticket' : 'Create Ticket'}
          </button>
        )}
      </div>
    </form>
  );
}
