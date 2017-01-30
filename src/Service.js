import React from 'react';
import { connect } from 'react-redux';
import Layout, { DataTableScaffold } from './Layout';

let Service = connect(
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
      service: {
        Spec: {}
      }
    };
  },
  render: function() {
    return (
      <Layout>
        <h2>{this.props.params.service}</h2>
        <DataTableScaffold data={this.state.service} className="zebra"/>
      </Layout>
    );
  },
  componentDidMount: function() {
    this.props.docker.loadService(this.props.params.service).then((service) => this.setState({service: service}));
  }
}));

export default Service;
