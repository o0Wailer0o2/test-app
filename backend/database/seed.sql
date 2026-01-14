-- This file contains seed data for blog posts and users
-- Run this after schema.sql to populate the database with sample data

USE blog_db;

-- Insert sample users (additional to admin)
INSERT INTO users (name, email, password, is_admin, bio) VALUES
('Minh Anh', 'minhanh@blog.com', '$2b$10$NyGkpaldV07ezTU6SEhNTOsamqzdHbctbsuos8GjzSiuNdOArb8lq', FALSE, 'Chia sẻ kinh nghiệm sống, nấu ăn và du lịch. Yêu thích khám phá văn hóa Việt Nam và phong cách sống hiện đại.'),
('Thu Hương', 'thuhuong@blog.com', '$2b$10$NyGkpaldV07ezTU6SEhNTOsamqzdHbctbsuos8GjzSiuNdOArb8lq', FALSE, 'Đầu bếp chuyên nghiệp với niềm đam mê ẩm thực Việt Nam.'),
('Tuấn Anh', 'tuananh@blog.com', '$2b$10$NyGkpaldV07ezTU6SEhNTOsamqzdHbctbsuos8GjzSiuNdOArb8lq', FALSE, 'Huấn luyện viên yoga và người yêu thể thao.'),
('Lan Anh', 'lananh@blog.com', '$2b$10$NyGkpaldV07ezTU6SEhNTOsamqzdHbctbsuos8GjzSiuNdOArb8lq', FALSE, 'Chuyên gia tổ chức và tối ưu hóa không gian sống.'),
('Hoàng Nam', 'hoangnam@blog.com', '$2b$10$NyGkpaldV07ezTU6SEhNTOsamqzdHbctbsuos8GjzSiuNdOArb8lq', FALSE, 'Travel blogger khám phá Việt Nam và thế giới.');

-- Update categories to Vietnamese themes
TRUNCATE TABLE categories;
INSERT INTO categories (name, slug, description) VALUES
('Nấu Ăn', 'nau-an', 'Công thức nấu ăn và chia sẻ kinh nghiệm ẩm thực'),
('Thể Thao', 'the-thao', 'Bài tập, sức khỏe và lối sống năng động'),
('Cuộc Sống', 'cuoc-song', 'Mẹo vặt và kinh nghiệm sống hằng ngày'),
('Mẹo Vặt', 'meo-vat', 'Những mẹo hay trong sinh hoạt hằng ngày'),
('Du Lịch', 'du-lich', 'Khám phá địa điểm và kinh nghiệm du lịch'),
('Sức Khỏe', 'suc-khoe', 'Chăm sóc sức khỏe và phong cách sống lành mạnh');

