Docker Controller
=================

A React.js interface to manage network acessible Docker instances.

Those hosts must have their API open to the network. The simplest setup is to add `-H tcp://0.0.0.0:2375 --api-enable-cors=true` to dockerd.

### Setup

After checkout run:
```
$ npm install
```
### Build

To build the final release do:
```
$ npm run build
```
