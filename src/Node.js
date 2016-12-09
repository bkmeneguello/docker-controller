import React from 'react';
import { connect } from 'react-redux';
import Docker from './Docker';
import Layout from './Layout';

let Node = connect(
  (state, ownProps) => {
    return {
      docker: new Docker(state.getIn(['hosts', ownProps.params.host]))
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
        <dl className="dl-vertical">
          <dt>Hostname</dt><dd>{this.state.node.Description.Hostname}</dd>
        </dl>
      </Layout>
    );
  },
  componentDidMount: function() {
    this.props.docker.loadNode(this.props.params.node).then((node) => this.setState({node: node}));
  }
}));

export default Node;
