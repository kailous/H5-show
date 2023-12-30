// form-component.js

const fs = require('fs');
const path = require('path');

// 读取HTML文件的内容
const formComponentHTML = fs.readFileSync(path.join(__dirname, 'form-component.html'), 'utf8');

module.exports = formComponentHTML;