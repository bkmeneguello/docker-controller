Docker Controller
=================

A React.js interface to manage network acessible Docker instances.

### Setup

After checkout run:
```
$ npm install
```

### Run

To run the development environment use:
```
$ npm start
```

### Build

To build the final release do:
```
$ npm run build
```

### Docker

This frontend uses the Docker API directly. You need to expose the API with `-H tcp://0.0.0.0:2375 --api-enable-cors=true` at Docker config or to use the image available at _docker_ dir.
The first option needs to reboot the server and has some limitations with CORS headers, this way some funcions may be limited. The best option is to use the image (provided with docker-compose) to expose the API.
