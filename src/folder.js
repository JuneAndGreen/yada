'use strict';

const fs = require('fs');
const path = require('path');
const parse = require('tooltpl').parse;
const mime = require('mime');

const _ = require('./util');
const icons = require('./tpl/icons');

// 预览文件模板
const tpl = fs.readFileSync(path.join(__dirname, './tpl/folder.html'), 'utf8');
const css = fs.readFileSync(path.join(__dirname, './tpl/folder.css'), 'utf8');
const render = parse(tpl);

module.exports = function(obj) {
  return function*(next) {
    let r = obj.root;
    let port = obj.port;

    let pathname = decodeURIComponent(this.path);
    let wholePath = path.join(r, pathname);

    let stat = fs.statSync(wholePath);
    if(!stat.isDirectory()) {
      // 非文件夹
      yield next;
    } else {
      // 访问文件夹
      console.log(`访问了文件夹：${wholePath}`);
      let images = [];

      let subs = fs.readdirSync(wholePath);

      subs.forEach((file) => {
        let filePath = path.join(wholePath, file);
        if(fs.statSync(filePath).isFile()) {
          // 文件
          if(/image/.test(mime.lookup(file))) {
            let imgPath = pathname[pathname.length - 1] === '/' ? `${pathname}${file}` : `${pathname}/${file}`
            images.push({
              name: file,
              path: imgPath
            });
          }
        }
      });

      // 路径二维码
      var qrcode;
      try {
        qrcode = _.getQRCode(_.getFullUrl(this), 2).createImgTag(4);
      } catch(err) {
        qrcode = '';
      }
      
      let body = '';
      let locals = {
        join: path.join,
        images,
        pathname,
        port,
        wholePath,
        css,
        icons,
        ips: _.getIPs(),
        qrcode: _.getQRCode(_.getFullUrl(this), 2).createImgTag(4)
      };
      // 渲染页面
      body = render(locals);

      // 返回页面
      this.set('Content-Type', 'text/html');
      this.set('Content-Length', Buffer.byteLength(body));
      this.body = body;
    }
  }
};
