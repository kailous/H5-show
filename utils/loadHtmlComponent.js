// loadHtmlComponent.js
const fs = require('fs');
const path = require('path');

function loadHtmlComponent(filePath) {
  return fs.readFileSync(path.join(__dirname, filePath), 'utf8');
}

module.exports = loadHtmlComponent;
