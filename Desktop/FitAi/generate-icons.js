const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

async function generateIcons() {
  const sourceIcon = path.join(__dirname, 'public/icon-1024.png');
  const sizes = [192, 512];

  for (const size of sizes) {
    const outputPath = path.join(__dirname, `public/icon-${size}.png`);
    
    try {
      await sharp(sourceIcon)
        .resize(size, size)
        .toFile(outputPath);
      
      console.log(`✅ Generated ${size}x${size} icon`);
    } catch (error) {
      console.error(`❌ Error generating ${size}x${size} icon:`, error);
    }
  }
}

generateIcons();