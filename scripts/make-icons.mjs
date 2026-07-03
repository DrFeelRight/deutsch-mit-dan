// Generates the PWA icons (public/icons/*.png) with zero dependencies:
// raw RGBA pixels -> zlib (built into Node) -> hand-assembled PNG chunks.
// Design: German flag tricolour, rounded corners for the "any" icons,
// full-bleed square for the maskable icon.
//
// Run:  node scripts/make-icons.mjs
import { deflateSync } from 'node:zlib';
import { mkdirSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const OUT_DIR = join(dirname(fileURLToPath(import.meta.url)), '..', 'public', 'icons');

// --- minimal PNG encoder -----------------------------------------------------

const CRC_TABLE = new Int32Array(256).map((_, n) => {
  let c = n;
  for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
  return c;
});

const crc32 = (buf) => {
  let c = -1;
  for (const byte of buf) c = CRC_TABLE[(c ^ byte) & 0xff] ^ (c >>> 8);
  return (c ^ -1) >>> 0;
};

const chunk = (type, data) => {
  const typeAndData = Buffer.concat([Buffer.from(type, 'ascii'), data]);
  const out = Buffer.alloc(typeAndData.length + 8);
  out.writeUInt32BE(data.length, 0);
  typeAndData.copy(out, 4);
  out.writeUInt32BE(crc32(typeAndData), typeAndData.length + 4);
  return out;
};

const encodePng = (size, rgba) => {
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(size, 0); // width
  ihdr.writeUInt32BE(size, 4); // height
  ihdr[8] = 8; // bit depth
  ihdr[9] = 6; // colour type: RGBA
  // bytes 10-12: compression / filter / interlace = 0

  // Each scanline is prefixed with filter byte 0 (None).
  const raw = Buffer.alloc(size * (size * 4 + 1));
  for (let y = 0; y < size; y++) {
    rgba.copy(raw, y * (size * 4 + 1) + 1, y * size * 4, (y + 1) * size * 4);
  }

  return Buffer.concat([
    Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]),
    chunk('IHDR', ihdr),
    chunk('IDAT', deflateSync(raw, { level: 9 })),
    chunk('IEND', Buffer.alloc(0)),
  ]);
};

// --- icon art ----------------------------------------------------------------

const BANDS = [
  [0, 0, 0], // schwarz
  [221, 0, 0], // rot
  [255, 206, 0], // gold
];

const drawFlag = (size, { rounded }) => {
  const rgba = Buffer.alloc(size * size * 4);
  const radius = rounded ? size * 0.22 : 0;

  for (let y = 0; y < size; y++) {
    const band = BANDS[Math.min(2, Math.floor((y / size) * 3))];
    for (let x = 0; x < size; x++) {
      let alpha = 255;
      if (radius > 0) {
        // Distance-based rounded-corner mask with 1px anti-aliased edge.
        const cx = x < radius ? radius : x >= size - radius ? size - radius - 1 : null;
        const cy = y < radius ? radius : y >= size - radius ? size - radius - 1 : null;
        if (cx !== null && cy !== null) {
          const dist = Math.hypot(x - cx, y - cy);
          alpha = Math.round(255 * Math.max(0, Math.min(1, radius - dist + 0.5)));
        }
      }
      const i = (y * size + x) * 4;
      rgba[i] = band[0];
      rgba[i + 1] = band[1];
      rgba[i + 2] = band[2];
      rgba[i + 3] = alpha;
    }
  }
  return encodePng(size, rgba);
};

// --- write files ---------------------------------------------------------------

mkdirSync(OUT_DIR, { recursive: true });
writeFileSync(join(OUT_DIR, 'icon-192.png'), drawFlag(192, { rounded: true }));
writeFileSync(join(OUT_DIR, 'icon-512.png'), drawFlag(512, { rounded: true }));
writeFileSync(join(OUT_DIR, 'icon-maskable-512.png'), drawFlag(512, { rounded: false }));
console.log('Icons written to', OUT_DIR);
