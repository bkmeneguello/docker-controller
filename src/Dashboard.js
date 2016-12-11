import React from 'react';
import { connect } from 'react-redux'
import Layout from './Layout'

let Dashboard = connect(
  (state, ownProps) => {
    return {}
  },
  (dispatch, ownProps) => {
    return {}
  }
)(() => {
  return (<Layout>dash</Layout>);
});

export default Dashboard;
