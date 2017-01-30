import React from 'react';
import { connect } from 'react-redux';
import Layout, { DataTableScaffold } from './Layout';

let Network = connect(
  (state, ownProps) => {
    return {
      docker: state.hosts[ownProps.params.host]
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
        <DataTableScaffold data={this.state.network} className="zebra"/>
      </Layout>
    );
  },
  componentDidMount: function() {
    this.props.docker.loadNetwork(this.props.params.network).then((network) => this.setState({network: network}));
  }
}));

export default Network;
