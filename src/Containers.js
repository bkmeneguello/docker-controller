import React from 'react';
import { connect } from 'react-redux';
import { Button } from 'react-bootstrap';
import { Link, withRouter } from 'react-router';
import { LinkContainer } from 'react-router-bootstrap';
import Switch from 'react-bootstrap-switch';
import Layout, { AlertMixin } from './Layout';

let ContainerSummary = withRouter(React.createClass({
  render: function() {
    let container = this.props.container;
    let name = container.Names[0].substring(1);
    return (
      <div>
        <h4>{name}</h4>
        <div><Link to={'/hosts/' + this.props.params.host + '/images/' + container.ImageID}>{container.Image}</Link></div>
        <LinkContainer to={'/hosts/' + this.props.params.host + '/containers/' + name}>
          <Button bsStyle="primary">Select</Button>
        </LinkContainer>
        {' '}
        <Button bsStyle="danger" onClick={this.remove}>Remove</Button>
      </div>
    );
  },
  remove: function() {
    this.props.removeContainer(this.props.container.Id);
  }
}));

let Containers = connect(
  (state, ownProps) => {
    return {
      docker: state.hosts[ownProps.params.host]
    }
  }
)(React.createClass({
  mixins: [AlertMixin],
  getInitialState: function() {
    return {
      containers: [],
      all: false
    };
  },
  render: function() {
    return (
      <Layout>
        <LinkContainer to={'/hosts/' + this.props.params.host + '/container'}>
          <Button bsStyle="primary">Add Container</Button>
        </LinkContainer>
        <div>
          <Switch onText={'all'} offText={'running'} labelWidth={10} value={this.state.all} inverse={true} onChange={this.handleAllFilterChange}/>
        </div>
        {(this.state.containers.length && this.state.containers.map((container) => {
          return <ContainerSummary key={container.Id} container={container} removeContainer={this.removeContainer}/>
        })) || (
          <span>no containers</span>
        )}
      </Layout>
    );
  },
  componentDidMount: function() {
    this.loadContainers();
  },
  handleAllFilterChange: function(el, value) {
    this.setState({all: value}, this.loadContainers);
  },
  loadContainers: function() {
    this.props.docker.loadContainers({all: this.state.all}).then((containers) => {
      this.setState({containers: containers});
    });
  },
  removeContainer: function(name) {
    this.props.docker.removeContainer(name)
      .then(() => {
        this.alert('success', 'success!')
          .then(this.loadContainers);
      })
      .catch(() => this.alert('danger', 'failure!'));
  }
}));

export default Containers;
