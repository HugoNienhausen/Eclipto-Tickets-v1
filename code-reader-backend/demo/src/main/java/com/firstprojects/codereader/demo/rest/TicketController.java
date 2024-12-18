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
    public ResponseEntity<List<Ticket>> createTickets(@RequestBody TicketRequest ticketRequest) {
        int ticketQuantity = ticketRequest.getTicketQuantity();
        List<Ticket> tickets = new ArrayList<>();
try{
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
}catch(Exception e){
    System.out.println("Error en la creación de tickets" + e.getMessage());
    e.printStackTrace();
    return ResponseEntity.badRequest().body(null);

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