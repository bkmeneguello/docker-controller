import React from 'react';
import { connect } from 'react-redux'
import { withRouter } from 'react-router';
import { Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import Docker from './Docker';
import Layout from './Layout'

let ServicesSummary = withRouter(React.createClass({
  render: function() {
    return (
      <div>
        <div>{this.props.service.Spec.Name}</div>
        <LinkContainer to={'/hosts/' + this.props.params.host + '/swarm/services/' + this.props.service.Spec.Name}>
          <Button bsStyle="primary">Select</Button>
        </LinkContainer>
      </div>
    );
  }
}));

let Services = connect(
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
      services: []
    };
  },
  render: function() {
    return (<Layout>
        {this.state.services.map((service) => {
          return <ServicesSummary key={service.Spec.Name} service={service}/>
        })}
      </Layout>);
  },
  componentDidMount: function() {
    this.props.docker.loadServices().then((services) => this.setState({services: services}));
  }
}));

export default Services;
