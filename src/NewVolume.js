import React from 'react';
import { connect } from 'react-redux';
import { FormGroup, ControlLabel, FormControl, HelpBlock, Button, Row, Col } from 'react-bootstrap';
import { Property, CompositeProperty, RequiredRule, RegexRule } from './Validation'
import { SimpleValue } from './Common'
import Layout from './Layout';
import Docker from './Docker';

let NewVolume = connect(
  (state, ownProps) => {
    return {
      docker: new Docker(state.getIn(['hosts', ownProps.params.host]))
    };
  }
)(React.createClass({
  getInitialState: function() {
    return {
      name: new Property(undefined, [RequiredRule, new RegexRule(/^[\w-]*$/)]),
      driver: new Property(),
      option: new CompositeProperty({
        name: new Property(undefined, [new RegexRule(/^[\w-\.]*$/)]),
        value: new Property()
      }),
      options: {},
      label: new CompositeProperty({
        name: new Property(undefined, [new RegexRule(/^[\w-\.]*$/)]),
        value: new Property()
      }),
      labels: {}
    };
  },
  render: function() {
    return (
      <Layout>
        <form>
          <FormGroup controlId="volumeName" validationState={this.state.name.validationState}>
            <ControlLabel>Name</ControlLabel>
            <FormControl type="text" placeholder="Volume Name" value={this.state.name} onChange={(event) => this.handlePropertyChange('name', event)}/>
            <FormControl.Feedback/>
            {this.state.name.validations.map(validation => <HelpBlock key={validation.message}>{validation.message}</HelpBlock>)}
          </FormGroup>
          <FormGroup controlId="volumeDriver" validationState={this.state.driver.validationState}>
            <ControlLabel>Driver</ControlLabel>
            <FormControl componentClass="select" value={this.state.driver} onChange={(event) => this.handlePropertyChange('driver', event)}>
              <option value="">default</option>
              {(this.state.drivers || []).map((driver) => {
                return <option key={driver}>{driver}</option>
              })}
            </FormControl>
            {this.state.driver.validations.map(validation => <HelpBlock key={validation.message}>{validation.message}</HelpBlock>)}
          </FormGroup>
          <FormGroup controlId="volumeDriverOpts" validationState={this.state.option.validationState}>
            <ControlLabel>Options</ControlLabel>
            <Row>
              <Col md={6}><FormControl type="text" placeholder="Option Name" value={this.state.option.props.name} onChange={(event) => this.handleCompositePropertyChange('option', 'name', event)}/></Col>
              <Col md={5}><FormControl type="text" placeholder="Option Value" value={this.state.option.props.value} onChange={(event) => this.handleCompositePropertyChange('option', 'value', event)}/></Col>
              <Col md={1}><Button onClick={this.addOption} style={{width: '100%'}}>+</Button></Col>
            </Row>
            {this.state.option.validations.map(validation => <HelpBlock key={validation.message}>{validation.message}</HelpBlock>)}
            {Object.keys(this.state.options).map((option) => {
              return <SimpleValue key={option} onEdit={() => this.editOption(option)} onRemove={() => this.removeOption(option)} text={option + ' = ' + this.state.options[option]} />;
            })}
          </FormGroup>
          <FormGroup controlId="volumeLabels" validationState={this.state.label.validationState}>
            <ControlLabel>Labels</ControlLabel>
            <Row>
              <Col md={6}><FormControl type="text" placeholder="Label Name" value={this.state.label.props.name} onChange={(event) => this.handleCompositePropertyChange('label', 'name', event)}/></Col>
              <Col md={5}><FormControl type="text" placeholder="Label Value" value={this.state.label.props.value} onChange={(event) => this.handleCompositePropertyChange('label', 'value', event)}/></Col>
              <Col md={1}><Button onClick={this.addLabel} style={{width: '100%'}}>+</Button></Col>
            </Row>
            {this.state.label.validations.map(validation => <HelpBlock key={validation.message}>{validation.message}</HelpBlock>)}
            {Object.keys(this.state.labels).map((label) => {
              return <SimpleValue key={label} onEdit={() => this.editLabel(label)} onRemove={() => this.removeLabel(label)} text={label + ' = ' + this.state.labels[label]} />;
            })}
          </FormGroup>
          <Button onClick={this.confirm} bsStyle="primary">Done</Button>
          {' '}
          <Button onClick={this.cancel}>Cancel</Button>
        </form>
      </Layout>
    );
  },
  handlePropertyChange: function(propertyName, event) {
    let value = event.target.value;
    let change = {};
    this.setState((prevState, props) => {
      change[propertyName] = prevState[propertyName].withValue(value).validate();
      return change
    })
  },
  handleCompositePropertyChange: function(propertyName, propName, event) {
    let value = event.target.value;
    let change = {};
    this.setState((prevState, props) => {
      change[propertyName] = prevState[propertyName].withPropValue(propName, value).validate();
      return change
    })
  },
  handleLabelNameChange: function(event) {
    this.setState({labelName: event.target.value});
  },
  handleLabelValueChange: function(event) {
    this.setState({labelValue: event.target.value});
  },
  addOption: function() {
    this.setState((prevState, props) => {
      let newOption = {}
      newOption[prevState.option.get('name')] = prevState.option.get('value');
      return {
        option: prevState.option.withPropsValues({name: undefined, value: undefined}),
        options: Object.assign(prevState.options, newOption)
      }
    });
  },
  removeOption: function(option) {
    this.setState((prevState, props) => {
      let options = Object.assign({}, prevState.options);
      delete options[option];
      return {
        options: options
      }
    });
  },
  editOption: function(option) {
    this.setState((prevState, props) => {
      return {
        option: prevState.option.withPropsValues({
          name: option,
          value: prevState.options[option]
        })
      };
    });
  },
  addLabel: function() {
    this.setState((prevState, props) => {
      let newLabel = {}
      newLabel[prevState.label.get('name')] = prevState.label.get('value');
      return {
        label: prevState.label.withPropsValues({name: undefined, value: undefined}),
        labels: Object.assign(prevState.labels, newLabel)
      }
    });
  },
  removeLabel: function(label) {
    this.setState((prevState, props) => {
      let labels = Object.assign({}, prevState.labels);
      delete labels[label];
      return {
        labels: labels
      }
    });
  },
  editLabel: function(label) {
    this.setState((prevState, props) => {
      return {
        label: prevState.label.withPropsValues({
          name: label,
          value: prevState.labels[label]
        })
      };
    });
  },
  isValid: function() {
    let valid = true;
    if (!this.state.name.isValid()) {
      valid = false;
    }
    if (!this.state.driver.isValid()) {
      valid = false;
    }
    return valid;
  },
  confirm: function() {
    if (this.validate()) {
      this.props.docker.createVolume({
        Name: this.state.name.value,
        Driver: this.state.driver.value,
        DriverOpts: this.state.options,
        Labels: this.state.labels,
      }).then(() => this.close());
    }
  },
  cancel: function() {
    this.close();
  },
  close: function() {
    if ((this.props.location.state || {}).modal) {
      this.props.router.goBack();
    } else {
      this.props.router.push('/hosts/' + this.props.params.host + '/volumes');
    }
  },
  componentDidMount: function() {
    this.props.docker.loadInfo().then((info) => this.setState({drivers: info.Plugins.Volume}));
  }
}));

export default NewVolume;
