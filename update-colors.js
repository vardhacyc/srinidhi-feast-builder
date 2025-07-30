#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Color mappings from orange/red to yellow/green
const colorMappings = {
  // Orange variants to food-yellow
  'bg-orange-50': 'bg-food-yellow-50',
  'bg-orange-100': 'bg-food-yellow-100',
  'bg-orange-200': 'bg-food-yellow-200',
  'bg-orange-300': 'bg-food-yellow-300',
  'bg-orange-400': 'bg-food-yellow-400',
  'bg-orange-500': 'bg-food-yellow-500',
  'bg-orange-600': 'bg-food-yellow-600',
  'bg-orange-700': 'bg-food-yellow-700',
  'bg-orange-800': 'bg-food-yellow-800',
  'bg-orange-900': 'bg-food-yellow-900',
  
  'text-orange-50': 'text-food-yellow-50',
  'text-orange-100': 'text-food-yellow-100',
  'text-orange-200': 'text-food-yellow-200',
  'text-orange-300': 'text-food-yellow-300',
  'text-orange-400': 'text-food-yellow-400',
  'text-orange-500': 'text-food-yellow-500',
  'text-orange-600': 'text-food-yellow-600',
  'text-orange-700': 'text-food-yellow-700',
  'text-orange-800': 'text-food-yellow-800',
  'text-orange-900': 'text-food-yellow-900',
  
  'border-orange-600': 'border-food-yellow-600',
  'hover:bg-orange-50': 'hover:bg-food-yellow-50',
  'hover:bg-orange-600': 'hover:bg-food-yellow-600',
  'hover:bg-orange-700': 'hover:bg-food-yellow-700',
  'hover:text-orange-600': 'hover:text-food-yellow-600',
  'hover:text-orange-500': 'hover:text-food-yellow-500',
  
  // Red variants to fresh-green (for gradients and accents)
  'to-red-50': 'to-fresh-green-50',
  'to-red-100': 'to-fresh-green-100',
  'to-red-200': 'to-fresh-green-200',
  'to-red-300': 'to-fresh-green-300',
  'to-red-400': 'to-fresh-green-400',
  'to-red-500': 'to-fresh-green-500',
  'to-red-600': 'to-fresh-green-600',
  'to-red-700': 'to-fresh-green-700',
  
  'from-red-50': 'from-fresh-green-50',
  'from-red-100': 'from-fresh-green-100',
  'from-red-200': 'from-fresh-green-200',
  'from-red-300': 'from-fresh-green-300',
  'from-red-400': 'from-fresh-green-400',
  'from-red-500': 'from-fresh-green-500',
  'from-red-600': 'from-fresh-green-600',
  'from-red-700': 'from-fresh-green-700',
  
  // Update gradients to use yellow-to-green instead of orange-to-red
  'from-orange-600 to-red-600': 'from-food-yellow-600 to-fresh-green-600',
  'from-orange-500 to-red-500': 'from-food-yellow-500 to-fresh-green-500',
  'from-orange-400 to-red-400': 'from-food-yellow-400 to-banana-leaf-400',
  'from-orange-100 to-red-100': 'from-food-yellow-100 to-banana-leaf-100',
  'from-orange-50 to-red-50': 'from-food-yellow-50 to-banana-leaf-50',
  
  'hover:from-orange-700 hover:to-red-700': 'hover:from-food-yellow-700 hover:to-fresh-green-700',
  'hover:from-orange-600 hover:to-red-600': 'hover:from-food-yellow-600 hover:to-fresh-green-600',
  
  // Special cases for specific color combinations
  'hover:text-orange-600 transition-colors': 'hover:text-food-yellow-600 transition-colors',
  'text-white hover:text-orange-600': 'text-white hover:text-food-yellow-600',
};

// Get all TypeScript and TSX files in src directory
function getAllTsxFiles(dir) {
  const files = [];
  const items = fs.readdirSync(dir);
  
  for (const item of items) {
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);
    
    if (stat.isDirectory()) {
      files.push(...getAllTsxFiles(fullPath));
    } else if (item.endsWith('.tsx') || item.endsWith('.ts')) {
      files.push(fullPath);
    }
  }
  
  return files;
}

// Update colors in a file
function updateColorsInFile(filePath) {
  console.log(`Processing: ${filePath}`);
  let content = fs.readFileSync(filePath, 'utf8');
  let modified = false;
  
  // Apply all color mappings
  for (const [oldColor, newColor] of Object.entries(colorMappings)) {
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
const srcDir = path.join(__dirname, 'src');
const files = getAllTsxFiles(srcDir);

console.log(`Found ${files.length} TypeScript/TSX files to process...\n`);

let updatedCount = 0;
for (const file of files) {
  if (updateColorsInFile(file)) {
    updatedCount++;
  }
}

console.log(`\n🎉 Color update complete! Updated ${updatedCount} files.`);
console.log('\nSummary of changes:');
console.log('- Orange colors → Food-grade yellow');
console.log('- Red accents → Fresh green');
console.log('- Gradients → Yellow-to-green transitions');
console.log('- Added banana leaf hints for backgrounds');
