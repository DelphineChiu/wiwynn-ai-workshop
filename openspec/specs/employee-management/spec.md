# Employee Management Capability

## Purpose

員工管理能力（管理者限定），提供員工列表檢視及完整的 CRUD 操作（新增、編輯、刪除），僅限 admin 角色存取。

## Requirements

### Requirement: 員工列表（管理者限定）
系統 SHALL 在 `/employees` 以表格形式顯示所有員工資料，欄位包含：姓名、部門、職稱、Email、電話、操作按鈕。此頁面 MUST 僅限 admin 角色存取。

#### Scenario: 管理者查看員工列表
- **WHEN** admin 角色使用者進入 `/employees`
- **THEN** 系統呼叫 GET `/api/employees`，以表格顯示所有員工，含編輯與刪除按鈕

#### Scenario: 一般使用者無法存取
- **WHEN** user 角色使用者嘗試進入 `/employees`
- **THEN** 系統導向 `/dashboard` 並顯示權限不足訊息

### Requirement: 新增員工
系統 SHALL 提供新增員工的對話框，填寫後 POST 至 `/api/employees`。

#### Scenario: 成功新增員工
- **WHEN** admin 使用者點擊「新增員工」，填寫完整資料後送出
- **THEN** 系統呼叫 POST `/api/employees`，列表即時新增該筆資料，對話框關閉

#### Scenario: Email 格式驗證
- **WHEN** admin 使用者輸入格式錯誤的 Email 後送出
- **THEN** 系統顯示 Email 格式錯誤提示，不送出請求

### Requirement: 編輯員工
系統 SHALL 提供編輯員工的對話框，預填現有資料，送出後 PUT 至 `/api/employees/:id`。

#### Scenario: 成功編輯員工
- **WHEN** admin 使用者點擊某筆員工的「編輯」，修改資料後送出
- **THEN** 系統呼叫 PUT `/api/employees/:id`，列表更新該筆資料，對話框關閉

### Requirement: 刪除員工
系統 SHALL 在使用者確認後呼叫 DELETE `/api/employees/:id` 移除員工。

#### Scenario: 確認後刪除員工
- **WHEN** admin 使用者點擊「刪除」並在確認對話框中確認
- **THEN** 系統呼叫 DELETE `/api/employees/:id`，該筆資料從列表移除
