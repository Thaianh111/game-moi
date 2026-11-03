# KIẾM SĨ BẤT TẬN: Game Brief

Tác giả: Võ Thái Anh · Phiên bản brief: 03/11/2026

## Giới thiệu
Một kiếm sĩ, một đấu trường, quái tràn vào không ngừng. Anh trụ được bao lâu?

## Thể loại & nền tảng
- Game hành động 2D nhìn ngang, có chạy nhảy (platformer), sống sót vô tận
- Game HTML chạy trên điện thoại (cầm ngang), điều khiển bằng nút cảm ứng
- Đấu trường cố định trong 1 màn hình, có vài bục nhảy và 2 bức tường hai bên

## Vòng chơi chính
Chạy nhảy né quái → tung combo chém hạ quái lấy điểm → qua đợt → cứ 5 đợt ra boss, hạ boss thì chọn skill → đợt sau quái đông hơn

## Mục tiêu / thua
- Mục tiêu: kiếm điểm cao nhất (lưu kỷ lục)
- Thua: hết máu

## Di chuyển (cảm giác giống Mega Man X)
- Chạy, nhảy, lướt (dùng animation Slide)
- Bám tường: trượt dọc tường, đạp tường nhảy lên, đứng được trên bục đang di chuyển

## Combo (kiểu God of War)
- Bấm chém liên tục: chuỗi 3 nhát, chém → chém chéo → bổ xuống (AttackSwing1 → 2 → 3)
- Nhảy lên rồi chém: đánh trên không. Quái bị hất lên thì đánh tiếp được.
- Bộ đếm combo: đánh liên tục thì điểm được nhân lên (x2 từ 10 hit, x3 từ 25 hit). Bị trúng đòn thì mất combo.
- Khựng hình (hit-stop) và rung màn hình khi trúng đòn

## Số sát thương (kiểu MapleStory M)
- Mỗi đòn bật nhiều số chồng lên nhau, nảy lên rồi mờ dần
- Chí mạng: chữ CRIT to, có rung màn hình

## Đợt quái
- Mỗi đợt quái đông hơn và nhanh hơn
- Hai loại quái: bò dưới đất, bay trên trời
- **Boss mỗi 5 đợt.** Boss đổi địa hình đấu trường theo thời gian, máu boss càng thấp thì đổi càng nhanh (ý tưởng từ Optic Sunflower trong Mega Man X8)
  - Ma Nhãn: dịch chuyển, mỗi lần biến mất thì xếp lại bục nhảy (làm trước)
  - Thụ Yêu: rễ cây trồi lên tụt xuống, bục đổi chỗ
  - Hỏa Long: sàn hóa dung nham, chỉ đứng được trên bục cao
  - Băng Hậu: sàn trơn, cột băng mọc lên làm bục mới
- **Màn Né Tránh (ngẫu nhiên):** không chém được, chỉ chạy nhảy né quái. Trụ 1 phút thì nhận 1 skill ẩn.

## Kho skill sau boss (12 skill, chọn 1 trong 3, không trùng)
Đã lấy thì bỏ khỏi kho. Hết kho (đợt 60) thì boss thưởng nâng cấp skill đang có.
1. Hỏa Kiếm: chém làm quái bị bỏng
2. Băng Kiếm: chém làm quái chậm lại
3. Lôi Kiếm: sét giật lan sang 3 con gần đó
4. Kiếm Khí: mỗi nhát chém bắn ra luồng kiếm bay xa
5. Song Trảm: mỗi lần chém ra 2 nhát
6. Toàn Phong Trảm: chém trên không thì xoay một vòng quanh người
7. Lướt Trảm: lướt chém xuyên qua hàng quái
8. Địa Chấn: từ trên cao đập xuống tạo sóng chấn
9. Thiên Lôi: cứ 10 giây sét tự đánh một con quái
10. Thiên Thạch: hạ 20 quái thì thiên thạch rơi xuống
11. Gai Đất: quái chết thì đất mọc gai đâm con bên cạnh
12. Khiên Thánh: cứ 15 giây tự chặn 1 đòn

## Kho skill ẩn (6 skill, chỉ có ở Màn Né Tránh)
1. Hồi Sinh: hết máu thì sống lại 1 lần
2. Hút Hồn: chém trúng thì hồi máu
3. Ngưng Thời: dừng toàn bộ quái 5 giây, mỗi đợt dùng 1 lần
4. Hố Đen: hút quái gom về một chỗ
5. Thuấn Di: chạm đôi để dịch chuyển né đòn
6. Cuồng Nộ: còn dưới 30% máu thì đánh mạnh gấp đôi

## Bản đầu tiên (MVP, 7 món)
1. Chạy, nhảy, lướt, bám tường, combo 3 nhát, chém trên không, có nút cảm ứng
2. Hai loại quái: bò đất, bay
3. Đợt quái tăng dần
4. Đợt đặc biệt: boss Ma Nhãn mỗi 5 đợt (có đổi địa hình), Màn Né Tránh ngẫu nhiên
5. Chọn skill: 4 skill boss (Hỏa Kiếm, Lôi Kiếm, Kiếm Khí, Khiên Thánh) và 2 skill ẩn (Hồi Sinh, Hút Hồn)
6. Máu, điểm, bộ đếm combo, màn hình thua có lưu kỷ lục
7. Hiệu ứng trúng đòn, số sát thương, CRIT, combo

## Để sau
8 skill boss và 4 skill ẩn còn lại, đòn nặng (giữ nút), nâng cấp skill, 3 boss còn lại, nhiều màn chơi, cửa hàng, cốt truyện, bảng xếp hạng online

## Thứ tự làm
1. Prototype: di chuyển, bám tường, combo 3 nhát trên điện thoại cho đã tay (phần khó nhất)
2. Quái và đợt
3. Boss Ma Nhãn đổi địa hình
4. Chọn skill
5. Màn Né Tránh
6. Hiệu ứng, âm thanh

## Hình & tiếng
- Nhân vật chính: bộ "2D Sword Character PC" của EBros Entertainment, kiếm sĩ áo đỏ (thư mục này). Kiểm tra lại giấy phép của bộ này trước khi phát hành.
- Hình nhân vật nét mịn, không phải pixel art, nên hiệu ứng làm nét mịn cho hợp (hoặc chuyển cả game sang phong cách bóng đen đỏ)
- Nhạc: dồn dập, chiptune hoặc nhạc trống

## Tham khảo
God of War (combo) · MapleStory M (số sát thương) · Mega Man X8 (bám tường, boss đổi địa hình) · Super Crate Box (đấu trường cố định)

---

## Sprite trong thư mục này
- Mỗi file là một dải khung ngang, mỗi khung **128×128** (thu nhỏ 50% từ bản gốc 256×256)
- Điểm chân nhân vật (pivot) nằm ở khoảng **(64, 100)** trong mỗi khung
- `anims.json` ghi số khung, fps gợi ý và có lặp lại hay không
- Thiếu animation (bù bằng code):
  - Trượt tường: giữ khung đầu của `walljump.png`
  - Chém trên không: dùng lại `attackswing1.png`
  - Bị trúng đòn: chớp trắng và đẩy lùi

## Skill nên dùng trong Claude Code
- Claude Code Game Studios: /start, /prototype, /dev-story
- Skill game-prototype: làm bản thử trước, chấm PROCEED / PIVOT / KILL
- Bộ awesome-gamedev-agent-skills: phaser-core, phaser-arcade-physics, platformer, game-feel
- pixelfx: ui/damage-number, ui/crit-number, ui/combo-counter, impacts/impact-frame (hiệu ứng pixel, chỉnh cho hợp nét vẽ)
