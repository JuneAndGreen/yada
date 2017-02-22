'use strict';

const Hala = require('hala');

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
    this.webroot = config.webroot || process.cwd();
  }

  /**
   * 初始化
   */
  init() {

  }
}

module.exports = Server;