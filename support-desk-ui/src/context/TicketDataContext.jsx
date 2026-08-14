import { createContext, useCallback, useContext, useMemo, useReducer } from 'react';
import { useAuth } from './AuthContext.jsx';
import { fetchTicketsPaged } from '../services/api.js';
import { filterTickets } from '../utils/tickets.js';

const TicketDataContext = createContext(null);

const initialState = {
  tickets: [],
  selectedTicketId: null,
  loading: true,
  error: '',
  pageInfo: {
    page: 0,
    size: 5,
    sortBy: 'createdAt',
    direction: 'desc',
    totalPages: 0,
    totalElements: 0
  },
  filters: {
    searchText: '',
    statusFilter: 'ALL',
    priorityFilter: 'ALL'
  }
};

function toPageInfo(data, params) {
  return {
    page: data.number ?? params.page,
    size: data.size ?? params.size,
    sortBy: params.sortBy,
    direction: params.direction,
    totalPages: data.totalPages ?? 0,
    totalElements: data.totalElements ?? 0
  };
}

function ticketDataReducer(state, action) {
  switch (action.type) {
    case 'LOAD_START':
      return { ...state, loading: true, error: '' };

    case 'LOAD_SUCCESS':
      return {
        ...state,
        loading: false,
        tickets: action.data.content ?? [],
        pageInfo: toPageInfo(action.data, action.params)
      };

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

    default:
      return state;
  }
}

export function TicketDataProvider({ children }) {
  const { token } = useAuth();
  const [state, dispatch] = useReducer(ticketDataReducer, initialState);

  const loadTicketsPage = useCallback(async (overrides = {}) => {
    const params = {
      page: overrides.page ?? state.pageInfo.page,
      size: overrides.size ?? state.pageInfo.size,
      sortBy: overrides.sortBy ?? state.pageInfo.sortBy,
      direction: overrides.direction ?? state.pageInfo.direction
    };

    dispatch({ type: 'LOAD_START' });

    try {
      const data = await fetchTicketsPaged(token, params);
      dispatch({ type: 'LOAD_SUCCESS', data, params });
    } catch (err) {
      dispatch({ type: 'LOAD_ERROR', payload: err.message || 'Could not load protected ticket data.' });
      console.error(err);
    }
  }, [state.pageInfo, token]);

  const filteredTickets = useMemo(
    () => filterTickets(state.tickets, state.filters.searchText, state.filters.statusFilter, state.filters.priorityFilter),
    [state.tickets, state.filters]
  );

  const selectedTicket = filteredTickets.find((ticket) => ticket.id === state.selectedTicketId)
    ?? filteredTickets[0]
    ?? null;

  const value = useMemo(
    () => ({
      tickets: state.tickets,
      filteredTickets,
      selectedTicket,
      selectedTicketId: state.selectedTicketId,
      loading: state.loading,
      error: state.error,
      pageInfo: state.pageInfo,
      filters: state.filters,
      loadTicketsPage,
      selectTicket: (ticketId) => dispatch({ type: 'SELECT_TICKET', payload: ticketId }),
      setSearchText: (value) => dispatch({ type: 'SET_SEARCH_TEXT', payload: value }),
      setStatusFilter: (value) => dispatch({ type: 'SET_STATUS_FILTER', payload: value }),
      setPriorityFilter: (value) => dispatch({ type: 'SET_PRIORITY_FILTER', payload: value })
    }),
    [state, filteredTickets, selectedTicket, loadTicketsPage]
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
