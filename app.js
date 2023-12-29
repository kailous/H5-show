const express = require('express');
const app = express();
const port = 3000;
const headHTML = require('./components/head'); // 导入表单组件模块

// 在 Express.js 应用程序中设置静态文件目录
app.use(express.static('js')); // 这里假设您的 js 文件夹在根目录中



const page07 = require('./pages/07');
const page08 = require('./pages/08');
app.get('/', (req, res) => {
    // 导入08.js作为一个翻页
  // 在页面中插入08.js的内容
  const pageContent = `
    <!DOCTYPE html>
    <html>
    ${headHTML}
    <body>
      <!-- 主页内容... -->
      
      <!-- 插入08.js的内容 -->
      <div id="page08Content">
        ${page07}
      </div>

      <!-- 插入08.js的内容 -->
      <div id="page08Content">
        ${page08}
      </div>
      <!-- 主页内容... -->
    </body>
    <script src="/form.js"></script>
    <script>
    // 获取容器元素
const container = document.getElementById('lottieAnimation');

// 配置Lottie选项
const options = {
  container: container, // 容器元素
  renderer: 'svg', // 渲染器，可以选择 'svg' 或 'canvas'
  loop: true, // 是否循环播放
  autoplay: true, // 是否自动播放
  path: '/hdts.json' // Lottie文件的路径，包括文件夹名称
};

// 加载并播放Lottie动画
const animation = lottie.loadAnimation(options);

    </script>
    </html>
  `;

  res.send(pageContent);
});


// 启动Express.js应用
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
