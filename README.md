# DJ Technician WEB ver.

## Client
##### Tech stack
- React (create-react-app)
- Three.js
- Stomp.js

##### Setup
- Run Client development server
- Local Port : 3000
```
/* you should install npm first! */
$ cd web_client
$ npm install /* At first, you should install npm modules */
$ npm start

/* check */
$ curl localhost:3000
```

## Game-Server

##### Tech stack
- Spring boot
- Docker

##### Setup
- Run Web-socket development server
- Local port : 8080
```
/* you should install docker first! */
$ cd web_socket_server
$ ./run.sh

/* check */
$ docker ps
$ curl localhost:8080
```

## Media-Server

##### Tech stack
- Spring boot
- Docker
- Google Cloud Storage

##### Setup
- **First, you should get Google Cloud ADC**
    1. Get **djtechnician_gcs.json** from me
    2. Put **djtechnician_gcs.json** at media_server/serverkey/djtechnician_gcs.json (mkdir 'serverkey' directory)
- Run Media development server
- Local Port : 8081
```
/* you should first get Google Cloud ADC */
// 'djtechnician_gcs.json' should exist at media_server/serverkey/
$ cd media_server
$ ./run.sh

/* check */
$ docker ps
$ curl localhost:8081

```
## UserManagement-Server
TODO : 정소민 Part
