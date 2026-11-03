<!-- PROTOTYPE - NOT FOR PRODUCTION -->
<!-- Question: Chạy, đạp tường, nhảy đôi, lướt chém, combo + 20 màn quái/boss + kỹ năng và hợp kích kiểu MOBA trên điện thoại có "đã tay" không? -->
<!-- Date: 2026-11-03 -->

# Kiếm Sĩ Bất Tận: bản thử

**Trạng thái:** đang thử (chưa chơi thử, chưa có kết luận)

Bản thử dùng một lần rồi bỏ. Không đem code này vào game thật: nếu kết luận là
PROCEED thì viết lại từ đầu.

Bản thử đã đi qua bước 1 đến 4 trong mục "Thứ tự làm" của `game-brief.md` (di chuyển và combo,
quái và đợt, boss đổi địa hình, chọn skill). Ngoài brief còn có: 4 nhân vật chọn được, lướt chém,
chiêu hợp kích giữa 2 kỹ năng, nâng cấp ★, 4 boss và 20 màn.

## Giả thuyết

> Nếu người chơi chạy, đạp tường, nhảy đôi, lướt chém, tung combo và bấm chiêu bằng nút cảm ứng kiểu MOBA
> để đánh qua 20 màn (16 màn quái, 4 boss), họ sẽ thấy "đã tay" và muốn chơi lại. Đo bằng: người chơi
> tự đánh tới **màn 5 (Ma Nhãn) trong lần chơi đầu**, không phải hỏi cách bấm, có **dùng chiêu trong ô và
> chiêu Hợp Kích** mà không cần nhắc, và **bấm "Chơi lại"** (thử nhân vật khác) sau khi thắng hoặc thua.

**Giả định rủi ro nhất:** trên màn hình điện thoại, ngón cái phải vừa giữ cần điều khiển, vừa bấm
Chém/Nhảy/Lướt, 3 ô kỹ năng và ô Hợp Kích mà không bấm nhầm hay che mất nhân vật.

## Cách chạy

- **Bản một file (khuyên dùng):** chạy `python3 build-standalone.py` để gói `prototype.html` + `sprites/`
  thành `kiem-si-bat-tan.html` (~4 MB, ảnh nhúng sẵn). Mở bằng cách bấm đúp, gửi qua điện thoại được.
  File này có sẵn trong repo để tải về chơi luôn. Sửa `prototype.html` hay `sprites/` thì nhớ build lại rồi commit cùng.
- Mở thẳng `prototype.html` bằng `file://` vẫn chơi được, nhưng trình duyệt không cho đọc điểm ảnh của
  ảnh rời nên **Kiếm Sĩ không có lưỡi kiếm nguyên tố**. Bản một file và link claude.ai thì có.
- Trên điện thoại: cầm ngang, bấm ⛶ để vào toàn màn hình (nếu trình duyệt cho phép).

### Điều khiển (kiểu MOBA)

| Việc | Cảm ứng | Bàn phím |
|---|---|---|
| Chạy | **cần điều khiển** nửa trái màn hình (chạm đâu hiện cần ở đó) | ← → hoặc A D |
| Nhảy / **nhảy đôi** (bấm thêm lần nữa trên không; Ninja nhảy được 3 lần) | Nhảy | Space, Z, K, ↑, W |
| Rơi xuống khỏi bục | kéo cần xuống + Nhảy | ↓/S + Nhảy |
| Chém (bấm liên tục = 3 nhát) | Chém (nút to) | X, J |
| Lướt | Lướt | C, L, Shift |
| **Lướt chém** | bấm Chém trong lúc lướt | |
| Chiêu ô 1 / 2 / 3 | 3 ô kỹ năng xếp vòng cung quanh nút Chém | 1 / 2 / 3 (hoặc U / I / O) |
| **Hợp Kích** | ô vàng ở vòng ngoài (sáng lên khi đầy năng lượng) | 4, F, P |
| Bám tường | đang rơi, giữ cần hướng vào tường | |
| Đạp tường | Nhảy khi đang ở sát tường trên không | |
| Lướt-nhảy | Nhảy trong lúc lướt (bay xa hơn) | |

