const express = require('express');
const app = express();
const fs = require('fs');
const path = require('path');
const formComponentHTML = require('../components/form-component'); // 导入表单组件模块

// 读取HTML文件的内容
const page07Content = fs.readFileSync(path.join(__dirname, '07.html'), 'utf8');

// 将formComponentHTML插入到page07Content中
const completePageContent = page07Content.replace('${formComponentHTML}', formComponentHTML);

module.exports = completePageContent;
