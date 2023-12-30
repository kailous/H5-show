// form-component.js

const fs = require('fs');
const path = require('path');

// 读取HTML文件的内容
const headHTML = fs.readFileSync(path.join(__dirname, 'head.html'), 'utf8');

module.exports = headHTML;