'use strict';

const path = require('path');
const Yada = require('../index');

new Yada({
  port: 8088,
  root: path.join(__dirname, './test_img/'),
  launch: false
});