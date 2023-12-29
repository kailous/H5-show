// 08.js

const express = require('express');
const app = express();
const formComponentHTML = require('../components/form-component'); // 导入表单组件模块

  // 在页面中插入表单组件
  const page08Content = `
    <!DOCTYPE html>
    <html>
    <head>
      <title>表单组件演示</title>
      <!-- 页面的头部内容... -->
    </head>
    <body>
      <!-- 其他页面内容... -->

      <!-- 嵌入表单组件 -->
      <div id="formComponentContainer">
        ${formComponentHTML}
      </div>

      <!-- 其他页面内容... -->
    </body>
    </html>
  `;
// 导出表单组件HTML，以便其他文件可以引用
module.exports = page08Content;

