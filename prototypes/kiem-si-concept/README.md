<!-- PROTOTYPE - NOT FOR PRODUCTION -->
<!-- Question: Chạy, đạp tường, nhảy đôi, combo + 10 màn quái/boss + kỹ năng kiểu MOBA trên điện thoại có "đã tay" không? -->
<!-- Date: 2026-11-03 -->

# Kiếm Sĩ Bất Tận: bản thử

**Trạng thái:** đang thử (chưa chơi thử, chưa có kết luận)

Bản thử dùng một lần rồi bỏ. Không đem code này vào game thật: nếu kết luận là
PROCEED thì viết lại từ đầu.

Bản thử đã đi qua bước 1 đến 4 trong mục "Thứ tự làm" của `game-brief.md` (di chuyển và
combo, quái và đợt, boss đổi địa hình, chọn skill), có thêm boss thứ hai (Hỏa Long) và điều khiển kiểu MOBA.

## Giả thuyết

> Nếu người chơi chạy, đạp tường, nhảy đôi, tung combo và bấm chiêu bằng nút cảm ứng kiểu MOBA để
> đánh qua 10 màn (8 màn quái, 2 boss), họ sẽ thấy "đã tay" và muốn chơi lại. Đo bằng: người chơi
> tự đánh tới **màn 5 (Ma Nhãn) trong lần chơi đầu**, không phải hỏi cách bấm, có **dùng chiêu trong ô**
> mà không cần nhắc, và **bấm "Chơi lại"** sau khi thắng hoặc thua.

**Giả định rủi ro nhất:** trên màn hình điện thoại, ngón cái phải vừa giữ cần điều khiển, vừa bấm
Chém/Nhảy/Lướt và 2 ô kỹ năng mà không bấm nhầm hay che mất nhân vật.

## Cách chạy

- **Bản một file (khuyên dùng):** chạy `python3 build-standalone.py` để gói `prototype.html` + `sprites/`
  thành `kiem-si-bat-tan.html` (~950 KB, ảnh nhúng sẵn). Mở bằng cách bấm đúp, gửi qua điện thoại được.
  File này không commit (đã có trong `.gitignore`), cứ build lại khi cần.
- Mở thẳng `prototype.html` bằng `file://` vẫn chơi được, nhưng trình duyệt không cho đọc điểm ảnh của
  ảnh rời nên **không có hiệu ứng kiếm nguyên tố**. Bản một file và link claude.ai thì có.
- Trên điện thoại: cầm ngang, bấm ⛶ để vào toàn màn hình (nếu trình duyệt cho phép).

### Điều khiển (kiểu MOBA)

| Việc | Cảm ứng | Bàn phím |
|---|---|---|
| Chạy | **cần điều khiển** nửa trái màn hình (chạm đâu hiện cần ở đó) | ← → hoặc A D |
| Nhảy / **nhảy đôi** (bấm thêm lần nữa trên không) | Nhảy | Space, Z, K, ↑, W |
| Rơi xuống khỏi bục | kéo cần xuống + Nhảy | ↓/S + Nhảy |
| Chém (bấm liên tục = 3 nhát) | Chém (nút to) | X, J |
| Lướt | Lướt | C, L, Shift |
| Chiêu ô 1 / ô 2 | 2 ô kỹ năng xếp vòng cung quanh nút Chém | 1 / 2 (hoặc U / I) |
| Bám tường | đang rơi, giữ cần hướng vào tường | |
| Đạp tường | Nhảy khi đang ở sát tường trên không | |
| Lướt-nhảy | Nhảy trong lúc lướt (bay xa hơn) | |

Ngón bấm lăn được giữa Chém/Nhảy/Lướt mà không cần nhấc tay. Ô kỹ năng phải chạm thẳng (lăn qua không tính)
để khỏi tung chiêu nhầm. Ô kỹ năng có vòng hồi chiêu và số giây còn lại; ô 2 khóa 🔒 tới khi hạ Ma Nhãn.

