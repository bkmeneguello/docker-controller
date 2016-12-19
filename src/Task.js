import React from 'react';
import { connect } from 'react-redux';
import Layout from './Layout';

let Task = connect(
  (state, ownProps) => {
    return {
      docker: state.hosts[ownProps.params.host]
    }
  },
  (dispatch, ownProps) => {
    return {}
  }
)(React.createClass({
  getInitialState: function() {
    return {
      task: {}
    };
  },
  render: function() {
    return (
      <Layout>
        <h2>{this.props.params.task}</h2>
        <dl className="dl-vertical">
          <dt>Id</dt><dd>{this.state.task.ID}</dd>
        </dl>
      </Layout>
    );
  },
  componentDidMount: function() {
    this.props.docker.loadTask(this.props.params.task).then((task) => this.setState({task: task}));
  }
}));

export default Task;
