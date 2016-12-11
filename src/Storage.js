import { fromJS } from 'immutable';
import { createStore } from 'redux';

let defaultState = {
  hosts: JSON.parse(localStorage.getItem('hosts')) || {}
};

let dockerApp = (state = fromJS(defaultState), action) => {
  switch (action.type) {
    case 'REMOVE_HOST':
      return state.deleteIn(['hosts', action.name]);
    case 'ADD_HOST':
      return state.setIn(['hosts', action.host.name], action.host.url);
    case 'ALERT':
      return state.set('alert', action.alert);
    case 'DISMISS_ALERT':
      return state.remove('alert');
    default:
      return state;
  }
}

let store = createStore(dockerApp, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

store.subscribe(() => {
  localStorage.setItem('hosts', JSON.stringify(store.getState().get('hosts').toJS()));
});

export default store;
