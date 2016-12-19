import React from 'react';
import { connect } from 'react-redux'
import { withRouter } from 'react-router';
import { Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import Layout, { AlertMixin } from './Layout'

let VolumesSummary = withRouter(React.createClass({
  render: function() {
    return (
      <div>
        <div>{this.props.volume.Name}</div>
        <div>{this.props.volume.Mountpoint}</div>
        <div>{this.props.volume.Driver}</div>
        <LinkContainer to={'/hosts/' + this.props.params.host + '/volumes/' + this.props.volume.Name}>
          <Button bsStyle="primary">Select</Button>
        </LinkContainer>
        {' '}
        <Button bsStyle="danger" onClick={() => this.props.removeVolume(this.props.volume.Name)}>Remove</Button>
      </div>
    );
  }
}));

let Volumes = connect(
  (state, ownProps) => {
    return {
      docker: state.hosts[ownProps.params.host]
    };
  }
)(React.createClass({
  mixins: [AlertMixin],
  getInitialState: function() {
    return {
      volumes: {
        Volumes: []
      }
    };
  },
  render: function() {
    return (
      <Layout>
        <LinkContainer to={'/hosts/' + this.props.params.host + '/volume'}>
          <Button bsStyle="primary">Add Volume</Button>
        </LinkContainer>
        {(this.state.volumes.Volumes || []).map((volume) => {
          return <VolumesSummary key={volume.Name} volume={volume} docker={this.props.docker} removeVolume={this.removeVolume}/>
        })}
      </Layout>
    );
  },
  componentDidMount: function() {
    this.props.docker.loadVolumes().then(volumes => this.setState({volumes: volumes}));
  },
  removeVolume: function(name) {
    this.props.docker.removeVolume(name).then(() => {
      this.props.docker.loadVolumes().then(volumes => {
        this.setState({volumes: volumes})
      });
      this.alert('success', 'volume removed!');
    });
  }
}));

export default Volumes;
