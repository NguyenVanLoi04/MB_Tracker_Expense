# 💰 Expense Tracker Mobile - Premium Edition

Ứng dụng quản lý tài chính cá nhân toàn diện được xây dựng trên nền tảng **React Native (Expo)**. Dự án này áp dụng các kỹ thuật lập trình hiện đại, cấu trúc lớp rõ ràng và giao diện người dùng cao cấp.

---

## 🛠️ Danh sách thư viện đầy đủ (Dependencies)

Dự án được xây dựng dựa trên các thư viện chuyên dụng sau:

### ⚙️ Lõi ứng dụng (Core)

- **Expo SDK 54**: Nền tảng phát triển ứng dụng mobile đa nền tảng tốt nhất hiện nay.
- **React 19 & React Native 0.81**: Sử dụng phiên bản mới nhất để tối ưu hiệu năng.
- **Expo Router 6.0**: Hệ thống định tuyến (Routing) dựa trên File-system tương tự Next.js.
- **TypeScript 5.9**: Đảm bảo an toàn kiểu dữ liệu (Type-safety) toàn dự án.

### 🎨 Giao diện & Trải nghiệm (UI/UX)

- **Lucide React Native**: Cung cấp bộ icon dạng vector hiện đại.
- **React Native Reanimated**: Thư viện xử lý chuyển động cực kỳ mạnh mẽ, chạy ở Thread gốc để đảm bảo độ mượt 60fps.
- **Expo Font**: Quản lý và nạp các tùy chỉnh font chữ.
- **@react-navigation/native**: Nền tảng quản lý điều hướng giữa các màn hình.
- **Canvas/SVG**: Sử dụng cho biểu đồ chi tiêu trực quan.

### 💾 Xử lý dữ liệu & Tiện ích (Data & Utilities)

- **@react-native-async-storage/async-storage**: Hệ thống lưu trữ key-value cục bộ để lưu giao dịch.
- **Date-fns 4.1**: Thư viện xử lý ngày tháng mạnh mẽ nhất cho JavaScript.
- **Expo Haptics**: Tạo phản hồi xúc giác (rung nhẹ) khi người dùng tương tác.
- **React Context API**: Quản lý trạng thái toàn cục (Global State) đơn giản và hiệu quả.

---

## 🏗️ Cấu trúc dự án (Project Architecture) & Hướng dẫn Vị trí Thư mục (Folder Structure)

Dự án tuân thủ mô hình **Layered Architecture (Kiến trúc phân lớp)** để tách biệt tuyệt đối Logic và View, đồng thời sử dụng hệ thống **Expo Router (File-based Routing)**. Dưới đây là kiến trúc chi tiết giúp bạn hiểu chính xác **mỗi file và folder cần được đặt ở đâu**:

```text
myApp/
├── app/                      # 🚦 Hệ thống Routing (File-based như Next.js)
│   ├── (tabs)/               # Các màn hình chính có Bottom Navigation
│   │   ├── _layout.tsx       # Cấu hình Bottom Tabs: Icon, Label, Màu sắc.
│   │   ├── index.tsx         # Tab Trang chủ (Dashboard tóm tắt)
│   │   ├── explore.tsx       # Tab Lịch sử giao dịch chi tiết
│   │   └── settings.tsx      # Tab Cài đặt (Đổi theme, reset data,...)
│   ├── _layout.tsx           # FILE QUAN TRỌNG NHẤT: Bọc toàn bộ App, Providers, Splash Screen!
│   ├── +not-found.tsx        # Màn hình lỗi 404
│   └── modal.tsx             # Route dạng màn hình Modal (đẩy lên từ dưới)
│
├── src/                      # 🧠 Mã nguồn thực thi (Tất cả logic code ở đây)
│   ├── components/           # UI Components (Dùng chung) - Theo Atomic Design
│   │   ├── AppSplashScreen.tsx # Màn hình chào đặc chế với Animation (Đọc kỹ phần Splash Green bên dưới)
│   │   ├── AddTransactionModal.tsx # Form thêm chi tiêu, tái sử dụng trên nhiều tab
│   │   ├── SpendingChart.tsx     # Biểu đồ Canvas/SVG
│   │   ├── SummaryCard.tsx       # Các thẻ hiển thị tổng tiền, thu, chi
│   │   ├── TransactionItem.tsx   # Item render một hàng chi tiêu
│   │   └── Icon.tsx              # Component gói gọn thư viện lucide-react-native
│   │
│   ├── context/              # Quản lý State toàn cục (Data Flow)
│   │   └── ExpenseContext.tsx  # "Trái tim" bộ nhớ: Lưu mảng giao dịch, hàm thêm/xóa/sửa
│   │
│   ├── services/             # Giao tiếp với External Data (LocalStorage, API)
│   │   └── storage.service.ts  # Hàm tương tác trực tiếp Async Storage (Save/Load JSON)
│   │
│   ├── hooks/                # Custom React Hooks
│   │   ├── useExpense.ts       # Rút gọn việc dùng ExpenseContext (Bảo mật context)
│   │   ├── useDashboard.ts     # Tính toán Analytics (Biểu đồ, tổng chi), tách biệt với UI
│   │   └── use-color-scheme.ts # Lấy Dark/Light mode của thiết bị
│   │
│   ├── constants/            # Các cấu hình tĩnh, không thay đổi (Hard-coded)
│   │   ├── theme.ts            # Design System Tối thượng: Lưu config Color (.primary, .white), Spacing, Radius
│   │   └── categories.ts       # Metadata Phân loại giao dịch (Tên/Icon/Màu)
│   │
│   ├── types/                # Hợp đồng dữ liệu (TypeScript Interfaces)
│   │   └── index.ts            # Khai báo kiểu: Transaction, Budget, Category...
│   │
│   └── utils/                # Hàm Helper đa năng (Thuần JS/TS, không dính tới View/Hooks)
│       └── index.ts            # Hàm format VND (`formatCurrency`), format Ngày (`formatDate`)
│
├── assets/                   # 🖼️ Nơi chứa file vật lý tĩnh không phải code
│   ├── fonts/                # Các file .ttf. .otf (nếu có)
│   └── images/               # Ảnh biểu tượng app, icon png,...
```

