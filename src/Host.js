import React from 'react';
import { connect } from 'react-redux'
import Layout, { BooleanGlyph, DataTable, DataList } from './Layout'

let Host = connect(
  (state, ownProps) => {
    return {
      docker: state.hosts[ownProps.params.host]
    }
  }
)(React.createClass({
  getInitialState: function() {
    return {
      info: {
        Plugins: {},
        RegistryConfig: {},
        Runtimes: {},
        Swarm: {
          Cluster: {
            Version: {},
            Spec: {
              Orchestration: {},
              Raft: {},
              Dispatcher: {},
              CAConfig: {},
              TaskDefaults: {}
            }
          }
        }
      }
    };
  },
  render: function() {
    return (
      <Layout>
        <h2>{this.props.params.host}</h2>
        <DataTable className="zebra">
          <DataTable.Item label="ID" value={this.state.info.ID}/>
          <DataTable.Item label="Containers" value={this.state.info.Containers}/>
          <DataTable.Item label="ContainersPaused" value={this.state.info.ContainersPaused}/>
          <DataTable.Item label="ContainersRunning" value={this.state.info.ContainersRunning}/>
          <DataTable.Item label="ContainersStopped" value={this.state.info.ContainersStopped}/>
          <DataTable.Item label="Images" value={this.state.info.Images}/>
          <DataTable.Item label="Driver" value={this.state.info.Driver}/>
          <DataTable.DataTableItem label="DriverStatus">
          {(this.state.info.DriverStatus || []).map((driver) => {
            return <DataTable.Item key={driver[0]} label={driver[0]} value={driver[1]}/>;
          })}
          </DataTable.DataTableItem>
          <DataTable.Item label="SystemStatus">
            <ul>
            {(this.state.info.SystemStatus || []).map((status, index) => {
              return (
                <li key={index}>
                  <DataList value={status}/>
                </li>
              );
            })}
            </ul>
          </DataTable.Item>
          <DataTable.DataTableItem label="Plugins">
            <DataTable.Item label="Authorization">
              <DataList value={this.state.info.Plugins.Authorization}/>
            </DataTable.Item>
            <DataTable.Item label="Network">
              <DataList value={this.state.info.Plugins.Network}/>
            </DataTable.Item>
            <DataTable.Item label="Volume">
              <DataList value={this.state.info.Plugins.Volume}/>
            </DataTable.Item>
          </DataTable.DataTableItem>
          <DataTable.Item label="MemoryLimit"><BooleanGlyph value={this.state.info.MemoryLimit}/></DataTable.Item>
          <DataTable.Item label="SwapLimit"><BooleanGlyph value={this.state.info.SwapLimit}/></DataTable.Item>
          <DataTable.Item label="KernelMemory" value={this.state.info.KernelMemory}/>
          <DataTable.Item label="CpuCfsPeriod"><BooleanGlyph value={this.state.info.CpuCfsPeriod}/></DataTable.Item>
          <DataTable.Item label="CpuCfsQuota"><BooleanGlyph value={this.state.info.CpuCfsQuota}/></DataTable.Item>
          <DataTable.Item label="CPUShares" value={this.state.info.CPUShares}/>
          <DataTable.Item label="CPUSet" value={this.state.info.CPUSet}/>
          <DataTable.Item label="IPv4Forwarding"><BooleanGlyph value={this.state.info.IPv4Forwarding}/></DataTable.Item>
          <DataTable.Item label="BridgeNfIp" value={this.state.info.BridgeNfIp6tables}/>
          <DataTable.Item label="BridgeNfIptables" value={this.state.info.BridgeNfIptables}/>
          <DataTable.Item label="Debug"><BooleanGlyph value={this.state.info.Debug}/></DataTable.Item>
          <DataTable.Item label="NFd" value={this.state.info.NFd}/>
          <DataTable.Item label="OomKillDisable"><BooleanGlyph value={this.state.info.OomKillDisable}/></DataTable.Item>
          <DataTable.Item label="NGoroutines" value={this.state.info.NGoroutines}/>
          <DataTable.Item label="SystemTime" value={this.state.info.SystemTime}/>
          <DataTable.Item label="ExecutionDriver" value={this.state.info.ExecutionDriver}/>
          <DataTable.Item label="LoggingDriver" value={this.state.info.LoggingDriver}/>
          <DataTable.Item label="CgroupDriver" value={this.state.info.CgroupDriver}/>
          <DataTable.Item label="NEventsListener" value={this.state.info.NEventsListener}/>
          <DataTable.Item label="KernelVersion" value={this.state.info.KernelVersion}/>
          <DataTable.Item label="OperatingSystem" value={this.state.info.OperatingSystem}/>
          <DataTable.Item label="OSType" value={this.state.info.OSType}/>
          <DataTable.Item label="Architecture" value={this.state.info.Architecture}/>
          <DataTable.Item label="IndexServerAddress" value={this.state.info.IndexServerAddress}/>
          <DataTable.DataTableItem label="RegistryConfig">
            <DataTable.Item label="IndexConfigs">
              <dl>
              {Object.keys(this.state.info.RegistryConfig.IndexConfigs || []).map((indexConfig) => {
                return ([
                  <dt key={'dt-' + indexConfig}>{indexConfig}</dt>,
                  <dd key={'dd-' + indexConfig}>
                    <DataTable>
                      <DataTable.Item label="Mirrors" value={this.state.info.RegistryConfig.IndexConfigs[indexConfig].Mirrors}/>
                      <DataTable.Item label="Name" value={this.state.info.RegistryConfig.IndexConfigs[indexConfig].Name}/>
                      <DataTable.Item label="Official" value={this.state.info.RegistryConfig.IndexConfigs[indexConfig].Official}/>
                      <DataTable.Item label="Secure" value={this.state.info.RegistryConfig.IndexConfigs[indexConfig].Secure}/>
                    </DataTable>
                  </dd>
                ]);
              })}
              </dl>
            </DataTable.Item>
            <DataTable.Item label="InsecureRegistryCIDs">
              <DataList value={this.state.info.RegistryConfig.InsecureRegistryCIDRs}/>
            </DataTable.Item>
          </DataTable.DataTableItem>
          <DataTable.Item label="NCPU" value={this.state.info.NCPU}/>
          <DataTable.Item label="MemTotal" value={this.state.info.MemTotal}/>
          <DataTable.Item label="DockerRootDir" value={this.state.info.DockerRootDir}/>
          <DataTable.Item label="HttpProxy" value={this.state.info.HttpProxy}/>
          <DataTable.Item label="HttpsProxy" value={this.state.info.HttpsProxy}/>
          <DataTable.Item label="NoProxy" value={this.state.info.NoProxy}/>
          <DataTable.Item label="Name" value={this.state.info.Name}/>
          <DataTable.Item label="Labels" value={this.state.info.Labels}/>
          <DataTable.Item label="ExperimentalBuild"><BooleanGlyph value={this.state.info.ExperimentalBuild}/></DataTable.Item>
          <DataTable.Item label="ServerVersion" value={this.state.info.ServerVersion}/>
          <DataTable.Item label="ClusterStore" value={this.state.info.ClusterStore}/>
          <DataTable.Item label="ClusterAdvertise" value={this.state.info.ClusterAdvertise}/>
          <DataTable.Item label="SecurityOptions">
            <DataList value={this.state.info.SecurityOptions}/>
          </DataTable.Item>
          <DataTable.Item label="Runtimes">
            <dl>
              {Object.keys(this.state.info.Runtimes).map((runtime) => {
                return [
                  <dt key={'dt-' + runtime}>{runtime}</dt>,
                  <dd key={'dd-' + runtime}>
                    <dl>
                      <dt>path:</dt><dd>{this.state.info.Runtimes[runtime].path}</dd>
                    </dl>
                  </dd>
                ];
              })}
            </dl>
          </DataTable.Item>
          <DataTable.Item label="DefaultRuntime" value={this.state.info.DefaultRuntime}/>
          <DataTable.DataTableItem label="Swarm">
            <DataTable.Item label="NodeID" value={this.state.info.Swarm.NodeID}/>
            <DataTable.Item label="NodeAddr" value={this.state.info.Swarm.NodeAddr}/>
            <DataTable.Item label="LocalNodeState" value={this.state.info.Swarm.LocalNodeState}/>
            <DataTable.Item label="ControlAvailable"><BooleanGlyph value={this.state.info.Swarm.ControlAvailable}/></DataTable.Item>
            <DataTable.Item label="Error" value={this.state.info.Swarm.Error}/>
            <DataTable.Item label="RemoteManagers">
              <dl>
                {(this.state.info.Swarm.RemoteManagers || []).map(manager => {
                  return [
                    <dt key={'dt-' + manager.NodeID}>{manager.NodeID}</dt>,
                    <dd key={'dd-' + manager.NodeID}>{manager.Addr}</dd>
                  ];
                })}
              </dl>
            </DataTable.Item>
            <DataTable.Item label="Nodes" value={this.state.info.Swarm.Nodes}/>
            <DataTable.Item label="Managers" value={this.state.info.Swarm.Managers}/>
            <DataTable.DataTableItem label="Cluster">
              <DataTable.Item label="ID" value={this.state.info.Swarm.Cluster.ID}/>
              <DataTable.DataTableItem label="Version">
                <DataTable.Item label="Index" value={this.state.info.Swarm.Cluster.Version.Index}/>
              </DataTable.DataTableItem>
              <DataTable.Item label="CreatedAt" value={this.state.info.Swarm.Cluster.CreatedAt}/>
              <DataTable.Item label="UpdatedAt" value={this.state.info.Swarm.Cluster.UpdatedAt}/>
              <DataTable.DataTableItem label="Spec">
                <DataTable.Item label="Name" value={this.state.info.Swarm.Cluster.Spec.Name}/>
                <DataTable.DataTableItem label="Orchestration">
                  <DataTable.Item label="TaskHistoryRetentionLimit" value={this.state.info.Swarm.Cluster.Spec.Orchestration.TaskHistoryRetentionLimit}/>
                </DataTable.DataTableItem>
                <DataTable.DataTableItem label="Raft">
                  <DataTable.Item label="SnapshotInterval" value={this.state.info.Swarm.Cluster.Spec.Raft.SnapshotInterval}/>
                  <DataTable.Item label="LogEntriesForSlowFollowers" value={this.state.info.Swarm.Cluster.Spec.Raft.LogEntriesForSlowFollowers}/>
                  <DataTable.Item label="HeartbeatTick" value={this.state.info.Swarm.Cluster.Spec.Raft.HeartbeatTick}/>
                  <DataTable.Item label="ElectionTick" value={this.state.info.Swarm.Cluster.Spec.Raft.ElectionTick}/>
                </DataTable.DataTableItem>
                <DataTable.DataTableItem label="Dispatcher">
                  <DataTable.Item label="HeartbeatPeriod" value={this.state.info.Swarm.Cluster.Spec.Dispatcher.HeartbeatPeriod}/>
                </DataTable.DataTableItem>
                <DataTable.DataTableItem label="CAConfig">
                  <DataTable.Item label="NodeCertExpiry" value={this.state.info.Swarm.Cluster.Spec.CAConfig.NodeCertExpiry}/>
                </DataTable.DataTableItem>
                <DataTable.Item label="TaskDefaults"/>
              </DataTable.DataTableItem>
            </DataTable.DataTableItem>
          </DataTable.DataTableItem>
          <DataTable.Item label="LiveRestoreEnabled"><BooleanGlyph value={this.state.info.LiveRestoreEnabled}/></DataTable.Item>
        </DataTable>
      </Layout>
    );
  },
  componentDidMount: function() {
    this.props.docker.loadInfo().then((info) => this.setState({info: info}));
  }
}));

export default Host;
