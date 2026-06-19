# Jenna Birthday — Plan

Quà sinh nhật cho Jenna. Web app 3 trang, vibe lãng mạn, tông màu trắng hồng.

## Tech stack

- React + Vite + TypeScript
- React Router (điều hướng giữa các trang)

## Luồng người dùng

```
LoginPage → QuestionsPage → MemoriesPage
```

1. Đăng nhập bằng username/password (hardcode)
2. Trả lời ~10 câu hỏi về 2 đứa
3. Xem kỷ niệm theo timeline (ảnh + clip)

---

## 1. LoginPage (`/`)

### Mục tiêu
Cổng vào app — không phải auth thật, chỉ là “cửa bí mật” cho Jenna.

### Yêu cầu
- Username và password **hardcode** trong code
- Có **hint** trên UI để Jenna đoán được username và password
- Đăng nhập đúng → chuyển sang `/questions`
- Đăng nhập sai → hiện thông báo nhẹ nhàng

### TODO
- [ ] Chọn username/password và viết hint (inside joke, ngày kỷ niệm, nickname, ...)
- [ ] UI form: username, password, nút đăng nhập
- [ ] Styling trắng hồng, lãng mạn
- [ ] Logic kiểm tra credentials
- [ ] Lưu trạng thái đã đăng nhập (sessionStorage) để refresh không bị đá về login

---

## 2. QuestionsPage (`/questions`)

### Mục tiêu
Quiz ngắn về mối quan hệ — khoảng **10 câu hỏi**.

### Yêu cầu
- Câu hỏi về 2 đứa (kỷ niệm, sở thích, khoảnh khắc đặc biệt, ...)
- Hiển thị từng câu hoặc danh sách có progress
- Hoàn thành quiz → chuyển sang `/memories`

### TODO
- [ ] Soạn ~10 câu hỏi + đáp án (multiple choice hoặc tự luận ngắn)
- [ ] File data: `src/data/questions.ts`
- [ ] UI câu hỏi + progress bar
- [ ] Logic chấm điểm / chuyển câu
- [ ] Animation hoặc message khi hoàn thành
- [ ] Chặn truy cập nếu chưa login

---

## 3. MemoriesPage (`/memories`)

### Mục tiêu
Trang chính — gallery kỷ niệm theo **timeline**.

### Yêu cầu
- Ảnh và clip của 2 đứa
- Sắp xếp theo thời gian (timeline dọc hoặc ngang)
- Mỗi mốc: ngày, tiêu đề ngắn, ảnh và/hoặc video

### TODO
- [ ] Thu thập ảnh → `public/images/`
- [ ] Thu thập clip → `public/clips/`
- [ ] File data: `src/data/memories.ts` (ngày, title, mô tả, đường dẫn media)
- [ ] UI timeline
- [ ] Lightbox / modal xem ảnh phóng to
- [ ] Player cho video clip
- [ ] Lời chúc sinh nhật cuối trang
- [ ] Chặn truy cập nếu chưa hoàn thành quiz (tuỳ chọn)

---

## Design — Vibe lãng mạn, trắng hồng

### Palette gợi ý
| Màu | Dùng cho |
|-----|----------|
| `#FFFFFF` | Nền chính |
| `#FFF5F7` | Nền phụ / card |
| `#F8BBD9` | Accent nhạt |
| `#E91E8C` hoặc `#FF69B4` | Accent đậm, button |
| `#4A4A4A` | Text chính |

### Typography gợi ý
- Font chữ mềm, dễ đọc (vd: *Playfair Display* cho tiêu đề, *Nunito* cho body)
- Bo góc mềm, shadow nhẹ
- Icon/trang trí: trái tim, hoa, sparkle (tuỳ chọn)

### TODO
- [ ] CSS variables trong `src/styles/variables.css`
- [ ] Responsive mobile-first (Jenna có thể mở trên điện thoại)

---

## Cấu trúc thư mục

```
jenna-birthday/
├── PLAN.md                 ← file này
├── public/
│   ├── images/             ← ảnh kỷ niệm
│   └── clips/              ← video clip
├── src/
│   ├── pages/
│   │   ├── LoginPage/
│   │   ├── QuestionsPage/
│   │   └── MemoriesPage/
│   ├── data/               ← questions.ts, memories.ts (sẽ tạo sau)
│   ├── styles/             ← theme, variables (sẽ tạo sau)
│   ├── App.tsx
│   └── main.tsx
```

---

## Deploy

- [ ] Push lên GitHub
- [ ] Deploy Vercel / Netlify (miễn phí)
- [ ] Gửi link cho Jenna vào ngày sinh nhật 🎂

---

## Ghi chú

- Đây là app cá nhân, không cần backend hay bảo mật thật
- Hardcode credentials là đủ — ai inspect code cũng thấy được, không sao
- Ưu tiên trải nghiệm trên mobile
