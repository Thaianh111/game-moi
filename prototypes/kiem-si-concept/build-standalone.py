# PROTOTYPE - NOT FOR PRODUCTION
# Question: Chạy, đạp tường, combo 3 nhát + 4 màn quái + boss Ma Nhãn + chọn skill trên điện thoại có "đã tay" không?
# Date: 2026-11-03
"""Gói prototype.html + sprites/*.png thành MỘT file HTML (ảnh nhúng base64).

Bản một-file mở thẳng bằng cách bấm đúp, gửi qua Zalo/Drive được, và trình duyệt
cho đọc điểm ảnh nên có hiệu ứng kiếm nguyên tố (bản ảnh rời mở bằng file:// thì không).

Cách dùng:  python3 build-standalone.py [đường_dẫn_ra.html]
"""
import base64
import json
import pathlib
import sys

HERE = pathlib.Path(__file__).resolve().parent
MARK = "<script>\n// PROTOTYPE - NOT FOR PRODUCTION"


def main() -> None:
    out = pathlib.Path(sys.argv[1]) if len(sys.argv) > 1 else HERE / "kiem-si-bat-tan.html"
    html = (HERE / "prototype.html").read_text(encoding="utf-8")
    if MARK not in html:
        sys.exit("Không tìm thấy chỗ chèn ảnh trong prototype.html")
    data = {
        p.name: "data:image/png;base64," + base64.b64encode(p.read_bytes()).decode("ascii")
        for p in sorted((HERE / "sprites").glob("*.png"))
    }
    inject = "<script>window.SPRITE_DATA = " + json.dumps(data) + ";</script>\n"
    out.write_text(html.replace(MARK, inject + MARK, 1), encoding="utf-8")
    print(f"Đã ghi {out} ({out.stat().st_size // 1024} KB, {len(data)} ảnh)")


if __name__ == "__main__":
    main()
