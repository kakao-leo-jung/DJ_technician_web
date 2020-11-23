# DJ Technician WEB ver.

## Client
##### Tech stack
- React (create-react-app)
- Three.js
- Stomp.js

##### Setup
- Run Client development server
```
/* you should install npm first! */
$ cd web_client
$ npm install /* At first, you should install npm modules */
$ npm start
```

## Game-Server

##### Tech stack
- Spring boot
- Docker

##### Setup
- Run web-socket Server
```
/* you should install docker first! */
$ cd web_socket_server
$ docker build -t ${hub_name}/${image_name:tag}
$ docker run --rm -p -d 8080:8080 --name dj_socket ${hub_name}/${image_name:tag}

/* 확인 */
$ docker ps
$ curl localhost:8080 /* 확인 */
```

## UserManagement-Server
TODO : 정소민 Part