⚙ mở bảng chỉnh thông số (tốc độ chạy, lực nhảy, lực nhảy đôi, trọng lực, trượt tường, đạp tường,
lướt, tốc độ chém, khựng hình, thời gian hồi chiêu, tốc độ quái, sát thương quái, cỡ nút). Giá trị được
nhớ trong trình duyệt. Kéo "Sát thương quái" về 0 là bất tử để thử.

## Vòng chơi: 10 màn

1. **Chọn 1 kỹ năng khởi đầu** (Hỏa Kiếm / Lôi Kiếm / Kiếm Khí) → vào ô 1.
2. **Màn 1–4: diệt quái**, mỗi màn giới thiệu một loại quái mới, bục xếp lại khác nhau.
3. **Màn 5: boss Ma Nhãn.** Hạ xong được hồi đầy máu và **chọn thêm 1 trong 3 kỹ năng** (không trùng) → vào ô 2.
4. **Màn 6–9: diệt quái**, thêm Giáp Thạch, Mắt Quỷ; màn 9 có quái tinh anh.
5. **Màn 10: boss Hỏa Long.** Hạ xong là thắng.

Qua mỗi màn quái được hồi 25 máu. Hết máu thì thua. Thắng hay thua đều hiện điểm, số quái, thời gian,
kỹ năng đã có, **kỷ lục** và nút **Chơi lại**.

| Màn | Quái | Mới |
|---|---|---|
| 1 | 5 Heo Rừng từ hai cổng | |
| 2 | Heo Rừng, Ong Vò Vẽ, Heo Rừng rơi từ trời | Ong Vò Vẽ bay lượn rồi lao xuống chích |
| 3 | Heo Bom, Heo Rừng, Ong Vò Vẽ | Heo Bom (heo đen cõng bom): lại gần là nổ; chém chết thì nổ lan sang quái khác |
| 4 | Ốc Độc trên bục, Heo Rừng, Ong Vò Vẽ, Heo Bom | Ốc Độc (vỏ xanh) đứng trên bục phun axit vòng cung, giữ khoảng cách |
| 5 | **Boss Ma Nhãn** | |
| 6 | Ốc Giáp, Heo Rừng, Ong Vò Vẽ, Heo Bom | Ốc Giáp (ốc to): thụt vào vỏ rồi lăn tới, dội tường; trong vỏ chỉ ăn 25%. Nhảy qua, chém lúc nó thò đầu ra choáng (sao vàng) |
| 7 | Ong Chúa Độc, Heo Bom, Heo Rừng rơi từ trời, Ốc Độc | Ong Chúa Độc (ong tím, to) lơ lửng trên cao, gồng rồi bắn kim độc |
| 8 | Hai Ốc Giáp, Ốc Độc, Ong Chúa Độc, đủ loại từ mọi phía | |
| 9 | Có quái tinh anh (viền vàng: máu x2,4, đau x1,3, to hơn) | |
| 10 | **Boss Hỏa Long** | |

Quái ra theo **nhóm** từ 4 kiểu chỗ: cổng chân tường hai bên, mép trên (quái bay), **rơi từ trời** và
**hiện trên bục**. Hai kiểu sau có dấu báo đỏ nhấp nháy trước 0,9 giây.

### Boss

- **Ma Nhãn (màn 5):** bảng WARNING đỏ, rơi từ trên cao đáp đất nổ tung. Bay lượn, gồng mắt bắn chùm cầu
  (chém vỡ được), biến mất thì xếp lại bục. Máu càng thấp càng hay dịch chuyển và bắn dày hơn.
