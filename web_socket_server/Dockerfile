FROM openjdk:13
WORKDIR /root
COPY . .
RUN ./gradlew build
ENTRYPOINT ["java", "-jar", "./build/libs/djtechnician-0.0.1-SNAPSHOT.war"]