Ngón bấm lăn được giữa Chém/Nhảy/Lướt mà không cần nhấc tay. Ô kỹ năng phải chạm thẳng (lăn qua không tính)
để khỏi tung chiêu nhầm. Ô kỹ năng có icon, vòng hồi chiêu và số giây còn lại; ô 2 khóa 🔒 tới khi hạ Ma Nhãn,
ô 3 khóa tới khi hạ Hỏa Long.

⚙ mở bảng chỉnh thông số (tốc độ chạy, lực nhảy, lực nhảy đôi, trọng lực, trượt tường, đạp tường,
lướt, tốc độ chém, khựng hình, thời gian hồi chiêu, tốc độ quái, sát thương quái, cỡ nút). Giá trị được
nhớ trong trình duyệt. Kéo "Sát thương quái" về 0 là bất tử để thử.

## Nhân vật (chọn đầu trận)

| Nhân vật | Lối đánh | Khác biệt |
|---|---|---|
| **Kiếm Sĩ** | Cân bằng | Lưỡi kiếm cháy rực / toé điện / sáng xanh / đóng băng theo kỹ năng nguyên tố |
| **Samurai** | Đòn nặng | Sát thương +25%, chí mạng +15%, tầm chém xa nhất; chạy chậm hơn 5% |
| **Ninja** | Nhanh nhất | Chạy +15%, lướt xa +20%, **nhảy 3 lần liền**; sát thương −15% |
| **Võ Sĩ** | Đấm liên hoàn | Đánh nhanh +35%, mỗi cú thêm 1 dòng sát thương, cứ 20 cú trúng hồi 4 máu; tầm ngắn, sát thương −20% |

Kỹ năng và hợp kích dùng chung cho cả 4. Samurai / Ninja / Võ Sĩ có hiệu ứng nguyên tố quanh vũ khí
(lửa, tia điện, băng) chứ không tô màu lưỡi kiếm như Kiếm Sĩ.

**Lướt chém:** bấm Chém trong lúc lướt là phóng tới chém 3 dòng sát thương, để lại bóng mờ, làm quái
choáng 0,5 giây. Ai cũng có.

## Vòng chơi: 20 màn

1. **Chọn nhân vật**, rồi **chọn 1 kỹ năng khởi đầu** (3 trong 4: Hỏa / Lôi / Kiếm Khí / Băng) → vào ô 1.
2. **Màn 1–4: diệt quái.** **Màn 5: boss Ma Nhãn** → hồi đầy máu, **chọn thêm 1 kỹ năng** → ô 2.
3. **Màn 6–9: diệt quái.** **Màn 10: boss Hỏa Long** → hồi đầy máu, chọn thêm 1 kỹ năng → ô 3.
4. **Màn 11–14: diệt quái.** **Màn 15: boss Long Vương** → hồi đầy máu, **nâng cấp ★ 1 kỹ năng đang có**
   (hồi chiêu nhanh hơn 30%, chiêu mạnh hơn 50%).
5. **Màn 16–19: diệt quái.** **Màn 20: trùm cuối Hắc Long Vương.** Hạ xong là thắng.

Lúc chọn kỹ năng, thẻ nào mở được Hợp Kích mới sẽ ghi "Mở hợp kích: …". Qua mỗi màn quái được hồi 25 máu.
Hết máu thì thua. Thắng hay thua đều hiện nhân vật, điểm, số quái, thời gian, kỹ năng (có ★),
**kỷ lục** và nút **Chơi lại** (về màn chọn nhân vật).

