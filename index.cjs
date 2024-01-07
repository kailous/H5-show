// h5 简易开发框架
// 版本：v1.0.0

const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const fs = require('fs');
const path = require('path');
const qrcode = require('qrcode-terminal');
const os = require('os');
const { default: e } = require('express');

// 首先配置 body-parser 中间件
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

// 通用函数，用于替换 HTML 中的占位符
function replacePlaceholders(html, data) {
  let result = html;
  for (const key in data) {
    const placeholder = new RegExp('{{' + key + '}}', 'g');
    result = result.replace(placeholder, data[key] || ``);
  }
  return result;
}

// 读取package.json的内容
const packagePath = path.join(__dirname, 'package.json');
const packageData = JSON.parse(fs.readFileSync(packagePath, 'utf8'));

// 读取并处理组件
const componentsDirectory = path.join(__dirname, '/components');
const components = loadComponents(componentsDirectory, packageData);

// 读取并处理页面
const pagesDirectory = path.join(__dirname, '/pages');
const pageModules = loadPages(pagesDirectory, components, packageData);


// 读取 index.html
const indexHTML = fs.readFileSync(path.join(__dirname, '/index.html'), 'utf8');


// 定义根路由
app.get('/', (req, res) => {
  let completePageContent = indexHTML.replace('${headHTML}', components['head']);
  
  // 遍历并替换每个页面内容
  for (let i = 1; i <= 8; i++) {
    const pageContent = pageModules[`0${i}`] || `页面 0${i} 未找到`;
    completePageContent = completePageContent.replace(`\${page0${i}}`, pageContent);
  }

  res.send(completePageContent);
});
app.get('/pages', (req, res) => {
  // 假设 pageModules 包含所有页面的内容
  res.json(pageModules);
});
// 定义lottiefiles路由
app.get('/lottiefiles', (req, res) => {
  fs.readdir(path.join(__dirname, '/public/lottiefiles'), (err, files) => {
    if (err) {
      res.status(500).send('服务器错误');
      return;
    }
    const lottieFiles = files.filter(file => file.endsWith('.json'));
    res.json(lottieFiles); // 确保这是一个数组
  });
});
// 定义components-list路由
app.get('/components-list', (req, res) => {
  const componentsDir = path.join(__dirname, '/public/js/components');
  fs.readdir(componentsDir, (err, files) => {
      if (err) {
          res.status(500).send('Error reading components directory');
          return;
      }
      const jsFiles = files.filter(file => file.endsWith('.js'));
      res.json(jsFiles);
  });
});

// 静态文件服务
app.use(express.static('./'));
// 设置根目录为静态文件目录
app.use(express.static(path.join(__dirname, 'public')));
// 设置lottiefiles目录为静态文件目录
app.use('/lottiefiles', express.static(path.join(__dirname, 'public/lottiefiles')));

// 获取本地IP地址
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

// 启动服务器
const port = process.env.PORT || 3000;
const localIPs = getLocalIPs();

app.listen(port, () => {
  localIPs.forEach(ip => {
    console.log(`服务器开始运行：http://localhost:${port}`);
    console.log(`\n共有${Object.keys(pageModules).length}个页面,请使用微信扫一扫预览.`);
    console.log(`或者直接访问：http://${ip}:${port}`)
    qrcode.generate(`http://${ip}:${port}`, { small: true }, function (qrcode) {
      console.log(qrcode);
    });
    console.log(`\n按下 Ctrl+C 关闭服务器\n或输入rs重新启动服务器`)
  });
});

// 辅助函数: loadComponents 和 loadPages
function loadComponents(componentsDirectory, packageData) {
  const componentFiles = fs.readdirSync(componentsDirectory);
  let components = {};

  componentFiles.forEach(file => {
    if (file.endsWith('.html')) {
      const fileName = file.split('.')[0];
      const filePath = path.join(componentsDirectory, file);
      let fileContent = fs.readFileSync(filePath, 'utf8');

      // 对所有文件替换占位符
      fileContent = replacePlaceholders(fileContent, packageData);

      // 使用文件名（不含扩展名）作为键
      components[fileName] = fileContent;
    }
  });

  return components;
}

// 读取并处理页面
function loadPages(pagesDirectory, components, packageData) {

  const pages = fs.readdirSync(pagesDirectory);
  let pageModules = {};

  pages.forEach(page => {
    if (page.endsWith('.html')) {

      const pageName = page.split('.')[0];
      const pagePath = path.join(pagesDirectory, page);
      try {
        let pageContent = fs.readFileSync(pagePath, 'utf8');

        // 替换所有组件占位符
        for (const [componentName, componentHTML] of Object.entries(components)) {
          const placeholder = `\\$\\{${componentName}\\}`;
          pageContent = pageContent.replace(new RegExp(placeholder, 'g'), componentHTML);
        }

        // 如果packageData中的cdn属性存在，则使用实际的cdn值进行替换
        if (packageData && packageData.cdn) {
          // console.log(packageData.cdn);
          pageContent = pageContent.replace(/\{\{cdn\}\}/g, packageData.cdn);
        } else {
          console.log('没有找到cdn');
          pageContent = pageContent.replace(/\{\{cdn\}\}/g, '');
        }

        pageModules[pageName] = pageContent;
      } catch (err) {
        console.error(`读取页面 ${pageName} 失败: ${err}`);
      }
    }
  });

  return pageModules;
}



// 辅助函数：loadLottiefiles 和 loadPages
function loadLottiefiles(lottiefilesDirectory) {
  const lottiefiles = fs.readdirSync(lottiefilesDirectory);
  let lottiefileModules = {};

  lottiefiles.forEach(lottiefile => {
    if (lottiefile.endsWith('.json')) {
      const lottiefileName = lottiefile.split('.')[0];
      lottiefileModules[lottiefileName] = path.join(lottiefilesDirectory, lottiefile);
    }
  });

  return lottiefileModules;
}
