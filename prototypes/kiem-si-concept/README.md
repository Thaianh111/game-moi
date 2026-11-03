<!-- PROTOTYPE - NOT FOR PRODUCTION -->
<!-- Question: Chạy, đạp tường, combo 3 nhát + 4 màn quái + boss Ma Nhãn + chọn skill trên điện thoại có "đã tay" không? -->
<!-- Date: 2026-11-03 -->

# Kiếm Sĩ Bất Tận: bản thử

**Trạng thái:** đang thử (chưa chơi thử, chưa có kết luận)

Bản thử dùng một lần rồi bỏ. Không đem code này vào game thật: nếu kết luận là
PROCEED thì viết lại từ đầu.

Bản thử đã đi qua bước 1 đến 4 trong mục "Thứ tự làm" của `game-brief.md`: di chuyển và
combo, quái và đợt, boss Ma Nhãn đổi địa hình, chọn skill.

## Giả thuyết

> Nếu người chơi chạy, đạp tường và tung combo bằng nút cảm ứng để đánh qua 4 màn quái
> và 1 boss, họ sẽ thấy "đã tay" và muốn chơi lại. Đo bằng: người chơi tự đánh tới
> **màn boss trong lần chơi đầu**, không phải hỏi cách bấm, và **bấm "Chơi lại"** sau khi
> thắng hoặc thua.

**Giả định rủi ro nhất:** nút cảm ứng (không phải bàn phím) có đủ chính xác để vừa né quái,
vừa bám/đạp tường, vừa ra combo hay không.

## Cách chạy

- **Bản một file (khuyên dùng):** chạy `python3 build-standalone.py` để gói `prototype.html` + `sprites/`
  thành `kiem-si-bat-tan.html` (~900 KB, ảnh nhúng sẵn). Mở bằng cách bấm đúp, gửi qua điện thoại được.
  File này không commit (đã có trong `.gitignore`), cứ build lại khi cần.
- Mở thẳng `prototype.html` bằng `file://` vẫn chơi được, nhưng trình duyệt không cho đọc điểm ảnh của
  ảnh rời nên **không có hiệu ứng kiếm nguyên tố**. Bản một file và link claude.ai thì có.
- Trên điện thoại: cầm ngang, bấm ⛶ để vào toàn màn hình (nếu trình duyệt cho phép).

### Điều khiển

| Việc | Cảm ứng | Bàn phím |
|---|---|---|
| Chạy | nửa trái màn hình, ◀ ▶ (trượt ngón qua lại được) | ← → hoặc A D |
| Nhảy (nhả sớm = nhảy thấp) | Nhảy | Space, Z, K, ↑, W |
| Chém (bấm liên tục = 3 nhát) | Chém | X, J |
| Lướt | Lướt | C, L, Shift |
| Bám tường | đang rơi, giữ hướng vào tường | |
| Đạp tường | nhảy khi đang ở sát tường trên không | |
| Lướt-nhảy | nhảy trong lúc lướt (bay xa hơn) | |

Ngón bấm có thể lăn từ Nhảy sang Chém mà không cần nhấc tay.

⚙ mở bảng chỉnh thông số (tốc độ chạy, lực nhảy, trọng lực, trượt tường, đạp tường,
lướt, tốc độ chém, khựng hình, tốc độ quái, sát thương quái, cỡ nút). Giá trị được nhớ
trong trình duyệt. Kéo "Sát thương quái" về 0 là bất tử để thử.

## Vòng chơi

1. **Chọn 1 trong 3 kỹ năng** lúc bắt đầu. Thanh kiếm và vệt chém đổi màu theo kỹ năng:
   - 🔥 Hỏa Kiếm: chém làm quái bị bỏng, mất máu thêm trong 2 giây.
     Kiếm cháy rực: lưỡi cam vàng, quầng lửa chập chờn, lưỡi lửa ôm thân kiếm và tàn lửa bay lên, vệt chém thành vòng lửa.
   - ⚡ Lôi Kiếm: mỗi lần chém trúng, sét giật lan sang 3 con quái gần đó.
     Kiếm điện: lưỡi xanh trắng, quầng xanh lóe sáng, tia điện chạy quanh lưỡi kiếm (chém thì nhiều tia hơn), vệt chém xanh điện.
   - 🌙 Kiếm Khí: mỗi nhát chém bắn ra một luồng kiếm bay xa, xuyên qua quái. Kiếm phát sáng xanh ngọc nhẹ.
2. **Màn 1–4: diệt quái.** Quái bò đất vào từ cổng ở chân hai bức tường, quái bay vào từ hai mép trên.
   Mỗi màn quái đông hơn, nhanh hơn, trâu hơn. Qua màn thì hồi 25 máu.

   | Màn | Quái bò | Quái bay | Tốc độ | Tối đa cùng lúc |
   |---|---|---|---|---|
   | 1 | 5 | 0 | x1.0 | 3 |
   | 2 | 6 | 2 | x1.1 | 4 |
   | 3 | 7 | 4 | x1.2 | 5 |
   | 4 | 8 | 6 | x1.35 | 6 |

