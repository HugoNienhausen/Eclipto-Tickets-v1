package com.firstprojects.codereader.demo.services;

import com.google.zxing.BarcodeFormat;
import com.google.zxing.WriterException;
import com.google.zxing.client.j2se.MatrixToImageWriter;
import com.google.zxing.common.BitMatrix;
import com.google.zxing.qrcode.QRCodeWriter;
import jakarta.mail.internet.MimeMessage;
import jakarta.mail.util.ByteArrayDataSource;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import javax.imageio.ImageIO;
import java.awt.image.BufferedImage;
import java.io.ByteArrayOutputStream;
import java.io.IOException;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender mailSender;

    @Async
    public void sendTicketEmail(String toEmail, String ticketCode, String eventName, String eventDescription, String eventDate) throws Exception {
        String subject = "Confirmación de Compra de Ticket";

        // Genera el código QR como una imagen PNG en alta resolución
        byte[] qrCodeImage = generateQRCodeImage(ticketCode, 400, 400);

        // Contenido HTML con los detalles del evento y referencia a la imagen adjunta
        String body = String.format(
                "<div style='font-family: Arial, sans-serif; color: #333; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px;'>"
                        + "<h2 style='color: #4CAF50;'>¡Gracias por tu compra!</h2>"
                        + "<p>Has comprado un ticket para el evento:</p>"
                        + "<h3>%s</h3>"  // Nombre del evento
                        + "<p><strong>Descripción:</strong> %s</p>"  // Descripción del evento
                        + "<p><strong>Fecha:</strong> %s</p>"  // Fecha del evento
                        + "<p>Tu entrada:</p>"
                        + "<img src='cid:qrCodeImage' alt='QR Code' style='width:200px; height:200px;'/>"
                        + "<p style='font-size: 14px; color: #777;'>Si tienes alguna pregunta, no dudes en contactarnos.</p>"
                        + "<div style='margin-top: 20px;'>"
                        + "<a href='https://tu-sitio.com' style='display: inline-block; padding: 10px 20px; background-color: #4CAF50; color: white; text-decoration: none; border-radius: 5px;'>Visita nuestro sitio</a>"
                        + "</div>"
                        + "<p style='font-size: 12px; color: #999; margin-top: 20px;'>Este es un mensaje automático. Por favor, no respondas a este correo.</p>"
                        + "</div>",
                eventName, eventDescription, eventDate);

        MimeMessage message = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message, true);
        helper.setFrom("hugo@eclipto-tickets.com");
        helper.setTo(toEmail);
        helper.setSubject(subject);
        helper.setText(body, true); // Permitir HTML

        // Adjunta el código QR como una imagen inline
        ByteArrayDataSource dataSource = new ByteArrayDataSource(qrCodeImage, "image/png");
        helper.addInline("qrCodeImage", dataSource);

        mailSender.send(message);
    }

    private byte[] generateQRCodeImage(String text, int width, int height) throws WriterException {
        QRCodeWriter qrCodeWriter = new QRCodeWriter();
        BitMatrix bitMatrix = qrCodeWriter.encode(text, BarcodeFormat.QR_CODE, width, height);

        BufferedImage bufferedImage = MatrixToImageWriter.toBufferedImage(bitMatrix);

        try (ByteArrayOutputStream pngOutputStream = new ByteArrayOutputStream()) {
            ImageIO.write(bufferedImage, "PNG", pngOutputStream);
            return pngOutputStream.toByteArray();
        } catch (IOException e) {
            throw new RuntimeException("Error al generar el código QR en formato PNG", e);
        }
    }
}