#Stage Build
FROM gradle:8.11.1-jdk21-alpine as build
WORKDIR /app
COPY build.gradle.kts .
COPY settings.gradle.kts .
COPY . .
RUN gradle clean build -x test

#Stage Create the final image
FROM eclipse-temurin:17-jdk-alpine
WORKDIR /app
COPY --from=build /app/build/libs/*.jar app.jar
EXPOSE 8080
CMD ["java","-jar","app.jar"]
