const fs = require('fs');
const path = require('path');

const CONTENT_DIR = path.join(__dirname, 'content');

function cleanMarkdown(content) {
  return content
    // Fix weird quotes
    .replace(/“|”/g, '"')
    .replace(/‘|’/g, "'")

    // Remove weird markdown artifacts like **"Title"**
    .replace(/\*\*"(.*?)"\*\*/g, '$1')

    // Fix headings spacing
    .replace(/^(#{1,6})([^\s#])/gm, '$1 $2')

    // Ensure spacing after headings
    .replace(/(#+ .+)\n(?!\n)/g, '$1\n\n')

    // Fix bullet spacing
    .replace(/^\s*[-*]\s*/gm, '- ')

    // Remove excessive line breaks
    .replace(/\n{3,}/g, '\n\n')

    // Clean inline quotes in lists
    .replace(/"\s+/g, '" ')
    .replace(/\s+"/g, ' "')

    // Trim
    .trim();
}

function processDirectory(dir) {
  const items = fs.readdirSync(dir);

  items.forEach((item) => {
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      processDirectory(fullPath);
    } else if (item.endsWith('.md')) {
      const raw = fs.readFileSync(fullPath, 'utf8');

      const parts = raw.split('---');
      if (parts.length >= 3) {
        const frontmatter = `---${parts[1]}---`;
        const body = parts.slice(2).join('---');

        const cleaned = cleanMarkdown(body);

        const final = `${frontmatter}\n\n${cleaned}\n`;

        fs.writeFileSync(fullPath, final, 'utf8');
        console.log(`✔ Fixed: ${item}`);
      }
    }
  });
}

processDirectory(CONTENT_DIR);

console.log('\n🔥 All blog files cleaned and formatted.');