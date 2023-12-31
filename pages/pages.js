// Description: 读取pages目录下的所有html文件并将其内容导出为一个对象

const express = require('express');
const app = express();
const fs = require('fs');
const path = require('path');
const formComponentHTML = require('../components/form-component'); // 导入表单组件模块

// 遍历pages目录下的所有html文件并读取文件内容
const pages = fs.readdirSync(path.join(__dirname, '/'));
let pageModules = {};
pages.forEach(page => {
  if (page.endsWith('.html')) {
    const pageName = page.split('.')[0];
    const pageContent = fs.readFileSync(path.join(__dirname, '/', page), 'utf8');
    // 将formComponentHTML插入到每个页面中
    pageModules[pageName] = pageContent.replace('${formComponentHTML}', formComponentHTML);
  }
});

module.exports = pageModules;
