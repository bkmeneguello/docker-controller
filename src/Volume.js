import React from 'react';
import { connect } from 'react-redux';
import Layout from './Layout';
import Docker from './Docker';

let Volume = connect(
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
      volume: {}
    };
  },
  render: function() {
    return (
      <Layout>
        <h2>{this.props.params.volume}</h2>
        <dl className="dl-vertical">
          <dt>Name</dt><dd>{this.state.volume.Name}</dd>
          <dt>Mountpoint</dt><dd>{this.state.volume.Mountpoint}</dd>
          <dt>Driver</dt><dd>{this.state.volume.Driver}</dd>
          <dt>Scope</dt><dd>{this.state.volume.Scope}</dd>
          <dt>Labels</dt><dd>{this.state.volume.Labels}</dd>
        </dl>
      </Layout>
    );
  },
  componentDidMount: function() {
    this.props.docker.loadVolume(this.props.params.volume).then((volume) => this.setState({volume: volume}));
  }
}));

export default Volume;
