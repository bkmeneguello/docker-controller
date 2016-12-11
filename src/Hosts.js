import React from 'react';
import { connect } from 'react-redux';
import { Button, FormGroup, ControlLabel, FormControl } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import Docker from './Docker';
import Layout from './Layout';

let HostSummary = connect(
  (state, props) => {
    return {
      docker: new Docker(state.getIn(['hosts', props.host]))
    }
  },
  (dispatch, props) => {
    return {
      dispatch: dispatch,
      removeHost: function() {
        dispatch({type: 'REMOVE_HOST', name: props.host});
      }
    }
  }
)(React.createClass({
  getInitialState: function() {
    return {
      info: {}
    };
  },
  render: function() {
    return (
      <div>
        <div>{this.state.info.OperatingSystem}</div>
        <div>{this.state.info.Name}</div>
        <div>{'Docker ' + this.state.info.ServerVersion}</div>
        <div>{this.state.info.Architecture + ' ' + this.state.info.NCPU + 'x'}</div>
        <div>{(this.state.info.MemTotal / 1024 / 1024 / 1024).toFixed(2) + 'GB'}</div>
        <LinkContainer to={'/hosts/' + this.props.host}>
          <Button bsStyle="primary">Select</Button>
        </LinkContainer>
        {' '}
        <Button bsStyle="danger" onClick={this.props.removeHost}>Remove</Button>
      </div>
    )
  },
  componentDidMount: function() {
    this.props.docker.loadInfo().then((info) => this.setState({info: info}));
  }
}));

let Hosts = connect(
  (state, ownProps) => {
    return {
      hosts: state.get('hosts')
    }
  },
  (dispatch, ownProps) => {
    return {
      addHost: function(newHost) {
        dispatch({type: 'ADD_HOST', host: newHost});
      }
    }
  }
)(React.createClass({
  getInitialState: function() {
    return {
      newHost: null
    };
  },
  render: function() {
    return (
      <Layout>
        {(this.state.newHost && (
          <form className="form-inline">
            <FormGroup>
              <ControlLabel>Name:</ControlLabel>
              <FormControl type="text" name="name" value={this.state.newHost.name} onChange={this.handleNameChange} required/>
            </FormGroup>
            {' '}
            <FormGroup>
              <ControlLabel>URL:</ControlLabel>
              <FormControl type="text" name="url" value={this.state.newHost.url} onChange={this.handleURLChange} required/>
            </FormGroup>
            {' '}
            <Button bsStyle="primary" onClick={this.addHost}>Done</Button>
            {' '}
            <Button onClick={this.cancelHost}>Cancel</Button>
          </form>
        )) || <Button bsStyle="primary" onClick={this.newHost}>New Host</Button>}
        {this.props.hosts.keySeq().toArray().map((host) => {
          return <HostSummary key={host} host={host}/>
        })}
      </Layout>
    )
  },
  newHost: function() {
    this.setState({newHost: {name: '', url: ''}});
  },
  cancelHost: function() {
    this.setState({newHost: null});
  },
  handleNameChange: function(event) {
    this.setState({newHost: Object.assign({}, this.state.newHost, {name: event.target.value})});
  },
  handleURLChange: function(event) {
    this.setState({newHost: Object.assign({}, this.state.newHost, {url: event.target.value})});
  },
  addHost: function() {
    this.props.addHost(this.state.newHost);
    this.setState({newHost: null});
  }
}));

export default Hosts;
