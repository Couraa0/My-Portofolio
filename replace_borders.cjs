const fs = require('fs');
const path = require('path');

const replacements = {
  'hsl(220 20% 86%)': 'hsl(var(--border))',
  'hsl(220 20% 88%)': 'hsl(var(--border))',
  'hsl(220 20% 90%)': 'hsl(var(--border))',
  'hsl(220 20% 91%)': 'hsl(var(--border))',
  'hsl(220 20% 93%)': 'hsl(var(--secondary))',
  'hsl(220 20% 96%)': 'hsl(var(--muted))',
  'hsl(220 20% 97%)': 'hsl(var(--muted))',
  'hsl(220 20% 70%': 'hsl(var(--foreground)'
};

function replaceInFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let originalContent = content;

  for (const [key, value] of Object.entries(replacements)) {
    content = content.split(key).join(value);
  }

  // Handle active "white" bg
  content = content.replace(/background: isActive \? \"white\" : \"transparent\"/g, 'background: isActive ? \"hsl(var(--card))\" : \"transparent\"');

  // Handle any other hardcoded "white" or `#fff` if it relates to background card, like in Projects.tsx:
  // "linear-gradient(135deg, ${palette.fromLight}, hsl(220 20% 97%))" -> wait, replaced naturally by the above.

  if (content !== originalContent) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log('Updated: ' + filePath);
  }
}

function processDir(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      processDir(fullPath);
    } else if (fullPath.endsWith('.tsx')) {
      replaceInFile(fullPath);
    }
  }
}

processDir('./src/components');
processDir('./src/pages');
console.log('Done replacement');
