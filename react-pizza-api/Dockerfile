FROM gradle:8.5-jdk17 AS build

WORKDIR /home/gradle/src
COPY . .

RUN gradle build -x test

FROM openjdk:17-jdk-slim

WORKDIR /app

COPY --from=build /home/gradle/src/build/libs/react-pizza-api-1.0.0.jar app.jar

EXPOSE 8080

CMD ["java", "-jar", "app.jar"]
