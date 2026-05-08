## ADDED Requirements

### Requirement: 車輛列表
系統 SHALL 在 `/vehicles` 以表格形式顯示所有車輛資料，欄位包含：車牌號碼、品牌、型號、年份、狀態、操作按鈕。

#### Scenario: 顯示車輛列表
- **WHEN** 已登入使用者進入 `/vehicles`
- **THEN** 系統呼叫 GET `/api/vehicles`，並以表格顯示所有車輛，每筆資料含編輯與刪除按鈕

### Requirement: 新增車輛
系統 SHALL 提供新增車輛的對話框（Dialog），填寫後 POST 至 `/api/vehicles`。

#### Scenario: 成功新增車輛
- **WHEN** 使用者點擊「新增車輛」按鈕，填寫完整資料後送出
- **THEN** 系統呼叫 POST `/api/vehicles`，列表即時新增該筆資料，對話框關閉

#### Scenario: 表單驗證失敗
- **WHEN** 使用者送出空白必填欄位（車牌號碼、品牌、型號）
- **THEN** 系統顯示欄位錯誤提示，不送出請求

### Requirement: 編輯車輛
系統 SHALL 提供編輯車輛的對話框，預填現有資料，送出後 PUT 至 `/api/vehicles/:id`。

#### Scenario: 成功編輯車輛
- **WHEN** 使用者點擊某筆車輛的「編輯」按鈕，修改資料後送出
- **THEN** 系統呼叫 PUT `/api/vehicles/:id`，列表更新該筆資料，對話框關閉

### Requirement: 刪除車輛
系統 SHALL 在使用者確認後呼叫 DELETE `/api/vehicles/:id` 移除車輛。

#### Scenario: 確認後刪除車輛
- **WHEN** 使用者點擊「刪除」並在確認對話框中確認
- **THEN** 系統呼叫 DELETE `/api/vehicles/:id`，該筆資料從列表移除

#### Scenario: 取消刪除
- **WHEN** 使用者點擊「刪除」後在確認對話框中取消
- **THEN** 系統不執行刪除，列表保持不變