---

## 🎨 Cấu trúc Component Layout Chuẩn Mực

Với Expo Router, **Layout (`_layout.tsx`)** là trung tâm quyết định khung hiển thị cho mỗi thư mục. Dự án thiết kế Layout theo nguyên lý lồng nhau (Nested Layout):

### 1. Root Layout (`app/_layout.tsx`)

**Nhiệm vụ:**

- Quản lý quá trình tải Fonts, Assets và hiển thị màn hình **Splash Screen**.
- Khởi tạo Data từ Local Storage ngay khi app mở.
- Bọc toàn App bằng các Providers (`ExpenseProvider`, `ThemeProvider`).
- Đóng gói UI theo mô hình Stack Navigation: Đưa thư mục `(tabs)` làm màn hình chính dạng Stack.

```tsx
<ExpenseProvider> <!-- Trạng thái Toàn cục 1 -->
  <ThemeProvider> <!-- Trạng thái Toàn cục 2 -->
    <Stack> <!-- Định tuyến luồng chính -->
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
    </Stack>
  </ThemeProvider>
</ExpenseProvider>
```

### 2. Tabs Layout (`app/(tabs)/_layout.tsx`)

**Nhiệm vụ:**

- Sử dụng thẻ `<Tabs>` bọc xung quanh tất cả các file trong thư mục `(tabs)`.
- Định nghĩa thanh menu dưới đáy màn hình (Bottom Navigation Bar).
- Cấu hình Icon cho Tab (_Home_, _Chart_, _Settings_), màu chữ lúc được chọn (Active Color) hoặc không (Inactive Color).

**💡 Nguyên tắc thả File và Folder chuẩn:**

- Muốn tạo màn hình lớn hiển thị toàn màn hình -> Tạo file ở trong `app/` hoặc `app/(tabs)/`.
- Muốn tái sử dụng lại giao diện giữa các màn hình -> Tạo component nhỏ tại `src/components/`, gọi ra dùng ở files trên.
- Muốn tạo logic xử lý riêng (fetch data, tính toán phức tạp) -> Tạo file trong `src/hooks/` hoặc `src/utils/` rồi gọi ra xử lý. TUYỆT ĐỐI không viết logic dài hơn 100 dòng bên trong file của thư mục `app/` để tránh rối code.

---

## ✨ Cấu trúc màn hình "Splash Screen" (Có thể đang bị hiểu nhầm thành thuật ngữ _flashGreen_)

Màn hình chào (Splash Screen - thường bị gõ/nhầm âm thành "flashGreen") là điểm chạm đầu tiên của người dùng, mang lại "Premium feel" (Cảm giác cao cấp) cho App. Quá trình hoạt động và cấu trúc của màn hình chào nằm tại thẻ `AppSplashScreen.tsx`:

### 1. Logic ngăn chặn chớp tắt (Prevent Auto-Hide) ở Root

