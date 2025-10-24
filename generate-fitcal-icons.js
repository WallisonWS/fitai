const fs = require('fs');
const { createCanvas } = require('canvas');

const sizes = [192, 512, 1024];

sizes.forEach(size => {
  const canvas = createCanvas(size, size);
  const ctx = canvas.getContext('2d');

  // Background gradient (rosa/lilás)
  const gradient = ctx.createLinearGradient(0, 0, size, size);
  gradient.addColorStop(0, '#F5E6F8');
  gradient.addColorStop(1, '#FFE6F0');
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, size, size);

  // Texto "FitCal"
  ctx.fillStyle = '#000000';
  ctx.font = `bold ${size * 0.25}px Arial`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('FitCal', size / 2, size / 2);

  // Salvar
  const buffer = canvas.toBuffer('image/png');
  fs.writeFileSync(`public/icon-${size}.png`, buffer);
  console.log(`Ícone ${size}x${size} criado com sucesso!`);
});
