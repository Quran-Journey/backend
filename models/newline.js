
const fs = require('fs');
const path = require('path');

// Get a list of files in the current folder
const files = fs.readdirSync(__dirname);

// Loop through each file
files.forEach((file) => {
  // Skip directories
  if (fs.statSync(file).isDirectory()) {
    return;
  }

  // Read the content of the file
  const filePath = path.join(__dirname, file);
  const content = fs.readFileSync(filePath, 'utf-8');

  // Add a newline at the beginning of the content
  const newContent = '\n' + content;

  // Write the modified content back to the file
  fs.writeFileSync(filePath, newContent, 'utf-8');
  
  console.log(`Added newline to ${file}`);
});

console.log('Newline addition completed.');