| Màn | Quái | Mới |
|---|---|---|
| 1 | Heo Rừng từ hai cổng | |
| 2 | Heo Rừng, Ong Vò Vẽ, Heo Rừng rơi từ trời | Ong Vò Vẽ bay lượn rồi lao xuống chích |
| 3 | Heo Bom, Heo Rừng, Ong Vò Vẽ | Heo Bom: lại gần là nổ; chém chết thì nổ lan sang quái khác |
| 4 | Ốc Độc trên bục, Heo Rừng, Ong Vò Vẽ, Heo Bom | Ốc Độc đứng trên bục phun axit vòng cung |
| 5 | **Boss Ma Nhãn** | |
| 6 | Ốc Giáp, Heo Rừng, Ong Vò Vẽ, Heo Bom | Ốc Giáp: thụt vào vỏ lăn tới, trong vỏ chỉ ăn 25%; chém lúc nó thò đầu ra choáng |
| 7 | Ong Chúa Độc, Heo Bom, Heo Rừng rơi từ trời, Ốc Độc | Ong Chúa Độc lơ lửng trên cao bắn kim độc |
| 8 | Hai Ốc Giáp, Ốc Độc, Ong Chúa Độc, đủ loại từ mọi phía | |
| 9 | Có quái tinh anh (viền vàng: máu x2,4, đau x1,3, to hơn) | |
| 10 | **Boss Hỏa Long** | |
| 11 | Nhẫn Giả Bóng + quái cũ | **Nhẫn Giả Bóng** (ninja tím): ở xa ném phi tiêu, lại gần chém nhanh, mình đứng trên bục thì nó nhảy lên đuổi |
| 12 | Lãng Khách + quái cũ | **Lãng Khách** (kiếm khách áo đỏ thẫm): thấy mình vung kiếm trước mặt là giơ kiếm đỡ (chỉ ăn 25%) rồi phản đòn; đánh sau lưng hoặc chờ nó chém hụt |
| 13 | Nhẫn giả và lãng khách cùng kéo đến | |
| 14 | Tinh anh khắp nơi | |
| 15 | **Boss Long Vương** | |
| 16 | Hỏa Long Binh + quái cũ | **Hỏa Long Binh** (rồng con): đi tới phun lửa tầm gần, rất trâu, ít bị đẩy lùi |
| 17 | Quái kéo đến dồn dập, 2 Hỏa Long Binh một lúc | |
| 18 | Đội tinh anh | |
| 19 | Gần như toàn tinh anh | |
| 20 | **Trùm cuối Hắc Long Vương** | |

Từ màn 11 trở đi máu và tốc độ quái tăng dần (x1,65 → x2,4 máu). Quái ra theo **nhóm** từ 4 kiểu chỗ: cổng chân
tường hai bên, mép trên (quái bay), **rơi từ trời** và **hiện trên bục**. Hai kiểu sau có dấu báo đỏ nhấp nháy trước 0,9 giây.

### Boss

Boss nào cũng có bảng WARNING đỏ trước khi ra, thanh máu đầy dần, nổ dây chuyền khi chết.

- **Ma Nhãn (màn 5):** rơi từ trên cao đáp đất nổ tung. Bay lượn, gồng mắt bắn chùm cầu (chém vỡ được), biến mất
  thì xếp lại bục. Máu càng thấp càng hay dịch chuyển và bắn dày hơn.
- **Hỏa Long (màn 10):** quái thú chui lên khỏi mặt đất rồi gầm. Cào móng, phun lửa (vùng lửa đo theo từng khung
  hình), nhảy bổ xuống tạo sóng chấn. **Gầm lên thì sàn hóa dung nham** ("LÊN BỤC!"); máu càng thấp càng hay gầm.
  Bị đánh dồn đủ đau thì khựng lại một nhịp.
- **Long Vương (màn 15):** hồn rồng sà từ trời xuống, đáp đất rồi gầm. Đòn đánh:
  - Cào móng khi mình đứng gần
  - **Gọi hồn rồng:** dấu đỏ hiện dưới sàn, 1 giây sau cột lửa phun lên đúng chỗ đó
  - Ném 3 quả cầu lửa vòng cung rải quanh chỗ mình đứng (chém vỡ được)
  - Còn 2/3 và 1/3 máu thì gọi 2 Hỏa Long Binh từ hai cổng
- **Hắc Long Vương (màn 20):** Long Vương bản tím đen, máu nhiều hơn, đánh nhanh hơn. Ném 5 cầu lửa, mỗi lần
  gọi cột lửa thì **xếp lại bục**, dưới 60% máu thì **gầm hóa sàn thành dung nham**, gọi rồng con tinh anh 3 lần
  (75%, 50%, 25% máu).

