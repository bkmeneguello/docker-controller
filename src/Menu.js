import React from 'react';
import { Link, withRouter } from 'react-router'

const ACTIVE_STYLE = {fontWeight: 'bold'};

let Menu = withRouter(React.createClass({
  render: function() {
    return (
      <div id="sidebar-wrapper">
        <ul className="sidebar-nav">
          <li className="sidebar-brand"><Link to="/">dashboard</Link></li>
          <li>
            <Link to="/hosts">hosts</Link>
            {this.props.params.host &&
            <ul>
              <li><Link to={'/hosts/' + this.props.params.host + '/containers'} activeStyle={ACTIVE_STYLE}>containers</Link></li>
              <li><Link to={'/hosts/' + this.props.params.host + '/images'} activeStyle={ACTIVE_STYLE}>images</Link></li>
              <li><Link to={'/hosts/' + this.props.params.host + '/volumes'} activeStyle={ACTIVE_STYLE}>volumes</Link></li>
              <li><Link to={'/hosts/' + this.props.params.host + '/networks'} activeStyle={ACTIVE_STYLE}>networks</Link></li>
              <li><Link to={'/hosts/' + this.props.params.host + '/swarm'} activeStyle={ACTIVE_STYLE}>swarm</Link></li>
            </ul>
            }
          </li>
        </ul>
      </div>
    );
  }
}));

export default Menu;
