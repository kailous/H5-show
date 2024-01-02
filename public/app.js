const express = require('express');
const app = express();
const fs = require('fs');
const path = require('path');
const qrcode = require('qrcode-terminal');
const os = require('os');


const formComponentHTML = require('./components/form-component');
const headHTML = require('./components/layout/head');

const pagesDirectory = path.join(__dirname, 'pages');
const pages = fs.readdirSync(pagesDirectory);
let pageModules = {};

pages.forEach(page => {
  if (page.endsWith('.html')) {
    const pageName = page.split('.')[0];
    const pagePath = path.join(pagesDirectory, page);
    const pageContent = fs.readFileSync(pagePath, 'utf8');
    pageModules[pageName] = pageContent.replace(/\${formComponentHTML}/g, formComponentHTML);
  }
});

app.get('/', (req, res) => {
  const completePageContent = indexHTML
    .replace('${headHTML}', headHTML)
    .replace('${page01}', pageModules['01'])
    .replace('${page02}', pageModules['02'])
    .replace('${page03}', pageModules['03'])
    .replace('${page04}', pageModules['04'])
    .replace('${page05}', pageModules['05'])
    .replace('${page06}', pageModules['06'])
    .replace('${page07}', pageModules['07'])
    .replace('${page08}', pageModules['08'])
  res.send(completePageContent);
});

const pageCount = Object.keys(pageModules).length;

const indexHTML = fs.readFileSync(path.join(__dirname, 'index.html'), 'utf8');

app.use(express.static('public'));

const networkInterfaces = os.networkInterfaces();

const getLocalIPs = () => {
  const ips = [];
  for (const interfaceInfo of Object.values(networkInterfaces)) {
    for (const info of interfaceInfo) {
      if (info.family === 'IPv4' && !info.internal) {
        if (info.address.startsWith('192.168.') || info.address.startsWith('10.') || (info.address.startsWith('172.') && parseInt(info.address.split('.')[1], 10) >= 16 && parseInt(info.address.split('.')[1], 10) <= 31)) {
          ips.push(info.address);
        }
      }
    }
  }
  return ips.length > 0 ? ips : ['localhost'];
};

const port = process.env.PORT || 3000;
const localIPs = getLocalIPs();

app.listen(port, () => {
  localIPs.forEach(ip => {
    console.log(`服务器开始运行：http://localhost:${port}`);
    console.log(`\n共有${pageCount}个页面,请使用微信扫一扫预览.`);
    console.log(`或者直接访问：http://${ip}:${port}`)
    qrcode.generate(`http://${ip}:${port}`, { small: true }, function (qrcode) {
      console.log(qrcode);
    });
    console.log(`\n按下 Ctrl+C 关闭服务器\n或输入rs重新启动服务器`)
  });
});
