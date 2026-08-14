import { createContext, useContext, useEffect, useMemo, useReducer } from 'react';
import { useAuth } from './AuthContext.jsx';
import { fetchTickets } from '../services/api.js';
import { filterTickets } from '../utils/tickets.js';

const TicketDataContext = createContext(null);

const initialState = {
  tickets: [],
  selectedTicketId: null,
  loading: true,
  error: '',
  page: { number: 0, size: 20 },
  filters: {
    searchText: '',
    statusFilter: 'ALL',
    priorityFilter: 'ALL'
  }
};

function ticketDataReducer(state, action) {
  switch (action.type) {
    case 'LOAD_START':
      return { ...state, loading: true, error: '' };

    case 'LOAD_SUCCESS':
      return { ...state, loading: false, tickets: action.payload };

    case 'LOAD_ERROR':
      return { ...state, loading: false, error: action.payload };

    case 'SET_SEARCH_TEXT':
      return { ...state, filters: { ...state.filters, searchText: action.payload } };

    case 'SET_STATUS_FILTER':
      return { ...state, filters: { ...state.filters, statusFilter: action.payload } };

    case 'SET_PRIORITY_FILTER':
      return { ...state, filters: { ...state.filters, priorityFilter: action.payload } };

    case 'SELECT_TICKET':
      return { ...state, selectedTicketId: action.payload };

    case 'SET_PAGE':
      return { ...state, page: { ...state.page, ...action.payload } };

    default:
      return state;
  }
}

export function TicketDataProvider({ children }) {
  const { token } = useAuth();
  const [state, dispatch] = useReducer(ticketDataReducer, initialState);

  useEffect(() => {
    let ignore = false;

    async function loadTickets() {
      dispatch({ type: 'LOAD_START' });

      try {
        const data = await fetchTickets(token);

        if (!ignore) {
          dispatch({ type: 'LOAD_SUCCESS', payload: data });
        }
      } catch (err) {
        if (!ignore) {
          dispatch({ type: 'LOAD_ERROR', payload: err.message || 'Could not load protected ticket data.' });
          console.error(err);
        }
      }
    }

    loadTickets();

    return () => {
      ignore = true;
    };
  }, [token]);

  const filteredTickets = useMemo(
    () => filterTickets(state.tickets, state.filters.searchText, state.filters.statusFilter, state.filters.priorityFilter),
    [state.tickets, state.filters]
  );

  useEffect(() => {
    if (filteredTickets.length === 0) {
      if (state.selectedTicketId !== null) {
        dispatch({ type: 'SELECT_TICKET', payload: null });
      }
      return;
    }

    const selectedStillVisible = filteredTickets.some((ticket) => ticket.id === state.selectedTicketId);

    if (!selectedStillVisible) {
      dispatch({ type: 'SELECT_TICKET', payload: filteredTickets[0].id });
    }
  }, [filteredTickets, state.selectedTicketId]);

  const selectedTicket = filteredTickets.find((ticket) => ticket.id === state.selectedTicketId) ?? null;

  const value = useMemo(
    () => ({
      tickets: state.tickets,
      filteredTickets,
      selectedTicket,
      selectedTicketId: state.selectedTicketId,
      loading: state.loading,
      error: state.error,
      page: state.page,
      filters: state.filters,
      selectTicket: (ticketId) => dispatch({ type: 'SELECT_TICKET', payload: ticketId }),
      setSearchText: (value) => dispatch({ type: 'SET_SEARCH_TEXT', payload: value }),
      setStatusFilter: (value) => dispatch({ type: 'SET_STATUS_FILTER', payload: value }),
      setPriorityFilter: (value) => dispatch({ type: 'SET_PRIORITY_FILTER', payload: value }),
      setPage: (page) => dispatch({ type: 'SET_PAGE', payload: page })
    }),
    [state, filteredTickets, selectedTicket]
  );

  return <TicketDataContext.Provider value={value}>{children}</TicketDataContext.Provider>;
}

export function useTicketData() {
  const value = useContext(TicketDataContext);

  if (!value) {
    throw new Error('useTicketData must be used inside TicketDataProvider');
  }

  return value;
}
