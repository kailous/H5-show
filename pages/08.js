const express = require('express');
const app = express();
const fs = require('fs');
const path = require('path');
const formComponentHTML = require('../components/form-component'); // 导入表单组件模块

// 读取HTML文件的内容
const page08Content = fs.readFileSync(path.join(__dirname, '08.html'), 'utf8');

// 将formComponentHTML插入到page08Content中
const completePageContent = page08Content.replace('${formComponentHTML}', formComponentHTML);

module.exports = completePageContent;
