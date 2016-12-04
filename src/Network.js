import React from 'react';
import { connect } from 'react-redux';
import Docker from './Docker';
import Layout from './Layout';

let Network = connect(
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
      network: {}
    };
  },
  render: function() {
    return (
      <Layout>
        <h2>{this.props.params.network}</h2>
        <dl className="dl-vertical">
          <dt>Id</dt><dd>{this.state.network.Name}</dd>
        </dl>
      </Layout>
    );
  },
  componentDidMount: function() {
    this.props.docker.loadNetwork(this.props.params.network).then((network) => this.setState({network: network}));
  }
}));

export default Network;
