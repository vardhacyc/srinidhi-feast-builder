#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Additional color mappings for missed cases
const additionalMappings = {
  'ring-orange-500': 'ring-food-yellow-500',
  'focus:ring-orange-500': 'focus:ring-food-yellow-500',
  'to-orange-50': 'to-food-yellow-50',
  'from-orange-50': 'from-food-yellow-50',
  'text-orange-200': 'text-food-yellow-200',
  'hover:bg-orange-50': 'hover:bg-food-yellow-50',
};

// Files to update
const filesToUpdate = [
  'src/components/Testimonials.tsx',
  'src/components/Services.tsx', 
  'src/components/Contact.tsx',
  'src/components/Menu.tsx',
  'src/components/Footer.tsx',
];

// Update colors in a file
function updateColorsInFile(filePath) {
  console.log(`Processing: ${filePath}`);
  let content = fs.readFileSync(filePath, 'utf8');
  let modified = false;
  
  // Apply all color mappings
  for (const [oldColor, newColor] of Object.entries(additionalMappings)) {
    if (content.includes(oldColor)) {
      const regex = new RegExp(oldColor.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g');
      content = content.replace(regex, newColor);
      modified = true;
    }
  }
  
  if (modified) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`✅ Updated: ${filePath}`);
    return true;
  }
  
  return false;
}

// Main execution
console.log('Processing remaining color updates...\n');

let updatedCount = 0;
for (const file of filesToUpdate) {
  const fullPath = path.join(__dirname, file);
  if (fs.existsSync(fullPath)) {
    if (updateColorsInFile(fullPath)) {
      updatedCount++;
    }
  }
}

console.log(`\n🎉 Additional color updates complete! Updated ${updatedCount} files.`);
