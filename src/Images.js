import React from 'react';
import { connect } from 'react-redux'
import { withRouter } from 'react-router';
import { Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import Docker from './Docker';
import Layout from './Layout'

let ImageSummary = withRouter(React.createClass({
  render: function() {
    return (
      <div>
        <div>{this.props.image.RepoTags.join(', ')}</div>
        <LinkContainer to={'/hosts/' + this.props.params.host + '/images/' + this.props.image.Id}>
          <Button bsStyle="primary">Select</Button>
        </LinkContainer>
      </div>
    );
  }
}));

let Images = connect(
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
      images: []
    };
  },
  render: function() {
    return (<Layout>
        {this.state.images.map((image) => {
          return <ImageSummary key={image.Id} image={image}/>
        })}
      </Layout>);
  },
  componentDidMount: function() {
    this.props.docker.loadImages().then((images) => this.setState({images: images}));
  }
}));

export default Images;
