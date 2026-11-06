// Nướng hiệu ứng pixelfx (https://github.com/patch-gg/pixelfx, MIT) thành sprite sheet cho game.
//
// Cách dùng:  node bake-pfx.mjs [đường_dẫn_pixelfx]   (mặc định ../../../pixelfx hoặc ~/pixelfx)
// Kết quả:   sprites/pfx/<tên>.png  +  khối PFX_META trong prototype.html được ghi lại tự động.
// Muốn thêm / đổi hiệu ứng: sửa bảng LIST bên dưới rồi chạy lại, sau đó build-standalone.py + build-pwa.py.
import { execFileSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";

const HERE = path.dirname(fileURLToPath(import.meta.url));
const cands = [process.argv[2], path.join(HERE, "../../../pixelfx"), path.join(os.homedir(), "pixelfx"), "/home/claude/pixelfx"].filter(Boolean);
const PFX = cands.find(p => fs.existsSync(path.join(p, "tools/render.mjs")));
if (!PFX) { console.error("Không thấy pixelfx. Chạy: git clone https://github.com/patch-gg/pixelfx"); process.exit(1); }
const { PAL } = await import(path.join(PFX, "src/core/color.js"));

const TEAL = ["#06201c", "#0c3e36", "#14665a", "#22947e", "#3ec4a4", "#7fffe0", "#d0fff4", "#ffffff"];
// màu theo nguyên tố của kiếm (khóa = khóa kỹ năng trong SKILLS)
const EL = { fire: PAL.fire, bolt: PAL.electric, ice: PAL.ice, wave: TEAL, poison: PAL.poison, light: PAL.holy, blood: PAL.blood,
  shadow: PAL.arcane, water: PAL.water, wood: PAL.leaf, earth: PAL.earth, metal: PAL.gold };

// tên: [hiệu ứng pixelfx, fps nướng, tùy chọn]
const LIST = {
  // trúng đòn / chí mạng
  hit: ["impacts/hit-spark", 24],
  crit: ["impacts/crit-hit", 24],
  hurt: ["impacts/blunt-hit", 20, { palette: PAL.blood.concat("#ffffff") }],
  block: ["impacts/shield-block", 20],
  parry: ["impacts/parry", 20],
  frame: ["impacts/impact-frame", 20],
  land: ["impacts/heavy-landing", 16],
  // quái chết
  kill: ["spawn/poof", 16],
  elite: ["spawn/soul-rise", 12, { palette: PAL.gold }],
  bomb: ["explosions/dirt-explosion", 12],
  bossdie: ["explosions/big-explosion", 10],
  win: ["explosions/firework-burst", 12],
  // chiêu, hợp kích, hồi máu, nhặt đồ
  fusion: ["arcane/mana-burst", 16, { palette: PAL.gold }],
  tri: ["explosions/plasma-explosion", 16],
  cast: ["arcane/mana-burst", 16],
  heal: ["holy/heal", 14],
  level: ["ui/level-up", 14],
  coin: ["pickups/collect-burst", 16, { palette: PAL.gold }],
  item: ["pickups/collect-burst", 16, { palette: PAL.arcane }],
  loop: ["arcane/magic-circle-cast", 12],
  // chiêu nguyên tố (tung chiêu kiếm nguyên tố) + phản ứng
  c_fire: ["fire/fire-ring", 12],
  c_bolt: ["lightning/thunderclap", 14],
  c_ice: ["ice/snowflake-burst", 14],
  c_wave: ["arcane/mana-burst", 16, { palette: TEAL }],
  c_poison: ["nature/acid-splash", 14],
  c_light: ["holy/smite", 14],
  c_blood: ["arcane/mana-burst", 16, { palette: PAL.blood.concat("#ffffff") }],
  c_shadow: ["shadow/curse", 12],
  c_water: ["water/splash", 14],
  c_wood: ["nature/healing-bloom", 12],
  c_earth: ["nature/quake", 14],
  c_metal: ["melee/spin-slash", 20, { palette: PAL.gold }],
  r_shock: ["lightning/zap-hit", 20],
  r_freeze: ["ice/ice-shatter", 14],
  r_toxic: ["nature/spore-burst", 14],
};
// tia chém trúng theo màu nguyên tố
for (const k in EL) LIST["hit_" + k] = ["impacts/hit-spark", 24, { palette: EL[k] }];

const OUT = path.join(HERE, "sprites/pfx"), TMP = fs.mkdtempSync(path.join(os.tmpdir(), "pfx-"));
fs.mkdirSync(OUT, { recursive: true });
const meta = {};
for (const [name, [id, fps, opts]] of Object.entries(LIST)) {
  const dir = path.join(TMP, name);
  const args = [path.join(PFX, "tools/render.mjs"), id, "--sheet", "--no-actor", "--fps", String(fps), "--out", dir];
  if (opts) args.push("--opts", JSON.stringify(opts));
  execFileSync("node", args, { cwd: PFX, stdio: "pipe" });
  const base = id.split("/")[1], walk = d => fs.readdirSync(d, { withFileTypes: true }).flatMap(e => e.isDirectory() ? walk(path.join(d, e.name)) : [path.join(d, e.name)]);
  const files = walk(dir), png = files.find(f => f.endsWith(base + ".png")), js = files.find(f => f.endsWith(base + ".json"));
  const m = JSON.parse(fs.readFileSync(js, "utf8")).meta.pixelfx;
  fs.copyFileSync(png, path.join(OUT, name + ".png"));
  // w, h: cỡ khung; n: số khung; c: số cột; f: fps; px, py: gốc hiệu ứng (vd chân) trong khung; d: quay phải (đảo được)
  meta[name] = { w: m.frameSize[0], h: m.frameSize[1], n: m.frames, c: m.columns, f: m.fps, px: m.pivot[0], py: m.pivot[1] };
  console.log(name.padEnd(10), id.padEnd(28), `${m.frames} khung`, `${Math.round(fs.statSync(png).size / 1024)} KB`);
}
fs.rmSync(TMP, { recursive: true, force: true });
// nén: đổi sang PNG bảng 256 màu (giữ trong suốt), nhẹ đi ~6 lần, chơi trên điện thoại tải nhanh hơn
execFileSync("python3", ["-c", `
import glob, sys
from PIL import Image
for f in glob.glob(sys.argv[1] + '/*.png'):
    Image.open(f).convert('RGBA').quantize(256, method=Image.Quantize.FASTOCTREE).save(f, 'PNG', optimize=True)
`, OUT], { stdio: "inherit" });

const html = path.join(HERE, "prototype.html"), src = fs.readFileSync(html, "utf8");
const A = "// PFX_META_BEGIN", B = "// PFX_META_END";
if (!src.includes(A)) { console.error("prototype.html chưa có khối " + A); process.exit(1); }
const block = A + " (tạo bởi bake-pfx.mjs, đừng sửa tay)\nconst PFX_META = " + JSON.stringify(meta) + ";\n";
fs.writeFileSync(html, src.slice(0, src.indexOf(A)) + block + src.slice(src.indexOf(B)));
console.log(`Đã nướng ${Object.keys(meta).length} hiệu ứng vào sprites/pfx/`);
