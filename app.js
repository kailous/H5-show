const express = require('express');
const qrcode = require('qrcode-terminal'); // 导入qrcode-terminal库
const app = express();
const os = require('os');
const fs = require('fs');
const path = require('path');

// 导入组件
const headHTML = require('./components/layout/head'); // 导入表单组件模块
// 导入页面
const page07 = require('./pages/07');
const page08 = require('./pages/08');

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

const port = 3000; // 输出端口号
const localIPs = getLocalIPs();  // 输出本机IP地址


// 在根路径的路由处理中插入index.html的内容
app.get('/', (req, res) => {
  const completePageContent = indexHTML
    .replace('${headHTML}', headHTML)
    .replace('${page07}', page07)
    .replace('${page08}', page08);

  res.send(completePageContent);
});

// 启动Express.js应用
app.listen(port, () => {
  localIPs.forEach(ip => {
  console.log(`服务器开始运行：http://localhost:${port}`);
  console.log(`移动端预览：http://${ip}:${port}`)
  // 生成二维码并输出到控制台
  qrcode.generate(`http://${ip}:${port}`, { small: true }, function (qrcode) {
    console.log('\n使用微信扫一扫\n直接预览');
    console.log(qrcode);
  });
  console.log(`\n按下 Ctrl+C 关闭服务器`)
});
});