- **Hỏa Long (màn 10):** quái thú phun lửa (hình dựng sẵn, có quầng lửa cam phía sau cho nổi trên nền đêm).
  Bảng WARNING, đất nổ tung, con thú chui lên khỏi mặt đất, rồi gầm (tên boss hiện ra, thanh máu đầy dần). Đòn đánh:
  - Cào móng (2 kiểu, tầm với khác nhau) khi đứng gần
  - Phun lửa: vùng lửa trúng đòn đo theo từng khung hình của sprite, cháy dài gần 1/3 đấu trường
  - Nhảy bổ xuống chỗ người chơi, đáp đất tạo sóng chấn (đứng trên bục thì không sao)
  - **Gầm lên thì sàn hóa dung nham:** báo nóng ("SÀN SẮP HÓA DUNG NHAM — LÊN BỤC!") rồi trào. Chạm dung nham thì bỏng
    và bị bật lên; con thú đứng trong dung nham không sao. Máu càng thấp càng hay gầm (nghỉ 10 giây xuống 4,5 giây)
    và đổi từ đi bộ sang chạy.
  - Bị đánh dồn đủ đau (6% máu) thì khựng lại một nhịp (hoạt ảnh trúng đòn), là lúc tung combo.
  - Chết: hoạt ảnh gục ngã + nổ dây chuyền rồi CHIẾN THẮNG.

## Kỹ năng (6 kỹ năng, mỗi cái có thụ động + chiêu trong ô)

| Kỹ năng | Thụ động (luôn chạy) | Chiêu bấm (hồi) |
|---|---|---|
| 🔥 Hỏa Kiếm | Chém làm quái bỏng 2 giây. Kiếm cháy rực | Hỏa Bạo: nổ vòng lửa quanh người, quái dính bỏng (8s) |
| ⚡ Lôi Kiếm | Chém trúng thì sét lan sang 3 con gần đó. Kiếm có điện | Lôi Phạt: sét trời đánh 6 con gần nhất (9s) |
| 🌙 Kiếm Khí | Mỗi nhát chém bắn luồng kiếm bay xa. Kiếm sáng xanh ngọc | Vạn Kiếm: 5 luồng kiếm xoè hình quạt (7s) |
| 🛡️ Khiên Thánh | Cứ 15 giây tự chặn 1 đòn (vòng vàng dưới chân = sẵn sàng) | Thánh Quang: bất tử 3 giây, đẩy văng quái quanh người (14s) |
| 🌀 Toàn Phong Trảm | Chém trên không xoay một vòng, trúng cả phía sau, mạnh hơn 30% | Lốc Kiếm: xoay kiếm 1,2 giây, chém liên tục xung quanh (8s) |
| ☄️ Thiên Thạch | Cứ hạ 20 quái thì 1 thiên thạch tự rơi | Mưa Thiên Thạch: 4 thiên thạch rơi xuống quái (12s) |

Lúc đầu chọn trong 3 kỹ năng nguyên tố. Sau Ma Nhãn chọn 1 trong 3 kỹ năng ngẫu nhiên còn lại.
Thanh kiếm mang màu của kỹ năng nguyên tố lấy gần nhất.

## Trong bản thử

- Đấu trường một màn hình. Hai bức tường giữ phần trên để bám/đạp tường; chân tường là cổng cho quái ra vào.
- Chạy, nhảy, **nhảy đôi** (lộn người, vòng gió dưới chân), rơi xuống khỏi bục, lướt, lướt-nhảy, trượt tường, đạp tường.
- Combo đất 3 nhát, chém trên không 3 nhát (nhát 3 bổ xuống).
- Khựng hình, rung màn hình, chớp trắng và đẩy lùi khi bị trúng đòn, chết dùng animation Death.
- **Số sát thương kiểu MapleStory M:** mỗi đòn bật một cột số thẳng hàng, dòng sau hiện chồng lên trên.
  Màu theo loại: cam (thường), hồng + CRIT (chí mạng), đỏ cam (bỏng), xanh dương (sét), xanh ngọc (kiếm khí),
  xám (chém vào khiên), tím (mình mất máu), xanh lá (hồi máu), vàng "CHẶN" (Khiên Thánh chặn đòn).
- Kiếm nguyên tố: lưỡi kiếm và vệt chém đổi màu, quầng sáng, lửa / tia điện quanh lưỡi kiếm.

**Đã cắt:** âm thanh, nhạc, Màn Né Tránh, skill ẩn, nâng cấp skill, boss Thụ Yêu và Băng Hậu.

## Ghi chú kỹ thuật

