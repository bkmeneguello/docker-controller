import { createStore } from 'redux';
import Docker from './Docker';

let hosts = JSON.parse(localStorage.getItem('hosts')) || {};
let defaultState = {
  hosts: Object.keys(hosts).reduce((newHosts, host) => {
    newHosts[host] = new Docker(hosts[host]);
    return newHosts;
  }, {})
};

let dockerApp = (state = defaultState, action) => {
  switch (action.type) {
    case 'ADD_HOST':
      let newHost = {};
      newHost[action.host.name] = new Docker(action.host.url);
      return Object.assign({}, state, {'hosts': Object.assign({}, state.hosts, newHost)});
    case 'REMOVE_HOST':
      let newHosts = Object.assign({}, state.hosts);
      delete newHosts[action.name];
      return Object.assign({}, state, {hosts: newHosts});
    case 'ALERT':
      return Object.assign({}, state, {'alert': action.alert});
    case 'DISMISS_ALERT':
      let newState = Object.assign({}, state);
      delete newState.alert;
      return newState;
    default:
      return state;
  }
}

let store = createStore(dockerApp, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

store.subscribe(() => {
  let hosts = store.getState().hosts;
  localStorage.setItem('hosts', JSON.stringify(Object.keys(hosts).reduce((newHosts, host) => {
    newHosts[host] = hosts[host].url;
    return newHosts;
  }, {})));
});

export default store;
