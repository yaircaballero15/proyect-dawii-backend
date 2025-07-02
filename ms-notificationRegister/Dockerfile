FROM openjdk:17-jdk-alpine

WORKDIR /app

COPY target/ms-notificationRegister-0-0-1-SNAPSHOT.jar ms-notificationRegister.jar

EXPOSE 8082

# Comando para ejecutar la app
ENTRYPOINT ["java", "-jar", "ms-notificationRegister.jar"]