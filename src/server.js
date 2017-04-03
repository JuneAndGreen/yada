'use strict';

const Hala = require('hala');
const folder = require('./folder');

class Server {
  constructor(config) {
    config = config || {};

    this.config(config);
    this.init();
  }

  /**
   * 配置设置
   */
  config(config) {
    this.root = config.root || process.cwd();
    this.port = config.port || 8000;
    this.launch = typeof config.launch === 'boolean' ? config.launch : true;
  }

  /**
   * 初始化
   */
  init() {
    new Hala({
      port: this.port,
      webroot: this.root,
      launch: this.launch,
      routes: {
        'ALL /*': folder({root: this.root, port: this.port})
      }
    });
  }
}

module.exports = Server;