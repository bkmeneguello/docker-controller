import React from 'react';
import { connect } from 'react-redux';
import { Button } from 'react-bootstrap';
import { Link, withRouter } from 'react-router';
import { LinkContainer } from 'react-router-bootstrap';
import Docker from './Docker';
import Layout from './Layout';

let ContainerSummary = withRouter(React.createClass({
  render: function() {
    let container = this.props.container;
    let name = container.Names[0].substring(1);
    return (
      <div>
        <div><Link to={'/hosts/' + this.props.params.host + '/images/' + container.ImageID}>{container.Image}</Link></div>
        <div>{container.Id}</div>
        <div>{name}</div>
        <LinkContainer to={'/hosts/' + this.props.params.host + '/containers/' + name}>
          <Button bsStyle="primary">Select</Button>
        </LinkContainer>
      </div>
    );
  }
}));

let Containers = connect(
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
      containers: []
    };
  },
  render: function() {
    return (
      <Layout>
        <LinkContainer to={'/hosts/' + this.props.params.host + '/container'}>
          <Button bsStyle="primary">Add Container</Button>
        </LinkContainer>
        {this.state.containers.map((container) => {
          return <ContainerSummary key={container.Id} container={container}/>
        })}
      </Layout>
    );
  },
  componentDidMount: function() {
    this.props.docker.loadContainers().then((containers) => this.setState({containers: containers}));
  }
}));

export default Containers;
