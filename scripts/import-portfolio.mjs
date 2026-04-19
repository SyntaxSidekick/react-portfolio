/**
 * Portfolio Import Script
 * 
 * Reads the exported ZIP file from Portfolio Manager
 * Extracts JSON files to src/data/portfolio/
 * Extracts and optimizes images to public/images/portfolio/
 * Updates paths in JSON files to match new locations
 * 
 * Usage: npm run import:portfolio
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { promisify } from 'util';
import AdmZip from 'adm-zip';
import sharp from 'sharp';
import { glob } from 'glob';
import { parse as parseCsv } from 'csv-parse/sync';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Promisify fs functions
const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);
const mkdir = promisify(fs.mkdir);
const readdir = promisify(fs.readdir);

// Configuration
const CONFIG = {
    projectRoot: path.resolve(__dirname, '..'),
    zipPattern: 'portfolio-export-*.zip',
    dataOutputDir: 'src/data/portfolio',
    imagesOutputDir: 'public/images/portfolio',
    imageQuality: {
        webp: 85,
        jpeg: 90,
        png: 90
    },
    imageSizes: [1600, 1200, 800], // Responsive sizes
    createFallbacks: true // Generate JPEG/PNG fallbacks for WebP
};

// Statistics tracking
const stats = {
    jsonFiles: 0,
    csvFiles: 0,
    imagesExtracted: 0,
    imagesOptimized: 0,
    webpGenerated: 0,
    fallbacksGenerated: 0,
    errors: 0
};

/**
 * Find the most recent portfolio export ZIP file
 */
async function findLatestZip() {
    const pattern = path.join(CONFIG.projectRoot, CONFIG.zipPattern);
    const files = await glob(pattern);
    
    if (files.length === 0) {
        throw new Error(`No portfolio export ZIP file found matching: ${CONFIG.zipPattern}`);
    }
    
    // Sort by modification time, most recent first
    const filesWithStats = await Promise.all(
        files.map(async (file) => ({
            file,
            mtime: (await fs.promises.stat(file)).mtime
        }))
    );
    
    filesWithStats.sort((a, b) => b.mtime - a.mtime);
    
    return filesWithStats[0].file;
}

/**
 * Extract ZIP file
 */
function extractZip(zipPath) {
    console.log(`📦 Extracting ZIP: ${path.basename(zipPath)}`);
    
    try {
        const zip = new AdmZip(zipPath);
        return zip;
    } catch (error) {
        throw new Error(`Failed to read ZIP file: ${error.message}`);
    }
}

/**
 * Create directory if it doesn't exist
 */
async function ensureDir(dir) {
    const fullPath = path.join(CONFIG.projectRoot, dir);
    
    try {
        await mkdir(fullPath, { recursive: true });
    } catch (error) {
        if (error.code !== 'EEXIST') {
            throw error;
        }
    }
    
    return fullPath;
}

/**
 * Convert common CSV row values to typed JSON values
 */
function normalizeCsvItem(item) {
    const normalized = { ...item };
    const arrayFields = ['addimg', 'images', 'techStack', 'tags', 'tools'];
    const booleanFields = ['featured'];

    arrayFields.forEach((field) => {
        if (typeof normalized[field] !== 'string') return;
        const value = normalized[field].trim();

        if (!value) {
            normalized[field] = [];
            return;
        }

        try {
            const parsed = JSON.parse(value);
            if (Array.isArray(parsed)) {
                normalized[field] = parsed;
                return;
            }
        } catch {
            // Fall back to delimited parsing.
        }

        normalized[field] = value
            .split(/[|,]/)
            .map((segment) => segment.trim())
            .filter(Boolean);
    });

    booleanFields.forEach((field) => {
        if (typeof normalized[field] !== 'string') return;
        const value = normalized[field].trim().toLowerCase();
        if (value === 'true') normalized[field] = true;
        if (value === 'false') normalized[field] = false;
    });

    return normalized;
}

/**
 * Process and save data files (JSON and CSV)
 */
