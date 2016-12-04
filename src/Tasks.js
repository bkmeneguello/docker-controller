import React from 'react';
import { connect } from 'react-redux'
import { withRouter } from 'react-router';
import { Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import Docker from './Docker';
import Layout from './Layout'

let TasksSummary = withRouter(React.createClass({
  render: function() {
    return (
      <div>
        <div>{this.props.task.ID}</div>
        <LinkContainer to={'/hosts/' + this.props.params.host + '/tasks/' + this.props.task.ID}>
          <Button bsStyle="primary">Select</Button>
        </LinkContainer>
      </div>
    );
  }
}));

let Tasks = connect(
  (state, ownProps) => {
    return {
      docker: new Docker(state.getIn(['hosts', ownProps.params.host]))
    }
  },
  (dispatch, ownProps) => {
    return {}
  }
)(React.createClass({
  getInitialState: function() {
    return {
      tasks: []
    };
  },
  render: function() {
    return (<Layout>
        {this.state.tasks.map((task) => {
          return <TasksSummary key={task.ID} task={task}/>
        })}
      </Layout>);
  },
  componentDidMount: function() {
    this.props.docker.loadTasks().then((tasks) => this.setState({tasks: tasks}));
  }
}));

export default Tasks;