## Kỹ năng (11 kỹ năng, mỗi cái có thụ động + chiêu trong ô)

| Kỹ năng | Thụ động (luôn chạy) | Chiêu bấm (hồi) |
|---|---|---|
| 🔥 Hỏa Kiếm | Chém làm quái bỏng 2 giây | Hỏa Bạo: nổ vòng lửa quanh người, quái dính bỏng (8s) |
| ⚡ Lôi Kiếm | Chém trúng thì sét lan sang 3 con gần đó | Lôi Phạt: sét trời đánh 6 con gần nhất (9s) |
| 🌙 Kiếm Khí | Mỗi nhát chém bắn luồng kiếm bay xa | Vạn Kiếm: 5 luồng kiếm xoè hình quạt (7s) |
| ❄️ Băng Kiếm | Chém làm quái chậm một nửa trong 2 giây | Băng Hoa: nổ băng quanh người, đóng băng quái 2,5 giây (9s) |
| 🛡️ Khiên Thánh | Cứ 15 giây tự chặn 1 đòn | Thánh Quang: bất tử 3 giây, đẩy văng quái quanh người (14s) |
| 🌀 Toàn Phong Trảm | Chém trên không xoay một vòng, trúng cả phía sau, mạnh hơn 30% | Lốc Kiếm: xoay kiếm 1,2 giây, chém liên tục xung quanh (8s) |
| ☄️ Thiên Thạch | Cứ hạ 20 quái thì 1 thiên thạch tự rơi | Mưa Thiên Thạch: 4 thiên thạch rơi xuống quái (12s) |
| ⚔️ Song Trảm | Mỗi nhát chém ra 2 lần (thêm 1 dòng sát thương) | Song Long Trảm: 2 nhát chém chéo khổng lồ phía trước (7s) |
| 🪨 Địa Chấn | Từ trên cao đáp xuống tạo sóng chấn | Thiên Địa Chấn: bật lên rồi đập xuống, sóng chấn quét sàn (10s) |
| 🌩️ Thiên Lôi | Cứ 10 giây sét tự đánh một con quái | Lôi Vực: 3 giây sét liên tục đánh quái quanh người (11s) |
| 🌵 Gai Đất | Quái chết thì đất mọc gai đâm con bên cạnh | Địa Thứ: hàng gai đất trồi lên lan ra phía trước (8s) |

Kiếm Sĩ: thanh kiếm mang màu của kỹ năng nguyên tố lấy gần nhất (lửa cam, sét tím, kiếm khí xanh ngọc, băng xanh lam).

### Hợp Kích (chiêu phối hợp 2 kỹ năng)

Có từ 2 kỹ năng trở lên là mở ô **Hợp Kích** (ô vàng). Ô nạp năng lượng bằng đòn đánh: mỗi đòn trúng +1,4%,
mỗi con quái chết +3%. Đầy 100% thì ô sáng và có thể tung chiêu: tên chiêu hiện chữ vàng giữa màn hình.

| Có 2 kỹ năng | Hợp Kích |
|---|---|
| 🔥 Hỏa + ⚡ Lôi | **Lôi Hỏa Long Quyển:** lốc xoáy lửa có sét giật bên trong, hút quái lại |
| 🔥 Hỏa + ❄️ Băng | Băng Hỏa Long Quyển: lốc xoáy nửa lửa nửa băng |
| ⚡ Lôi + ❄️ Băng | Băng Lôi Long Quyển: lốc xoáy băng giá có sét |
| 🌀 Toàn Phong + bất kỳ | (Hỏa/Lôi/Băng/Cuồng) Phong Quyển: lốc xoáy khổng lồ mang nguyên tố đang có |
| 🌙 Kiếm Khí hoặc ⚔️ Song Trảm + bất kỳ | Nguyệt Trảm: nhát chém trăng khuyết khổng lồ xuyên màn hình (có Song Trảm thì 2 nhát) |
| 🌩️ Thiên Lôi + bất kỳ | Lôi Kiếm Vũ: 12 thanh kiếm sét cắm xuống quái |
| ☄️ Thiên Thạch + bất kỳ | Thiên Thạch Vũ: 12 thiên thạch rơi khắp đấu trường |
| 🪨 Địa Chấn hoặc 🌵 Gai Đất + bất kỳ | Địa Long Chấn: sóng chấn lớn khắp sàn, hất tung quái |
| Còn lại | Song Kỹ Hợp Nhất: tung cùng lúc 2 chiêu + vòng sáng |

