import React from 'react';
import { connect } from 'react-redux';
import Docker from './Docker';
import Layout from './Layout';

let Swarm = connect(
  (state, ownProps) => {
    return {
      docker: new Docker(state.getIn(['hosts', ownProps.params.host]))
    }
  },
  (dispatch, ownProps) => {
    return {}
  }
)(React.createClass({
  getInitialState: function() {
    return {
      swarm: {}
    };
  },
  render: function() {
    return (
      <Layout>
        <h2>{this.props.params.host}</h2>
        <dl className="dl-vertical">
          <dt>ID</dt><dd>{this.state.swarm.ID}</dd>
        </dl>
      </Layout>
    );
  },
  componentDidMount: function() {
    this.props.docker.loadSwarm().then((swarm) => this.setState({swarm: swarm}));
  }
}));

export default Swarm;
