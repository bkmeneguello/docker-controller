import React from 'react';
import { connect } from 'react-redux'
import { withRouter } from 'react-router';
import { Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import Layout from './Layout'

let NetworksSummary = withRouter(React.createClass({
  render: function() {
    return (
      <div>
        <div>{this.props.network.Name}</div>
        <LinkContainer to={'/hosts/' + this.props.params.host + '/networks/' + this.props.network.Name}>
          <Button bsStyle="primary">Select</Button>
        </LinkContainer>
      </div>
    );
  }
}));

let Networks = connect(
  (state, ownProps) => {
    return {
      docker: state.hosts[ownProps.params.host]
    }
  }
)(React.createClass({
  getInitialState: function() {
    return {
      networks: {}
    };
  },
  render: function() {
    return (<Layout>
        {Object.keys(this.state.networks).map((network) => {
          return <NetworksSummary key={network} network={this.state.networks[network]}/>
        })}
      </Layout>);
  },
  componentDidMount: function() {
    this.props.docker.loadNetworks().then((networks) => this.setState({networks: networks}));
  }
}));

export default Networks;
