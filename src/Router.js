import React from 'react';
import { Router, IndexRoute, Route, browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import store from './Storage';
import App from './App';
import Dashboard from './Dashboard';
import Hosts from './Hosts';
import Host from './Host';
import Containers from './Containers';
import Container from './Container';
import Images from './Images';
import Image from './Image';
import Volumes from './Volumes';
import Volume from './Volume';
import Networks from './Networks';
import Network from './Network';

export default <Provider store={store}>
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={Dashboard}/>
      <Route path="hosts" component={Hosts}/>
      <Route path="hosts/:host" component={Host}/>
      <Route path="hosts/:host/containers" component={Containers}/>
      <Route path="hosts/:host/containers/:container" component={Container}/>
      <Route path="hosts/:host/images" component={Images}/>
      <Route path="hosts/:host/images/:image" component={Image}/>
      <Route path="hosts/:host/volumes" component={Volumes}/>
      <Route path="hosts/:host/volumes/:volume" component={Volume}/>
      <Route path="hosts/:host/networks" component={Networks}/>
      <Route path="hosts/:host/networks/:network" component={Network}/>
    </Route>
  </Router>
</Provider>;
