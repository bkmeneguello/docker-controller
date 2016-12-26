import React from 'react';
import { connect } from 'react-redux'
import { withRouter } from 'react-router';
import { Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import Layout, { AlertMixin } from './Layout'

let ImageSummary = withRouter(React.createClass({
  render: function() {
    return (
      <div>
        <div>{this.props.image.Id}</div>
        {this.props.image.RepoTags[0] !== '<none>:<none>' &&
          <div>{this.props.image.RepoTags.join(', ')}</div>
        }
        <LinkContainer to={'/hosts/' + this.props.params.host + '/images/' + this.props.image.Id}>
          <Button bsStyle="primary">Select</Button>
        </LinkContainer>
        {' '}
        <Button bsStyle="danger" onClick={this.remove}>Remove</Button>
      </div>
    );
  },
  remove: function() {
    this.props.removeImage(this.props.image.Id);
  }
}));

let Images = connect(
  (state, ownProps) => {
    return {
      docker: state.hosts[ownProps.params.host]
    }
  }
)(React.createClass({
  mixins: [AlertMixin],
  getInitialState: function() {
    return {
      images: []
    };
  },
  render: function() {
    return (
      <Layout>
        {this.state.images.map((image) => {
          return <ImageSummary key={image.Id} image={image} removeImage={this.removeImage}/>
        })}
      </Layout>
    );
  },
  componentDidMount: function() {
    this.loadImages();
  },
  loadImages: function() {
    this.props.docker.loadImages().then((images) => this.setState({images: images}));
  },
  removeImage: function(image) {
    this.props.docker.removeImage(image)
      .then(() => {
        this.alert('success', 'success!')
          .then(this.loadImages);
      })
      .catch((error) => {
        this.alert('danger', error.responseJSON.message)
      });
  }
}));

export default Images;
