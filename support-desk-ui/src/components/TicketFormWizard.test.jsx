import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import TicketFormWizard, { emptyTicketForm } from './TicketFormWizard.jsx';

describe('TicketFormWizard', () => {
  it('shows inline errors and does not advance when required fields are empty', async () => {
    const user = userEvent.setup();
    const onSubmit = vi.fn();

    render(<TicketFormWizard onSubmit={onSubmit} />);

    await user.click(screen.getByRole('button', { name: 'Continue' }));

    expect(screen.getByText('Title is required.')).toBeInTheDocument();
    expect(screen.getByText('Description is required.')).toBeInTheDocument();
    expect(screen.getByText('Category is required.')).toBeInTheDocument();

    expect(screen.getByRole('button', { name: 'Continue' })).toBeInTheDocument();
    expect(onSubmit).not.toHaveBeenCalled();
  });

  it('calls onSubmit with clean payload data once all steps are valid', async () => {
    const user = userEvent.setup();
    const onSubmit = vi.fn().mockResolvedValue(undefined);

    render(<TicketFormWizard onSubmit={onSubmit} />);

    await user.type(screen.getByLabelText('Title'), 'Cannot connect to VPN');
    await user.type(screen.getByLabelText('Description'), 'VPN client fails to connect');
    await user.type(screen.getByLabelText('Category'), 'Network');
    await user.click(screen.getByRole('button', { name: 'Continue' }));

    await user.click(screen.getByRole('button', { name: 'Continue' }));

    await user.click(screen.getByLabelText(/reviewed the ticket details/i));
    await user.click(screen.getByRole('button', { name: 'Create Ticket' }));

    expect(onSubmit).toHaveBeenCalledTimes(1);
    expect(onSubmit).toHaveBeenCalledWith({
      title: 'Cannot connect to VPN',
      description: 'VPN client fails to connect',
      category: 'Network',
      priority: 'MEDIUM',
      status: 'OPEN'
    });
  });

  it('shows a saving state and disables the submit button while submitting', async () => {
    const user = userEvent.setup();
    const onSubmit = vi.fn();

    render(
      <TicketFormWizard
        onSubmit={onSubmit}
        saving
        initialValues={{ ...emptyTicketForm, title: 'Test', description: 'Test', category: 'Test' }}
      />
    );

    await user.click(screen.getByRole('button', { name: 'Continue' }));
    await user.click(screen.getByRole('button', { name: 'Continue' }));

    const submitButton = screen.getByRole('button', { name: 'Saving...' });
    expect(submitButton).toBeDisabled();
  });
});
