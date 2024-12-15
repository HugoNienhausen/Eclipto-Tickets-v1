package com.firstprojects.codereader.demo.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender mailSender;

    public void sendTicketEmail(String toEmail, String ticketCode, Long eventId) {
        String subject = "Confirmación de Compra de Ticket";
        String body = String.format("Gracias por tu compra! Aquí está tu código de ticket: %s para el evento con ID: %d.", ticketCode, eventId);

        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom("no-reply@eclipto-tickets.com");
        message.setTo(toEmail);
        message.setSubject(subject);
        message.setText(body);

        mailSender.send(message);
    }
}