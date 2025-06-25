# Use Maven image to build the JAR
FROM maven:3.9.10-eclipse-temurin-21 AS builder
WORKDIR /build
COPY . .
RUN mvn clean package -DskipTests

# Debug step to list files in /build/target
RUN ls -l /build/target

# Extract layers from JAR
FROM eclipse-temurin:21-jre-alpine-3.21 AS layers
WORKDIR /layer
COPY --from=builder /build/target/todo-0.0.1-SNAPSHOT.jar app.jar
RUN java -Djarmode=layertools -jar app.jar extract

# Assemble stage
FROM eclipse-temurin:21-jre-alpine-3.21
WORKDIR /opt/app
RUN addgroup --system appuser && adduser -S -s -G appuser appuser
COPY --from=layers /layer/dependencies/ ./
COPY --from=layers /layer/spring-boot-loader/ ./
COPY --from=layers /layer/snapshot-dependencies/ ./
COPY --from=layers /layer/application/ ./

COPY --from=builder /build/target/todo-0.0.1-SNAPSHOT.jar app.jar

RUN chown -R appuser:appuser /opt/app
USER appuser
# HEALTHCHECK --interval=30s --timeout=3s --retries=1 CMD wget -qO- http://localhost:8080/actuator/health | grep UP || exit 1
ENTRYPOINT ["java", "-jar", "app.jar"]

#Temp comment