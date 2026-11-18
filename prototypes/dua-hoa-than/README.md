# 🦊 Đua Hóa Thân

Game đua vượt chướng ngại 2D: đổi qua lại giữa **cáo, chim, tê tê** để về đích nhanh nhất.

**Chơi ngay:** https://thaianh111.github.io/game-moi/prototypes/dua-hoa-than/ (xoay ngang điện thoại)

## Giả thuyết đang thử
Đổi hình liên tục (mỗi hình tối đa 3 giây) cộng với chướng ngại "đúng hình mới qua" có đủ cuốn để người chơi muốn đua lại không?

## Trạng thái
Đang làm (in-progress), bản thử HTML một file.

## Kết quả đến giờ
- Chạy bot thử cả 3 màn: không có chỗ kẹt cứng. Chơi giỏi và dùng vật phẩm thì về nhất, chơi ẩu thì thường về nhì.
- Đã bỏ cách đi hết màn bằng chim (bị chặn ở vách đá, giới hạn độ cao, đồng hồ 3 giây).
- Chưa có người thật chơi thử.

## Cách chơi
- Nhân vật tự chạy. Bấm 3 nút bên trái để đổi hình, nút tròn bên phải để nhảy / vỗ cánh.
- Mỗi hình chỉ giữ được **3 giây**, hết giờ sẽ tự biến ngẫu nhiên.
- Đổi hình đúng chướng ngại thì được **bùng tốc + combo**.
- Nhặt hộp ❓ để lấy vật phẩm: ớt cay, tổ ong, bẫy dây leo, mưa giông, khiên lá, bùa giữ hình.
- Đua với 3 đối thủ (Chồn, Ếch, Cáo Xám). Đối thủ biết ném hạt dẻ.
- Máy tính: phím 1/2/3 đổi hình, Space nhảy, E dùng vật phẩm.

## 3 màn
1. **Rừng Già**: khúc gỗ, gai, sông, vách đá, hang thấp, dốc.
2. **Rừng Tràm**: bùn lầy, sông lớn có xuồng trôi, nấm nhún, gió xuôi và gió ngược.
3. **Núi Đá Vôi**: vách cao kèm gió nâng, hang thạch nhũ rơi, dốc dài.

## Sửa game
Sửa `src.html`, rồi chạy `python3 build.py` để nhúng hình trong `img/` vào `index.html`, ra một file chạy được ngay.

## Ghi công
- Game: © Võ Thái Anh · VTA Games
- Hình: Sunny Land, Sunnyland Woods, Sunny Land Forest của ansimuz (CC0)
- Tê tê: tô màu lại từ sprite con tatu (armadillo) của Elthen. Cần kiểm tra giấy phép trên itch.io trước khi phát hành.
- Hiệu ứng: pixelfx (MIT), https://github.com/patch-gg/pixelfx
