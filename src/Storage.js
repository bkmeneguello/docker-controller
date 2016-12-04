import { fromJS } from 'immutable';
import { createStore } from 'redux';

let defaultState = JSON.parse(localStorage.getItem('docker')) || {
  hosts: {}
};

let dockerApp = (state = fromJS(defaultState), action) => {
  switch (action.type) {
    case 'REMOVE_HOST':
      return state.deleteIn(['hosts', action.name]);
    case 'ADD_HOST':
      return state.setIn(['hosts', action.host.name], action.host.url);
    default:
      return state;
  }
}

let store = createStore(dockerApp, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

store.subscribe(() => {
  localStorage.setItem('docker', JSON.stringify(store.getState().toJS()));
});

export default store;