- Tại `app/_layout.tsx`, hàm `SplashScreen.preventAutoHideAsync()` được gọi lên sớm nhất để giữ màn hình hệ thống lâu hơn, đảm bảo thời gian cho App tải xong CSDL, fonts, các setting cần thiết trước khi vô luồng chính.

### 2. Cấu trúc Animations tại Component

Khác với màn hình chờ mặc định đứng im, dự án tùy biến sâu luồng Animation chạy đa luồng (`Animated.parallel`) bằng thư viện `Animated`:

- `fadeAnim`: Làm Logo và Text **mờ dần sang rõ** (Opacity từ 0.0 -> 1.0) chậm rãi khoảng 0.8 giây.
- `scaleAnim`: Phóng to Logo nhè nhẹ từ 0.8x lên 1.0x kèm hiệu ứng nảy đàn hồi (spring friction).
- `slideAnim`: Giao diện tự động đẩy từ dưới lên kết hợp với Opacity tạo cảm giác "nổi trôi" mượt mà mướt mắt.
- `loadingAnim`: Một thanh progress bar hiệu ứng ảo (**Vô hạn**) chạy chéo bên dưới (Từ trái dạt sang phải) tạo cảm giác ứng dụng đang làm việc tích cực.

### 3. Vòng đời hoạt động (Lifecycle)

**Bước 1**: Mở app -> Gọi `SplashScreen.preventAutoHideAsync()`.
**Bước 2**: App gọi `AppSplashScreen` lập tức Start chuỗi Animations êm mượt giúp UI che giấu quá trình tải font (có chờ bắt buộc 2 giây tạo độ tin cậy Premium).
**Bước 3**: Khi mọi thứ tải xong xuôi, biến `appReady` thành `true`, Splash Screen Component được Hide Async gỡ khỏi luồng DOM -> Component Root chính tiếp tục render các File Layout trả về nội dung ứng dụng thật mà không bị giật lag.

---

## ✍️ Định dạng Code & Quy chuẩn (Coding Format)

Dự án áp dụng các quy chuẩn nghiêm ngặt để code sạch (Clean Code):

### 1. **Kiến trúc thành phần (Component Standards)**

- **Functional Components**: 100% sử dụng React Hooks (không dùng Class components).
- **Naming Convention**:
  - **PascalCase**: Cho File và Tên Component (VD: `TransactionItem.tsx`).
  - **camelCase**: Cho hàm, biến và hooks (VD: `handlePress`, `useExpense`).
  - **UPPER_SNAKE_CASE**: Cho hằng số (VD: `COLORS.PRIMARY`).

### 2. **Lưu trữ & Dữ liệu (State Management Standard)**

- **Unidirectional Data Flow**: Dữ liệu chỉ chảy một chiều từ Context xuống các Component con. Component chỉ gửi Action (Dispatch) lên Context để thay đổi dữ liệu.
- **Custom Hooks over Context**: Không gọi trực tiếp `useContext` trong Component giao diện, mà thông qua các custom hooks như `useExpense` để che giấu logic phức tạp.

### 3. **Hệ thống Giao diện (Styling Format)**

- **StyleSheet.create**: Luôn sử dụng `StyleSheet` của React Native để tối ưu hóa hiệu năng render.
- **Theme-first**: Tuyệt đối không hard-code mã màu. Luôn tham chiếu từ `src/constants/theme.ts`.
- **Responsive-first**: Khoảng cách (`spacing`) và kích thước được tính toán dựa trên hệ số để hiển thị tốt trên mọi kích thước màn hình.

### 4. **Kiểm soát lỗi (Error Handling)**

- **Strict TypeScript**: Cấm sử dụng kiểu `any`. Mọi đối tượng dữ liệu phải được định nghĩa Interface rõ ràng.
- **Fail-safe Logic**: Luôn có giá trị mặc định khi xử lý dữ liệu từ storage để tránh app bị crash khi cài đặt lần đầu.

---

## 🚀 Lệnh chạy & Build

| Lệnh              | Mô tả                                                      |
| :---------------- | :--------------------------------------------------------- |
| `npm run start`   | Chạy dev mode (Expo Go)                                    |
| `npm run android` | Chạy trên thiết bị/giả lập Android                         |
| `npm run lint`    | Tự động kiểm tra và format code theo chuẩn ESLint/Prettier |
| `eas build`       | Build file APK/IPA chính thức                              |

---

_Dự án được Antigravity thiết kế để đáp ứng các tiêu chuẩn vàng của ứng dụng Mobile hiện đại._ 💎
