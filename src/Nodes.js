import React from 'react';
import { connect } from 'react-redux'
import { withRouter } from 'react-router';
import { Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import Layout from './Layout'

let NodesSummary = withRouter(React.createClass({
  render: function() {
    return (
      <div>
        <div>{this.props.node.ID}</div>
        <LinkContainer to={'/hosts/' + this.props.params.host + '/swarm/nodes/' + this.props.node.ID}>
          <Button bsStyle="primary">Select</Button>
        </LinkContainer>
      </div>
    );
  }
}));

let Nodes = connect(
  (state, ownProps) => {
    return {
      docker: state.hosts[ownProps.params.host]
    }
  }
)(React.createClass({
  getInitialState: function() {
    return {
      nodes: []
    };
  },
  render: function() {
    return (<Layout>
        {(this.state.nodes || []).map((node) => {
          return <NodesSummary key={node.ID} node={node}/>
        })}
      </Layout>);
  },
  componentDidMount: function() {
    this.props.docker.loadNodes().then((nodes) => this.setState({nodes: nodes}));
  }
}));

export default Nodes;
