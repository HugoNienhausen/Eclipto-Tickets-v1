package com.firstprojects.codereader.demo.entities;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Data
@NoArgsConstructor
@Entity
public class Ticket {

    @Id
    private UUID id; // Generar manualmente el UUID en el constructor

    private Long eventId; // ID del evento al que pertenece
    private String buyerName;
    private String buyerSurname;

    public Ticket(Long eventId, String buyerName, String buyerSurname) {
        this.id = UUID.randomUUID(); // Generar UUID manualmente
        System.out.println(this.id);
        this.eventId = eventId;
        this.buyerName = buyerName;
        this.buyerSurname = buyerSurname;
    }
}