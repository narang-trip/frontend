#FROM openjdk:17-alpine
## 빌드된 JAR 파일을 복사
#COPY build/libs/StompRabbitMQ-0.0.1-SNAPSHOT.jar /app.jar
## 애플리케이션 포트
#EXPOSE 8080
#
## 애플리케이션 실행
#CMD ["java", "-jar", "/app.jar"]
FROM openjdk:17-alpine
ARG JAR_FILE=StompRabbitMQ-0.0.1-SNAPSHOT.jar
COPY ${JAR_FILE} /StompRabbitMQ.jar
ENV RABBITMQ_DEFAULT_USER "guest"
ENV RABBITMQ_DEFAULT_PASS "guest"
ENTRYPOINT ["java", "-jar", "/StompRabbitMQ.jar"]