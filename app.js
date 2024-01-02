const express = require('express');
const qrcode = require('qrcode-terminal'); // 导入qrcode-terminal库
const app = express();
const os = require('os');
const fs = require('fs');
// const nodemon = require('nodemon');
const path = require('path');

// 导入组件
const headHTML = require('./components/layout/head');

// 导入页面
const pageModules = require('./pages');

// 在根路径的路由处理中插入index.html的内容
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html')); // 假设主页是 public 文件夹下的 index.html
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

// 获取页面数量
const pageCount = Object.keys(pageModules).length;

// 读取HTML文件的内容
const indexHTML = fs.readFileSync(path.join(__dirname, 'index.html'), 'utf8');

// 静态文件目录
app.use(express.static('public'));

// 获取本机的所有网络接口
const networkInterfaces = os.networkInterfaces();

// 寻找符合私有IP地址范围的IPv4地址
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
const localIPs = getLocalIPs();  // 输出本机IP地址

// 启动Express.js应用
app.listen(port, (changedFiles) => {
  localIPs.forEach(ip => {
    // console.log('修改的文件：');
    // console.log(changedFiles);  
  console.log(`服务器开始运行：http://localhost:${port}`);
  console.log(`\n共有${pageCount}个页面,请使用微信扫一扫预览.`);
  console.log(`或者直接访问：http://${ip}:${port}`)
  // 生成二维码并输出到控制台
  qrcode.generate(`http://${ip}:${port}`, { small: true }, function (qrcode) {
    console.log(qrcode);
  });
  console.log(`\n按下 Ctrl+C 关闭服务器\n或输入rs重新启动服务器`)
});
});
