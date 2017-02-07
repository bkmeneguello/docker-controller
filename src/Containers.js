import React from 'react';
import { connect } from 'react-redux';
import { Button, ButtonGroup, DropdownButton, MenuItem } from 'react-bootstrap';
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
        <ButtonGroup>
          <LinkContainer to={'/hosts/' + this.props.params.host + '/containers/' + name}>
            <Button bsStyle="primary">Select</Button>
          </LinkContainer>
          <DropdownButton title="Actions" id="actions">
            {this.props.container.State === 'running' && <MenuItem onClick={this.stop}>Stop</MenuItem>}
            {this.props.container.State === 'exited' && <MenuItem onClick={this.start}>Start</MenuItem>}
            {this.props.container.State === 'running' && <MenuItem onClick={this.restart}>Restart</MenuItem>}
            {this.props.container.State === 'running' && <MenuItem onClick={this.pause}>Pause</MenuItem>}
            {this.props.container.State === 'paused' && <MenuItem onClick={this.unpause}>Unpause</MenuItem>}
            <MenuItem onClick={this.remove}>Remove</MenuItem>
            <MenuItem>Commit</MenuItem>
            {this.props.container.State === 'running' && <MenuItem onClick={this.kill}>Kill</MenuItem>}
          </DropdownButton>
        </ButtonGroup>
      </div>
    );
  },
  stop: function() {
    this.props.parent.stopContainer(this.props.container.Id);
  },
  start: function() {
    this.props.parent.startContainer(this.props.container.Id);
  },
  restart: function() {
    this.props.parent.restartContainer(this.props.container.Id);
  },
  pause: function() {
    this.props.parent.pauseContainer(this.props.container.Id);
  },
  unpause: function() {
    this.props.parent.unpauseContainer(this.props.container.Id);
  },
  remove: function() {
    this.props.parent.removeContainer(this.props.container.Id);
  },
  kill: function() {
    this.props.parent.killContainer(this.props.container.Id);
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
          return <ContainerSummary key={container.Id} container={container} parent={this}/>
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
  notify: function(promise) {
    promise.then(() => {
      this.alert('success', 'success!')
        .then(this.loadContainers);
    })
    .catch(() => this.alert('danger', 'failure!'));
  },
  stopContainer: function(name) {
    this.notify(this.props.docker.stopContainer(name));
  },
  startContainer: function(name) {
    this.notify(this.props.docker.startContainer(name));
  },
  restartContainer: function(name) {
    this.notify(this.props.docker.restartContainer(name));
  },
  pauseContainer: function(name) {
    this.notify(this.props.docker.pauseContainer(name));
  },
  unpauseContainer: function(name) {
    this.notify(this.props.docker.unpauseContainer(name));
  },
  removeContainer: function(name) {
    this.notify(this.props.docker.removeContainer(name));
  },
  killContainer: function(name) {
    this.notify(this.props.docker.killContainer(name));
  }
}));

export default Containers;
