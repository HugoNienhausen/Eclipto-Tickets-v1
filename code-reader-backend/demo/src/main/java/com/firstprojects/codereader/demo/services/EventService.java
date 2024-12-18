package com.firstprojects.codereader.demo.services;

import com.firstprojects.codereader.demo.dao.EventRepository;
import com.firstprojects.codereader.demo.dao.UserRepository;
import com.firstprojects.codereader.demo.entities.Event;
import com.firstprojects.codereader.demo.entities.User;
import com.firstprojects.codereader.demo.entities.Role;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor

public class EventService {

    private final EventRepository eventRepository;
    private final UserRepository userRepository;

    public Event createEvent(Event event, Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new EntityNotFoundException("Usuario no encontrado con ID: " + userId));

        event.setUser(user);
        return eventRepository.save(event);
    }

    public List<Event> getEventsByUserId(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        return eventRepository.findByUser(user);
    }

    public Event getPublicEventDetails(String email, Long eventId) {
        return eventRepository.findByUserEmailAndId(email, eventId)
            .orElseThrow(() -> new EntityNotFoundException("Evento no encontrado"));
    }

    public List<Event> findAllEvents() {
        return eventRepository.findAll();  // Asumiendo que tienes una función en el repositorio para obtener todos los eventos
    }
}