import React from 'react';
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router';

const ACTIVE_STYLE = {fontWeight: 'bold'};

let Menu = withRouter(connect(
  (state, ownProps) => {
    return {
      docker: ownProps.params.host ? state.hosts[ownProps.params.host] : null
    }
  }
)(React.createClass({
  getInitialState: function() {
    return {
      swarm: false
    };
  },
  render: function() {
    let host = this.props.params.host;
    return (
      <div id="sidebar-wrapper">
        <ul className="sidebar-nav">
          <li className="sidebar-brand"><Link to="/">dashboard</Link></li>
          <li>
            <Link to="/hosts">hosts</Link>
            {host && [
              <Link key="host" to={'/hosts/' + host} activeStyle={ACTIVE_STYLE}>{host}</Link>,
              <ul key="host-children">
                <li><Link to={'/hosts/' + host + '/containers'} activeStyle={ACTIVE_STYLE}>containers</Link></li>
                <li><Link to={'/hosts/' + host + '/images'} activeStyle={ACTIVE_STYLE}>images</Link></li>
                <li><Link to={'/hosts/' + host + '/volumes'} activeStyle={ACTIVE_STYLE}>volumes</Link></li>
                <li><Link to={'/hosts/' + host + '/networks'} activeStyle={ACTIVE_STYLE}>networks</Link></li>
                {this.state.swarm && [
                <li key="swarm"><Link to={'/hosts/' + host + '/swarm'} activeStyle={ACTIVE_STYLE}>swarm</Link></li>,
                <ul key="swarm-children">
                  <li><Link to={'/hosts/' + host + '/swarm/nodes'} activeStyle={ACTIVE_STYLE}>nodes</Link></li>
                  <li><Link to={'/hosts/' + host + '/swarm/services'} activeStyle={ACTIVE_STYLE}>services</Link></li>
                  <li><Link to={'/hosts/' + host + '/swarm/tasks'} activeStyle={ACTIVE_STYLE}>tasks</Link></li>
                </ul>
                ]}
              </ul>
            ]}
          </li>
        </ul>
      </div>
    );
  },
  componentDidMount: function() {
    this.props.docker && this.props.docker.loadInfo().then((info) => {
      this.setState({swarm: info.Swarm.LocalNodeState !== 'inactive'});
    });
  }
})));

export default Menu;
