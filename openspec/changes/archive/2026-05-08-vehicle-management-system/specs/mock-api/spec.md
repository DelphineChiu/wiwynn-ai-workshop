## ADDED Requirements

### Requirement: MSW 初始化
系統 SHALL 在開發環境啟動時自動啟用 MSW Service Worker，攔截所有 `/api/*` 請求。

#### Scenario: MSW 正確啟動
- **WHEN** 執行 `npm run dev`
- **THEN** 瀏覽器 console 顯示 `[MSW] Mocking enabled`，所有 `/api/*` 請求由 MSW handler 處理

### Requirement: 身份驗證 API
系統 SHALL 實作 `POST /api/auth/login`，比對預設使用者清單並回傳角色資訊。

#### Scenario: 正確帳密登入
- **WHEN** POST `/api/auth/login` 帶正確 username / password
- **THEN** 回傳 `{ user: { id, username, name, role }, token: "mock-token" }` 及 HTTP 200

#### Scenario: 錯誤帳密
- **WHEN** POST `/api/auth/login` 帶錯誤密碼
- **THEN** 回傳 `{ message: "帳號或密碼錯誤" }` 及 HTTP 401

### Requirement: 車輛 CRUD API
系統 SHALL 實作以下端點，使用 in-memory array 儲存資料：
- `GET /api/vehicles`：回傳所有車輛陣列
- `POST /api/vehicles`：新增車輛，自動產生 id
- `PUT /api/vehicles/:id`：更新指定車輛
- `DELETE /api/vehicles/:id`：刪除指定車輛

#### Scenario: 取得車輛列表
- **WHEN** GET `/api/vehicles`
- **THEN** 回傳初始假資料陣列（至少 5 筆），HTTP 200

#### Scenario: 新增車輛
- **WHEN** POST `/api/vehicles` 帶有效 body
- **THEN** 新增至 in-memory store，回傳新車輛物件，HTTP 201

#### Scenario: 更新車輛
- **WHEN** PUT `/api/vehicles/:id` 帶有效 body
- **THEN** 更新 in-memory store，回傳更新後物件，HTTP 200

#### Scenario: 刪除車輛
- **WHEN** DELETE `/api/vehicles/:id`
- **THEN** 從 in-memory store 移除，回傳 HTTP 204

### Requirement: 員工 CRUD API
系統 SHALL 實作以下端點，使用 in-memory array 儲存資料：
- `GET /api/employees`：回傳所有員工陣列
- `POST /api/employees`：新增員工，自動產生 id
- `PUT /api/employees/:id`：更新指定員工
- `DELETE /api/employees/:id`：刪除指定員工

#### Scenario: 取得員工列表
- **WHEN** GET `/api/employees`
- **THEN** 回傳初始假資料陣列（至少 5 筆），HTTP 200

#### Scenario: 新增員工
- **WHEN** POST `/api/employees` 帶有效 body
- **THEN** 新增至 in-memory store，回傳新員工物件，HTTP 201

#### Scenario: 更新員工
- **WHEN** PUT `/api/employees/:id` 帶有效 body
- **THEN** 更新 in-memory store，回傳更新後物件，HTTP 200

#### Scenario: 刪除員工
- **WHEN** DELETE `/api/employees/:id`
- **THEN** 從 in-memory store 移除，回傳 HTTP 204
