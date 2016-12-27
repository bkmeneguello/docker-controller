import $ from 'jquery';
import { flow } from 'jsonpipe';

export default class Docker {
  constructor(url) {
    this.url = url;
  }
  __getJSON(path) {
    return $.ajax({
      url: this.url + '/' + path,
      dataType: "json",
    });
  }
  __postJSON(path, data) {
    return $.ajax({
      type: 'POST',
      url: this.url + '/' + path,
      data: JSON.stringify(data),
      contentType: 'application/json',
      dataType: 'json'
    });
  }
  __xhrPromise(xhr) {
    return new Promise((resolve, reject) => {
      xhr.then(resolve, reject);
    });
  }
  __deleteJSON(path) {
    return $.ajax({
      type: 'DELETE',
      url: this.url + '/' + path,
      contentType: 'application/json'
    });
  }
  static CONTAINER_NAME_PATTERN = /^[\w-]*$/;
  static IMAGE_NAME_PATTERN = /^([\w-/]+(:\w+[\w-\.]*)?)?$/;
  loadInfo() {
    return this.__xhrPromise(this.__getJSON('info'));
  }
  loadContainers(options = {}) {
    let params = $.param(options);
    return this.__xhrPromise(this.__getJSON('containers/json?' + params));
  }
  loadContainer(name) {
    return this.__xhrPromise(this.__getJSON('containers/' + name + '/json'));
  }
  createContainer(container, name, progress) {
    return new Promise((resolve, reject) => {
      this.__postJSON('containers/create' + (name ? '?name=' + name : ''), container)
        .done((response) => {
          this.startContainer(response.Id)
            .then(resolve, reject);
        })
        .fail(error => {
          switch (error.status) {
            case 404:
              if (error.responseJSON.message.startsWith('No such image:')) {
                let [image, tag] = container.Image.split(':');
                this.createImage({fromImage: image, tag: tag || 'latest'}, progress)
                  .then(() => {
                    this.createContainer(container, name)
                      .then(resolve, reject);
                  })
                  .catch(reject);
              } else {
                reject(error);
              }
              break;
            default:
              reject(error);
          }
        });
      });
  }
  startContainer(name) {
    return this.__xhrPromise(this.__postJSON('containers/' + name + '/start'));
  }
  removeContainer(name) {
    return this.__xhrPromise(this.__deleteJSON('containers/' + name));
  }
  loadImages() {
    return this.__xhrPromise(this.__getJSON('images/json'));
  }
  loadImage(name) {
    return this.__xhrPromise(this.__getJSON('images/' + name + '/json'));
  }
  createImage(options, progress) {
    let params = $.param(options);
    return new Promise((resolve, reject) => {
      flow(this.url + '/images/create?' + params, {
        delimiter: '\n',
        method: 'POST',
        withCredentials: false,
        success: progress,
        error: reject,
        complete: resolve
      });
    });
  }
  removeImage(name) {
    return this.__xhrPromise(this.__deleteJSON('images/' + name));
  }
  loadVolumes() {
    return this.__xhrPromise(this.__getJSON('volumes'));
  }
  loadVolume(name) {
    return this.__xhrPromise(this.__getJSON('volumes/' + name));
  }
  createVolume(volume) {
    return this.__xhrPromise(this.__postJSON('volumes/create', volume));
  }
  removeVolume(name) {
    return this.__xhrPromise(this.__deleteJSON('volumes/' + name));
  }
  loadNetworks() {
    return this.__xhrPromise(this.__getJSON('networks'));
  }
  loadNetwork(name) {
    return this.__xhrPromise(this.__getJSON('networks/' + name));
  }
  loadSwarm() {
    return this.__xhrPromise(this.__getJSON('swarm'));
  }
  loadNodes() {
    return this.__xhrPromise(this.__getJSON('nodes'));
  }
  loadNode(name) {
    return this.__xhrPromise(this.__getJSON('nodes/' + name));
  }
  loadServices() {
    return this.__xhrPromise(this.__getJSON('services'));
  }
  loadService(name) {
    return this.__xhrPromise(this.__getJSON('services/' + name));
  }
  loadTasks() {
    return this.__xhrPromise(this.__getJSON('tasks'));
  }
  loadTask(name) {
    return this.__xhrPromise(this.__getJSON('tasks/' + name));
  }
}
