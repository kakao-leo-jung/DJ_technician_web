# DJ Technician WEB 버전

## Client
- Run Client development server
```
/* you should install npm first! */
$ cd web_client
$ npm install /* At first, you should install npm modules */
$ npm start
```

## Game-Server
- Run Server
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
