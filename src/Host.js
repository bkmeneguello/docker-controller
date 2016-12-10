import React from 'react';
import { connect } from 'react-redux'
import Docker from './Docker';
import Layout from './Layout'

let Host = connect(
  (state, ownProps) => {
    return {
      docker: new Docker(state.getIn(['hosts', ownProps.params.host]))
    }
  }
)(React.createClass({
  getInitialState: function() {
    return {
      info: {
        Plugins: {},
        RegistryConfig: {},
        Runtimes: {}
      }
    };
  },
  render: function() {
    return (
      <Layout>
        <h2>{this.props.params.host}</h2>
        <dl className="dl-vertical">
          <dt>Architecture:</dt><dd>{this.state.info.Architecture}</dd>
          <dt>BridgeNfIp:</dt><dd>{this.state.info.BridgeNfIp6tables}</dd>
          <dt>BridgeNfIptables:</dt><dd>{this.state.info.BridgeNfIptables}</dd>
          <dt>CPUSet:</dt><dd>{this.state.info.CPUSet}</dd>
          <dt>CPUShares:</dt><dd>{this.state.info.CPUShares}</dd>
          <dt>CgroupDriver:</dt><dd>{this.state.info.CgroupDriver}</dd>
          <dt>ClusterAdvertise:</dt><dd>{this.state.info.ClusterAdvertise}</dd>
          <dt>ClusterStore:</dt><dd>{this.state.info.ClusterStore}</dd>
          <dt>Containers:</dt><dd>{this.state.info.Containers}</dd>
          <dt>ContainersPaused:</dt><dd>{this.state.info.ContainersPaused}</dd>
          <dt>ContainersRunning:</dt><dd>{this.state.info.ContainersRunning}</dd>
          <dt>ContainersStopped:</dt><dd>{this.state.info.ContainersStopped}</dd>
          <dt>CpuCfsPeriod:</dt><dd>{this.state.info.CpuCfsPeriod}</dd>
          <dt>CpuCfsQuota:</dt><dd>{this.state.info.CpuCfsQuota}</dd>
          <dt>Debug:</dt><dd>{this.state.info.Debug}</dd>
          <dt>DefaultRuntime:</dt><dd>{this.state.info.DefaultRuntime}</dd>
          <dt>DockerRootDir:</dt><dd>{this.state.info.DockerRootDir}</dd>
          <dt>Driver:</dt><dd>{this.state.info.Driver}</dd>
          <dt>DriverStatus:</dt>
          <dd>
            <dl>
            {(this.state.info.DriverStatus || []).map((driver) => {
              return [
                <dt key={'dt-' + driver[0]}>{driver[0]}</dt>,
                <dd key={'dd-' + driver[0]}>{driver[1]}</dd>
              ]
            })}
            </dl>
          </dd>
          <dt>ExecutionDriver:</dt><dd>{this.state.info.ExecutionDriver}</dd>
          <dt>ExperimentalBuild:</dt><dd>{this.state.info.ExperimentalBuild}</dd>
          <dt>HttpProxy:</dt><dd>{this.state.info.HttpProxy}</dd>
          <dt>HttpsProxy:</dt><dd>{this.state.info.HttpsProxy}</dd>
          <dt>ID:</dt><dd>{this.state.info.ID}</dd>
          <dt>IPv:</dt><dd>{this.state.info.IPv4Forwarding}</dd>
          <dt>Images:</dt><dd>{this.state.info.Images}</dd>
          <dt>IndexServerAddress:</dt><dd>{this.state.info.IndexServerAddress}</dd>
          <dt>KernelMemory:</dt><dd>{this.state.info.KernelMemory}</dd>
          <dt>KernelVersion:</dt><dd>{this.state.info.KernelVersion}</dd>
          <dt>Labels:</dt><dd>{this.state.info.Labels}</dd>
          <dt>LiveRestoreEnabled:</dt><dd>{this.state.info.LiveRestoreEnabled}</dd>
          <dt>LoggingDriver:</dt><dd>{this.state.info.LoggingDriver}</dd>
          <dt>MemTotal:</dt><dd>{this.state.info.MemTotal}</dd>
          <dt>MemoryLimit:</dt><dd>{this.state.info.MemoryLimit}</dd>
          <dt>NCPU:</dt><dd>{this.state.info.NCPU}</dd>
          <dt>NEventsListener:</dt><dd>{this.state.info.NEventsListener}</dd>
          <dt>NFd:</dt><dd>{this.state.info.NFd}</dd>
          <dt>NGoroutines:</dt><dd>{this.state.info.NGoroutines}</dd>
          <dt>Name:</dt><dd>{this.state.info.Name}</dd>
          <dt>NoProxy:</dt><dd>{this.state.info.NoProxy}</dd>
          <dt>OSType:</dt><dd>{this.state.info.OSType}</dd>
          <dt>OomKillDisable:</dt><dd>{this.state.info.OomKillDisable}</dd>
          <dt>OperatingSystem:</dt><dd>{this.state.info.OperatingSystem}</dd>
          <dt>Plugins:</dt>
          <dd>
            <dl>
              <dt>Authorization:</dt>
              <dd>
                <dl>
                {(this.state.info.Plugins.Authorization || []).map((plugin) => {
                  return <dt key={plugin}>{plugin}</dt>
                })}
                </dl>
              </dd>
              <dt>Network:</dt>
              <dd>
                <dl>
                {(this.state.info.Plugins.Network || []).map((plugin) => {
                  return <dt key={plugin}>{plugin}</dt>
                })}
                </dl>
              </dd>
              <dt>Volume:</dt>
              <dd>
                <dl>
                {(this.state.info.Plugins.Volume || []).map((plugin) => {
                  return <dt key={plugin}>{plugin}</dt>
                })}
                </dl>
              </dd>
            </dl>
          </dd>
          <dt>RegistryConfig:</dt>
          <dd>
            <dl>
              <dt>IndexConfigs:</dt>
              <dd>
                <dl>
                {Object.keys(this.state.info.RegistryConfig.IndexConfigs || []).map((indexConfig) => {
                  return (<dt key={indexConfig}>{indexConfig}</dt>,
                    <dt key={indexConfig}>
                      <dl>
                        <dt>Mirrors:</dt><dd>{this.state.info.RegistryConfig.IndexConfigs[indexConfig].Mirrors}</dd>
                        <dt>Name:</dt><dd>{this.state.info.RegistryConfig.IndexConfigs[indexConfig].Name}</dd>
                        <dt>Official:</dt><dd>{this.state.info.RegistryConfig.IndexConfigs[indexConfig].Official}</dd>
                        <dt>Secure:</dt><dd>{this.state.info.RegistryConfig.IndexConfigs[indexConfig].Secure}</dd>
                      </dl>
                    </dt>
                  )
                })}
                </dl>
              </dd>
              <dt>InsecureRegistryCIDs:</dt>
              <dd>
                <ul>
                {(this.state.info.RegistryConfig.InsecureRegistryCIDRs || []).map((insecureRegistryCIDR) => {
                  return <li key={insecureRegistryCIDR}>{insecureRegistryCIDR}</li>;
                })}
                </ul>
              </dd>
            </dl>
          </dd>
          <dt>Runtimes:</dt>
          <dd>
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
          </dd>
          <dt>SecurityOptions:</dt>
          <dd>
            <ul>
            {(this.state.info.SecurityOptions || []).map((securityOption) => {
              return <li key={securityOption}>{securityOption}</li>
            })}
            </ul>
          </dd>
          <dt>ServerVersion:</dt><dd>{this.state.info.ServerVersion}</dd>
          <dt>SwapLimit:</dt><dd>{this.state.info.SwapLimit}</dd>
          <dt>Swarm:</dt><dd>{this.state.info.Swarm}</dd>
          <dt>SystemStatus:</dt><dd>{this.state.info.SystemStatus}</dd>
          <dt>SystemTime:</dt><dd>{this.state.info.SystemTime}</dd>
        </dl>
      </Layout>
    );
  },
  componentDidMount: function() {
    this.props.docker.loadInfo().then((info) => this.setState({info: info}));
  }
}));

export default Host;
