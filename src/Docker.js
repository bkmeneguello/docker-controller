import $ from 'jquery';

export default class Docker {
  constructor(url) {
    this.url = url;
  }
  loadInfo() {
    return $.getJSON(this.url + '/info');
  }
  loadContainers() {
    return $.getJSON(this.url + '/containers/json');
  }
  loadContainer(name) {
    return $.getJSON(this.url + '/containers/' + name + '/json');
  }
  loadImages() {
    return $.getJSON(this.url + '/images/json');
  }
  loadImage(name) {
    return $.getJSON(this.url + '/images/' + name + '/json');
  }
  loadVolumes() {
    return $.getJSON(this.url + '/volumes');
  }
  loadVolume(name) {
    return $.getJSON(this.url + '/volumes/' + name);
  }
  loadNetworks() {
    return $.getJSON(this.url + '/networks');
  }
  loadNetwork(name) {
    return $.getJSON(this.url + '/networks/' + name);
  }
  loadSwarm() {
    return $.getJSON(this.url + '/swarm');
  }
  loadNodes() {
    return $.getJSON(this.url + '/nodes');
  }
  loadNode(name) {
    return $.getJSON(this.url + '/nodes/' + name);
  }
  loadServices() {
    return $.getJSON(this.url + '/services');
  }
  loadService(name) {
    return $.getJSON(this.url + '/services/' + name);
  }
  loadTasks() {
    return $.getJSON(this.url + '/tasks');
  }
  loadTask(name) {
    return $.getJSON(this.url + '/tasks/' + name);
  }
}
