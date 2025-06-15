const fs = require('fs');
const path = require('path');

const distFolder = path.join(__dirname, 'dist', 'neo-vision-app');
const indexPath = path.join(distFolder, 'browser', 'index.html');
const notFoundPath = path.join(distFolder, 'browser', '404.html');

// Check if index.html exists
if (fs.existsSync(indexPath)) {
  // Copy index.html to 404.html
  fs.copyFileSync(indexPath, notFoundPath);
  console.log('Successfully copied index.html to 404.html');
} else {
  console.error('Error: index.html not found in', indexPath);
} 