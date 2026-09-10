#!/usr/bin/env node
import fs from "node:fs/promises";
import path from "node:path";

const imageDir = process.argv[2];
const outputHtml = process.argv[3] || (imageDir ? path.join(imageDir, "index.html") : null);

if (!imageDir || !outputHtml) {
  console.error("Usage: node build-image-gallery.mjs <image-dir> [output-html]");
  process.exit(1);
}

const absImageDir = path.resolve(imageDir);
const absOutputHtml = path.resolve(outputHtml);
const files = (await fs.readdir(absImageDir))
  .filter((file) => /\.(png|jpe?g|webp)$/i.test(file))
  .sort((a, b) => a.localeCompare(b, "en", { numeric: true }));

if (!files.length) {
  console.error(`No images found in ${absImageDir}`);
  process.exit(1);
}

const crcTable = Array.from({ length: 256 }, (_, value) => {
  let crc = value;
  for (let bit = 0; bit < 8; bit += 1) {
    crc = (crc >>> 1) ^ ((crc & 1) ? 0xedb88320 : 0);
  }
  return crc >>> 0;
});

function crc32(buffer) {
  let crc = 0xffffffff;
  for (const byte of buffer) {
    crc = (crc >>> 8) ^ crcTable[(crc ^ byte) & 0xff];
  }
  return (crc ^ 0xffffffff) >>> 0;
}

function dosDateTime(date) {
  const year = Math.max(1980, date.getFullYear());
  const time = (date.getHours() << 11) | (date.getMinutes() << 5) | Math.floor(date.getSeconds() / 2);
  const day = ((year - 1980) << 9) | ((date.getMonth() + 1) << 5) | date.getDate();
  return { time, day };
}

async function writeZip(sourceDir, imageFiles, zipPath) {
  const localParts = [];
  const centralParts = [];
  let offset = 0;

  for (const file of imageFiles) {
    const sourcePath = path.join(sourceDir, file);
    const [data, stat] = await Promise.all([fs.readFile(sourcePath), fs.stat(sourcePath)]);
    const name = Buffer.from(file, "utf8");
    const checksum = crc32(data);
    const { time, day } = dosDateTime(stat.mtime);

    const local = Buffer.alloc(30);
    local.writeUInt32LE(0x04034b50, 0);
    local.writeUInt16LE(20, 4);
    local.writeUInt16LE(0x0800, 6);
    local.writeUInt16LE(0, 8);
    local.writeUInt16LE(time, 10);
    local.writeUInt16LE(day, 12);
    local.writeUInt32LE(checksum, 14);
    local.writeUInt32LE(data.length, 18);
    local.writeUInt32LE(data.length, 22);
    local.writeUInt16LE(name.length, 26);
    local.writeUInt16LE(0, 28);
    localParts.push(local, name, data);

    const central = Buffer.alloc(46);
    central.writeUInt32LE(0x02014b50, 0);
    central.writeUInt16LE(20, 4);
    central.writeUInt16LE(20, 6);
    central.writeUInt16LE(0x0800, 8);
    central.writeUInt16LE(0, 10);
    central.writeUInt16LE(time, 12);
    central.writeUInt16LE(day, 14);
    central.writeUInt32LE(checksum, 16);
    central.writeUInt32LE(data.length, 20);
    central.writeUInt32LE(data.length, 24);
    central.writeUInt16LE(name.length, 28);
    central.writeUInt16LE(0, 30);
    central.writeUInt16LE(0, 32);
    central.writeUInt16LE(0, 34);
    central.writeUInt16LE(0, 36);
    central.writeUInt32LE(0, 38);
    central.writeUInt32LE(offset, 42);
    centralParts.push(central, name);

    offset += local.length + name.length + data.length;
  }

  const centralSize = centralParts.reduce((sum, part) => sum + part.length, 0);
  const end = Buffer.alloc(22);
  end.writeUInt32LE(0x06054b50, 0);
  end.writeUInt16LE(0, 4);
  end.writeUInt16LE(0, 6);
  end.writeUInt16LE(imageFiles.length, 8);
  end.writeUInt16LE(imageFiles.length, 10);
  end.writeUInt32LE(centralSize, 12);
  end.writeUInt32LE(offset, 16);
  end.writeUInt16LE(0, 20);

  await fs.writeFile(zipPath, Buffer.concat([...localParts, ...centralParts, end]));
}

