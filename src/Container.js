import React from 'react';
import { connect } from 'react-redux';
import Layout, { DataTable, DataList } from './Layout';

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
          LogConfig: {
            Config: {}
          },
          PortBindings: {},
          RestartPolicy: {}
        },
        GraphDriver: {},
        Mounts: [],
        Config: {
          Volumes: {},
          Labels: {}
        },
        NetworkSettings: {
          Ports: {},
          Networks: {}
        }
      }
    };
  },
  render: function() {
    return (
      <Layout>
        <h2>{this.state.container.Name}</h2>
        <DataTable className="zebra">
          <DataTable.Item label="Id" value={this.state.container.Id}/>
          <DataTable.Item label="Created" value={this.state.container.Created}/>
          <DataTable.Item label="Path" value={this.state.container.Path}/>
          <DataTable.Item label="Args" value={this.state.container.Args}/>
          <DataTable.DataTableItem label="State">
            <DataTable.Item label="Status" value={this.state.container.State.Status}/>
            <DataTable.Item label="Running" value={this.state.container.State.Running}/>
            <DataTable.Item label="Paused" value={this.state.container.State.Paused}/>
            <DataTable.Item label="Restarting" value={this.state.container.State.Restarting}/>
            <DataTable.Item label="OOMKilled" value={this.state.container.State.OOMKilled}/>
            <DataTable.Item label="Dead" value={this.state.container.State.Dead}/>
            <DataTable.Item label="Pid" value={this.state.container.State.Pid}/>
            <DataTable.Item label="ExitCode" value={this.state.container.State.ExitCode}/>
            <DataTable.Item label="Error" value={this.state.container.State.Error}/>
            <DataTable.Item label="StartedAt" value={this.state.container.State.StartedAt}/>
            <DataTable.Item label="FinishedAt" value={this.state.container.State.FinishedAt}/>
          </DataTable.DataTableItem>
          <DataTable.Item label="Image" value={this.state.container.Image}/>
          <DataTable.Item label="ResolvConfPath" value={this.state.container.ResolvConfPath}/>
          <DataTable.Item label="HostnamePath" value={this.state.container.HostnamePath}/>
          <DataTable.Item label="HostsPath" value={this.state.container.HostsPath}/>
          <DataTable.Item label="LogPath" value={this.state.container.LogPath}/>
          <DataTable.Item label="Name" value={this.state.container.Name}/>
          <DataTable.Item label="RestartCount" value={this.state.container.RestartCount}/>
          <DataTable.Item label="Driver" value={this.state.container.Driver}/>
          <DataTable.Item label="MountLabel" value={this.state.container.MountLabel}/>
          <DataTable.Item label="ProcessLabel" value={this.state.container.ProcessLabel}/>
          <DataTable.Item label="AppArmorProfile" value={this.state.container.AppArmorProfile}/>
          <DataTable.Item label="ExecIDs" value={this.state.container.ExecIDs}/>
          <DataTable.DataTableItem label="HostConfig">
            <DataTable.Item label="Binds" value={this.state.container.HostConfig.Binds}/>
            <DataTable.Item label="ContainerIDFile" value={this.state.container.HostConfig.ContainerIDFile}/>
            <DataTable.DataTableItem label="LogConfig">
              <DataTable.Item label="Type" value={this.state.container.HostConfig.LogConfig.Type}/>
              <DataTable.DataTableItem label="Config">
                {Object.keys(this.state.container.HostConfig.LogConfig.Config).map(config => {
                  return <DataTable.Item label={config} value={this.state.container.HostConfig.LogConfig.Config[config]}/>
                })}
              </DataTable.DataTableItem>
            </DataTable.DataTableItem>
            <DataTable.Item label="NetworkMode" value={this.state.container.HostConfig.NetworkMode}/>
            <DataTable.Item label="PortBindings">
              <dl>
              {Object.keys(this.state.container.HostConfig.PortBindings).map(portBinding => {
                return [
                  <dt key={'dt-' + portBinding}>{portBinding}</dt>,
                  <dd key={'dd-' + portBinding}>
                    {this.state.container.HostConfig.PortBindings[portBinding].map((portBindingData, index) => {
                      return (
                        <DataTable key={index}>
                          <DataTable.Item label="HostIp" value={portBindingData.HostIp}/>
                          <DataTable.Item label="HostPort" value={portBindingData.HostPort}/>
                        </DataTable>
                      );
                    })}
                  </dd>
                ];
              })}
              </dl>
            </DataTable.Item>
            <DataTable.DataTableItem label="RestartPolicy">
              <DataTable.Item label="Name" value={this.state.container.HostConfig.RestartPolicy.Name}/>
              <DataTable.Item label="MaximumRetryCount" value={this.state.container.HostConfig.RestartPolicy.MaximumRetryCount}/>
            </DataTable.DataTableItem>
            <DataTable.Item label="AutoRemove" value={this.state.container.HostConfig.AutoRemove}/>
            <DataTable.Item label="VolumeDriver" value={this.state.container.HostConfig.VolumeDriver}/>
            <DataTable.Item label="VolumesFrom" value={this.state.container.HostConfig.VolumesFrom}/>
            <DataTable.Item label="CapAdd" value={this.state.container.HostConfig.CapAdd}/>
            <DataTable.Item label="CapDrop" value={this.state.container.HostConfig.CapDrop}/>
            <DataTable.Item label="Dns" value={this.state.container.HostConfig.Dns}/>
            <DataTable.Item label="DnsOptions" value={this.state.container.HostConfig.DnsOptions}/>
            <DataTable.Item label="DnsSearch" value={this.state.container.HostConfig.DnsSearch}/>
            <DataTable.Item label="ExtraHosts" value={this.state.container.HostConfig.ExtraHosts}/>
            <DataTable.Item label="GroupAdd" value={this.state.container.HostConfig.GroupAdd}/>
            <DataTable.Item label="IpcMode" value={this.state.container.HostConfig.IpcMode}/>
            <DataTable.Item label="Cgroup" value={this.state.container.HostConfig.Cgroup}/>
            <DataTable.Item label="Links" value={this.state.container.HostConfig.Links}/>
            <DataTable.Item label="OomScoreAdj" value={this.state.container.OomScoreAdj}/>
            <DataTable.Item label="PidMode" value={this.state.container.HostConfig.PidMode}/>
            <DataTable.Item label="Privileged" value={this.state.container.HostConfig.Privileged}/>
            <DataTable.Item label="PublishAllPorts" value={this.state.container.HostConfig.PublishAllPorts}/>
            <DataTable.Item label="ReadonlyRootfs" value={this.state.container.HostConfig.ReadonlyRootfs}/>
            <DataTable.Item label="SecurityOpt" value={this.state.container.HostConfig.SecurityOpt}/>
            <DataTable.Item label="UTSMode" value={this.state.container.HostConfig.UTSMode}/>
            <DataTable.Item label="UsernsMode" value={this.state.container.HostConfig.UsernsMode}/>
            <DataTable.Item label="ShmSize" value={this.state.container.HostConfig.ShmSize}/>
            <DataTable.Item label="Runtime" value={this.state.container.HostConfig.Runtime}/>
            <DataTable.Item label="ConsoleSize" value={this.state.container.HostConfig.ConsoleSize}/>
            <DataTable.Item label="Isolation" value={this.state.container.HostConfig.Isolation}/>
            <DataTable.Item label="CpuShares" value={this.state.container.HostConfig.CpuShares}/>
            <DataTable.Item label="Memory" value={this.state.container.HostConfig.Memory}/>
            <DataTable.Item label="CgroupParent" value={this.state.container.HostConfig.CgroupParent}/>
            <DataTable.Item label="BlkioWeight" value={this.state.container.HostConfig.BlkioWeight}/>
            <DataTable.Item label="BlkioWeightDevice" value={this.state.container.HostConfig.BlkioWeightDevice}/>
            <DataTable.Item label="BlkioDeviceReadBps" value={this.state.container.HostConfig.BlkioDeviceReadBps}/>
            <DataTable.Item label="BlkioDeviceWriteBps" value={this.state.container.HostConfig.BlkioDeviceWriteBps}/>
            <DataTable.Item label="BlkioDeviceReadIOps" value={this.state.container.HostConfig.BlkioDeviceReadIOps}/>
            <DataTable.Item label="BlkioDeviceWriteIOps" value={this.state.container.HostConfig.BlkioDeviceWriteIOps}/>
            <DataTable.Item label="CpuPeriod" value={this.state.container.HostConfig.CpuPeriod}/>
            <DataTable.Item label="CpuQuota" value={this.state.container.HostConfig.CpuQuota}/>
            <DataTable.Item label="CpusetCpus" value={this.state.container.HostConfig.CpusetCpus}/>
            <DataTable.Item label="CpusetMems" value={this.state.container.HostConfig.CpusetMems}/>
            <DataTable.Item label="Devices" value={this.state.container.HostConfig.Devices}/>
            <DataTable.Item label="DiskQuota" value={this.state.container.HostConfig.DiskQuota}/>
            <DataTable.Item label="KernelMemory" value={this.state.container.HostConfig.KernelMemory}/>
            <DataTable.Item label="MemoryReservation" value={this.state.container.HostConfig.MemoryReservation}/>
            <DataTable.Item label="MemorySwap" value={this.state.container.HostConfig.MemorySwap}/>
            <DataTable.Item label="MemorySwappiness" value={this.state.container.HostConfig.MemorySwappiness}/>
            <DataTable.Item label="OomKillDisable" value={this.state.container.HostConfig.OomKillDisable}/>
            <DataTable.Item label="PidsLimit" value={this.state.container.HostConfig.PidsLimit}/>
            <DataTable.Item label="Ulimits" value={this.state.container.HostConfig.Ulimits}/>
            <DataTable.Item label="CpuCount" value={this.state.container.HostConfig.CpuCount}/>
            <DataTable.Item label="CpuPercent" value={this.state.container.HostConfig.CpuPercent}/>
            <DataTable.Item label="IOMaximumIOps" value={this.state.container.HostConfig.IOMaximumIOps}/>
            <DataTable.Item label="IOMaximumBandwidth" value={this.state.container.HostConfig.IOMaximumBandwidth}/>
          </DataTable.DataTableItem>
          <DataTable.DataTableItem label="GraphDriver">
            <DataTable.Item label="Name" value={this.state.container.GraphDriver.Name}/>
            <DataTable.Item label="Data" value={this.state.container.GraphDriver.Data}/>
          </DataTable.DataTableItem>
          <DataTable.Item label="Mounts">
          {this.state.container.Mounts.map((mount, index) => {
            return (
              <DataTable key={index}>
                <DataTable.Item label="Source" value={mount.Source}/>
                <DataTable.Item label="Destination" value={mount.Destination}/>
                <DataTable.Item label="Mode" value={mount.Mode}/>
                <DataTable.Item label="RW" value={mount.RW}/>
                <DataTable.Item label="Propagation" value={mount.Propagation}/>
              </DataTable>
            );
          })}
          </DataTable.Item>
          <DataTable.DataTableItem label="Config">
            <DataTable.Item label="Hostname" value={this.state.container.Config.Hostname}/>
            <DataTable.Item label="Domainname" value={this.state.container.Config.Domainname}/>
            <DataTable.Item label="User" value={this.state.container.Config.User}/>
            <DataTable.Item label="AttachStdin" value={this.state.container.Config.AttachStdin}/>
            <DataTable.Item label="AttachStdout" value={this.state.container.Config.AttachStdout}/>
            <DataTable.Item label="AttachStderr" value={this.state.container.Config.AttachStderr}/>
            <DataTable.Item label="Tty" value={this.state.container.Config.Tty}/>
            <DataTable.Item label="OpenStdin" value={this.state.container.Config.OpenStdin}/>
            <DataTable.Item label="StdinOnce" value={this.state.container.Config.StdinOnce}/>
            <DataTable.Item label="Env" value={this.state.container.Config.Env}/>
            <DataTable.Item label="Cmd" value={this.state.container.Config.Cmd}/>
            <DataTable.Item label="Image" value={this.state.container.Config.Image}/>
            <DataTable.Item label="Volumes">
              <DataList value={Object.keys(this.state.container.Config.Volumes || {})}/>
            </DataTable.Item>
            <DataTable.Item label="WorkingDir" value={this.state.container.Config.WorkingDir}/>
            <DataTable.Item label="Entrypoint" value={this.state.container.Config.Entrypoint}/>
            <DataTable.Item label="OnBuild" value={this.state.container.Config.OnBuild}/>
            <DataTable.DataTableItem label="Labels">
            {Object.keys(this.state.container.Config.Labels).map(label => {
              return <DataTable.Item label={label} value={this.state.container.Config.Labels[label]}/>
            })}
            </DataTable.DataTableItem>
          </DataTable.DataTableItem>
          <DataTable.DataTableItem label="NetworkSettings">
            <DataTable.Item label="Bridge" value={this.state.container.NetworkSettings.Bridge}/>
            <DataTable.Item label="SandboxID" value={this.state.container.NetworkSettings.SandboxID}/>
            <DataTable.Item label="HairpinMode" value={this.state.container.NetworkSettings.HairpinMode}/>
            <DataTable.Item label="LinkLocalIPv6Address" value={this.state.container.NetworkSettings.LinkLocalIPv6Address}/>
            <DataTable.Item label="LinkLocalIPv6PrefixLen" value={this.state.container.NetworkSettings.LinkLocalIPv6PrefixLen}/>
            <DataTable.Item label="Ports">
              <dl>
              {Object.keys(this.state.container.NetworkSettings.Ports || {}).map(port => {
                return [
                  <dt key={'dt-' + port}>{port}</dt>,
                  <dd key={'dd-' + port}>
                    {this.state.container.NetworkSettings.Ports[port].map((portData, index) => {
                      return (
                        <DataTable key={index}>
                          <DataTable.Item label="HostIp" value={portData.HostIp}/>
                          <DataTable.Item label="HostPort" value={portData.HostPort}/>
                        </DataTable>
                      );
                    })}
                  </dd>
                ];
              })}
              </dl>
            </DataTable.Item>
            <DataTable.Item label="SandboxKey" value={this.state.container.NetworkSettings.SandboxKey}/>
            <DataTable.Item label="SecondaryIPAddresses" value={this.state.container.NetworkSettings.SecondaryIPAddresses}/>
            <DataTable.Item label="SecondaryIPv6Addresses" value={this.state.container.NetworkSettings.SecondaryIPv6Addresses}/>
            <DataTable.Item label="EndpointID" value={this.state.container.NetworkSettings.EndpointID}/>
            <DataTable.Item label="Gateway" value={this.state.container.NetworkSettings.Gateway}/>
            <DataTable.Item label="GlobalIPv6Address" value={this.state.container.NetworkSettings.GlobalIPv6Address}/>
            <DataTable.Item label="GlobalIPv6PrefixLen" value={this.state.container.NetworkSettings.GlobalIPv6PrefixLen}/>
            <DataTable.Item label="IPAddress" value={this.state.container.NetworkSettings.IPAddress}/>
            <DataTable.Item label="IPPrefixLen" value={this.state.container.NetworkSettings.IPPrefixLen}/>
            <DataTable.Item label="IPv6Gateway" value={this.state.container.NetworkSettings.IPv6Gateway}/>
            <DataTable.Item label="MacAddress" value={this.state.container.NetworkSettings.MacAddress}/>
            <DataTable.Item label="Networks">
              <dl>
              {Object.keys(this.state.container.NetworkSettings.Networks).map(network => {
                return [
                  <dt key={'dt-' + network}>{network}</dt>,
                  <dd key={'dd-' + network}>
                    <DataTable>
                      <DataTable.Item label="IPAMConfig" value={this.state.container.NetworkSettings.Networks[network].IPAMConfig}/>
                      <DataTable.Item label="Links" value={this.state.container.NetworkSettings.Networks[network].Links}/>
                      <DataTable.Item label="Aliases">
                        <DataList value={this.state.container.NetworkSettings.Networks[network].Aliases}/>
                      </DataTable.Item>
                      <DataTable.Item label="NetworkId" value={this.state.container.NetworkSettings.Networks[network].NetworkId}/>
                      <DataTable.Item label="EndpointID" value={this.state.container.NetworkSettings.Networks[network].EndpointID}/>
                      <DataTable.Item label="Gateway" value={this.state.container.NetworkSettings.Networks[network].Gateway}/>
                      <DataTable.Item label="IPAddress" value={this.state.container.NetworkSettings.Networks[network].IPAddress}/>
                      <DataTable.Item label="IPPrefixLen" value={this.state.container.NetworkSettings.Networks[network].IPPrefixLen}/>
                      <DataTable.Item label="IPv6Gateway" value={this.state.container.NetworkSettings.Networks[network].IPv6Gateway}/>
                      <DataTable.Item label="GlobalIPv6Address" value={this.state.container.NetworkSettings.Networks[network].GlobalIPv6Address}/>
                      <DataTable.Item label="GlobalIPv6PrefixLen" value={this.state.container.NetworkSettings.Networks[network].GlobalIPv6PrefixLen}/>
                      <DataTable.Item label="MacAddress" value={this.state.container.NetworkSettings.Networks[network].MacAddress}/>
                    </DataTable>
                  </dd>
                ]
              })}
              </dl>
            </DataTable.Item>
          </DataTable.DataTableItem>
        </DataTable>
      </Layout>
    );
  },
  componentDidMount: function() {
    this.props.docker.loadContainer(this.props.params.container).then((container) => this.setState({container: container}));
  }
}));

export default Container;
