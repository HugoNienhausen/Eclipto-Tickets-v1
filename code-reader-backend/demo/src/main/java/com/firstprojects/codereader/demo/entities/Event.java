package com.firstprojects.codereader.demo.entities;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.List;

@Entity
@Table(name = "events")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Event {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(nullable = false)
    private String name;
    @Column(nullable = false, columnDefinition = "TEXT")  // o el número máximo de caracteres que desees
    private String description;
    @Column(nullable = false)
    private LocalDate date;  // Campo para almacenar la fecha del evento
    @Column(nullable = false)
    private int maxAttendees;  // Máximo número de asistentes
    @Column(nullable = false)
    private double ticketPrice;  // Precio de cada ticket
    @Column(nullable = false)
    private int availableSeats;  // Nuevo campo para controlar las plazas disponibles
    @Column(name = "image_url")
    private String imageUrl;
    @ManyToOne
    @JoinColumn(name = "user_id")
    @JsonBackReference  // Evita la serialización del lado inverso
    private User user;

    // Constructor que inicializa availableSeats a maxAttendees
    public Event(String name, String description, LocalDate date, int maxAttendees, double ticketPrice, User user) {
        this.name = name;
        this.description = description;
        this.date = date;
        this.maxAttendees = maxAttendees;
        this.ticketPrice = ticketPrice;
        this.user = user;
    }
    // Método que se ejecuta antes de persistir para inicializar availableSeats
    @PrePersist
    public void initializeAvailableSeats() {
        this.availableSeats = this.maxAttendees;
    }
    // Método para reducir las plazas disponibles
    public void reduceAvailableSeats(int quantity) {
        if (availableSeats >= quantity) {
            this.availableSeats -= quantity;
        } else {
            throw new IllegalArgumentException("No hay suficientes plazas disponibles. B");
        }
    }
}
