import React from 'react';
import { connect } from 'react-redux';
import Layout from './Layout';

let Container = connect(
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
      container: {
        State: {},
        HostConfig: {
          LogConfig: {},
          RestartPolicy: {}
        },
        GraphDriver: {},
        Config: {},
        NetworkSettings: {}
      }
    };
  },
  render: function() {
    return (
      <Layout>
        <h2>{this.props.params.host}</h2>
        <dl className="dl-vertical">
          <dt>Id</dt><dd>{this.state.container.Id}</dd>
          <dt>Created</dt><dd>{this.state.container.Created}</dd>
          <dt>Path</dt><dd>{this.state.container.Path}</dd>
          <dt>Args</dt><dd>{this.state.container.Args}</dd>
          <dt>State</dt>
          <dd>
            <dl>
              <dt>Status</dt><dd>{this.state.container.State.Status}</dd>
              <dt>Running</dt><dd>{this.state.container.State.Running}</dd>
              <dt>Paused</dt><dd>{this.state.container.State.Paused}</dd>
              <dt>Restarting</dt><dd>{this.state.container.State.Restarting}</dd>
              <dt>OOMKilled</dt><dd>{this.state.container.State.OOMKilled}</dd>
              <dt>Dead</dt><dd>{this.state.container.State.Dead}</dd>
              <dt>Pid</dt><dd>{this.state.container.State.Pid}</dd>
              <dt>ExitCode</dt><dd>{this.state.container.State.ExitCode}</dd>
              <dt>Error</dt><dd>{this.state.container.State.Error}</dd>
              <dt>StartedAt</dt><dd>{this.state.container.State.StartedAt}</dd>
              <dt>FinishedAt</dt><dd>{this.state.container.State.FinishedAt}</dd>
            </dl>
          </dd>
          <dt>Image</dt><dd>{this.state.container.Image}</dd>
          <dt>ResolvConfPath</dt><dd>{this.state.container.ResolvConfPath}</dd>
          <dt>HostnamePath</dt><dd>{this.state.container.HostnamePath}</dd>
          <dt>HostsPath</dt><dd>{this.state.container.HostsPath}</dd>
          <dt>LogPath</dt><dd>{this.state.container.LogPath}</dd>
          <dt>Name</dt><dd>{this.state.container.Name}</dd>
          <dt>RestartCount</dt><dd>{this.state.container.RestartCount}</dd>
          <dt>Driver</dt><dd>{this.state.container.Driver}</dd>
          <dt>MountLabel</dt><dd>{this.state.container.MountLabel}</dd>
          <dt>ProcessLabel</dt><dd>{this.state.container.ProcessLabel}</dd>
          <dt>AppArmorProfile</dt><dd>{this.state.container.AppArmorProfile}</dd>
          <dt>ExecIDs</dt><dd>{this.state.container.ExecIDs}</dd>
          <dt>HostConfig</dt>
          <dd>
            <dl>
              <dt>Binds</dt><dd>{this.state.container.HostConfig.Binds}</dd>
              <dt>ContainerIDFile</dt><dd>{this.state.container.HostConfig.ContainerIDFile}</dd>
              <dt>LogConfig</dt>
              <dd>
                <dl>
                  <dt>Type</dt><dd>{this.state.container.HostConfig.LogConfig.Type}</dd>
                  <dt>Config</dt><dd>this.state.container.HostConfig.LogConfig.Config</dd>
                </dl>
              </dd>
              <dt>NetworkMode</dt><dd>{this.state.container.HostConfig.NetworkMode}</dd>
              <dt>PortBindings</dt><dd>{this.state.container.HostConfig.PortBindings}</dd>
              <dt>RestartPolicy</dt>
              <dd>
                <dl>
                  <dt>Name</dt><dd>{this.state.container.HostConfig.RestartPolicy.Name}</dd>
                  <dt>MaximumRetryCount</dt><dd>{this.state.container.HostConfig.RestartPolicy.MaximumRetryCount}</dd>
                </dl>
              </dd>
              <dt>AutoRemove</dt><dd>{this.state.container.HostConfig.AutoRemove}</dd>
              <dt>VolumeDriver</dt><dd>{this.state.container.HostConfig.VolumeDriver}</dd>
              <dt>VolumesFrom</dt><dd>{this.state.container.HostConfig.VolumesFrom}</dd>
              <dt>CapAdd</dt><dd>{this.state.container.HostConfig.CapAdd}</dd>
              <dt>CapDrop</dt><dd>{this.state.container.HostConfig.CapDrop}</dd>
              <dt>Dns</dt><dd>{this.state.container.HostConfig.Dns}</dd>
              <dt>DnsOptions</dt><dd>{this.state.container.HostConfig.DnsOptions}</dd>
              <dt>DnsSearch</dt><dd>{this.state.container.HostConfig.DnsSearch}</dd>
              <dt>ExtraHosts</dt><dd>{this.state.container.HostConfig.ExtraHosts}</dd>
              <dt>GroupAdd</dt><dd>{this.state.container.HostConfig.GroupAdd}</dd>
              <dt>IpcMode</dt><dd>{this.state.container.HostConfig.IpcMode}</dd>
              <dt>Cgroup</dt><dd>{this.state.container.HostConfig.Cgroup}</dd>
              <dt>Links</dt><dd>{this.state.container.HostConfig.Links}</dd>
              <dt>OomScoreAdj</dt><dd>{this.state.container.OomScoreAdj}</dd>
              <dt>PidMode</dt><dd>{this.state.container.HostConfig.PidMode}</dd>
              <dt>Privileged</dt><dd>{this.state.container.HostConfig.Privileged}</dd>
              <dt>PublishAllPorts</dt><dd>{this.state.container.HostConfig.PublishAllPorts}</dd>
              <dt>ReadonlyRootfs</dt><dd>{this.state.container.HostConfig.ReadonlyRootfs}</dd>
              <dt>SecurityOpt</dt><dd>{this.state.container.HostConfig.SecurityOpt}</dd>
              <dt>UTSMode</dt><dd>{this.state.container.HostConfig.UTSMode}</dd>
              <dt>UsernsMode</dt><dd>{this.state.container.HostConfig.UsernsMode}</dd>
              <dt>ShmSize</dt><dd>{this.state.container.HostConfig.ShmSize}</dd>
              <dt>Runtime</dt><dd>{this.state.container.HostConfig.Runtime}</dd>
              <dt>ConsoleSize</dt><dd>{this.state.container.HostConfig.ConsoleSize}</dd>
              <dt>Isolation</dt><dd>{this.state.container.HostConfig.Isolation}</dd>
              <dt>CpuShares</dt><dd>{this.state.container.HostConfig.CpuShares}</dd>
              <dt>Memory</dt><dd>{this.state.container.HostConfig.Memory}</dd>
              <dt>CgroupParent</dt><dd>{this.state.container.HostConfig.CgroupParent}</dd>
              <dt>BlkioWeight</dt><dd>{this.state.container.HostConfig.BlkioWeight}</dd>
              <dt>BlkioWeightDevice</dt><dd>{this.state.container.HostConfig.BlkioWeightDevice}</dd>
              <dt>BlkioDeviceReadBps</dt><dd>{this.state.container.HostConfig.BlkioDeviceReadBps}</dd>
              <dt>BlkioDeviceWriteBps</dt><dd>{this.state.container.HostConfig.BlkioDeviceWriteBps}</dd>
              <dt>BlkioDeviceReadIOps</dt><dd>{this.state.container.HostConfig.BlkioDeviceReadIOps}</dd>
              <dt>BlkioDeviceWriteIOps</dt><dd>{this.state.container.HostConfig.BlkioDeviceWriteIOps}</dd>
              <dt>CpuPeriod</dt><dd>{this.state.container.HostConfig.CpuPeriod}</dd>
              <dt>CpuQuota</dt><dd>{this.state.container.HostConfig.CpuQuota}</dd>
              <dt>CpusetCpus</dt><dd>{this.state.container.HostConfig.CpusetCpus}</dd>
              <dt>CpusetMems</dt><dd>{this.state.container.HostConfig.CpusetMems}</dd>
              <dt>Devices</dt><dd>{this.state.container.HostConfig.Devices}</dd>
              <dt>DiskQuota</dt><dd>{this.state.container.HostConfig.DiskQuota}</dd>
              <dt>KernelMemory</dt><dd>{this.state.container.HostConfig.KernelMemory}</dd>
              <dt>MemoryReservation</dt><dd>{this.state.container.HostConfig.MemoryReservation}</dd>
              <dt>MemorySwap</dt><dd>{this.state.container.HostConfig.MemorySwap}</dd>
              <dt>MemorySwappiness</dt><dd>{this.state.container.HostConfig.MemorySwappiness}</dd>
              <dt>OomKillDisable</dt><dd>{this.state.container.HostConfig.OomKillDisable}</dd>
              <dt>PidsLimit</dt><dd>{this.state.container.HostConfig.PidsLimit}</dd>
              <dt>Ulimits</dt><dd>{this.state.container.HostConfig.Ulimits}</dd>
              <dt>CpuCount</dt><dd>{this.state.container.HostConfig.CpuCount}</dd>
              <dt>CpuPercent</dt><dd>{this.state.container.HostConfig.CpuPercent}</dd>
              <dt>IOMaximumIOps</dt><dd>{this.state.container.HostConfig.IOMaximumIOps}</dd>
              <dt>IOMaximumBandwidth</dt><dd>{this.state.container.HostConfig.IOMaximumBandwidth}</dd>
            </dl>
          </dd>
          <dt>GraphDriver</dt>
          <dd>
            <dl>
            <dt>Name</dt><dd>{this.state.container.GraphDriver.Name}</dd>
            <dt>Data</dt><dd>{this.state.container.GraphDriver.Data}</dd>
            </dl>
          </dd>
          <dt>Mounts</dt><dd>{this.state.container.Mounts}</dd>
          <dt>Config</dt>
          <dd>
            <dl>
              <dt>Hostname</dt><dd>{this.state.container.Config.Hostname}</dd>
              <dt>Domainname</dt><dd>{this.state.container.Config.Domainname}</dd>
              <dt>User</dt><dd>{this.state.container.Config.User}</dd>
              <dt>AttachStdin</dt><dd>{this.state.container.Config.AttachStdin}</dd>
              <dt>AttachStdout</dt><dd>{this.state.container.Config.AttachStdout}</dd>
              <dt>AttachStderr</dt><dd>{this.state.container.Config.AttachStderr}</dd>
              <dt>Tty</dt><dd>{this.state.container.Config.Tty}</dd>
              <dt>OpenStdin</dt><dd>{this.state.container.Config.OpenStdin}</dd>
              <dt>StdinOnce</dt><dd>{this.state.container.Config.StdinOnce}</dd>
              <dt>Env</dt><dd>{this.state.container.Config.Env}</dd>
              <dt>Cmd</dt><dd>{this.state.container.Config.Cmd}</dd>
              <dt>Image</dt><dd>{this.state.container.Config.Image}</dd>
              <dt>Volumes</dt><dd>{this.state.container.Config.Volumes}</dd>
              <dt>WorkingDir</dt><dd>{this.state.container.Config.WorkingDir}</dd>
              <dt>Entrypoint</dt><dd>{this.state.container.Config.Entrypoint}</dd>
              <dt>OnBuild</dt><dd>{this.state.container.Config.OnBuild}</dd>
              <dt>Labels</dt><dd>{this.state.container.Config.Labels}</dd>
            </dl>
          </dd>
          <dt>NetworkSettings</dt>
          <dd>
            <dl>
            <dt>Bridge</dt><dd>{this.state.container.NetworkSettings.Bridge}</dd>
            <dt>SandboxID</dt><dd>{this.state.container.NetworkSettings.SandboxID}</dd>
            <dt>HairpinMode</dt><dd>{this.state.container.NetworkSettings.HairpinMode}</dd>
            <dt>LinkLocalIPv6Address</dt><dd>{this.state.container.NetworkSettings.LinkLocalIPv6Address}</dd>
            <dt>LinkLocalIPv6PrefixLen</dt><dd>{this.state.container.NetworkSettings.LinkLocalIPv6PrefixLen}</dd>
            <dt>Ports</dt><dd>{this.state.container.NetworkSettings.Ports}</dd>
            <dt>SandboxKey</dt><dd>{this.state.container.NetworkSettings.SandboxKey}</dd>
            <dt>SecondaryIPAddresses</dt><dd>{this.state.container.NetworkSettings.SecondaryIPAddresses}</dd>
            <dt>SecondaryIPv6Addresses</dt><dd>{this.state.container.NetworkSettings.SecondaryIPv6Addresses}</dd>
            <dt>EndpointID</dt><dd>{this.state.container.NetworkSettings.EndpointID}</dd>
            <dt>Gateway</dt><dd>{this.state.container.NetworkSettings.Gateway}</dd>
            <dt>GlobalIPv6Address</dt><dd>{this.state.container.NetworkSettings.GlobalIPv6Address}</dd>
            <dt>GlobalIPv6PrefixLen</dt><dd>{this.state.container.NetworkSettings.GlobalIPv6PrefixLen}</dd>
            <dt>IPAddress</dt><dd>{this.state.container.NetworkSettings.IPAddress}</dd>
            <dt>IPPrefixLen</dt><dd>{this.state.container.NetworkSettings.IPPrefixLen}</dd>
            <dt>IPv6Gateway</dt><dd>{this.state.container.NetworkSettings.IPv6Gateway}</dd>
            <dt>MacAddress</dt><dd>{this.state.container.NetworkSettings.MacAddress}</dd>
            <dt>Networks</dt><dd>{this.state.container.NetworkSettings.Networks}</dd>
            </dl>
          </dd>
        </dl>
      </Layout>
    );
  },
  componentDidMount: function() {
    this.props.docker.loadContainer(this.props.params.container).then((container) => this.setState({container: container}));
  }
}));

export default Container;