function esc(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

const imageItems = files.map((file, index) => {
  const label = `cut-${String(index + 1).padStart(2, "0")}`;
  const rel = path.relative(path.dirname(absOutputHtml), path.join(absImageDir, file));
  const src = rel.startsWith(".") ? rel : `./${rel}`;
  return { label, file, src };
});

await fs.mkdir(path.dirname(absOutputHtml), { recursive: true });
const imageDirName = path.basename(absImageDir);
const packageName = imageDirName.toLowerCase() === "images"
  ? path.basename(path.dirname(absImageDir))
  : imageDirName;
const zipFilename = `${packageName}-images.zip`;
const absZipPath = path.join(path.dirname(absOutputHtml), zipFilename);
await writeZip(absImageDir, files, absZipPath);

const html = `<!doctype html>
<html lang="ko">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>상세페이지 이미지 리뷰</title>
  <style>
    :root { color-scheme: light; --ink:#171717; --muted:#6b7280; --line:#e5e7eb; --bg:#f8fafc; }
    body { margin:0; font-family:-apple-system,BlinkMacSystemFont,"Apple SD Gothic Neo","Pretendard",sans-serif; background:var(--bg); color:var(--ink); }
    header { position:sticky; top:0; z-index:2; background:rgba(255,255,255,.94); border-bottom:1px solid var(--line); padding:16px 20px; backdrop-filter:blur(12px); }
    h1 { margin:0 0 8px; font-size:20px; }
    .actions { display:flex; gap:8px; flex-wrap:wrap; }
    a.download-all, a.download { border:1px solid #111827; background:#111827; color:#fff; border-radius:8px; padding:9px 12px; font-size:14px; text-decoration:none; cursor:pointer; }
    a.download { background:#fff; color:#111827; }
    main { max-width:980px; margin:0 auto; padding:24px 14px 72px; }
    article { background:#fff; border:1px solid var(--line); border-radius:10px; margin:0 0 22px; overflow:hidden; box-shadow:0 10px 26px rgba(15,23,42,.05); }
    .meta { display:flex; justify-content:space-between; gap:12px; align-items:center; padding:14px 16px; border-bottom:1px solid var(--line); }
    h2 { margin:0; font-size:16px; }
    .qa { color:var(--muted); font-size:13px; }
    img { display:block; width:100%; height:auto; background:#fff; }
    .links { padding:12px 16px; border-top:1px solid var(--line); }
  </style>
</head>
<body>
  <header>
    <h1>상세페이지 이미지 리뷰</h1>
    <div class="actions">
      <a class="download-all" href="./${esc(zipFilename)}" download>전체 다운로드 (ZIP)</a>
      <span class="qa">총 ${imageItems.length}개 컷</span>
    </div>
  </header>
  <main>
    ${imageItems.map((item) => `
      <article>
        <div class="meta">
          <h2>${esc(item.label)}</h2>
          <span class="qa">QA: 확인 필요</span>
        </div>
        <img src="${esc(item.src)}" alt="${esc(item.label)}" />
        <div class="links">
          <a class="download" href="${esc(item.src)}" download="${esc(item.label)}-${esc(item.file)}">이 컷 다운로드</a>
        </div>
      </article>
    `).join("")}
  </main>
</body>
</html>
`;

await fs.writeFile(absOutputHtml, html, "utf8");
console.log(absOutputHtml);
console.log(absZipPath);
