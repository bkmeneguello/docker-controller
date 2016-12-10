import React from 'react';
import { connect } from 'react-redux'
import { withRouter } from 'react-router';
import { Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import $ from 'jquery';
import Layout from './Layout'

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
      </div>
    );
  }
}));

export default connect(
  (state, ownProps) => {
    return {
      url: state.getIn(['hosts', ownProps.params.host])
    }
  },
  (dispatch, ownProps) => {
    return {}
  }
)(React.createClass({
  getInitialState: function() {
    return {
      volumes: {}
    };
  },
  render: function() {
    return (<Layout>
        <LinkContainer to={'/hosts/' + this.props.params.host + '/volume'}>
          <Button bsStyle="primary">Add Volume</Button>
        </LinkContainer>
        {Object.keys(this.state.volumes).map((volume) => {
          return <VolumesSummary key={volume} volume={this.state.volumes[volume]}/>
        })}
      </Layout>);
  },
  componentDidMount: function() {
    $.getJSON(this.props.url + '/volumes').then((volumes) => this.setState({volumes: volumes.Volumes}));
  }
}));
