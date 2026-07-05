package com.example.supportdesk.service;

import com.example.supportdesk.dto.TicketResponse;
import com.example.supportdesk.dto.CreateTicketRequest;
import com.example.supportdesk.exception.ResourceNotFoundException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

// @Service marks this class as a Spring-managed bean holding business logic and data
@Service
public class TicketService {
    // Hardcoded ticket storage - stands in for a real database for this exercise
    private final List<TicketResponse> tickets = new ArrayList<>();

    // Runs once when Spring creates this bean - preloads the ticket list with sample data
    public TicketService() {
        tickets.add(new TicketResponse("T001", "Cannot access email",
                "User cannot login to company email account.", "Email", "HIGH", "OPEN",
                "amir@example.com", "2026-07-03"));

        tickets.add(new TicketResponse("T002", "Laptop is slow",
                "Laptop takes a long time to start up and open applications.", "Hardware", "MEDIUM", "OPEN",
                "siti@example.com", "2026-07-03"));

        tickets.add(new TicketResponse("T003", "VPN connection not working",
                "User is unable to connect to the company VPN from home.", "Network", "HIGH", "OPEN",
                "wei@example.com", "2026-07-04"));
    }

    // Returns the full ticket list to whoever calls this service (the controller)
    public List<TicketResponse> getAllTickets() {
        return tickets;
    }

    // Searches the ticket list for a matching ID, throws if none is found
    public TicketResponse getTicketById(String id) {
        return tickets.stream()
                .filter(ticket -> ticket.getId().equals(id))
                .findFirst()
                .orElseThrow(() -> new ResourceNotFoundException("Ticket " + id + " was not found"));
    }

    public TicketResponse createTicket(CreateTicketRequest request){
        String newId = "T00" + (tickets.size() + 1); // Simple ID generation for demonstration

        TicketResponse newTicket = new TicketResponse(
                newId,
                request.getTitle(),
                request.getDescription(),
                request.getCategory(),
                request.getPriority(),
                "OPEN", // Default status for new tickets
                request.getCreatedBy(),
                java.time.LocalDate.now().toString() // Current date as string
        );
        tickets.add(newTicket);
        return newTicket;
    }
}