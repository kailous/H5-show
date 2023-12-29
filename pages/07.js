// 07.js

const express = require('express');
const app = express();
const formComponentHTML = require('../components/form-component'); // 导入表单组件模块

  // 在页面中插入表单组件
  const page07Content = `
      <!-- 其他页面内容... -->

      <!-- 嵌入表单组件 -->
      <div style="background:#000;" id="lottieAnimation"></div>

      <!-- 其他页面内容... -->
    
    </html>
  `;
// 导出表单组件HTML，以便其他文件可以引用
module.exports = page07Content;

