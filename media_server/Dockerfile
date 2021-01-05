FROM openjdk:13
WORKDIR /root
COPY . .
ENV GOOGLE_APPLICATION_CREDENTIALS /root/serverkey/djtechnician_gcs.json
RUN ./gradlew build
ENTRYPOINT ["java", "-jar", "./build/libs/djtechnician-0.0.1-SNAPSHOT.war"]