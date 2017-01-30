import React from 'react';
import { connect } from 'react-redux';
import Layout, { DataTableScaffold } from './Layout';
import hash from 'string-hash';

let Image = connect(
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
      image: {
        Config: {
          ExposedPorts: {},
          Labels: {},
          Volumes: {}
        },
        ContainerConfig: {
          ExposedPorts: {},
          Labels: {},
          Volumes: {}
        },
        GraphDriver: {},
        RootFS: {}
      }
    };
  },
  render: function() {
    return (
      <Layout>
        <h2>{this.props.params.name}</h2>
        <DataTableScaffold data={this.state.image} className="zebra"/>
      </Layout>
    );
  },
  componentDidMount: function() {
    this.props.docker.loadImage(this.props.params.image).then((image) => this.setState({image: image}));
  }
}));

export default Image;
