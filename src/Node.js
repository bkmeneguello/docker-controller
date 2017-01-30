import React from 'react';
import { connect } from 'react-redux';
import Layout, { DataTableScaffold } from './Layout';

let Node = connect(
  (state, ownProps) => {
    return {
      docker: state.hosts[ownProps.params.host]
    }
  }
)(React.createClass({
  getInitialState: function() {
    return {
      node: {
        Description: {}
      }
    };
  },
  render: function() {
    return (
      <Layout>
        <h2>{this.props.params.node}</h2>
        <DataTableScaffold data={this.state.node} className="zebra"/>
      </Layout>
    );
  },
  componentDidMount: function() {
    this.props.docker.loadNode(this.props.params.node).then((node) => this.setState({node: node}));
  }
}));

export default Node;
