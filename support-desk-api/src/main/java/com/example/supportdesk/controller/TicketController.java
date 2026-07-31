package com.example.supportdesk.controller;

import com.example.supportdesk.dto.TicketResponse;
import com.example.supportdesk.service.TicketService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import com.example.supportdesk.dto.CreateTicketRequest;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseStatus;

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

    // {id} in the URL is captured by @PathVariable and passed to the service to find one ticket
    @GetMapping("/api/tickets/{id}")
    public TicketResponse getTicketById(@PathVariable String id) {
        return ticketService.getTicketById(id);
    }

    @PostMapping("/api/tickets")
    @ResponseStatus(HttpStatus.CREATED)
    public TicketResponse createTicket(@Valid @RequestBody CreateTicketRequest request) {
        return ticketService.createTicket(request);
    }
}