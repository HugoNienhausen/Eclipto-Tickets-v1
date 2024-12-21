package com.firstprojects.codereader.demo.rest;

import com.firstprojects.codereader.demo.config.FileStorageConfig;
import com.firstprojects.codereader.demo.entities.Event;
import com.firstprojects.codereader.demo.services.EventService;
import com.firstprojects.codereader.demo.services.FileStorageService;
import com.firstprojects.codereader.demo.services.JwtService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/events")
@CrossOrigin(origins = "http://localhost:4200")
@RequiredArgsConstructor
public class EventController {

    private final EventService eventService;
    private final JwtService jwtService;
    private final FileStorageService fileStorageService;

    @PostMapping("/create")
    @PreAuthorize("hasAnyRole('ADMIN', 'USER')")
    public ResponseEntity<?> createEvent(
        @RequestParam("image") MultipartFile image,
        @RequestParam("name") String name,
        @RequestParam("description") String description,
        @RequestParam("date") String date,
        @RequestParam("maxAttendees") int maxAttendees,
        @RequestParam("ticketPrice") double ticketPrice,
        @RequestHeader("Authorization") String authHeader
    ) {
        try {
            String jwt = authHeader.substring(7);
            Long userId = jwtService.extractUserId(jwt);
            
            Event event = new Event();
            event.setName(name);
            event.setDescription(description);
            event.setDate(LocalDate.parse(date));
            event.setMaxAttendees(maxAttendees);
            event.setTicketPrice(ticketPrice);
            
            String fileName = fileStorageService.storeFile(image);
            String imageUrl = "/api/uploads/" + fileName;
            event.setImageUrl(imageUrl);
            
            Event newEvent = eventService.createEvent(event, userId);
            return ResponseEntity.status(HttpStatus.CREATED).body(newEvent);
        } catch (Exception e) {
            System.err.println("Error al crear el evento: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body("Error al crear el evento: " + e.getMessage());
        }
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Event>> getEventsByUserId(@PathVariable Long userId) {
        try {
            List<Event> events = eventService.getEventsByUserId(userId);
            return ResponseEntity.ok(events);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
    }

    @GetMapping("/public/{userId}/{eventId}")
public ResponseEntity<?> getPublicEventDetails(
    @PathVariable Long userId,
    @PathVariable Long eventId
) {
    try {
        Event event = eventService.getPublicEventDetails(userId, eventId);
        return ResponseEntity.ok(event);
    } catch (Exception e) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND)
                .body("Evento no encontrado: " + e.getMessage());
    }
}

    @GetMapping("/users")
    public ResponseEntity<List<Event>> getAllEvents() {
        List<Event> events = eventService.findAllEvents();
        return ResponseEntity.ok(events);
    }

}