async function processJsonFiles(zip) {
    console.log('\n📄 Processing data files...');
    
    const dataDir = await ensureDir(CONFIG.dataOutputDir);
    const zipEntries = zip.getEntries();
    
    const dataFiles = zipEntries.filter(entry => 
        entry.entryName.includes('src/data/portfolio/') && 
        /\.(json|csv)$/i.test(entry.entryName)
    );
    
    for (const entry of dataFiles) {
        const filename = path.basename(entry.entryName);
        const ext = path.extname(filename).toLowerCase();
        const outputFilename = ext === '.csv' ? filename.replace(/\.csv$/i, '.json') : filename;
        const outputPath = path.join(dataDir, outputFilename);
        
        try {
            const content = entry.getData().toString('utf8');
            const data = ext === '.csv'
                ? parseCsv(content, {
                    columns: true,
                    skip_empty_lines: true,
                    trim: true,
                    bom: true
                }).map(normalizeCsvItem)
                : JSON.parse(content);
            
            // Write JSON file with pretty formatting
            await writeFile(outputPath, JSON.stringify(data, null, 2));
            
            stats.jsonFiles++;
            if (ext === '.csv') {
                stats.csvFiles++;
                console.log(`  ✅ ${filename} → ${outputFilename} (${data.length} items)`);
            } else {
                console.log(`  ✅ ${filename} (${data.length} items)`);
            }
        } catch (error) {
            console.error(`  ❌ Failed to process ${filename}: ${error.message}`);
            stats.errors++;
        }
    }
    
    return dataFiles.map(e => path.basename(e.entryName));
}

/**
 * Optimize image using Sharp
 */
async function optimizeImage(buffer, outputPath, originalExt) {
    const ext = path.extname(outputPath).toLowerCase();
    const basename = path.basename(outputPath, ext);
    const dirname = path.dirname(outputPath);
    
    try {
        let sharpInstance = sharp(buffer);
        
        // Get image metadata
        const metadata = await sharpInstance.metadata();
        
        // Generate WebP version (primary)
        const webpPath = path.join(dirname, `${basename}.webp`);
        await sharpInstance
            .webp({ quality: CONFIG.imageQuality.webp })
            .toFile(webpPath);
        
        stats.webpGenerated++;
        
        // Generate fallback if enabled
        if (CONFIG.createFallbacks) {
            let fallbackPath;
            let fallbackFormat;
            
            if (originalExt === '.png' || metadata.hasAlpha) {
                fallbackPath = path.join(dirname, `${basename}.png`);
                fallbackFormat = 'png';
                await sharp(buffer)
                    .png({ quality: CONFIG.imageQuality.png })
                    .toFile(fallbackPath);
            } else {
                fallbackPath = path.join(dirname, `${basename}.jpg`);
                fallbackFormat = 'jpeg';
                await sharp(buffer)
                    .jpeg({ quality: CONFIG.imageQuality.jpeg })
                    .toFile(fallbackPath);
            }
            
            stats.fallbacksGenerated++;
        }
        
        stats.imagesOptimized++;
        return webpPath;
        
    } catch (error) {
        throw new Error(`Image optimization failed: ${error.message}`);
    }
}

/**
 * Process and optimize images
 */
async function processImages(zip) {
    console.log('\n🖼️  Processing images...');
    
    const imagesDir = await ensureDir(CONFIG.imagesOutputDir);
    const zipEntries = zip.getEntries();
    
    const imageFiles = zipEntries.filter(entry => 
        entry.entryName.includes('public/images/portfolio/') && 
        /\.(webp|jpg|jpeg|png)$/i.test(entry.entryName)
    );
    
    console.log(`  Found ${imageFiles.length} images to process`);
    
    for (const entry of imageFiles) {
        // Get relative path from public/images/portfolio/
        const relativePath = entry.entryName.split('public/images/portfolio/')[1];
        
        if (!relativePath) continue;
        
        const outputPath = path.join(imagesDir, relativePath);
        const outputDir = path.dirname(outputPath);
        
        // Ensure category subdirectory exists
        await mkdir(outputDir, { recursive: true });
        
        try {
            const buffer = entry.getData();
            const ext = path.extname(entry.entryName);
            
            await optimizeImage(buffer, outputPath, ext);
            
            stats.imagesExtracted++;
            
            // Show progress every 10 images
            if (stats.imagesExtracted % 10 === 0) {
                console.log(`  📊 Processed ${stats.imagesExtracted}/${imageFiles.length} images...`);
            }
        } catch (error) {
            console.error(`  ❌ Failed to process ${relativePath}: ${error.message}`);
            stats.errors++;
        }
    }
    
    console.log(`  ✅ All images processed`);
}

