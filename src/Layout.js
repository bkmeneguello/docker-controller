import React from 'react';
import Menu from './Menu'

export default React.createClass({
  getInitialState: function() {
    return {
      toggled: false
    };
  },
  render: function() {
    return (
      <div id="wrapper" className={this.toggled()}>
        <Menu/>
        <section id="page-content-wrapper" className="container-fluid">
          {this.props.children}
        </section>
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
  }
});
