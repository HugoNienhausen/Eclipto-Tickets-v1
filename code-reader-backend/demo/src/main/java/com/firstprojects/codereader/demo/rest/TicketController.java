package com.firstprojects.codereader.demo.rest;

import com.firstprojects.codereader.demo.entities.Ticket;
import com.firstprojects.codereader.demo.services.TicketService;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;


@RestController
@RequestMapping("/public/tickets")
public class TicketController {

    @Autowired
    private TicketService ticketService;

    @PostMapping("/create")
    public ResponseEntity<?> createTickets(@RequestBody TicketRequest ticketRequest) {
        int ticketQuantity = ticketRequest.getTicketQuantity();
        List<Ticket> tickets = new ArrayList<>();

        if (ticketRequest.getEventId() == null) {
            return ResponseEntity.badRequest().body("eventId es requerido");
        }
        if (ticketQuantity < 1) {
            return ResponseEntity.badRequest().body("ticketQuantity debe ser mayor a 0");
        }
        if (ticketRequest.getBuyerName() == null || ticketRequest.getBuyerName().isBlank()) {
            return ResponseEntity.badRequest().body("buyerName es requerido");
        }
        if (ticketRequest.getBuyerSurname() == null || ticketRequest.getBuyerSurname().isBlank()) {
            return ResponseEntity.badRequest().body("buyerSurname es requerido");
        }
        if (ticketRequest.getBuyerEmail() == null || ticketRequest.getBuyerEmail().isBlank()) {
            return ResponseEntity.badRequest().body("buyerEmail es requerido");
        }

        try {
            for (int i = 0; i < ticketQuantity; i++) {
                Ticket ticket = ticketService.createTicket(
                        ticketRequest.getEventId(),
                        ticketRequest.getBuyerName(),
                        ticketRequest.getBuyerSurname(),
                        ticketRequest.getBuyerEmail()
                );
                tickets.add(ticket);
            }

            return ResponseEntity.ok(tickets); // Retorna la lista de tickets creados
        } catch (Exception e) {
            System.out.println("Error en la creación de tickets: " + e.getMessage());
            e.printStackTrace();
            return ResponseEntity.badRequest().body("Error en la creación de tickets: " + e.getMessage());
        }
    }

}




// DTO para recibir los datos del ticket en JSON
@Data
class TicketRequest {
    private Long eventId;
    private String buyerName;
    private String buyerSurname;
    private String buyerEmail;
    private int ticketQuantity;

}