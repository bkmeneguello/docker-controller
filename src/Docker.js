import $ from 'jquery';

export default class Docker {
  constructor(url) {
    this.url = url;
  }
  getJSON(path) {
    return $.getJSON(this.url + '/' + path);
  }
  postJSON(path, data) {
    return $.ajax({
      type: 'POST',
      url: this.url + '/' + path,
      data: JSON.stringify(data),
      contentType: 'application/json',
      dataType: 'json'
    });
  }
  deleteJSON(path) {
    return $.ajax({
      type: 'DELETE',
      url: this.url + '/' + path,
      contentType: 'application/json'
    });
  }
  loadInfo() {
    return this.getJSON('info');
  }
  loadContainers() {
    return this.getJSON('containers/json');
  }
  loadContainer(name) {
    return this.getJSON('containers/' + name + '/json');
  }
  createContainer(container, name) {
    return this.postJSON('containers/create' + (name ? '?name=' + name : ''), container).done((response) => {
      return this.startContainer(response.Id);
    });
  }
  startContainer(name) {
    return this.postJSON('containers/' + name + '/start');
  }
  loadImages() {
    return this.getJSON('images/json');
  }
  loadImage(name) {
    return this.getJSON('images/' + name + '/json');
  }
  loadVolumes() {
    return this.getJSON('volumes');
  }
  loadVolume(name) {
    return this.getJSON('volumes/' + name);
  }
  createVolume(volume) {
    return this.postJSON('volumes/create', volume);
  }
  removeVolume(name) {
    return this.deleteJSON('volumes/' + name);
  }
  loadNetworks() {
    return this.getJSON('networks');
  }
  loadNetwork(name) {
    return this.getJSON('networks/' + name);
  }
  loadSwarm() {
    return this.getJSON('swarm');
  }
  loadNodes() {
    return this.getJSON('nodes');
  }
  loadNode(name) {
    return this.getJSON('nodes/' + name);
  }
  loadServices() {
    return this.getJSON('services');
  }
  loadService(name) {
    return this.getJSON('services/' + name);
  }
  loadTasks() {
    return this.getJSON('tasks');
  }
  loadTask(name) {
    return this.getJSON('tasks/' + name);
  }
}
