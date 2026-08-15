package com.example.supportdesk.service;

import com.example.supportdesk.dto.UpdateTicketRequest;
import com.example.supportdesk.model.Ticket;
import com.example.supportdesk.repository.TicketRepository;
import com.example.supportdesk.dto.TicketResponse;
import com.example.supportdesk.dto.CreateTicketRequest;
import com.example.supportdesk.exception.ResourceNotFoundException;
import com.example.supportdesk.util.InputSanitizer;
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
        return toResponse(findTicketOrThrow(id));
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
        ticket.setTitle(InputSanitizer.cleanText(request.getTitle()));
        ticket.setDescription(InputSanitizer.cleanText(request.getDescription()));
        ticket.setCategory(InputSanitizer.cleanText(request.getCategory()));
        ticket.setPriority(InputSanitizer.upperCode(request.getPriority()));
        ticket.setStatus("OPEN"); // Default status for new tickets
        ticket.setCreatedBy(InputSanitizer.cleanText(request.getCreatedBy()));
        ticket.setCreatedAt(java.time.LocalDate.now().toString());

        // save() comes free from MongoRepository - inserts the document and returns it with its new id
        Ticket saved = ticketRepository.save(ticket);
        logger.info("Created ticket with id={}", saved.getId());
        return toResponse(saved);
    }

    public TicketResponse updateTicket(String id, UpdateTicketRequest request) {
        Ticket ticket = findTicketOrThrow(id);

        ticket.setTitle(InputSanitizer.cleanText(request.getTitle()));
        ticket.setDescription(InputSanitizer.cleanText(request.getDescription()));
        ticket.setCategory(InputSanitizer.cleanText(request.getCategory()));
        ticket.setPriority(InputSanitizer.upperCode(request.getPriority()));
        ticket.setStatus(InputSanitizer.upperCode(request.getStatus()));

        Ticket saved = ticketRepository.save(ticket);
        logger.info("Updated ticket with id={}", saved.getId());
        return toResponse(saved);
    }

    // Looks up a ticket by id or throws the same 404 exception every read/write path relies on.
    private Ticket findTicketOrThrow(String id) {
        return ticketRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Ticket " + id + " was not found"));
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