export const PRIORITY_OPTIONS = ['LOW', 'MEDIUM', 'HIGH'];
export const STATUS_OPTIONS = ['OPEN', 'IN_PROGRESS', 'CLOSED'];

export function validateTicketFormStep(formValues, stepToValidate, reviewConfirmed) {
  const errors = {};

  if (stepToValidate === 1) {
    if (!formValues.title.trim()) {
      errors.title = 'Title is required.';
    }

    if (!formValues.description.trim()) {
      errors.description = 'Description is required.';
    }

    if (!formValues.category.trim()) {
      errors.category = 'Category is required.';
    }
  }

  if (stepToValidate === 2) {
    if (!PRIORITY_OPTIONS.includes(formValues.priority)) {
      errors.priority = 'Choose a valid priority.';
    }

    if (!STATUS_OPTIONS.includes(formValues.status)) {
      errors.status = 'Choose a valid status.';
    }
  }

  if (stepToValidate === 3 && !reviewConfirmed) {
    errors.review = 'Please confirm that you reviewed the ticket details.';
  }

  return errors;
}

export function normalizeTicketFormPayload(formValues) {
  return {
    title: formValues.title.trim(),
    description: formValues.description.trim(),
    category: formValues.category.trim(),
    priority: formValues.priority,
    status: formValues.status
  };
}

export function formatTicketFormLabel(key) {
  return key
    .replace(/([A-Z])/g, ' $1')
    .replace(/^./, (letter) => letter.toUpperCase());
}
