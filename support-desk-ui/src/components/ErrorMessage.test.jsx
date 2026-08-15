import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import ErrorMessage from './ErrorMessage.jsx';

describe('ErrorMessage', () => {
  it('renders the given message text', () => {
    render(<ErrorMessage message="Could not load tickets." />);

    expect(screen.getByText('Could not load tickets.')).toBeInTheDocument();
  });
});
