import React from 'react';
import { connect } from 'react-redux';
import Layout, { DataTableScaffold } from './Layout';

let Volume = connect(
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
      volume: {}
    };
  },
  render: function() {
    return (
      <Layout>
        <h2>{this.props.params.volume}</h2>
        <DataTableScaffold data={this.state.volume} className="zebra"/>
      </Layout>
    );
  },
  componentDidMount: function() {
    this.props.docker.loadVolume(this.props.params.volume).then((volume) => this.setState({volume: volume}));
  }
}));

export default Volume;