Có nhiều cặp thì lấy cặp đứng trên trong bảng.

## Trong bản thử

- Đấu trường một màn hình. Hai bức tường giữ phần trên để bám/đạp tường; chân tường là cổng cho quái ra vào.
- Chạy, nhảy, **nhảy đôi** (lộn người, vòng gió dưới chân), rơi xuống khỏi bục, lướt, **lướt chém**, lướt-nhảy,
  trượt tường, đạp tường.
- Combo đất 3 nhát, chém trên không 3 nhát (Kiếm Sĩ: nhát 3 bổ xuống).
- Khựng hình, rung màn hình, chớp trắng và đẩy lùi khi bị trúng đòn, chết dùng animation chết của từng nhân vật.
- **Số sát thương kiểu MapleStory M:** mỗi đòn bật một cột số thẳng hàng, dòng sau hiện chồng lên trên.
  Màu theo loại: cam (thường), hồng + CRIT (chí mạng), đỏ cam (bỏng), tím (sét), xanh ngọc (kiếm khí),
  xanh lam (băng), nâu (đất), xám (chém vào khiên / Lãng Khách đỡ), tím đậm (mình mất máu), xanh lá (hồi máu),
  vàng "CHẶN" (Khiên Thánh chặn đòn).
- Quái bị chậm thì phủ màu xanh lam nhạt, bị đóng băng thì đứng yên và trắng xanh.

**Đã cắt:** âm thanh, nhạc, Màn Né Tránh, skill ẩn, boss Thụ Yêu và Băng Hậu.

## Ghi chú kỹ thuật

- Một file HTML + canvas 2D, không thư viện. Vật lý bước cố định 1/120 giây.
- Thế giới cao 360 đơn vị, rộng 560–860 theo tỉ lệ màn hình.
- **Nhân vật:** bảng `CHARS` gom mọi thứ khác nhau giữa 4 nhân vật: dải hoạt ảnh (tên logic → sheet, khung đầu/cuối,
  fps, lặp), 3 đòn đất + 3 đòn không (khung ra đòn, hộp trúng, số dòng sát thương) và hệ số chạy/đánh/lướt/chí mạng.
  Kiếm Sĩ dùng dải sprite nét mịn 128px (`ANIMS`), 3 nhân vật kia là pixel 128x128 (`SHEETS`, vẽ không làm mịn).
- Các khung chém của Kiếm Sĩ lấy từ dải sprite: vệt kiếm của AttackSwing1 ở khung 12–18, AttackSwing2 ở 9–13,
  AttackSwing3 ở 14–21. Các nhát bỏ bớt khung lấy đà đầu để bấm là ra đòn ngay (~0,13 giây).
- **Tách lưỡi kiếm (Kiếm Sĩ):** lưỡi kiếm và da tay/mặt cùng màu trắng, nên lúc tải game em lọc điểm ảnh trắng,
  co 3x3: lưỡi kiếm mảnh bị bào mất, da dày còn lại. Mảng còn lại nhỏ (< 150 điểm) là da, nở lại 2 điểm
  rồi loại ra. Sau đó tô màu theo bảng `PAL`, làm quầng sáng (tính riêng từng khung) và lưu sẵn các điểm trên lưỡi
  kiếm của từng khung để toé lửa / phóng điện / đóng băng.
- Quái dùng sprite pixel. Chớp trắng / gồng đỏ / bỏng cam / chậm / đóng băng bằng cách phủ màu lên khung qua một canvas tạm.
  Ma Nhãn vẫn vẽ bằng hình khối vì gói hình không có con nào hợp.
