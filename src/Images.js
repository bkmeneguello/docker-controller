import React from 'react';
import { connect } from 'react-redux'
import { withRouter } from 'react-router';
import { Button, FormGroup, ControlLabel, FormControl, Modal } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { Property, RegexRule, PropertyChangeMixin } from './Validation'
import Layout, { AlertMixin } from './Layout'
import Docker from './Docker';

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

let ImagePullProgress = ({showProgress, progressLog}) => {
  return (
    <Modal show={showProgress}>
      <Modal.Header>
        <Modal.Title>Progress</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {progressLog.map((log, index) => {
          return <p key={index}>{log.progress || log.status}</p>
        })}
      </Modal.Body>
    </Modal>
  );
}

let Images = connect(
  (state, ownProps) => {
    return {
      docker: state.hosts[ownProps.params.host]
    }
  }
)(React.createClass({
  mixins: [AlertMixin, PropertyChangeMixin],
  getInitialState: function() {
    return {
      showImagePullPanel: false,
      image: new Property(undefined, [new RegexRule(Docker.IMAGE_NAME_PATTERN)]),
      showProgress: false,
      progressLog: [],
      images: []
    };
  },
  render: function() {
    return (
      <Layout>
        {(this.state.showImagePullPanel && (
          <form className="form-inline">
            <FormGroup controlId="image" validationState={this.state.image.validationState}>
              <ControlLabel>Image:</ControlLabel>
              <FormControl type="text" name="image" value={this.state.image} onChange={(event) => this.handlePropertyChange('image', event)}/>
              <FormControl.Feedback/>
            </FormGroup>
            {' '}
            <Button bsStyle="primary" onClick={this.pullImage}>Done</Button>
            {' '}
            <Button onClick={this.cancelPull}>Cancel</Button>
          </form>
        )) || <Button bsStyle="primary" onClick={this.showPullImage}>Pull Image</Button>}
        <ImagePullProgress showProgress={this.state.showProgress} progressLog={this.state.progressLog}/>
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
  },
  showPullImage: function() {
    this.setState({showImagePullPanel: true})
  },
  pullImage: function() {
    let [image, tag] = this.state.image.value.split(':');
    this.showProgressLog();
    this.hideImagePullPanel();
    this.props.docker.createImage({fromImage: image, tag: tag || 'latest'}, this.progressUpdate)
      .then(() => {
        this.setState({showProgress: false});
        this.alert('success', 'success!')
          .then(this.loadImages);
      })
      .catch((error) => {
        this.alert('danger', error.responseJSON.message)
      });
  },
  progressUpdate: function(log) {
    this.setState((prevState, props) => {
      return {progressLog: prevState.progressLog.concat(log)};
    })
  },
  showProgressLog: function() {
    this.setState({
      showProgress: true,
      progressLog: []
    });
  },
  cancelPull: function() {
    this.hideImagePullPanel();
  },
  hideImagePullPanel: function() {
    this.setState((prevState, props) => {
      return {
        showImagePullPanel: false,
        image: prevState.image.withValue(undefined)
      };
    });
  }
}));

export { Images as default, ImagePullProgress };
