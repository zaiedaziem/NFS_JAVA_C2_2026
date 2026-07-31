package com.example.supportdesk.service;

import com.example.supportdesk.model.Ticket;
import com.example.supportdesk.repository.TicketRepository;
import com.example.supportdesk.dto.TicketResponse;
import com.example.supportdesk.dto.CreateTicketRequest;
import com.example.supportdesk.exception.ResourceNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;

// @Service marks this class as a Spring-managed bean holding business logic and data
@Service
public class TicketService {
    // TicketRepository replaces the old hardcoded list - it talks to MongoDB instead
    private final TicketRepository ticketRepository;

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