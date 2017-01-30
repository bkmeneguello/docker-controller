import React from 'react';
import { connect } from 'react-redux'
import Layout, { DataTableScaffold } from './Layout'

let Host = connect(
  (state, ownProps) => {
    return {
      docker: state.hosts[ownProps.params.host]
    }
  }
)(React.createClass({
  getInitialState: function() {
    return {
      info: {
        Plugins: {},
        RegistryConfig: {},
        Runtimes: {},
        Swarm: {
          Cluster: {
            Version: {},
            Spec: {
              Orchestration: {},
              Raft: {},
              Dispatcher: {},
              CAConfig: {},
              TaskDefaults: {}
            }
          }
        }
      }
    };
  },
  render: function() {
    return (
      <Layout>
        <h2>{this.props.params.host}</h2>
        <DataTableScaffold data={this.state.info} className="zebra"/>
      </Layout>
    );
  },
  componentDidMount: function() {
    this.props.docker.loadInfo().then((info) => this.setState({info: info}));
  }
}));

export default Host;
