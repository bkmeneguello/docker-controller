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
import Swarm from './Swarm';
import Nodes from './Nodes';
import Node from './Node';
import Services from './Services';
import Service from './Service';
import Tasks from './Tasks';
import Task from './Task';

export default <Provider store={store}>
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={Dashboard}/>
      <Route path="hosts">
        <IndexRoute component={Hosts}/>
        <Route path=":host">
          <IndexRoute component={Host}/>
          <Route path="containers">
            <IndexRoute component={Containers}/>
            <Route path=":container" component={Container}/>
          </Route>
          <Route path="images">
            <IndexRoute component={Images}/>
            <Route path=":image" component={Image}/>
          </Route>
          <Route path="volumes">
            <IndexRoute component={Volumes}/>
            <Route path=":volume" component={Volume}/>
          </Route>
          <Route path="networks">
            <IndexRoute component={Networks}/>
            <Route path=":network" component={Network}/>
          </Route>
          <Route path="swarm">
            <IndexRoute component={Swarm}/>
            <Route path="nodes">
              <IndexRoute component={Nodes}/>
              <Route path=":node" component={Node}/>
            </Route>
            <Route path="services">
              <IndexRoute component={Services}/>
              <Route path=":service" component={Service}/>
            </Route>
            <Route path="tasks">
              <IndexRoute component={Tasks}/>
              <Route path=":task" component={Task}/>
            </Route>
          </Route>
        </Route>
      </Route>
    </Route>
  </Router>
</Provider>;
