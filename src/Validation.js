class Rule {
  validate(value) {
    throw new Error("not implemented!");
  }
  get message() {
    throw new Error("not implemented!");
  }
}

export class RequiredRule extends Rule {
  validate(value) {
    switch (typeof(value)) {
      case 'undefined':
        return false;
      case 'object':
        return value !== null;
      case 'string':
        return value.trim() !== '';
      case 'number':
        return value !== 0;
      case 'function':
        return true;
      default:
      return false
    }
  }
  get message() {
    return "required";
  }
}

export class RegexRule extends Rule {
  constructor(regex) {
    super();
    this._regex = regex;
  }
  validate(value) {
    if (value === undefined) return true;
    if (typeof(value) !== 'string') return false;
    return this._regex.test(value);
  }
  get message() {
    return "invalid value";
  }
}

export class Property {
  constructor(value, rules = []) {
    this._value = value;
    this._rules = rules
  }
  withValue(value) {
    return new Property(value, this._rules);
  }
  get value() {
    return this._value;
  }
  toString() {
    return (this._value || '').toString();
  }
  validate() {
    this._validations = this._rules
      .map(rule => typeof(rule) === 'function' ? new rule() : rule)
      .filter(rule => !rule.validate(this._value));
    return this;
  }
  isValid() {
    return !this.validate().validations.length;
  }
  get validationState() {
    if (this._validations) {
      return this._validations.length ? 'error' : 'success';
    }
    return null;
  }
  get validations() {
    return this._validations || [];
  }
}

export class CompositeProperty {
  constructor(props) {
    this._props = Object.assign({}, props);
  }
  withPropValue(prop, value) {
    let newProp = {}
    newProp[prop] = this._props[prop].withValue(value);
    let newProps = Object.assign({}, this._props, newProp);
    return new CompositeProperty(newProps);
  }
  withPropsValues(propsValues) {
    let newProps = Object.assign({}, this._props);
    Object.keys(propsValues).forEach(prop => {
      let newProp = {}
      newProp[prop] = this._props[prop].withValue(propsValues[prop]);
      Object.assign(newProps, newProp);
    });
    return new CompositeProperty(newProps);
  }
  validate() {
    this._validations = {};
    Object.keys(this._props).forEach(name => {
      this._props[name].validate();
      this._validations[name] = this._props[name].validations;
    });
    return this;
  }
  isValid() {
    return !this.validate().validations.length;
  }
  get(propName) {
    return this.props[propName].value;
  }
  get props() {
    return this._props;
  }
  get validationState() {
    if (this._validations) {
      return Object.keys(this._validations).filter(name => this._validations[name].length).length ? 'error' : 'success';
    }
    return null;
  }
  get validations() {
    return Object.keys(this._validations || {}).map(name => this._validations[name]).reduce((validations, validation) => validations.concat(validation), []);
  }
}

let PropertyChangeMixin = {
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
  }
}

export { PropertyChangeMixin };