- Hỏa Long: khung 340x255 (bản x256p), riêng phun lửa là khung gấp đôi 680x510. Tầm móng và vùng lửa từng khung
  đo bằng script từ ảnh rồi ghi cứng trong `CLAW` / `FIRE_BOX`.
- Long Vương: sprite pixel Dragon Lord phóng to x2,2. Hắc Long Vương là bản đổi màu tím đen. Hỏa Long Binh dùng lại sprite
  này ở cỡ nhỏ.
- Lốc xoáy Hợp Kích: phễu tô gradient theo nguyên tố, 18 vòng xoáy, 5 tia sét tím trắng giật bên trong; trôi chậm về
  phía trước, dội tường, hút quái về tâm và gây sát thương mỗi 0,18 giây.

## Hình

- **Kiếm Sĩ:** bộ "2D Sword Character PC" của EBros Entertainment (`sprites/*.png`). Anh Thái Anh đã
  đồng ý đưa lên repo. **Cần kiểm tra lại giấy phép trước khi phát hành.**
- **Samurai, Ninja, Võ Sĩ, Nhẫn Giả Bóng, Lãng Khách:** gói free shinobi của craftpix (`sprites/chars/`, `sprites/enemy/`).
  Nhẫn Giả Bóng (tím) và Lãng Khách (đỏ thẫm) là em đổi màu từ Ninja và Samurai.
- **Icon kỹ năng và hợp kích:** gói "Free 50 Aeromancer Skills" của craftpix, em tô lại màu theo từng kỹ năng
  (`sprites/icons/`, WebP 96x96).
  Hai gói craftpix chỉ kèm link điều khoản (`License-craftpix.txt`, `License-aeromancer.txt` → craftpix.net/file-licenses).
  **Cần đọc điều khoản trước khi phát hành, nhất là phần đưa hình lên repo công khai.**
- **Long Vương / Hắc Long Vương / Hỏa Long Binh:** gói "Dragon Lord Basic" (`sprites/dlord/`). Gói **không kèm file
  giấy phép**, cần kiểm tra nguồn trước khi phát hành.
- **Quái rừng:** heo rừng, ong, ốc sên trong gói "Legacy Fantasy - High Forest" của Anokolisa (`sprites/forest/`). Ong tím
  và ốc vỏ xanh là em đổi màu. Giấy phép (`sprites/forest/Terms-Anokolisa.txt`): dùng được cho game kể cả game bán,
  không bắt buộc ghi tên, được sửa màu; không được bán lại chính bộ hình.
- **Hỏa Long:** quái thú phun lửa trong gói `x256p_Spritesheets` (`sprites/beast/`, WebP). Gói **không kèm file giấy phép**.
- **Không dùng** gói `MegaMan_Sprite_Assets`: trong đó là nhân vật Zero của Mega Man X (Capcom), không đưa vào game được.
- `prepare-assets.py <thư mục đã giải nén>` tạo lại `sprites/forest` và `sprites/beast`.
  `prepare-assets-2.py <thư mục đã giải nén>` tạo lại `sprites/chars`, `sprites/enemy`, `sprites/dlord` và `sprites/icons`.

Ảnh chụp: `screenshot.png` (số sát thương), `screenshot-warning.png` (bảng WARNING), `screenshot-boss.png` (đánh Ma Nhãn),
`screenshot-swords.png` (kiếm lửa / kiếm sét), `screenshot-moba.png` (điều khiển MOBA), `screenshot-beast.png`
(Hỏa Long phun lửa + dung nham), `screenshot-mobs.png` (quái pixel màn 9), `screenshot-chars.png` (chọn nhân vật),
`screenshot-dslash.png` (Samurai lướt chém, màn 11), `screenshot-fusion.png` (Lôi Hỏa Long Quyển),
`screenshot-lord.png` (Hắc Long Vương ra trận, Ninja có 3 kỹ năng, 1 kỹ năng ★).

## Kết luận

_(Điền sau khi chơi thử.)_
