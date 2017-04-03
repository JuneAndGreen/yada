'use strict';

const fs = require('fs');
const path = require('path');
const Server = require('./src/server');

class Yada {
  constructor(config) {
    this.config = config;
    this.canChange = true; // 是否触发重置服务操作

    this.init();
  }
  /**
   * 初始化
   */
  init() {
    let config = this.config;

    this.server = new Server(config);
  }
}

module.exports = Yada;