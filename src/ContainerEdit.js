import React from 'react';
import { connect } from 'react-redux';
import { FormGroup, ControlLabel, FormControl, HelpBlock, Button } from 'react-bootstrap';
import { Property, RequiredRule, RegexRule, PropertyChangeMixin } from './Validation'
import Layout, { AlertMixin } from './Layout';
import Docker from './Docker';

let ContainerEdit = connect(
  (state, ownProps) => {
    return {
      docker: new Docker(state.getIn(['hosts', ownProps.params.host]))
    };
  }
)(React.createClass({
  mixins: [AlertMixin, PropertyChangeMixin],
  getInitialState: function() {
    return {
      name: new Property(undefined, [new RegexRule(/^[\w-]*$/)]),
      image: new Property(undefined, [RequiredRule, new RegexRule(/^([\w-/]+(:\w+[\w-\.]*)?)?$/)]),
      cmd: new Property()
    };
  },
  render: function() {
    return (
      <Layout>
        <form>
          <FormGroup controlId="containerName" validationState={this.state.name.validationState}>
            <ControlLabel>Name</ControlLabel>
            <FormControl type="text" placeholder="Container Name" value={this.state.name} onChange={(event) => this.handlePropertyChange('name', event)}/>
            <FormControl.Feedback/>
            {this.state.name.validations.map(validation => <HelpBlock key={validation.message}>{validation.message}</HelpBlock>)}
          </FormGroup>
          <FormGroup controlId="containerImage" validationState={this.state.image.validationState}>
            <ControlLabel>Image</ControlLabel>
            <FormControl type="text" placeholder="Container Image" value={this.state.image} onChange={(event) => this.handlePropertyChange('image', event)}/>
            <FormControl.Feedback/>
            {this.state.image.validations.map(validation => <HelpBlock key={validation.message}>{validation.message}</HelpBlock>)}
          </FormGroup>
          <FormGroup controlId="containerCmd" validationState={this.state.cmd.validationState}>
            <ControlLabel>Cmd</ControlLabel>
            <FormControl type="text" placeholder="Container Cmd" value={this.state.cmd} onChange={(event) => this.handlePropertyChange('cmd', event)}/>
            <FormControl.Feedback/>
            {this.state.cmd.validations.map(validation => <HelpBlock key={validation.message}>{validation.message}</HelpBlock>)}
          </FormGroup>
          <Button onClick={this.confirm} bsStyle="primary">Done</Button>
          {' '}
          <Button onClick={this.cancel}>Cancel</Button>
        </form>
      </Layout>
    );
  },
  isValid: function() {
    let valid = true;
    if (!this.state.image.isValid()) {
      valid = false;
    }
    return valid;
  },
  confirm: function() {
    if (this.isValid()) {
      this.props.docker.createContainer({
        Image: this.state.image.value,
        Cmd: this.state.cmd.value.split(' ')
      }, this.state.name.value)
        .done(() => this.alert('success', 'success!'))
        .fail(() => this.alert('error', 'failure!'))
        .always(() => this.close());
    }
  },
  cancel: function() {
    this.close();
  },
  close: function(style, alert) {
    if ((this.props.location.state || {}).modal) {
      this.props.router.goBack();
    } else {
      this.props.router.push('/hosts/' + this.props.params.host + '/containers');
    }
  }
}));

export default ContainerEdit;