- Một file HTML + canvas 2D, không thư viện. Vật lý bước cố định 1/120 giây.
- Thế giới cao 360 đơn vị, rộng 560–860 theo tỉ lệ màn hình.
- Các khung chém lấy từ dải sprite: vệt kiếm của AttackSwing1 ở khung 12–18, AttackSwing2 ở 9–13, AttackSwing3 ở 14–21.
  Các nhát bỏ bớt khung lấy đà đầu để bấm là ra đòn ngay (~0,13 giây).
- Animation còn thiếu được bù bằng code như brief: trượt tường giữ khung 0 của WallJump, chém trên không dùng lại
  AttackSwing1, nhảy đôi dùng khung lộn người 14–19 của WallJump, Lốc Kiếm lặp khung vệt chém của AttackSwing3.
- Quái dùng sprite pixel (vẽ không làm mịn cho nét pixel sắc). Chớp trắng / gồng đỏ / bỏng cam bằng cách phủ màu lên khung
  qua một canvas tạm. Ma Nhãn vẫn vẽ bằng hình khối vì gói hình không có con nào hợp.
- Boss quái thú: khung 340x255 (bản x256p), riêng phun lửa là khung gấp đôi 680x510 để chứa lửa. Điểm chân (144, 240),
  khung lửa (314, 479). Tầm móng và vùng lửa từng khung đo bằng script từ ảnh rồi ghi cứng trong `CLAW` / `FIRE_BOX`.
- **Tách lưỡi kiếm:** lưỡi kiếm và da tay/mặt cùng màu trắng, nên lúc tải game em lọc điểm ảnh trắng,
  co 3x3: lưỡi kiếm mảnh bị bào mất, da dày còn lại. Mảng còn lại nhỏ (< 150 điểm) là da, nở lại 2 điểm
  rồi loại ra; mảng rất lớn là vệt chém nên vẫn tính là kiếm. Sau đó tô màu theo bảng `PAL`, làm quầng sáng
  (làm mờ hộp 2 lần, tính riêng từng khung) và lưu sẵn các điểm trên lưỡi kiếm của từng khung để toé lửa / phóng điện.
- Rồng: đầu bay theo đường đi của từng kiểu đánh, 16 đốt thân bám theo như dây xích (mỗi đốt cách 13 đơn vị).
  Mỗi đốt là một điểm trúng riêng trỏ về con rồng, nên mỗi nhát chém chỉ tính một lần cho cả con.

## Hình

- Nhân vật: bộ "2D Sword Character PC" của EBros Entertainment (`sprites/*.png`). Anh Thái Anh đã
  đồng ý đưa lên repo. **Cần kiểm tra lại giấy phép trước khi phát hành.**
- Quái: heo rừng, ong, ốc sên trong gói "Legacy Fantasy - High Forest" của Anokolisa (`sprites/forest/`). Ong tím và
  ốc vỏ xanh là em đổi màu từ bản gốc. Giấy phép (`sprites/forest/Terms-Anokolisa.txt`): dùng được cho game kể cả game bán,
  không bắt buộc ghi tên, được sửa màu; chỉ không được bán lại chính bộ hình.
- Boss Hỏa Long: quái thú phun lửa trong gói `x256p_Spritesheets` (`sprites/beast/`, đã đổi sang WebP). Gói này
  **không kèm file giấy phép**, cần kiểm tra nguồn và giấy phép trước khi phát hành.
- `prepare-assets.py <thư mục đã giải nén>` tạo lại toàn bộ `sprites/forest` và `sprites/beast` từ các gói gốc.

Ảnh chụp: `screenshot.png` (số sát thương), `screenshot-warning.png` (bảng WARNING), `screenshot-boss.png` (đánh Ma Nhãn),
`screenshot-swords.png` (kiếm lửa / kiếm sét), `screenshot-moba.png` (điều khiển MOBA + quái màn 9),
`screenshot-beast.png` (Hỏa Long phun lửa + dung nham), `screenshot-mobs.png` (quái pixel màn 9).

## Kết luận

_(Điền sau khi chơi thử.)_
