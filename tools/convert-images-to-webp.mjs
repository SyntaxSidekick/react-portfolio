/**
 * Image Conversion Script
 * Converts PNG/JPG images to WebP format for better performance
 * Reduces file sizes by 60-80% while maintaining quality
 */

import sharp from 'sharp';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import fs from 'fs/promises';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const projectRoot = join(__dirname, '..');

const imagesToConvert = [
  {
    input: 'src/assets/images/riadkilani-profile.png',
    output: 'src/assets/images/riadkilani-profile.webp',
    quality: 90
  },
  {
    input: 'src/assets/images/riad-kilani-logo.png',
    output: 'src/assets/images/riad-kilani-logo.webp',
    quality: 90
  }
];

async function convertImage(config) {
  const inputPath = join(projectRoot, config.input);
  const outputPath = join(projectRoot, config.output);

  try {
    const inputStats = await fs.stat(inputPath);
    const inputSize = (inputStats.size / 1024).toFixed(2);

    await sharp(inputPath)
      .webp({ quality: config.quality, effort: 6 })
      .toFile(outputPath);

    const outputStats = await fs.stat(outputPath);
    const outputSize = (outputStats.size / 1024).toFixed(2);
    const savings = ((1 - outputStats.size / inputStats.size) * 100).toFixed(1);

    console.log(`✅ ${config.input}`);
    console.log(`   ${inputSize} KB → ${outputSize} KB (${savings}% reduction)`);
    
    return { success: true, inputSize, outputSize, savings };
  } catch (error) {
    console.error(`❌ Failed to convert ${config.input}:`, error.message);
    return { success: false, error: error.message };
  }
}

async function main() {
  console.log('🖼️  Converting images to WebP format...\n');

  const results = await Promise.all(imagesToConvert.map(convertImage));
  
  const successful = results.filter(r => r.success).length;
  const totalSavings = results
    .filter(r => r.success)
    .reduce((sum, r) => sum + (parseFloat(r.inputSize) - parseFloat(r.outputSize)), 0);

  console.log(`\n📊 Summary:`);
  console.log(`   Converted: ${successful}/${imagesToConvert.length} images`);
  console.log(`   Total savings: ${totalSavings.toFixed(2)} KB`);
}

main().catch(console.error);
