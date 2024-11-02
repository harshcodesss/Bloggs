import ejs from 'ejs';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get the current directory name for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const templatePath = path.join(__dirname, 'views', 'index.ejs');
const outputPath = path.join(__dirname, 'index.html');

// You can pass any data you want to render the template with
const data = {}; // Add your data here if needed

ejs.renderFile(templatePath, data, { root: path.join(__dirname, 'views') }, (err, str) => {
    if (err) {
        console.error(err);
        return;
    }
    fs.writeFileSync(outputPath, str);
    console.log('index.html has been created successfully!');
});
