package com.firstprojects.codereader.demo.services;

import com.firstprojects.codereader.demo.dao.EventRepository;
import com.firstprojects.codereader.demo.dao.TicketRepository;
import com.firstprojects.codereader.demo.entities.Event;
import com.firstprojects.codereader.demo.entities.Ticket;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
public class TicketService {

    @Autowired
    private TicketRepository ticketRepository;
    @Autowired
    private EventRepository eventRepository;

    @Autowired
    private EmailService emailService;

    @Transactional
    public Ticket createTicket(Long eventId, String buyerName, String buyerSurname, String buyerEmail) throws Exception {
        // Buscar el evento
        Event event = eventRepository.findById(eventId)
                .orElseThrow(() -> new IllegalArgumentException("Evento no encontrado"));
        System.out.println(event.getAvailableSeats());
        // Verificar si hay plazas disponibles
        if (event.getAvailableSeats() < 1) {
            throw new IllegalStateException("No hay plazas disponibles para este evento A.");
        }

        // Crear el ticket
        Ticket ticket = new Ticket(eventId, buyerName, buyerSurname);
        Ticket savedTicket = ticketRepository.save(ticket);

        // Reducir las plazas disponibles del evento
        event.reduceAvailableSeats(1);
        eventRepository.save(event);  // Guardar el evento con el nuevo valor de availableSeats

        emailService.sendTicketEmail(buyerEmail, savedTicket.getId().toString(), event.getName(), event.getDescription(), event.getDate().toString());

        return savedTicket;
    }
}