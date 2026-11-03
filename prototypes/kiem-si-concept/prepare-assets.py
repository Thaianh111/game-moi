# PROTOTYPE - NOT FOR PRODUCTION
# Question: Chạy, đạp tường, nhảy đôi, combo + 10 màn quái/boss + kỹ năng kiểu MOBA trên điện thoại có "đã tay" không?
# Date: 2026-11-03
"""Chuẩn bị hình quái và boss từ các gói anh Thái Anh tải lên (giải nén sẵn vào một thư mục).

- Quái pixel (Legacy Fantasy - High Forest, Anokolisa): heo rừng, ong, ốc sên -> sprites/forest/*.png
  kèm 2 biến thể đổi màu: ong tím (Ong Chúa Độc) và ốc vỏ xanh (Ốc Độc).
- Boss quái thú phun lửa (x256p_Spritesheets) -> sprites/beast/*.webp (WebP q82, nhẹ hơn PNG ~55%).

Cách dùng:  python3 prepare-assets.py <thư_mục_đã_giải_nén>
"""
import colorsys
import pathlib
import shutil
import sys

from PIL import Image

HERE = pathlib.Path(__file__).resolve().parent


def find(root: pathlib.Path, pattern: str) -> pathlib.Path:
    hits = sorted(root.rglob(pattern))
    if not hits:
        sys.exit(f"Không thấy {pattern} trong {root}")
    return hits[0]


def hue_shift(img: Image.Image, src_hues, new_hue: float, min_sat: float = 0.25) -> Image.Image:
    """Đổi các điểm ảnh có màu (sắc độ nằm trong src_hues) sang sắc độ new_hue, giữ độ sáng."""
    out = img.convert("RGBA").copy()
    px = out.load()
    for y in range(out.height):
        for x in range(out.width):
            r, g, b, a = px[x, y]
            if a == 0:
                continue
            h, s, v = colorsys.rgb_to_hsv(r / 255, g / 255, b / 255)
            deg = h * 360
            if s >= min_sat and any(lo <= deg <= hi for lo, hi in src_hues):
                nr, ng, nb = colorsys.hsv_to_rgb(new_hue / 360, min(1, s * 1.05), v)
                px[x, y] = (round(nr * 255), round(ng * 255), round(nb * 255), a)
    return out


def main() -> None:
    if len(sys.argv) < 2:
        sys.exit(__doc__)
    src = pathlib.Path(sys.argv[1])
    forest = HERE / "sprites" / "forest"
    beast = HERE / "sprites" / "beast"
    forest.mkdir(parents=True, exist_ok=True)
    beast.mkdir(parents=True, exist_ok=True)

    # --- quái pixel ---
    # (tên ra, thư mục con của Mob, tên file) — Hit-Sheet.png có ở cả heo và ong nên phải chỉ rõ thư mục
    copies = [
        ("boar-walk.png", "Boar", "Walk-Base-Sheet.png"), ("boar-run.png", "Boar", "Run-Sheet.png"),
        ("boar-idle.png", "Boar", "Idle-Sheet.png"), ("boar-hit.png", "Boar", "Hit-Sheet.png"),
        ("boarb-run.png", "Boar", "Run-Sheet-Black.png"), ("boarb-hit.png", "Boar", "Hit-Sheet-Black.png"),
        ("bee-fly.png", "Small Bee", "Fly-Sheet.png"), ("bee-attack.png", "Small Bee", "Attack-Sheet.png"),
        ("bee-hit.png", "Small Bee", "Hit-Sheet.png"),
        ("snail-walk.png", "Snail", "walk-Sheet.png"), ("snail-hide.png", "Snail", "Hide-Sheet.png"),
    ]
    for out_name, mob, fname in copies:
        p = next((q for q in sorted(src.rglob(fname)) if f"/Mob/{mob}/" in q.as_posix()), None)
        if p is None:
            sys.exit(f"Không thấy Mob/{mob}/…/{fname} trong {src}")
        shutil.copyfile(p, forest / out_name)
    # Ong Chúa Độc: vàng/cam -> tím hồng. Ốc Độc: vỏ đỏ -> xanh lục.
    for k in ("fly", "attack", "hit"):
        hue_shift(Image.open(forest / f"bee-{k}.png"), [(15, 65)], 300).save(forest / f"beep-{k}.png")
    for k in ("walk", "hide"):
        hue_shift(Image.open(forest / f"snail-{k}.png"), [(0, 14), (340, 360)], 105, 0.35).save(forest / f"snailg-{k}.png")
    terms = find(src, "Terms.txt")
    shutil.copyfile(terms, forest / "Terms-Anokolisa.txt")

    # --- boss quái thú ---
    sheets = {
        "appear": "Appear.png", "idle": "Idle.png", "walk": "Walk.png", "run": "Run.png",
        "attack1": "Attack_01.png", "attack2": "Attack_02.png", "fire": "Attack_03+Fire (double space size).png",
        "jump": "Jump.png", "shout": "Shout.png", "hit": "Hit.png", "death": "Death.png",
    }
    x256 = next(p for p in src.rglob("x256p_Spritesheets") if p.is_dir())
    for out_name, fname in sheets.items():
        Image.open(x256 / fname).save(beast / f"{out_name}.webp", "WEBP", quality=82, method=6)

    total = sum(f.stat().st_size for f in list(forest.iterdir()) + list(beast.iterdir()))
    print(f"Đã ghi {len(list(forest.iterdir()))} file vào sprites/forest, {len(list(beast.iterdir()))} file vào sprites/beast ({total // 1024} KB)")


if __name__ == "__main__":
    main()
