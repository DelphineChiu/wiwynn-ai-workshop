## 1. 專案初始化

- [x] 1.1 使用 `npm create vite@latest vehicle-mgmt -- --template react` 建立 Vite + React 專案
- [x] 1.2 安裝核心依賴：`npm install react-router-dom recharts`
- [x] 1.3 初始化 shadcn/ui：`npx shadcn@latest init`（選擇 Default style、Slate 色系、CSS variables）
- [x] 1.4 安裝 MSW v2：`npm install msw --save-dev`，執行 `npx msw init public/ --save`
- [x] 1.5 安裝 shadcn 元件：`npx shadcn@latest add button card dialog form input label select table badge`

## 2. 專案結構設定

- [x] 2.1 建立目錄結構：`src/components/ui/`、`src/pages/`、`src/mocks/`、`src/context/`、`src/lib/`
- [x] 2.2 設定 React Router：在 `src/main.jsx` 包裝 `<BrowserRouter>`，在 `src/App.jsx` 定義路由表
- [x] 2.3 建立 `src/context/AuthContext.jsx`：提供 `user`、`role`、`login()`、`logout()` 給全域使用
- [x] 2.4 建立 `src/components/ProtectedRoute.jsx`：未登入導向 `/login`，角色不足導向 `/dashboard`

## 3. MSW Mock API

- [x] 3.1 建立 `src/mocks/data.js`：定義初始假資料（5 筆車輛、5 筆員工、2 組使用者帳號 admin/user）
- [x] 3.2 建立 `src/mocks/handlers/auth.js`：實作 `POST /api/auth/login`，成功回傳 user + token，失敗回傳 401
- [x] 3.3 建立 `src/mocks/handlers/vehicles.js`：實作 GET / POST / PUT / DELETE `/api/vehicles` 及 `/api/vehicles/:id`
- [x] 3.4 建立 `src/mocks/handlers/employees.js`：實作 GET / POST / PUT / DELETE `/api/employees` 及 `/api/employees/:id`
- [x] 3.5 建立 `src/mocks/browser.js`：組合所有 handlers，export `worker`
- [x] 3.6 在 `src/main.jsx` 的 development 環境中啟動 MSW worker（`worker.start()` 後才 render）

## 4. 登入頁面（auth）

- [x] 4.1 建立 `src/pages/LoginPage.jsx`：使用 shadcn Card + Form + Input 實作登入表單
- [x] 4.2 串接 `POST /api/auth/login`，成功後呼叫 `AuthContext.login()` 並導向 `/dashboard`
- [x] 4.3 處理登入失敗：顯示錯誤訊息 Badge 或 Alert
- [x] 4.4 若已登入使用者訪問 `/login`，自動導向 `/dashboard`

## 5. 導覽列與版面

- [x] 5.1 建立 `src/components/Navbar.jsx`：左側 Logo/標題，右側導覽連結，最右側顯示使用者名稱與登出按鈕
- [x] 5.2 根據 `role` 動態顯示/隱藏「員工管理」連結（admin 才顯示）
- [x] 5.3 建立 `src/components/Layout.jsx`：包含 Navbar + `<Outlet />`，作為所有受保護頁面的外層容器

## 6. 儀表板（dashboard）

- [x] 6.1 建立 `src/pages/DashboardPage.jsx`，呼叫 `GET /api/vehicles` 取得資料
- [x] 6.2 使用 shadcn Card 元件實作三張統計卡片：車輛總數、可用車輛、使用中車輛
- [x] 6.3 新增「維修中」車輛計數卡片（status === 'maintenance'）
- [x] 6.4 使用 `shadcn add chart` 安裝圖表元件，整合 Recharts PieChart 顯示車輛狀態分佈
- [x] 6.5 整合 Recharts BarChart 顯示車輛狀態數量長條圖

## 7. 車輛管理頁（vehicle-management）

- [x] 7.1 建立 `src/pages/VehiclesPage.jsx`，呼叫 `GET /api/vehicles` 並以 shadcn Table 顯示列表
- [x] 7.2 建立 `src/components/VehicleDialog.jsx`：新增/編輯共用 Dialog，使用 shadcn Form + Input + Select（狀態選項）
- [x] 7.3 實作新增車輛：點擊「新增車輛」按鈕開啟空白 Dialog，送出後 POST `/api/vehicles` 並刷新列表
- [x] 7.4 實作編輯車輛：點擊「編輯」按鈕開啟預填 Dialog，送出後 PUT `/api/vehicles/:id` 並刷新列表
- [x] 7.5 實作刪除車輛：點擊「刪除」按鈕顯示確認 Dialog，確認後 DELETE `/api/vehicles/:id` 並刷新列表
- [x] 7.6 表單驗證：車牌號碼、品牌、型號為必填，使用 shadcn Form 的 validation 機制

## 8. 員工管理頁（employee-management）

- [x] 8.1 建立 `src/pages/EmployeesPage.jsx`，呼叫 `GET /api/employees` 並以 shadcn Table 顯示列表
- [x] 8.2 建立 `src/components/EmployeeDialog.jsx`：新增/編輯共用 Dialog
- [x] 8.3 實作新增員工：POST `/api/employees` 並刷新列表
- [x] 8.4 實作編輯員工：PUT `/api/employees/:id` 並刷新列表
- [x] 8.5 實作刪除員工：DELETE `/api/employees/:id` 並刷新列表
- [x] 8.6 表單驗證：姓名必填，Email 需符合格式

## 9. 路由整合與收尾

- [x] 9.1 在 `src/App.jsx` 完成完整路由配置：`/login`、`/dashboard`、`/vehicles`、`/employees`（後三者包裝 ProtectedRoute）
- [x] 9.2 `/employees` 路由設定 `requiredRole="admin"`，一般使用者存取時重導並提示
- [x] 9.3 新增 404 頁面，未知路由導向此頁
- [x] 9.4 在 `public/` 確認 `mockServiceWorker.js` 存在，`npm run dev` 驗證 MSW 正常啟動
- [x] 9.5 端對端手動測試：以 admin 和 user 兩組帳號測試所有頁面與 CRUD 功能
