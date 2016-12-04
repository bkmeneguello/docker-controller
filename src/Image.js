import React from 'react';
import { connect } from 'react-redux';
import Docker from './Docker';
import Layout from './Layout';
import hash from 'string-hash';

let Image = connect(
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
      image: {
        Config: {
          ExposedPorts: {},
          Labels: {},
          Volumes: {}
        },
        ContainerConfig: {
          ExposedPorts: {},
          Labels: {},
          Volumes: {}
        },
        GraphDriver: {},
        RootFS: {}
      }
    };
  },
  render: function() {
    return (
      <Layout>
        <h2>{this.props.params.name}</h2>
        <dl className="dl-vertical">
          <dt>Architecture</dt><dd>{this.state.image.Architecture}</dd>
          <dt>Author</dt><dd>{this.state.image.Author}</dd>
          <dt>Comment</dt><dd>{this.state.image.Comment}</dd>
          <dt>Config</dt>
          <dd>
            <dl>
              <dt>AttachStderr</dt><dd>{this.state.image.Config.AttachStderr}</dd>
              <dt>AttachStdin</dt><dd>{this.state.image.Config.AttachStdin}</dd>
              <dt>AttachStdout</dt><dd>{this.state.image.Config.AttachStdout}</dd>
              <dt>Cmd</dt>
              <dd>
                <ul>
                {(this.state.image.Config.Cmd || []).map((cmd, index) => {
                  return <li key={hash(index + cmd)}>{cmd}</li>
                })}
                </ul>
              </dd>
              <dt>Domainname</dt><dd>{this.state.image.Config.Domainname}</dd>
              <dt>Entrypoint</dt>
              <dd>
                <ul>
                {(this.state.image.Config.Entrypoint || []).map((entrypoint, index) => {
                  return <li key={hash(index + entrypoint)}>{entrypoint}</li>
                })}
                </ul>
              </dd>
              <dt>Env</dt>
              <dd>
                <ul>
                {(this.state.image.Config.Env || []).map((env) => {
                  return <li key={env}>{env}</li>
                })}
                </ul>
              </dd>
              <dt>ExposedPorts</dt>
              <dd>
                <dl>
                  {Object.keys(this.state.image.Config.ExposedPorts || {}).map((exposedPort) => {
                    return [
                      <dt key={'dt-' + exposedPort}>{exposedPort}</dt>,
                      <dd key={'dd-' + exposedPort}></dd>
                    ]
                  })}
                </dl>
              </dd>
              <dt>Hostname</dt><dd>{this.state.image.Config.Hostname}</dd>
              <dt>Image</dt><dd>{this.state.image.Config.Image}</dd>
              <dt>Labels</dt>
              <dd>
                <dl>
                {Object.keys(this.state.image.Config.Labels || {}).map((label) => {
                  return [
                    <dt key={'dt-' + label}>{label}</dt>,
                    <dd key={'dd-' + label}>{this.state.image.Config.Labels[label]}</dd>
                  ]
                })}
                </dl>
              </dd>
              <dt>OnBuild</dt><dd>{JSON.stringify(this.state.image.Config.OnBuild)}</dd>
              <dt>OpenStdin</dt><dd>{this.state.image.Config.OpenStdin}</dd>
              <dt>StdinOnce</dt><dd>{this.state.image.Config.StdinOnce}</dd>
              <dt>Tty</dt><dd>{this.state.image.Config.Tty}</dd>
              <dt>User</dt><dd>{this.state.image.Config.User}</dd>
              <dt>Volumes</dt>
              <dd>
                <dl>
                {Object.keys(this.state.image.Config.Volumes || {}).map((volume) => {
                  return [
                    <dt key={'dt-' + volume}>{volume}</dt>,
                    <dd key={'dd-' + volume}></dd>
                  ]
                })}
                </dl>
              </dd>
              <dt>WorkingDir</dt><dd>{this.state.image.Config.WorkingDir}</dd>
            </dl>
          </dd>
          <dt>Container</dt><dd>{this.state.image.Container}</dd>
          <dt>ContainerConfig</dt>
          <dd>
            <dl>
              <dt>AttachStderr</dt><dd>{this.state.image.ContainerConfig.AttachStderr}</dd>
              <dt>AttachStdin</dt><dd>{this.state.image.ContainerConfig.AttachStdin}</dd>
              <dt>AttachStdout</dt><dd>{this.state.image.ContainerConfig.AttachStdout}</dd>
              <dt>Cmd</dt>
              <dd>
                <ul>
                {(this.state.image.ContainerConfig.Cmd || []).map((cmd, index) => {
                  return <li key={hash(index + cmd)}>{cmd}</li>
                })}
                </ul>
              </dd>
              <dt>Domainname</dt><dd>{this.state.image.ContainerConfig.Domainname}</dd>
              <dt>Entrypoint</dt>
              <dd>
                <ul>
                {(this.state.image.ContainerConfig.Entrypoint || []).map((entrypoint, index) => {
                  return <li key={hash(index + entrypoint)}>{entrypoint}</li>
                })}
                </ul>
              </dd>
              <dt>Env</dt>
              <dd>
                <ul>
                {(this.state.image.ContainerConfig.Env || []).map((env) => {
                  return <li key={env}>{env}</li>
                })}
                </ul>
              </dd>
              <dt>ExposedPorts</dt>
              <dd>
                <dl>
                  {Object.keys(this.state.image.ContainerConfig.ExposedPorts || {}).map((exposedPort) => {
                    return [
                      <dt key={'dt-' + exposedPort}>{exposedPort}</dt>,
                      <dd key={'dd-' + exposedPort}></dd>
                    ]
                  })}
                </dl>
              </dd>
              <dt>Hostname</dt><dd>{this.state.image.ContainerConfig.Hostname}</dd>
              <dt>Image</dt><dd>{this.state.image.ContainerConfig.Image}</dd>
              <dt>Labels</dt>
              <dd>
                <dl>
                {Object.keys(this.state.image.ContainerConfig.Labels || {}).map((label) => {
                  return [
                    <dt key={'dt-' + label}>{label}</dt>,
                    <dd key={'dd-' + label}>{this.state.image.ContainerConfig.Labels[label]}</dd>
                  ]
                })}
                </dl>
              </dd>
              <dt>OnBuild</dt><dd>{JSON.stringify(this.state.image.ContainerConfig.OnBuild)}</dd>
              <dt>OpenStdin</dt><dd>{this.state.image.ContainerConfig.OpenStdin}</dd>
              <dt>StdinOnce</dt><dd>{this.state.image.ContainerConfig.StdinOnce}</dd>
              <dt>Tty</dt><dd>{this.state.image.ContainerConfig.Tty}</dd>
              <dt>User</dt><dd>{this.state.image.ContainerConfig.User}</dd>
              <dt>Volumes</dt>
              <dd>
                <dl>
                {Object.keys(this.state.image.ContainerConfig.Volumes || {}).map((volume) => {
                  return [
                    <dt key={'dt-' + volume}>{volume}</dt>,
                    <dd key={'dd-' + volume}></dd>
                  ]
                })}
                </dl>
              </dd>
              <dt>WorkingDir</dt><dd>{this.state.image.ContainerConfig.WorkingDir}</dd>
            </dl>
          </dd>
          <dt>Created</dt><dd>{this.state.image.Created}</dd>
          <dt>DockerVersion</dt><dd>{this.state.image.DockerVersion}</dd>
          <dt>GraphDriver</dt>
          <dd>
            <dl>
              <dt>Name</dt><dd>{this.state.image.GraphDriver.Name}</dd>
              <dt>Data</dt><dd>{this.state.image.GraphDriver.Data}</dd>
            </dl>
          </dd>
          <dt>Id</dt><dd>{this.state.image.Id}</dd>
          <dt>Os</dt><dd>{this.state.image.Os}</dd>
          <dt>Parent</dt><dd>{this.state.image.Parent}</dd>
          <dt>RepoDigests</dt><dd>{JSON.stringify(this.state.image.RepoDigests)}</dd>
          <dt>RepoTags</dt>
          <dd>
            <ul>
            {(this.state.image.RepoTags || []).map((repoTag) => {
              return <li key={repoTag}>{repoTag}</li>
            })}
            </ul>
          </dd>
          <dt>RootFS</dt>
          <dd>
            <dl>
              <dt>Type</dt><dd>{this.state.image.RootFS.Type}</dd>
              <dt>Layers</dt>
              <dd>
                <ul>
                  {(this.state.image.RootFS.Layers || []).map((layer) => {
                    return <li key={layer}>{layer}</li>
                  })}
                </ul>
              </dd>
            </dl>
          </dd>
          <dt>Size</dt><dd>{this.state.image.Size}</dd>
          <dt>VirtualSize</dt><dd>{this.state.image.VirtualSize}</dd>
        </dl>
      </Layout>
    );
  },
  componentDidMount: function() {
    this.props.docker.loadImage(this.props.params.image).then((image) => this.setState({image: image}));
  }
}));

export default Image;
