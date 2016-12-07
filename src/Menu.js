import React from 'react';
import { Link, withRouter } from 'react-router'

const ACTIVE_STYLE = {fontWeight: 'bold'};

let Menu = withRouter(React.createClass({
  render: function() {
    let host = this.props.params.host;
    return (
      <div id="sidebar-wrapper">
        <ul className="sidebar-nav">
          <li className="sidebar-brand"><Link to="/">dashboard</Link></li>
          <li>
            <Link to="/hosts">hosts</Link>
            {host &&
            <ul>
              <li><Link to={'/hosts/' + host + '/containers'} activeStyle={ACTIVE_STYLE}>containers</Link></li>
              <li><Link to={'/hosts/' + host + '/images'} activeStyle={ACTIVE_STYLE}>images</Link></li>
              <li><Link to={'/hosts/' + host + '/volumes'} activeStyle={ACTIVE_STYLE}>volumes</Link></li>
              <li><Link to={'/hosts/' + host + '/networks'} activeStyle={ACTIVE_STYLE}>networks</Link></li>
              <li><Link to={'/hosts/' + host + '/swarm'} activeStyle={ACTIVE_STYLE}>swarm</Link></li>
              <li><Link to={'/hosts/' + host + '/swarm/services'} activeStyle={ACTIVE_STYLE}>services</Link></li>
              <li><Link to={'/hosts/' + host + '/swarm/tasks'} activeStyle={ACTIVE_STYLE}>tasks</Link></li>
            </ul>
            }
          </li>
        </ul>
      </div>
    );
  }
}));

export default Menu;