3. **Màn 5: boss Ma Nhãn.** Bảng **WARNING** đỏ có sọc cảnh báo chạy ngang màn hình, rồi boss
   từ trên cao rơi xuống, đáp đất nổ tung (cột lửa, mảnh vỡ, nổ dây chuyền khắp đấu trường),
   tên boss hiện lên và thanh máu boss đầy dần. Boss bay lượn, gồng mắt rồi bắn chùm cầu năng lượng
   (chém vỡ được). Thỉnh thoảng boss biến mất, **xếp lại các bục nhảy**, rồi hiện ra chỗ khác.
   Máu boss càng thấp thì càng hay dịch chuyển (9 giây xuống 3,5 giây) và bắn dày hơn (3 viên thành 5 viên).
4. Hết máu thì thua. Thắng hay thua đều hiện điểm, số quái, thời gian, **kỷ lục** (lưu trong trình duyệt) và nút **Chơi lại**.

Điểm: hạ quái 100–120, boss 5000, mỗi lần chém trúng 5. Tất cả nhân với bộ đếm combo
(x2 từ 10 hit, x3 từ 25 hit). Bị trúng đòn thì mất combo.

## Trong bản thử

- Đấu trường một màn hình. Hai bức tường giữ phần trên để bám/đạp tường; chân tường là cổng tối
  cho quái ra vào (người chơi không đi ra được). 4 bục boss xếp lại được + 1 bục di chuyển.
- Chạy, nhảy, lướt, lướt-nhảy, trượt tường, đạp tường (leo một bức tường được).
- Combo đất 3 nhát: chém → chém chéo hất lên → đánh văng. Chém trên không 3 nhát (nhát 3 bổ xuống).
- Khựng hình, rung màn hình, chớp trắng và đẩy lùi khi bị trúng đòn, chết dùng animation Death.
- **Số sát thương kiểu MapleStory M:** mỗi đòn bật một cột số thẳng hàng (nhát 1: 2 dòng, nhát 2: 3 dòng,
  nhát 3: 4 dòng), các dòng hiện lần lượt từ dưới lên. Đòn mới nằm sát đầu quái và đẩy cột cũ lên rồi mờ đi.
  Cột của quái đứng cạnh nhau tự dạt ngang. Màu theo loại: cam (thường), hồng + CRIT (chí mạng),
  đỏ cam (bỏng), xanh dương (sét), xanh ngọc (kiếm khí), tím (người chơi mất máu), xanh lá (hồi máu).

**Đã cắt:** âm thanh, nhạc, Màn Né Tránh, skill ẩn, 3 boss còn lại, chọn skill sau boss.

## Ghi chú kỹ thuật

- Một file HTML + canvas 2D, không thư viện. Vật lý bước cố định 1/120 giây.
- Thế giới cao 360 đơn vị, rộng 560–860 theo tỉ lệ màn hình.
- Các khung chém lấy từ dải sprite: vệt kiếm của AttackSwing1 ở khung 12–18, AttackSwing2 ở 9–13, AttackSwing3 ở 14–21.
  Các nhát bỏ bớt khung lấy đà đầu để bấm là ra đòn ngay (~0,13 giây).
- Animation còn thiếu được bù bằng code như brief: trượt tường giữ khung 0 của WallJump, chém trên không dùng lại AttackSwing1.
- Quái và boss vẽ bằng hình khối trên canvas (chưa có sprite).
- **Tách lưỡi kiếm:** lưỡi kiếm và da tay/mặt cùng màu trắng, nên lúc tải game em lọc điểm ảnh trắng,
  co 3x3: lưỡi kiếm mảnh bị bào mất, da dày còn lại. Mảng còn lại nhỏ (< 150 điểm) là da, nở lại 2 điểm
  rồi loại ra; mảng rất lớn là vệt chém nên vẫn tính là kiếm. Sau đó tô màu theo bảng `PAL`, làm quầng sáng
  (làm mờ hộp 2 lần, tính riêng từng khung) và lưu sẵn các điểm trên lưỡi kiếm của từng khung để toé lửa / phóng điện.
  Mất khoảng 0,2 giây lúc tải và 0,2 giây lúc chọn kỹ năng (đo trên máy tính).

## Hình

Nhân vật: bộ "2D Sword Character PC" của EBros Entertainment (`sprites/`). Anh Thái Anh đã
đồng ý đưa lên repo. **Cần kiểm tra lại giấy phép trước khi phát hành.**

Ảnh chụp: `screenshot.png` (số sát thương), `screenshot-warning.png` (bảng WARNING), `screenshot-boss.png` (đánh boss).

## Kết luận

_(Điền sau khi chơi thử.)_
