const fs = require('fs');
const path = 'C:\\Users\\Udit Pandey\\.gemini\\antigravity-ide\\brain\\cb51d2cb-6f64-4a00-9ebe-38dfae4644d6\\.system_generated\\steps\\355\\content.md';
const html = fs.readFileSync(path, 'utf8');

// Find occurrences of canvas or drawImage or image sequence
const scripts = html.match(/<script src=\"([^\"]+)\"/g) || [];
console.log('Scripts:', scripts);