-- Insert blog posts with real content
INSERT INTO posts (title, content, excerpt, category, image, author_id) VALUES
(
  '10 Món Ăn Việt Nam Dễ Làm Cho Bữa Tối Gia Đình',
  'Ẩm thực Việt Nam nổi tiếng với sự đa dạng và phong phú. Dưới đây là 10 món ăn truyền thống vừa ngon miệng, vừa dễ thực hiện ngay tại nhà của bạn.

<h2>1. Canh Chua Cá</h2>
Canh chua cá là món ăn đặc trưng của miền Nam, với vị chua dịu từ me, cà chua kết hợp với cá tươi ngon. Bạn chỉ cần chuẩn bị cá (cá lóc, cá basa), me, cà chua, dứa, giá đỗ, bạc hà và các gia vị cơ bản.

<h2>2. Thịt Kho Tàu</h2>
Món thịt kho tàu với trứng vịt lộn là món ăn quen thuộc trong mâm cơm gia đình. Thịt ba chỉ được ướp với nước mắm, đường, tiêu rồi kho với nước dừa tươi cho đến khi mềm và thấm gia vị.

<h2>3. Cá Kho Tộ</h2>
Cá kho tộ là món ăn đậm đà, thơm ngon. Cá được ướp gia vị rồi kho trong nồi đất với nước mắm, đường, tiêu, ớt. Món này ăn kèm với cơm nóng rất tuyệt.

<h2>4. Gà Kho Gừng</h2>
Gà kho gừng là món ăn bổ dưỡng, phù hợp cho những ngày se lạnh. Gà được kho với gừng tươi, nước mắm, mật ong tạo nên hương vị đặc biệt.

<h2>5. Cải Thìa Xào Tỏi</h2>
Món rau xanh đơn giản nhưng cực kỳ ngon. Cải thìa được xào nhanh với tỏi băm, giữ nguyên độ giòn và màu xanh tự nhiên.

<h2>6. Canh Rau Ngót Nấu Tôm</h2>
Canh rau ngót nấu với tôm khô hoặc tôm tươi, vị ngọt tự nhiên của rau kết hợp với tôm tạo nên món canh thanh mát, giải nhiệt.

<h2>7. Đậu Phụ Sốt Cà Chua</h2>
Đậu phụ chiên giòn rồi xào với sốt cà chua, hành, tỏi. Món chay nhưng cực kỳ hấp dẫn và đầy đủ dinh dưỡng.

<h2>8. Cá Chiên Sốt Cà</h2>
Cá chiên vàng giòn, ăn kèm với nước sốt cà chua chua ngọt. Đây là món ăn được nhiều người yêu thích.

<h2>9. Thịt Băm Trứng Hấp</h2>
Thịt băm ướp gia vị, trộn với trứng gà rồi đem hấp chín. Món này mềm mịn, thơm ngon và rất dễ làm.

<h2>10. Canh Bí Đỏ Nấu Tôm</h2>
Canh bí đỏ nấu với tôm tươi, vị ngọt tự nhiên của bí kết hợp với tôm tạo nên món canh bổ dưỡng cho cả gia đình.

Tất cả các món trên đều có thể hoàn thành trong vòng 30-45 phút, phù hợp cho bữa tối gia đình. Hãy thử ngay hôm nay nhé!',
  'Khám phá những món ăn truyền thống Việt Nam vừa ngon miệng, vừa dễ thực hiện trong bếp nhà bạn. Từ canh chua đến thịt kho tàu, tất cả đều có thể làm chỉ trong vòng 30 phút.',
  'Nấu Ăn',
  'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1200&h=600&fit=crop',
  2
),
(
  'Cách Làm Bánh Mì Việt Nam Tại Nhà Đơn Giản',
  'Bánh mì Việt Nam là món ăn đường phố nổi tiếng, được UNESCO công nhận. Hôm nay tôi sẽ hướng dẫn các bạn cách làm bánh mì tại nhà với vỏ bánh giòn tan và nhân thịt đầy đặn.

<h2>Nguyên liệu làm vỏ bánh mì</h2>
- 500g bột mì đa dụng
- 10g men nở
- 10g đường
- 8g muối
- 300ml nước ấm
- 30ml dầu ăn

<h2>Nguyên liệu làm nhân</h2>
- Pate gan
- Thịt nguội (jambon, chả lụa, thịt nguội)
- Dưa chuột thái sợi
- Rau mùi, rau thơm
- Cà rốt, củ cải ngâm chua ngọt
- Ớt tươi
- Nước tương, dầu ăn

<h2>Cách làm vỏ bánh mì</h2>
1. Hòa tan men với nước ấm và đường, để 5-10 phút cho men nở.
2. Trộn bột mì với muối, sau đó đổ hỗn hợp men vào, nhào đều.
3. Thêm dầu ăn, tiếp tục nhào bột đến khi mịn và không dính tay (khoảng 15-20 phút).
4. Để bột nghỉ phủ khăn ẩm khoảng 1 tiếng cho bột nở gấp đôi.
5. Chia bột thành các phần nhỏ (khoảng 80-100g/phần), vo tròn.
6. Dùng chày cán mỏng, cuộn tròn, đặt lên khay nướng.
7. Ủ bột lần 2 khoảng 30-40 phút.
8. Xịt nước lên bề mặt bánh, rạch đường trên bánh.
9. Nướng ở 200°C trong 20-25 phút cho đến khi vàng giòn.

<h2>Chuẩn bị nhân bánh mì</h2>
1. Cắt bánh mì dọc, phết pate lên một bên.
2. Thêm các loại thịt nguội theo sở thích.
3. Cho thêm dưa chuột, cà rốt củ cải ngâm, rau thơm.
4. Thêm chút nước tương và ớt tươi.
5. Đậy lại và thưởng thức!

<h2>Mẹo làm bánh mì ngon</h2>
- Nhào bột đủ lâu để bánh giòn và có độ xốp tốt
- Nước ủ bột không nên quá nóng (khoảng 35-40°C)
- Nướng bánh ở nhiệt độ cao để vỏ giòn
- Xịt nước vào lò khi nướng để bánh có vỏ mỏng giòn tan
- Dùng bánh mì khi còn ấm sẽ ngon nhất

Chúc các bạn thành công!',
  'Hướng dẫn chi tiết cách làm bánh mì Việt Nam giòn tan với nhân thịt nguội, pate, và rau thơm. Bí quyết làm vỏ bánh mì thơm ngon như ngoài tiệm.',
  'Nấu Ăn',
  'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=400&h=300&fit=crop',
  3
),
(
  'Bài Tập Yoga Buổi Sáng Cho Sức Khỏe Dẻo Dai',
  'Yoga buổi sáng là cách tuyệt vời để bắt đầu một ngày mới tràn đầy năng lượng. Dưới đây là 5 động tác yoga cơ bản giúp bạn khởi động cơ thể một cách nhẹ nhàng và hiệu quả.

<h2>1. Tư Thế Con Mèo - Con Bò (Cat-Cow Pose)</h2>
Động tác này giúp làm ấm cột sống, tăng tính linh hoạt cho lưng.

Cách thực hiện:
- Quỳ gối, hai tay chống xuống thảm, lưng thẳng
- Hít vào, võng lưng xuống, ngẩng đầu lên (Con Bò)
- Thở ra, cong lưng lên, cúi đầu xuống (Con Mèo)
- Lặp lại 10-15 lần

<h2>2. Tư Thế Chó Úp Mặt (Downward Facing Dog)</h2>
Đây là tư thế toàn thân giúp kéo giãn cơ bắp, tăng cường lưu thông máu.

Cách thực hiện:
- Từ tư thế tứ sưu, nâng hông lên cao
- Chân duỗi thẳng, gót chân ép xuống đất
- Tay thẳng, đầu thả lỏng giữa hai vai
- Giữ 30 giây đến 1 phút

<h2>3. Tư Thế Chiến Binh 1 (Warrior I)</h2>
Tư thế này giúp tăng cường sức mạnh cho chân, mở rộng ngực.

Cách thực hiện:
- Đứng chân rộng, chân trước gập 90 độ
- Chân sau duỗi thẳng, bàn chân hơi xoay ra ngoài
- Nâng hai tay lên cao, nhìn về phía trước
- Giữ 30 giây mỗi bên

<h2>4. Tư Thế Cái Cây (Tree Pose)</h2>
Giúp cải thiện thế bằng, tập trung và sự cân bằng.

Cách thực hiện:
- Đứng thẳng, chuyển trọng tâm sang một chân
- Nâng chân kia lên, đặt bàn chân vào đùi chân đứng
- Hai tay chắp trước ngực hoặc nâng cao
- Giữ 30 giây mỗi bên

<h2>5. Tư Thế Hài Đồng (Child\'s Pose)</h2>
Tư thế nghỉ ngơi, thư giãn toàn thân.

Cách thực hiện:
- Quỳ gối, ngồi lên gót chân
- Cúi người về phía trước, tay duỗi thẳng ra trước
- Trán chạm đất, thả lỏng toàn thân
- Giữ 1-2 phút

<h2>Lợi Ích Của Yoga Buổi Sáng</h2>
- Tăng cường sức khỏe tim mạch
- Cải thiện độ dẻo dai và sức mạnh cơ bắp
- Giảm căng thẳng, lo âu
- Tăng cường sự tập trung
- Cải thiện chất lượng giấc ngủ

Hãy thực hiện đều đặn mỗi sáng, bạn sẽ cảm nhận được sự thay đổi tích cực!',
  'Khám phá 5 động tác yoga đơn giản giúp khởi động cơ thể, tăng cường sức khỏe và tinh thần tốt hơn mỗi buổi sáng chỉ trong 15 phút.',
  'Thể Thao',
  'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&h=300&fit=crop',
  4
),
(
  'Mẹo Sắp Xếp Tủ Quần Áo Gọn Gàng và Khoa Học',
  'Tủ quần áo luôn gọn gàng, ngăn nắp sẽ giúp bạn tiết kiệm thời gian tìm kiếm đồ và tạo cảm giác thoải mái. Hãy cùng tìm hiểu phương pháp KonMari và các mẹo sắp xếp hiệu quả.

<h2>Phương Pháp KonMari</h2>
Phương pháp của Marie Kondo tập trung vào việc chỉ giữ lại những món đồ mang lại niềm vui.

Các bước thực hiện:
1. Lấy toàn bộ quần áo ra khỏi tủ
2. Chạm vào từng món đồ và tự hỏi: "Nó có mang lại niềm vui cho tôi không?"
3. Giữ lại những gì cần thiết, loại bỏ những gì không cần
4. Gấp quần áo theo phương pháp đứng
5. Sắp xếp theo màu sắc và loại

<h2>Cách Gấp Quần Áo Đứng</h2>
Thay vì xếp chồng, hãy gấp quần áo để chúng đứng được:
- Áo thun: Gấp đôi dọc, sau đó gấp 2-3 lần ngang
- Quần jean: Gấp đôi dọc, gấp 3 lần ngang
- Váy: Gấp đôi dọc, gấp theo chiều dài
- Tất: Gấp đôi, không buộc nút

<h2>Phân Loại Quần Áo</h2>
1. <b>Theo mùa:</b> Quần áo mùa hiện tại để dễ lấy, quần áo ngoài mùa cất ở trên cao hoặc hộp kín
2. <b>Theo loại:</b> Áo, quần, đầm, đồ ngủ, đồ lót riêng biệt
3. <b>Theo màu:</b> Từ sáng đến tối hoặc theo tông màu
4. <b>Theo tần suất sử dụng:</b> Đồ hay mặc để tầm với, đồ ít mặc cất cao

<h2>Sử Dụng Phụ Kiện Tủ Quần Áo</h2>
- Móc treo đa năng cho đai, khăn
- Hộp nhỏ chia ngăn cho đồ lót, tất
- Móc dính treo túi xách
- Thanh treo thêm cho không gian hẹp
- Túi hút chân không cho quần áo ngoài mùa

<h2>Bí Quyết Duy Trì</h2>
1. Qui tắc "một vào, một ra": Mua mới thì loại bỏ món cũ
2. Gấp quần áo ngay sau khi giặt
3. Sắp xếp lại mỗi tuần 1 lần
4. Review tủ quần áo mỗi 3-6 tháng
5. Không mua đồ khi tủ đã đầy

<h2>Lợi Ích</h2>
- Tiết kiệm không gian đến 50%
- Dễ dàng tìm kiếm quần áo
- Giữ quần áo ít nhăn hơn
- Tạo cảm giác sạch sẽ, gọn gàng
- Tiết kiệm thời gian buổi sáng

Hãy áp dụng ngay hôm nay để có một tủ quần áo hoàn hảo!',
  'Chia sẻ những mẹo hay giúp tủ quần áo của bạn luôn gọn gàng, dễ tìm kiếm và tiết kiệm không gian. Áp dụng phương pháp KonMari hiệu quả.',
  'Cuộc Sống',
  'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop',
  5
),
(
  'Top 5 Điểm Du Lịch Miền Bắc Không Thể Bỏ Qua',
  'Miền Bắc Việt Nam sở hữu nhiều địa danh nổi tiếng với vẻ đẹp hùng vĩ của núi non, biển cả. Hãy cùng khám phá 5 điểm đến tuyệt vời cho chuyến du lịch của bạn.

<h2>1. Vịnh Hạ Long - Di Sản Thế Giới</h2>
Vịnh Hạ Long được UNESCO công nhận là di sản thiên nhiên thế giới với hàng nghìn đảo đá vôi kỳ thú.

<b>Điểm nhấn:</b>
- Du thuyền qua đêm ngắm hoàng hôn
- Khám phá động Thiên Cung, động Sửng Sốt
- Chèo kayak giữa các hang động
- Thưởng thức hải sản tươi sống

<b>Thời gian lý tưởng:</b> Tháng 10-12 (mùa thu) hoặc tháng 3-5 (mùa xuân)

<b>Chi phí:</b> Từ 2-5 triệu đồng/người cho tour 2 ngày 1 đêm

<h2>2. Sapa - Thiên Đường Mây Trắng</h2>
Sapa nổi tiếng với ruộng bậc thang, khí hậu mát mẻ quanh năm và văn hóa đa dạng của các dân tộc thiểu số.

<b>Điểm nhấn:</b>
- Chinh phục đỉnh Fansipan (nóc nhà Đông Dương)
- Khám phá bản Cát Cát, Tả Van
- Ngắm ruộng bậc thang mùa lúa chín
- Thưởng thức đặc sản: thịt trâu gác bếp, cá tầm

<b>Thời gian lý tưởng:</b> Tháng 9-11 (mùa lúa chín) hoặc tháng 12-2 (có tuyết)

<b>Chi phí:</b> Từ 1.5-3 triệu đồng/người cho 3 ngày 2 đêm

<h2>3. Ninh Bình - Hạ Long Trên Cạn</h2>
Ninh Bình được mệnh danh là "Hạ Long trên cạn" với phong cảnh non nước hữu tình.

<b>Điểm nhấn:</b>
- Chèo thuyền trên sông qua Tam Cốc - Bích Động
- Tham quan Tràng An - Di sản văn hóa thế giới
- Chinh phục Hang Múa ngắm toàn cảnh
- Thăm Cố đô Hoa Lư

<b>Thời gian lý tưởng:</b> Tháng 4-5 (mùa lúa chín) hoặc tháng 9-10

<b>Chi phí:</b> Từ 1-2 triệu đồng/người cho 2 ngày 1 đêm

<h2>4. Hà Giang - Cao Nguyên Đá</h2>
Hà Giang là thiên đường cho những ai yêu thích phượt và khám phá vùng núi non hùng vĩ.

<b>Điểm nhấn:</b>
- Chinh phục đèo Mã Pí Lèng - 1 trong 4 đèo đẹp nhất Việt Nam
- Khám phá cao nguyên đá Đồng Văn
- Tham quan Dinh Vua Mèo, Cột cờ Lũng Cú
- Ngắm hoa tam giác mạch (tháng 10-11)

<b>Thời gian lý tưởng:</b> Tháng 9-11 hoặc tháng 3-5

<b>Chi phí:</b> Từ 2.5-4 triệu đồng/người cho 4 ngày 3 đêm

<h2>5. Mai Châu - Bản Làng Yên Bình</h2>
Mai Châu là nơi lý tưởng cho những ai tìm kiếm sự yên tĩnh, gần gũi thiên nhiên.

<b>Điểm nhấn:</b>
- Nghỉ tại nhà sàn của người dân tộc Thái
- Đạp xe quanh thung lũng Mai Châu
- Thưởng thức cơm lam, gà nướng
- Xem múa sạp, hát then

<b>Thời gian lý tưởng:</b> Quanh năm, đặc biệt tháng 9-11

<b>Chi phí:</b> Từ 800.000 - 1.5 triệu đồng/người cho 2 ngày 1 đêm

<h2>Lưu Ý Khi Du Lịch Miền Bắc</h2>
1. Chuẩn bị áo ấm, đặc biệt khi đi vùng cao
2. Mang theo thuốc cá nhân
3. Book tour hoặc homestay trước 1-2 tuần
4. Tôn trọng văn hóa địa phương
5. Bảo vệ môi trường

Chúc bạn có chuyến du lịch miền Bắc thật vui vẻ và ý nghĩa!',
  'Khám phá vẻ đẹp hùng vĩ của miền Bắc Việt Nam với 5 điểm đến tuyệt vời: Hạ Long, Sapa, Ninh Bình, Hà Giang và Mai Châu. Hướng dẫn chi tiết cho chuyến đi.',
  'Du Lịch',
  'https://images.unsplash.com/photo-1528127269322-539801943592?w=400&h=300&fit=crop',
  6
),
(
  'Mẹo Tiết Kiệm Điện Trong Gia Đình Hiệu Quả',
  'Hóa đơn tiền điện ngày càng tăng cao là nỗi lo của nhiều gia đình. Dưới đây là những cách đơn giản giúp bạn tiết kiệm đến 30% chi phí điện năng hàng tháng.

<h2>1. Sử Dụng Đèn LED</h2>
Thay thế bóng đèn sợi đốt, huỳnh quang bằng đèn LED.

<b>Lợi ích:</b>
- Tiết kiệm điện đến 80% so với đèn sợi đốt
- Tuổi thọ cao hơn 10-15 lần
- Không phát nhiệt, an toàn
- Ánh sáng ổn định, không nhấp nháy

<b>Chi phí:</b> Tuy đắt hơn ban đầu nhưng hoàn vốn sau 3-6 tháng

<h2>2. Tắt Thiết Bị Khi Không Sử Dụng</h2>
Nhiều thiết bị vẫn tiêu thụ điện ở chế độ chờ (standby).

<b>Các thiết bị cần lưu ý:</b>
- Tivi, đầu DVD
- Máy tính, laptop
- Bộ sạc điện thoại
- Lò vi sóng
- Máy giặt

<b>Giải pháp:</b> Sử dụng ổ cắm có công tắc, tắt hoàn toàn khi không dùng

<h2>3. Sử Dụng Điều Hòa Hợp Lý</h2>
Điều hòa là thiết bị tiêu thụ điện nhiều nhất trong gia đình.

<b>Mẹo tiết kiệm:</b>
- Đặt nhiệt độ 25-27°C (không quá thấp)
- Vệ sinh máy lạnh định kỳ 3-6 tháng
- Đóng cửa, rèm kín khi bật máy
- Tắt máy trước 30 phút khi ra khỏi phòng
- Sử dụng quạt kết hợp để không khí lưu thông

<b>Tiết kiệm:</b> Mỗi độ C tăng lên tiết kiệm khoảng 3-5% điện năng

<h2>4. Tối Ưu Hóa Tủ Lạnh</h2>
Tủ lạnh hoạt động 24/7, cần sử dụng hiệu quả.

<b>Cách làm:</b>
- Không để quá đầy hoặc quá thưa
- Kiểm tra gioăng cửa, thay nếu hỏng
- Vệ sinh dàn nóng phía sau 3-6 tháng
- Không mở cửa quá lâu hoặc quá thường xuyên
- Để tủ lạnh cách tường ít nhất 10cm

<b>Nhiệt độ lý tưởng:</b> Ngăn lạnh 3-4°C, ngăn đông -18°C

<h2>5. Giặt Quần Áo Thông Minh</h2>
Máy giặt cũng tiêu thụ nhiều điện, đặc biệt khi giặt nước nóng.

<b>Mẹo tiết kiệm:</b>
- Giặt đầy máy, không giặt ít quần áo
- Sử dụng chế độ giặt nước lạnh
- Chọn chương trình giặt ngắn nếu không quá bẩn
- Vắt khô trước khi sấy
- Phơi ngoài trời thay vì dùng máy sấy

<h2>6. Nấu Ăn Hiệu Quả</h2>
<b>Với bếp điện/từ:</b>
- Đậy nắp khi nấu để giữ nhiệt
- Dùng nồi áp suất cho món kho, hầm
- Tắt bếp trước 5 phút, dùng nhiệt dư
- Chọn nồi đúng kích thước với bếp

<b>Với nồi cơm điện:</b>
- Rút phích cắm sau khi nấu xong
- Không giữ ấm quá lâu

<h2>7. Cách Ly Nhiệt Cho Nhà</h2>
Giảm nhiệt độ trong nhà tự nhiên:
- Dán phim cách nhiệt cho cửa kính
- Trồng cây xanh quanh nhà
- Sử dụng rèm dày, màu sáng
- Sơn mái nhà màu sáng phản chiếu nhiệt

<h2>8. Sử Dụng Thiết Bị Tiết Kiệm Điện</h2>
Khi mua mới, chọn thiết bị:
- Có nhãn Energy Star hoặc 4-5 sao tiết kiệm điện
- Công suất phù hợp với nhu cầu
- Inverter cho điều hòa, tủ lạnh

<h2>9. Theo Dõi Mức Tiêu Thụ Điện</h2>
- Ghi chép chỉ số điện hàng tháng
- So sánh với các tháng trước
- Phát hiện bất thường sớm
- Sử dụng app quản lý điện năng

<h2>10. Giáo Dục Mọi Người</h2>
- Nâng cao ý thức tiết kiệm điện cho cả gia đình
- Tắt đèn khi ra khỏi phòng
- Không lãng phí nước nóng
- Ưu tiên ánh sáng tự nhiên ban ngày

<h2>Kết Quả Mong Đợi</h2>
Áp dụng đầy đủ các mẹo trên, bạn có thể:
- Tiết kiệm 20-30% hóa đơn tiền điện
- Kéo dài tuổi thọ thiết bị
- Góp phần bảo vệ môi trường
- Sử dụng điện an toàn hơn

Hãy bắt đầu từ hôm nay để thấy sự khác biệt trên hóa đơn tiền điện tháng sau!',
  'Những cách đơn giản giúp giảm thiểu hóa đơn tiền điện hàng tháng mà vẫn đảm bảo sinh hoạt thoải mái. Tiết kiệm đến 30% chi phí điện năng.',
  'Mẹo Vặt',
  'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=400&h=300&fit=crop',
  2
),
(
  'Chạy Bộ Mỗi Ngày: Lợi Ích và Cách Tập Đúng',
  'Chạy bộ là một trong những hình thức tập luyện đơn giản nhất nhưng mang lại nhiều lợi ích tuyệt vời cho sức khỏe. Hãy cùng tìm hiểu cách tập chạy bộ đúng kỹ thuật và an toàn.

<h2>Lợi Ích Của Chạy Bộ</h2>

<h3>1. Cải Thiện Sức Khỏe Tim Mạch</h3>
- Tăng cường sức khỏe tim phổi
- Giảm nguy cơ bệnh tim mạch, đột quỵ
- Cải thiện tuần hoàn máu
- Giảm huyết áp

<h3>2. Kiểm Soát Cân Nặng</h3>
- Đốt cháy 300-600 calories/giờ
- Tăng chuyển hóa cơ bản
- Giảm mỡ thừa hiệu quả
- Duy trì cân nặng lý tưởng

<h3>3. Tăng Cường Cơ Xương Khớp</h3>
- Xây dựng cơ bắp chân, mông
- Tăng mật độ xương
- Cải thiện độ linh hoạt khớp
- Phòng ngừa loãng xương

<h3>4. Cải Thiện Tâm Trạng</h3>
- Giải phóng endorphin (hormone hạnh phúc)
- Giảm căng thẳng, lo âu
- Cải thiện chất lượng giấc ngủ
- Tăng sự tự tin

<h2>Kỹ Thuật Chạy Bộ Đúng</h2>

<h3>1. Tư Thế Cơ Thể</h3>
- <b>Đầu:</b> Nhìn thẳng phía trước, không cúi xuống
- <b>Vai:</b> Thả lỏng, không căng cứng
- <b>Lưng:</b> Thẳng, hơi nghiêng về phía trước
- <b>Tay:</b> Gập 90 độ, vung tự nhiên
- <b>Hông:</b> Ổn định, không xoay quá mức
- <b>Chân:</b> Bước nhẹ nhàng, tiếp đất ở giữa bàn chân

<h3>2. Nhịp Thở</h3>
- Thở bằng cả mũi và miệng
- Nhịp 2-2: Hít 2 bước, thở ra 2 bước
- Thở sâu từ bụng, không thở nông
- Duy trì nhịp thở đều đặn

<h3>3. Nhịp Độ</h3>
- Bắt đầu chậm, tăng dần
- Có thể nói chuyện được khi chạy
- Khoảng 150-180 bước/phút
- Lắng nghe cơ thể, không ép quá sức

<h2>Lịch Tập Cho Người Mới</h2>

<h3>Tuần 1-2: Làm Quen</h3>
- Chạy 10-15 phút mỗi lần
- 3 lần/tuần
- Xen kẽ chạy - đi bộ
- Tập trung vào kỹ thuật

<h3>Tuần 3-4: Nâng Cao</h3>
- Chạy 20-25 phút
- 3-4 lần/tuần
- Giảm thời gian đi bộ
- Tăng tốc độ nhẹ

<h3>Tuần 5-8: Ổn Định</h3>
- Chạy 30-40 phút
- 4-5 lần/tuần
- Chạy liên tục
- Thay đổi cung đường

<h3>Sau 8 Tuần</h3>
- Chạy 45-60 phút
- 5 lần/tuần
- Thêm chạy nước rút
- Tham gia giải chạy 5K, 10K

<h2>Những Lưu Ý Quan Trọng</h2>

<h3>1. Khởi Động Và Giãn Cơ</h3>
- Khởi động 5-10 phút: đi bộ nhanh, chạy nhẹ
- Giãn cơ sau khi chạy 10 phút
- Tập trung vào chân, đùi, bắp chân

<h3>2. Trang Phục Phù Hợp</h3>
- Giày chạy bộ chuyên dụng
- Quần áo thể thao thoáng mát
- Vớ chạy bộ chống trầy
- Đồ phản quang nếu chạy tối

<h3>3. Dinh Dưỡng</h3>
- Ăn nhẹ trước 1-2 giờ: chuối, yến mạch
- Uống nước đầy đủ
- Bổ sung protein sau khi tập
- Không tập khi đói hoặc quá no

<h3>4. Nghỉ Ngơi</h3>
- Ngủ đủ 7-8 tiếng/đêm
- Nghỉ ít nhất 1-2 ngày/tuần
- Massage, ngâm nước ấm thư giãn
- Thay đổi cường độ tập luyện

<h2>Phòng Tránh Chấn Thương</h2>

1. <b>Không tăng cường độ đột ngột:</b> Tăng không quá 10% mỗi tuần
2. <b>Lắng nghe cơ thể:</b> Nghỉ ngơi khi đau hoặc mệt
3. <b>Chạy trên mặt phẳng:</b> Tránh đường gồ ghề, dốc cao
4. <b>Thay giày định kỳ:</b> Sau 500-800 km
5. <b>Tập bổ trợ:</b> Squat, plank, yoga

<h2>Khi Nào Nên Tránh Chạy Bộ</h2>
- Bị chấn thương khớp, cơ
- Đau tim, huyết áp cao không kiểm soát
- Sốt, nhiễm trùng
- Thời tiết quá xấu (mưa to, nóng quá 35°C)
- Đường trơn trượt, nguy hiểm

<h2>Lời Khuyên Từ Chuyên Gia</h2>
- Bắt đầu từ từ, không vội vàng
- Đặt mục tiêu thực tế
- Tìm bạn đồng hành để tạo động lực
- Ghi chép quá trình tiến bộ
- Tham gia cộng đồng runner
- Tận hưởng quá trình, không so sánh với người khác

Chạy bộ đều đặn sẽ mang lại những thay đổi tích cực cho cả thể chất lẫn tinh thần. Hãy bắt đầu ngay hôm nay!',
  'Tìm hiểu về những lợi ích tuyệt vời của việc chạy bộ đều đặn và cách thực hiện bài tập chạy bộ đúng kỹ thuật để tránh chấn thương và đạt hiệu quả cao nhất.',
  'Thể Thao',
  'https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?w=400&h=300&fit=crop',
  4
);

-- Update user bios
UPDATE users SET bio = 'Chia sẻ kinh nghiệm sống, nấu ăn và du lịch. Yêu thích khám phá văn hóa Việt Nam và phong cách sống hiện đại.' WHERE email = 'minhanh@blog.com';
UPDATE users SET bio = 'Đầu bếp chuyên nghiệp với niềm đam mê ẩm thực Việt Nam.' WHERE email = 'thuhuong@blog.com';
UPDATE users SET bio = 'Huấn luyện viên yoga và người yêu thể thao.' WHERE email = 'tuananh@blog.com';
UPDATE users SET bio = 'Chuyên gia tổ chức và tối ưu hóa không gian sống.' WHERE email = 'lananh@blog.com';
UPDATE users SET bio = 'Travel blogger khám phá Việt Nam và thế giới.' WHERE email = 'hoangnam@blog.com';
