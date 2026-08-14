import { createContext, useCallback, useContext, useMemo, useReducer } from 'react';
import { useAuth } from './AuthContext.jsx';
import { fetchTicketsPaged, updateTicket } from '../services/api.js';
import { filterTickets } from '../utils/tickets.js';

const TicketDataContext = createContext(null);

const initialState = {
  tickets: [],
  selectedTicketId: null,
  loading: true,
  error: '',
  cache: {},
  cacheMessage: 'No cached page loaded yet.',
  updatingId: '',
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

function makeCacheKey(params) {
  return `${params.page}|${params.size}|${params.sortBy}|${params.direction}`;
}

function replaceTicket(tickets, updatedTicket) {
  return tickets.map((ticket) => (ticket.id === updatedTicket.id ? updatedTicket : ticket));
}

function replaceTicketInCache(cache, updatedTicket) {
  const nextCache = {};

  Object.entries(cache).forEach(([key, pageData]) => {
    nextCache[key] = {
      ...pageData,
      content: replaceTicket(pageData.content ?? [], updatedTicket)
    };
  });

  return nextCache;
}

function toUpdatePayload(ticket) {
  return {
    title: ticket.title,
    description: ticket.description,
    category: ticket.category,
    priority: ticket.priority,
    status: ticket.status
  };
}

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
      return {
        ...state,
        loading: true,
        error: '',
        cacheMessage: action.fromCache ? 'Loading from cache...' : 'Fetching from backend...'
      };

    case 'LOAD_SUCCESS': {
      const nextCache = action.fromCache
        ? state.cache
        : { ...state.cache, [action.cacheKey]: action.data };

      return {
        ...state,
        loading: false,
        tickets: action.data.content ?? [],
        pageInfo: toPageInfo(action.data, action.params),
        cache: nextCache,
        cacheMessage: action.fromCache ? 'Loaded from cache.' : 'Fetched from backend.'
      };
    }

    case 'LOAD_ERROR':
      return { ...state, loading: false, error: action.payload, cacheMessage: 'Could not load data.' };

    case 'SET_SEARCH_TEXT':
      return { ...state, filters: { ...state.filters, searchText: action.payload } };

    case 'SET_STATUS_FILTER':
      return { ...state, filters: { ...state.filters, statusFilter: action.payload } };

    case 'SET_PRIORITY_FILTER':
      return { ...state, filters: { ...state.filters, priorityFilter: action.payload } };

    case 'SELECT_TICKET':
      return { ...state, selectedTicketId: action.payload };

    case 'OPTIMISTIC_UPDATE':
      return {
        ...state,
        updatingId: action.ticket.id,
        tickets: replaceTicket(state.tickets, action.ticket),
        cache: replaceTicketInCache(state.cache, action.ticket)
      };

    case 'UPDATE_SUCCESS':
      return {
        ...state,
        updatingId: '',
        tickets: replaceTicket(state.tickets, action.ticket),
        cache: replaceTicketInCache(state.cache, action.ticket)
      };

    case 'ROLLBACK_UPDATE':
      return {
        ...state,
        updatingId: '',
        tickets: replaceTicket(state.tickets, action.ticket),
        cache: replaceTicketInCache(state.cache, action.ticket),
        error: action.payload
      };

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

    const cacheKey = makeCacheKey(params);
    const cachedPage = state.cache[cacheKey];

    if (cachedPage && !overrides.force) {
      dispatch({ type: 'LOAD_START', fromCache: true });
      dispatch({ type: 'LOAD_SUCCESS', data: cachedPage, params, cacheKey, fromCache: true });
      return;
    }

    dispatch({ type: 'LOAD_START', fromCache: false });

    try {
      const data = await fetchTicketsPaged(token, params);
      dispatch({ type: 'LOAD_SUCCESS', data, params, cacheKey, fromCache: false });
    } catch (err) {
      dispatch({ type: 'LOAD_ERROR', payload: err.message || 'Could not load protected ticket data.' });
      console.error(err);
    }
  }, [state.cache, state.pageInfo, token]);

  const refreshTickets = useCallback(() => {
    return loadTicketsPage({ force: true });
  }, [loadTicketsPage]);

  const changeTicketStatus = useCallback(async (ticketId, nextStatus) => {
    const currentTicket = state.tickets.find((ticket) => ticket.id === ticketId);

    if (!currentTicket || currentTicket.status === nextStatus) {
      return;
    }

    const optimisticTicket = { ...currentTicket, status: nextStatus };
    dispatch({ type: 'OPTIMISTIC_UPDATE', ticket: optimisticTicket });

    try {
      const savedTicket = await updateTicket(ticketId, token, toUpdatePayload(optimisticTicket));
      dispatch({ type: 'UPDATE_SUCCESS', ticket: savedTicket });
    } catch (err) {
      dispatch({
        type: 'ROLLBACK_UPDATE',
        ticket: currentTicket,
        payload: err.message || 'Could not update ticket status. Reverted local change.'
      });
    }
  }, [state.tickets, token]);

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
      cacheMessage: state.cacheMessage,
      pageInfo: state.pageInfo,
      filters: state.filters,
      updatingId: state.updatingId,
      loadTicketsPage,
      refreshTickets,
      changeTicketStatus,
      selectTicket: (ticketId) => dispatch({ type: 'SELECT_TICKET', payload: ticketId }),
      setSearchText: (value) => dispatch({ type: 'SET_SEARCH_TEXT', payload: value }),
      setStatusFilter: (value) => dispatch({ type: 'SET_STATUS_FILTER', payload: value }),
      setPriorityFilter: (value) => dispatch({ type: 'SET_PRIORITY_FILTER', payload: value })
    }),
    [state, filteredTickets, selectedTicket, loadTicketsPage, refreshTickets, changeTicketStatus]
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
