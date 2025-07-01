package machacuay.cibertec.msnotificationregister.service;

import machacuay.cibertec.msnotificationregister.config.RabbitMQConfig;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;


@Component
public class RabbitMQConsumer {

    @Autowired
    private EmailService emailService;

    @RabbitListener(queues = RabbitMQConfig.QUEUE_NAME)
    public void receiveMessage(String message) {
        System.out.println("Mensaje recibido de RabbitMQ: " + message);

        // Aquí asumimos que el mensaje es el correo del usuario
        // Si tu mensaje es "Usuario registrado: correo@ejemplo.com"
        String correo = extraerCorreo(message);
        if(!correo.isEmpty()){
            emailService.sendSimpleEmail(
                    correo,
                    "¡Bienvenido!",
                    "Gracias por registrarte en nuestra aplicación."
            );
            System.out.println("Email enviado a: " + correo);
        }
    }

    private String extraerCorreo(String message) {
        // Espera formato: "Usuario registrado: correo@algo.com - Nombre Apellido"
        String[] partes = message.split(":");
        if (partes.length > 1) {
            String correoConExtra = partes[1].trim();
            // Si hay un guion, corta ahí
            if (correoConExtra.contains("-")) {
                return correoConExtra.split("-")[0].trim();
            }
            // Si hay un espacio, corta ahí (extra por seguridad)
            if (correoConExtra.contains(" ")) {
                return correoConExtra.split(" ")[0].trim();
            }
            return correoConExtra;
        }
        return "";
    }
    ;
    }
