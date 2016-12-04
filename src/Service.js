import React from 'react';
import { connect } from 'react-redux';
import Docker from './Docker';
import Layout from './Layout';

let Service = connect(
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
      service: {
        Spec: {}
      }
    };
  },
  render: function() {
    return (
      <Layout>
        <h2>{this.props.params.service}</h2>
        <dl className="dl-vertical">
          <dt>Id</dt><dd>{this.state.service.ID}</dd>
        </dl>
      </Layout>
    );
  },
  componentDidMount: function() {
    this.props.docker.loadService(this.props.params.service).then((service) => this.setState({service: service}));
  }
}));

export default Service;
