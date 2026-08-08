package com.example.supportdesk.service;

import com.example.supportdesk.model.Ticket;
import com.example.supportdesk.repository.TicketRepository;
import com.example.supportdesk.dto.TicketResponse;
import com.example.supportdesk.dto.CreateTicketRequest;
import com.example.supportdesk.exception.ResourceNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.List;

// @Service marks this class as a Spring-managed bean holding business logic and data
@Service
public class TicketService {
    // TicketRepository replaces the old hardcoded list - it talks to MongoDB instead
    private final TicketRepository ticketRepository;

    private static final Logger logger = LoggerFactory.getLogger(TicketService.class);

    // Constructor injection - Spring creates and passes in the repository automatically
    public TicketService(TicketRepository ticketRepository) {
        this.ticketRepository = ticketRepository;
    }

    public List<TicketResponse> getAllTickets() {
        // findAll() comes free from MongoRepository - fetches every Ticket document from MongoDB
        return ticketRepository.findAll()
                .stream()
                // Convert each MongoDB Ticket document into a TicketResponse DTO for the API
                .map(this::toResponse)
                .toList();
    }

    public List<TicketResponse> getFilteredTickets(String status, String priority, String category) {
        logger.info("Fetching tickets with status={}, priority={}, category={}", status, priority, category);
        
        List<Ticket> tickets;

        // Check each filter one at a time - only one filter is applied per request
        if (status != null && !status.isBlank()) {
            tickets = ticketRepository.findByStatusIgnoreCase(status);
        } else if (priority != null && !priority.isBlank()) {
            tickets = ticketRepository.findByPriorityIgnoreCase(priority);
        } else if (category != null && !category.isBlank()) {
            tickets = ticketRepository.findByCategoryIgnoreCase(category);
        } else {
            // No filter provided - return everything
            tickets = ticketRepository.findAll();
        }

        return tickets.stream()
                .map(this::toResponse)
                .toList();
    }

    public TicketResponse getTicketById(String id) {
        // findById() also comes free from MongoRepository - returns Optional<Ticket>
        Ticket ticket = ticketRepository.findById(id)
                // If no document matches this ID, throw 404 (handled by GlobalExceptionHandler)
                .orElseThrow(() -> new ResourceNotFoundException("Ticket " + id + " was not found"));
        return toResponse(ticket);
    }

    public Page<TicketResponse> getTicketsPaged(int page, int size, String sortBy, String direction) {
        
        logger.info("Fetching paginated tickets page={}, size={}, sortBy={}, direction={}", page, size, sortBy, direction);

        Sort sort = direction.equalsIgnoreCase("desc")
                ? Sort.by(sortBy).descending()
                : Sort.by(sortBy).ascending();

        Pageable pageable = PageRequest.of(page, size, sort);

        return ticketRepository.findAll(pageable)
                .map(this::toResponse);
    }

    public TicketResponse createTicket(CreateTicketRequest request) {

        // Build a Ticket document (no id set - MongoDB generates it automatically on save)
        Ticket ticket = new Ticket();
        ticket.setTitle(request.getTitle());
        ticket.setDescription(request.getDescription());
        ticket.setCategory(request.getCategory());
        ticket.setPriority(request.getPriority());
        ticket.setStatus("OPEN"); // Default status for new tickets
        ticket.setCreatedBy(request.getCreatedBy());
        ticket.setCreatedAt(java.time.LocalDate.now().toString());

        // save() comes free from MongoRepository - inserts the document and returns it with its new id
        Ticket saved = ticketRepository.save(ticket);
        logger.info("Created ticket with id={}", saved.getId());
        return toResponse(saved);
    }

    // Converts a MongoDB Ticket document into the TicketResponse shape the API returns.
    // Kept separate because the database model and the API response don't have to be identical.
    private TicketResponse toResponse(Ticket ticket) {
        return new TicketResponse(
                ticket.getId(),
                ticket.getTitle(),
                ticket.getDescription(),
                ticket.getCategory(),
                ticket.getPriority(),
                ticket.getStatus(),
                ticket.getCreatedBy(),
                ticket.getCreatedAt()
        );
    }
}