import React from 'react';
import { connect } from 'react-redux';
import { FormGroup, ControlLabel, FormControl, HelpBlock, Button, Modal } from 'react-bootstrap';
import { parse } from 'shell-quote';
import { Property, RequiredRule, RegexRule, PropertyChangeMixin } from './Validation'
import Layout, { AlertMixin } from './Layout';

let MyFormInput = ({prop, propName, label, placeholder, handlePropertyChange}) => (
  <FormGroup controlId={'container-' + propName} validationState={prop.validationState}>
    <ControlLabel>{label}</ControlLabel>
    <FormControl type="text" placeholder={placeholder} value={prop} onChange={(event) => handlePropertyChange(propName, event)}/>
    <FormControl.Feedback/>
    {prop.validations.map(validation => <HelpBlock key={validation.message}>{validation.message}</HelpBlock>)}
  </FormGroup>
);

let ContainerEdit = connect(
  (state, ownProps) => {
    return {
      docker: state.hosts[ownProps.params.host]
    };
  }
)(React.createClass({
  mixins: [AlertMixin, PropertyChangeMixin],
  getInitialState: function() {
    return {
      showProgress: false,
      progressLog: [],
      name: new Property(undefined, [new RegexRule(/^[\w-]*$/)]),
      image: new Property(undefined, [RequiredRule, new RegexRule(/^([\w-/]+(:\w+[\w-\.]*)?)?$/)]),
      cmd: new Property(),
      user: new Property(),
      hostname: new Property(undefined, [new RegexRule(/^((?![0-9]+$)(?!.*-$)(?!-)[a-zA-Z0-9-]{1,63})?$/)]),
      domainname: new Property()
    };
  },
  render: function() {
    return (
      <Layout>
        <Modal show={this.state.showProgress}>
          <Modal.Header>
            <Modal.Title>Progress</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {this.state.progressLog.map(log => {
              return <p>{log.progress || log.status}</p>
            })}
          </Modal.Body>
        </Modal>
        <form>
          <MyFormInput prop={this.state.name} propName="name" label="Name" handlePropertyChange={this.handlePropertyChange}/>
          <MyFormInput prop={this.state.image} propName="image" label="Image" handlePropertyChange={this.handlePropertyChange}/>
          <MyFormInput prop={this.state.cmd} propName="cmd" label="Cmd" handlePropertyChange={this.handlePropertyChange}/>
          <MyFormInput prop={this.state.user} propName="user" label="User" handlePropertyChange={this.handlePropertyChange}/>
          <MyFormInput prop={this.state.hostname} propName="hostname" label="Hostname" handlePropertyChange={this.handlePropertyChange}/>
          <MyFormInput prop={this.state.domainname} propName="domainname" label="Domain Name" handlePropertyChange={this.handlePropertyChange}/>
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
      let container = {Image: this.state.image.value};
      this.state.cmd.value &&
        Object.assign(container, {Cmd: parse(this.state.cmd.value)});
      this.state.user.value &&
        Object.assign(container, {User: this.state.user.value});
      this.state.user.hostname &&
        Object.assign(container, {Hostname: this.state.user.hostname});
      this.state.user.domainname &&
        Object.assign(container, {Domainname: this.state.user.domainname});
      this.setState({showProgress: true});
      Promise.resolve(
        this.props.docker.createContainer(container, this.state.name.value, this.progressUpdate)
        .then(() => this.alert('success', 'success!'))
        .catch((error) => {
          console.log(error);
          this.alert('danger', 'failure!');
        })
      ).then(this.close);
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
  },
  progressUpdate: function(log) {
    this.setState((prevState, props) => {
      return {progressLog: prevState.progressLog.concat(log)};
    })
  }
}));

export default ContainerEdit;
