const express = require('express');
const app = express();
const fs = require('fs');
const path = require('path');
const formComponentHTML = require('./components/form-component');

// 遍历pages目录下的所有html文件并读取文件内容
const pagesDirectory = path.join(__dirname, './pages');
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

module.exports = pageModules;
