import { describe, expect, it } from 'vitest';
import {
  formatTicketFormLabel,
  normalizeTicketFormPayload,
  validateTicketFormStep
} from './ticketFormValidation.js';

const validFormValues = {
  title: 'Cannot connect to VPN',
  description: 'VPN client fails to connect',
  category: 'Network',
  priority: 'HIGH',
  status: 'OPEN'
};

describe('validateTicketFormStep', () => {
  it('returns errors for all blank required fields on step 1', () => {
    const errors = validateTicketFormStep(
      { ...validFormValues, title: '', description: '', category: '' },
      1,
      false
    );

    expect(errors.title).toBe('Title is required.');
    expect(errors.description).toBe('Description is required.');
    expect(errors.category).toBe('Category is required.');
  });

  it('returns no errors on step 1 when all required fields are filled', () => {
    const errors = validateTicketFormStep(validFormValues, 1, false);

    expect(errors).toEqual({});
  });

  it('rejects an invalid priority or status on step 2', () => {
    const errors = validateTicketFormStep(
      { ...validFormValues, priority: 'URGENT', status: 'RESOLVED' },
      2,
      false
    );

    expect(errors.priority).toBe('Choose a valid priority.');
    expect(errors.status).toBe('Choose a valid status.');
  });

  it('requires the review checkbox to be confirmed on step 3', () => {
    const unconfirmed = validateTicketFormStep(validFormValues, 3, false);
    expect(unconfirmed.review).toBe('Please confirm that you reviewed the ticket details.');

    const confirmed = validateTicketFormStep(validFormValues, 3, true);
    expect(confirmed).toEqual({});
  });
});

describe('normalizeTicketFormPayload', () => {
  it('trims whitespace from text fields and keeps priority/status as-is', () => {
    const payload = normalizeTicketFormPayload({
      ...validFormValues,
      title: '  Cannot connect to VPN  ',
      description: '  VPN client fails to connect  ',
      category: '  Network  '
    });

    expect(payload).toEqual({
      title: 'Cannot connect to VPN',
      description: 'VPN client fails to connect',
      category: 'Network',
      priority: 'HIGH',
      status: 'OPEN'
    });
  });
});

describe('formatTicketFormLabel', () => {
  it('splits camelCase keys into capitalized words', () => {
    expect(formatTicketFormLabel('title')).toBe('Title');
    expect(formatTicketFormLabel('createdBy')).toBe('Created By');
  });
});
