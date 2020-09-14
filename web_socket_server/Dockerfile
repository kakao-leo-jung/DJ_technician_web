FROM openjdk:11-jdk

WORKDIR /root

COPY . .

RUN ./gradlew build

ENTRYPOINT [ "java", "-jar", "./build/libs/web_socket_server-0.0.1-SNAPSHOT.jar" ]
