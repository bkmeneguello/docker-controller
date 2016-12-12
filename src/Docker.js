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
  createContainer(container, name) {
    return $.ajax({
      type: 'POST',
      url: this.url + '/containers/create' + (name ? '?name=' + name : ''),
      data: JSON.stringify(container),
      contentType: 'application/json',
      dataType: 'json'
    });
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
  createVolume(volume) {
    return $.ajax({
      type: 'POST',
      url: this.url + '/volumes/create',
      data: JSON.stringify(volume),
      contentType: 'application/json',
      dataType: 'json'
    });
  }
  removeVolume(name) {
    return $.ajax({
      type: 'DELETE',
      url: this.url + '/volumes/' + name,
      contentType: 'application/json'
    });
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
