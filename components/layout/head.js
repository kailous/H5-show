const fs = require('fs');
const path = require('path');

// 获取package.json的路径
const packagePath = path.join(__dirname, '..','..', 'package.json');
// 读取package.json的内容
const packageData = JSON.parse(fs.readFileSync(packagePath, 'utf8'));

// 获取head.html的路径
const headHTMLPath = path.join(__dirname, 'head.html');
// 读取head.html的内容
let headHTML = fs.readFileSync(headHTMLPath, 'utf8');

// 使用一个函数来通用地替换所有占位符
function replacePlaceholders(html, data) {
  let result = html;
  for (const key in data) {
    const placeholder = new RegExp('{{' + key + '}}', 'g');
    result = result.replace(placeholder, data[key] || `默认${key}`);
  }
  return result;
}

// 调用函数替换占位符
headHTML = replacePlaceholders(headHTML, packageData);

// 将替换后的HTML导出
module.exports = headHTML;
