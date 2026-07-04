package com.example.supportdesk.controller;

import com.example.supportdesk.dto.TicketResponse;
import com.example.supportdesk.service.TicketService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class TicketController {
    public final TicketService ticketService;

    // Constructor injection - Spring automatically creates and passes in a TicketService,
    // so we never write "new TicketService()" ourselves
    public TicketController(TicketService ticketService) {
        this.ticketService = ticketService;
    }

    // Handles GET requests to /api/tickets - delegates the actual work to the service
    // and returns the result, which Spring converts into a JSON array
    @GetMapping("/api/tickets")
    public List<TicketResponse> getAllTickets() {
        return ticketService.getAllTickets();
    }
}