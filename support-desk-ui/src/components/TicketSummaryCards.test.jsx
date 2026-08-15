import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import TicketSummaryCards from './TicketSummaryCards.jsx';

const sampleTickets = [
  { id: 'T001', title: 'Cannot access email', category: 'Email', status: 'OPEN', priority: 'HIGH' },
  { id: 'T002', title: 'VPN not connecting', category: 'Network', status: 'OPEN', priority: 'HIGH' },
  { id: 'T003', title: 'Printer offline', category: 'Hardware', status: 'OPEN', priority: 'MEDIUM' },
  { id: 'T004', title: 'Laptop running slowly', category: 'Hardware', status: 'IN_PROGRESS', priority: 'MEDIUM' },
  { id: 'T005', title: 'Monitor flickering', category: 'Hardware', status: 'IN_PROGRESS', priority: 'LOW' },
  { id: 'T006', title: 'Password reset request', category: 'Account', status: 'CLOSED', priority: 'LOW' }
];

describe('TicketSummaryCards', () => {
  it('displays the summary labels and correct counts for each status', () => {
    render(<TicketSummaryCards tickets={sampleTickets} />);

    expect(screen.getByText('Total Tickets')).toBeInTheDocument();
    expect(screen.getByText('Open')).toBeInTheDocument();
    expect(screen.getByText('In Progress')).toBeInTheDocument();
    expect(screen.getByText('Closed')).toBeInTheDocument();

    expect(screen.getByText('6')).toBeInTheDocument();
    expect(screen.getByText('3')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
    expect(screen.getByText('1')).toBeInTheDocument();
  });
});
