import React from 'react';
import { connect } from 'react-redux';
import Layout, { DataTableScaffold } from './Layout';

let Container = connect(
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
      container: {
        State: {},
        HostConfig: {
          LogConfig: {
            Config: {}
          },
          PortBindings: {},
          RestartPolicy: {}
        },
        GraphDriver: {},
        Mounts: [],
        Config: {
          Volumes: {},
          Labels: {}
        },
        NetworkSettings: {
          Ports: {},
          Networks: {}
        }
      }
    };
  },
  render: function() {
    return (
      <Layout>
        <h2>{this.state.container.Name}</h2>
        <DataTableScaffold data={this.state.container} className="zebra"/>
      </Layout>
    );
  },
  componentDidMount: function() {
    this.props.docker.loadContainer(this.props.params.container).then((container) => this.setState({container: container}));
  }
}));

export default Container;
