# PROTOTYPE - NOT FOR PRODUCTION
# Question: 20 màn, 4 nhân vật, kỹ năng hợp kích kiểu MOBA trên điện thoại có "đã tay" không?
# Date: 2026-11-03
"""Chuẩn bị hình cho đợt 2 (nhân vật chọn được, quái người, rồng chúa, icon kỹ năng).

Nguồn (giải nén sẵn vào một thư mục):
- craftpix "Free Shinobi Sprites Pixel Art": Samurai, Shinobi, Fighter (khung 128x128)
    -> sprites/chars/<nv>-<hoạt ảnh>.png             (nhân vật chơi được)
    -> sprites/enemy/ninja-*.png, ronin-*.png         (bản tối màu làm quái: Nhẫn Giả Bóng, Lãng Khách)
- "Dragon Lord Basic": rồng chúa pixel
    -> sprites/dlord/*.png, sprites/dlord/dark-*.png  (Long Vương + bản tím đen cho boss cuối)
- "Free 50 Aeromancer Skills": 50 icon kỹ năng vẽ tay 512x512
    -> sprites/icons/<kỹ năng>.webp (96x96, tô màu lại theo từng kỹ năng)

Gói "MegaMan_Sprite_Assets" KHÔNG dùng: đó là nhân vật Zero của Mega Man X (Capcom).

Cách dùng:  python3 prepare-assets-2.py <thư_mục_đã_giải_nén>
"""
import colorsys
import pathlib
import shutil
import sys

from PIL import Image

HERE = pathlib.Path(__file__).resolve().parent
SPR = HERE / "sprites"

CHAR_ANIMS = ["Idle", "Run", "Jump", "Attack_1", "Attack_2", "Attack_3", "Shield", "Hurt", "Dead"]
# Icon Aeromancer (số file) + màu tô: (tối, giữa, sáng)
ICONS = {
    # 24 kỹ năng, mỗi cái một icon gốc khác nhau (số = file PNG/<n>.png của gói Aeromancer), tô theo màu kỹ năng
    "fire": (26, "#3a0800", "#ff6a1a", "#fff1c0"),
    "bolt": (46, "#1a0a40", "#9a6bff", "#fff6b0"),
    "ice": (47, "#02142a", "#4fc8ff", "#f2fdff"),
    "wave": (8, "#02201c", "#2fcfae", "#eafff8"),
    "poison": (37, "#0c1a02", "#7ad62a", "#f0ffd0"),
    "light": (13, "#2a1a00", "#ffc93a", "#fffbe8"),
    "blood": (29, "#2a0004", "#e0202e", "#ffd8d8"),
    "shadow": (17, "#0c0420", "#7a3cff", "#efe6ff"),
    "shield": (31, "#2a1800", "#e0a62a", "#fff6d0"),
    "heal": (49, "#021e1a", "#3ad6b8", "#e8fff8"),
    "time": (30, "#241600", "#e0a840", "#fff4d0"),
    "whirl": (10, "#0a1830", "#7fb8ff", "#ffffff"),
    "boomer": (36, "#021a24", "#5ac8e8", "#eafcff"),
    "hole": (50, "#0a0018", "#9a4aff", "#f0e0ff"),
    "twin": (28, "#300a20", "#ff6ab8", "#ffe8f6"),
    "knife": (23, "#14161c", "#a8b0c8", "#ffffff"),
    "orb": (21, "#0a1030", "#6a8aff", "#eef2ff"),
    "hawk": (41, "#241a08", "#d8b060", "#fff8e8"),
    "clone": (7, "#100828", "#6a5aff", "#e8e4ff"),
    "meteor": (27, "#300800", "#ff4a1a", "#ffe0a0"),
    "mine": (33, "#241a00", "#e0b030", "#fff4c8"),
    "quake": (43, "#1c0e04", "#c0803a", "#ffe8c8"),
    "spike": (3, "#0a1c04", "#7ad13a", "#f0ffd8"),
    "launch": (42, "#02182a", "#5ad0ff", "#f0fcff"),
    "water": (24, "#021430", "#2a8aff", "#eaf6ff"),
    "wood": (25, "#041a06", "#3fb04a", "#eaffe0"),
    "earth": (32, "#1a1006", "#a87838", "#fff0d8"),
    "metal": (16, "#241a02", "#d8b040", "#fffbe8"),
    # hợp kích; fu-pair để xám, game nhuộm 2 màu nguyên tố lúc vẽ
    "fu-tri": (38, "#200820", "#ff7ab0", "#fff4c0"),
    "fu-pair": (45, "#1a1a1a", "#9a9a9a", "#ffffff"),
    "fu-tornado": (19, "#08142a", "#7fb8ff", "#ffffff"),
    "fu-crescent": (15, "#200a00", "#ffb35c", "#ffffff"),
    "fu-rain": (9, "#141000", "#ffd04a", "#fffbe0"),
    "fu-meteor": (35, "#300800", "#ff4a1a", "#ffe0a0"),
    "fu-quake": (44, "#1c0e04", "#c0803a", "#ffe8c8"),
    "fu-nova": (40, "#2a1800", "#ffd36a", "#ffffff"),
}


