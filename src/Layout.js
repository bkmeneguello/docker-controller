import React from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import Swipeable from 'react-swipeable';
import { Alert } from 'react-bootstrap';
import $ from 'jquery';
import Menu from './Menu'

let AlertMixin = {
  alert: function(style, alert) {
    switch (typeof(alert)) {
      case 'string':
        return this.alert(style, {message: alert});
      case 'function':
        return this.alert(style, alert());
      case 'object':
        return new Promise((resolve, reject) => {
          resolve(this.props.dispatch({type: 'ALERT', alert: Object.assign({style: style}, alert)}));
        })
      default:
        throw new Error("invalid alert type!");
    }
  }
}

let isSmallScreen = function() {
  return window.innerWidth < 768;
}

let Layout = connect(
  (state, ownProps) => {
    return {
      alert: state.get('alert')
    }
  },
  (dispatch, props) => {
    return {
      dispatch: dispatch,
      handleAlertDismiss: function() {
        dispatch({type: 'DISMISS_ALERT'});
      }
    }
  }
)(withRouter(React.createClass({
  getInitialState: function() {
    return {
      toggled: false
    };
  },
  render: function() {
    if (this.props.alert && this.props.alert.timeout !== 0) {
      setTimeout(this.props.handleAlertDismiss, this.props.alert.timeout || 5000);
    }
    return (
      <div id="wrapper" className={this.toggled()}>
        <Swipeable onSwipedLeft={this.hide} onSwipedRight={this.show}>
          <Menu/>
          <section id="page-content-wrapper" className="container-fluid" style={{minHeight: '100vh'}}>
            {this.props.alert &&
              <Alert bsStyle={this.props.alert.style} onDismiss={this.props.handleAlertDismiss}>
                {this.props.alert.title && <h4>{this.props.alert.title}</h4>}
                {this.props.alert.summary && <strong>{this.props.alert.summary} </strong>}
                {this.props.alert.message}
              </Alert>
            }
            {this.props.children}
          </section>
        </Swipeable>
      </div>
    );
  },
  toggled: function() {
    return this.state.toggled ? 'toggled' : null;
  },
  toggle: function() {
    this.setState((prev, props) => {
      return {toggled: !prev.toggled};
    });
  },
  hide: function() {
    this.setState({toggled: !isSmallScreen()});
  },
  show: function() {
    this.setState({toggled: isSmallScreen()});
  }
})));

export { Layout as default, AlertMixin };
