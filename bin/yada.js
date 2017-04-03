#!/usr/bin/env node

'use strict';

const Yada = require('../index');

if(process.version < 'v4.4.0') {
  console.log('node版本太低，建议提升node版本到v4.4.0以上');
  process.exit(1);
}

const commander = require('commander');

commander
  .version(require('../package.json').version)

  .option('-p, --port <port>', '代理服务器端口，默认为8000', parseInt)
  .option('-r, --root [path]', '图片或视频目录，默认是process.cwd()')
  .option('--no-launch', '是否要停止自动打开浏览器，默认为false')

  .parse(process.argv)

  .once('done', () => {
    commander.launch = !commander.noLaunch;
    new Yada(commander);
  });

commander.emit('done');