def hexrgb(h: str):
    return tuple(int(h[i:i + 2], 16) for i in (1, 3, 5))


def recolor(img: Image.Image, hue: float, sat: float, val: float) -> Image.Image:
    """Đổi cả hình sang một sắc độ (giữ độ sáng tương đối) để làm bản quái tối màu."""
    out = img.convert("RGBA").copy()
    px = out.load()
    for y in range(out.height):
        for x in range(out.width):
            r, g, b, a = px[x, y]
            if a == 0:
                continue
            h, s, v = colorsys.rgb_to_hsv(r / 255, g / 255, b / 255)
            nr, ng, nb = colorsys.hsv_to_rgb(hue / 360, min(1, s * 0.4 + sat), v * val)
            px[x, y] = (round(nr * 255), round(ng * 255), round(nb * 255), a)
    return out


def gradient_map(img: Image.Image, dark, mid, light) -> Image.Image:
    """Tô icon theo độ sáng: tối -> màu giữa -> sáng."""
    d, m, l = hexrgb(dark), hexrgb(mid), hexrgb(light)
    g = img.convert("RGBA")
    px = g.load()
    for y in range(g.height):
        for x in range(g.width):
            r, gg, b, a = px[x, y]
            t = (0.299 * r + 0.587 * gg + 0.114 * b) / 255
            c = [d[i] + (m[i] - d[i]) * t / 0.55 for i in range(3)] if t < 0.55 else [m[i] + (l[i] - m[i]) * (t - 0.55) / 0.45 for i in range(3)]
            px[x, y] = (round(c[0]), round(c[1]), round(c[2]), a)
    return g


def main() -> None:
    if len(sys.argv) < 2:
        sys.exit(__doc__)
    src = pathlib.Path(sys.argv[1])
    for sub in ("chars", "enemy", "dlord", "icons"):
        (SPR / sub).mkdir(parents=True, exist_ok=True)

    # --- 3 nhân vật chơi được ---
    shinobi_root = next(p for p in src.rglob("Samurai") if p.is_dir()).parent
    for ch, key in (("Samurai", "samurai"), ("Shinobi", "shinobi"), ("Fighter", "fighter")):
        for a in CHAR_ANIMS:
            shutil.copyfile(shinobi_root / ch / f"{a}.png", SPR / "chars" / f"{key}-{a.lower().replace('_', '')}.png")
    lic = next(src.rglob("Licens.txt"), None)
    if lic:
        shutil.copyfile(lic, SPR / "chars" / "License-craftpix.txt")

    # --- quái người: bản tối màu ---
    for a in ("Idle", "Run", "Jump", "Attack_1", "Attack_2", "Hurt"):
        recolor(Image.open(shinobi_root / "Shinobi" / f"{a}.png"), 268, 0.45, 0.62).save(SPR / "enemy" / f"ninja-{a.lower().replace('_', '')}.png")
    for a in ("Idle", "Run", "Attack_1", "Attack_2", "Shield", "Hurt"):
        recolor(Image.open(shinobi_root / "Samurai" / f"{a}.png"), 352, 0.55, 0.7).save(SPR / "enemy" / f"ronin-{a.lower().replace('_', '')}.png")

    # --- rồng chúa (thường + bản tím đen) ---
    for f in sorted(src.rglob("Spritesheets/dragon_lord_*_*x*.png")):   # bỏ qua ảnh chân dung
        name = f.name.replace("dragon_lord_", "").split("_")[0]   # idle, walk, attack, hurt, death
        shutil.copyfile(f, SPR / "dlord" / f"{name}.png")
        recolor(Image.open(f), 278, 0.55, 0.78).save(SPR / "dlord" / f"dark-{name}.png")

    # --- icon kỹ năng ---
    icon_dir = next(p for p in src.rglob("PNG") if p.is_dir() and (p / "1.png").exists())
    for key, (n, dark, mid, light) in ICONS.items():
        im = Image.open(icon_dir / f"{n}.png").convert("RGBA").resize((96, 96), Image.LANCZOS)
        gradient_map(im, dark, mid, light).save(SPR / "icons" / f"{key}.webp", "WEBP", quality=85, method=6)
    lic = next(src.rglob("license.txt"), None)
    if lic:
        shutil.copyfile(lic, SPR / "icons" / "License-aeromancer.txt")

    total = sum(f.stat().st_size for sub in ("chars", "enemy", "dlord", "icons") for f in (SPR / sub).iterdir())
    print(f"Đã ghi sprites/chars, enemy, dlord, icons ({total // 1024} KB)")


if __name__ == "__main__":
    main()
