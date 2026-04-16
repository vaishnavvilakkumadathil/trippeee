FROM maven:3.9-eclipse-temurin-17 AS build

WORKDIR /app

# Copy parent POM and common-lib first for better caching
COPY pom.xml .
COPY common-lib common-lib/

# Copy eureka-server
COPY eureka-server eureka-server/

# Build the application
RUN mvn clean package -pl eureka-server -am -DskipTests

FROM eclipse-temurin:17-jre

WORKDIR /app

COPY --from=build /app/eureka-server/target/*.jar app.jar

EXPOSE 8761

HEALTHCHECK --interval=30s --timeout=3s --start-period=60s --retries=3 \
  CMD curl -f http://localhost:8761/actuator/health || exit 1

ENTRYPOINT ["java", "-jar", "app.jar", "--spring.profiles.active=docker"]
