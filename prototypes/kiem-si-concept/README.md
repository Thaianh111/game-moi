<!-- PROTOTYPE - NOT FOR PRODUCTION -->
<!-- Question: Chạy, đạp tường và combo 3 nhát bằng nút cảm ứng trên điện thoại cầm ngang có "đã tay" không? -->
<!-- Date: 2026-11-03 -->

# Kiếm Sĩ Bất Tận: bản thử bước 1 (di chuyển, bám tường, combo 3 nhát)

**Trạng thái:** đang thử (chưa chơi thử, chưa có kết luận)

Bản thử dùng một lần rồi bỏ. Không đem code này vào game thật: nếu kết luận là
PROCEED thì viết lại từ đầu.

## Giả thuyết

> Nếu người chơi chạy, đạp tường và bấm chém trên nút cảm ứng, họ sẽ thấy "đã tay"
> (chuyển động nhanh gọn kiểu Mega Man X, combo có lực). Đo bằng: **trong 2 phút đầu**,
> người chơi **đạp tường liên tiếp ≥ 3 lần** mà không chạm sàn và **ra trọn combo 3 nhát ≥ 5 lần**,
> không phải hỏi cách bấm.

**Giả định rủi ro nhất:** nút cảm ứng (không phải bàn phím) có đủ chính xác cho
bám/đạp tường và combo hay không.

Dòng số đo ở mép trên màn hình tự đếm cả hai chỉ số và đồng hồ.

## Cách chạy

- Mở `prototype.html` bằng trình duyệt, không cần server (thư mục `sprites/` phải nằm cạnh file).
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
lướt, tốc độ chém, khựng hình, cỡ nút). Giá trị được nhớ trong trình duyệt.

## Trong bản thử

- Đấu trường một màn hình, 2 tường, 4 bục cố định, 1 bục di chuyển (đứng lên được, bị chở theo)
- Chạy, nhảy (nhả sớm thì thấp), lướt, lướt-nhảy, trượt tường, đạp tường (leo một bức tường được)
- Combo đất: AttackSwing1 → 2 (hất lên) → 3 (đánh văng). Bấm trước được (đệm lệnh), hủy sang nhảy/lướt sau khi trúng
- Chém trên không: tối đa 3 nhát mỗi lần nhảy, lơ lửng khi chém, nhát 3 là bổ xuống
- 2 bao cát (bị hất lên, nảy tường, tự về chỗ cũ) và 1 quái bay tập (bật lò xo về chỗ cũ)
- Khựng hình, rung màn hình, số sát thương xếp chồng nảy lên, CRIT, bộ đếm combo (điểm x2 từ 10 hit, x3 từ 25 hit)

**Đã cắt:** quái thật, máu, điểm, đợt quái, boss, skill, âm thanh, menu, màn thua.

## Ghi chú kỹ thuật

- Một file HTML + canvas 2D, không thư viện. Vật lý bước cố định 1/120 giây.
- Thế giới cao 360 đơn vị, rộng 560–860 theo tỉ lệ màn hình.
- Các khung chém lấy từ dải sprite: vệt kiếm của AttackSwing1 ở khung 12–18, AttackSwing2 ở 9–13, AttackSwing3 ở 14–21.
  Các nhát bỏ bớt khung lấy đà đầu để bấm là ra đòn ngay (~0,13 giây).
- Animation còn thiếu được bù bằng code như brief: trượt tường giữ khung 0 của WallJump, chém trên không dùng lại AttackSwing1.

## Hình

Nhân vật: bộ "2D Sword Character PC" của EBros Entertainment (`sprites/`). Anh Thái Anh đã
đồng ý đưa lên repo. **Cần kiểm tra lại giấy phép trước khi phát hành.**

## Kết luận

_(Điền sau khi chơi thử.)_
