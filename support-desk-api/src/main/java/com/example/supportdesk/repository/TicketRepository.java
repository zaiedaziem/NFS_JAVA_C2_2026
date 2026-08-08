package com.example.supportdesk.repository;

import com.example.supportdesk.model.Ticket;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface TicketRepository extends MongoRepository<Ticket, String> {

    List<Ticket> findByStatusIgnoreCase(String status);

    List<Ticket> findByPriorityIgnoreCase(String priority);

    List<Ticket> findByCategoryIgnoreCase(String category);
}