/**
 * Update image paths in JSON files
 */
async function updateJsonPaths() {
    console.log('\n🔗 Updating image paths in JSON files...');
    
    const dataDir = path.join(CONFIG.projectRoot, CONFIG.dataOutputDir);
    const files = await readdir(dataDir);
    const jsonFiles = files.filter(f => f.endsWith('.json'));
    
    for (const filename of jsonFiles) {
        const filePath = path.join(dataDir, filename);
        
        try {
            const content = await readFile(filePath, 'utf8');
            let data = JSON.parse(content);
            let modified = false;
            
            // Update paths in each item
            data = data.map(item => {
                const updated = { ...item };
                
                // Update various image path fields
                ['img', 'image', 'thumbnail', 'secimg'].forEach(field => {
                    if (updated[field] && typeof updated[field] === 'string') {
                        const newPath = updated[field].replace(/\.(jpg|jpeg|png)$/i, '.webp');
                        if (newPath !== updated[field]) {
                            updated[field] = newPath;
                            modified = true;
                        }
                    }
                });
                
                // Update array fields
                ['addimg', 'images'].forEach(field => {
                    if (Array.isArray(updated[field])) {
                        updated[field] = updated[field].map(imgPath => {
                            if (typeof imgPath === 'string') {
                                const newPath = imgPath.replace(/\.(jpg|jpeg|png)$/i, '.webp');
                                if (newPath !== imgPath) {
                                    modified = true;
                                    return newPath;
                                }
                            }
                            return imgPath;
                        });
                    }
                });
                
                return updated;
            });
            
            if (modified) {
                await writeFile(filePath, JSON.stringify(data, null, 2));
                console.log(`  ✅ Updated paths in ${filename}`);
            } else {
                console.log(`  ⏭️  No changes needed in ${filename}`);
            }
        } catch (error) {
            console.error(`  ❌ Failed to update ${filename}: ${error.message}`);
            stats.errors++;
        }
    }
}

/**
 * Generate summary report
 */
function printSummary(zipPath, startTime) {
    const duration = ((Date.now() - startTime) / 1000).toFixed(2);
    
    console.log('\n' + '='.repeat(60));
    console.log('📊 IMPORT SUMMARY');
    console.log('='.repeat(60));
    console.log(`Source: ${path.basename(zipPath)}`);
    console.log(`Duration: ${duration}s`);
    console.log('');
    console.log(`✅ JSON Files Copied: ${stats.jsonFiles}`);
    console.log(`✅ CSV Files Converted: ${stats.csvFiles}`);
    console.log(`✅ Images Extracted: ${stats.imagesExtracted}`);
    console.log(`✅ Images Optimized: ${stats.imagesOptimized}`);
    console.log(`✅ WebP Generated: ${stats.webpGenerated}`);
    console.log(`✅ Fallbacks Generated: ${stats.fallbacksGenerated}`);
    
    if (stats.errors > 0) {
        console.log(`❌ Errors: ${stats.errors}`);
    }
    
    console.log('='.repeat(60));
    console.log('\n✨ Import complete! Next steps:');
    console.log('1. Review the imported data in src/data/portfolio/');
    console.log('2. Check optimized images in public/images/portfolio/');
    console.log('3. Update your components to use the new data structure');
    console.log('4. Run: npm run dev (to test)');
    console.log('5. Run: npm run build (to build for production)');
    console.log('');
}

/**
 * Main import function
 */
async function main() {
    const startTime = Date.now();
    
    console.log('🚀 Portfolio Import Script');
    console.log('='.repeat(60));
    
    try {
        // Find latest ZIP file
        const zipPath = await findLatestZip();
        console.log(`✅ Found: ${path.basename(zipPath)}`);
        
        // Extract ZIP
        const zip = extractZip(zipPath);
        
        // Process files
        await processJsonFiles(zip);
        await processImages(zip);
        await updateJsonPaths();
        
        // Show summary
        printSummary(zipPath, startTime);
        
        process.exit(0);
        
    } catch (error) {
        console.error('\n❌ Import failed:', error.message);
        console.error(error.stack);
        process.exit(1);
    }
}

// Run the script
main();
