# Auth Capability

## Purpose

身份驗證能力，負責使用者登入、登出及路由保護，確保系統安全存取控制。

## Requirements

### Requirement: 使用者登入
系統 SHALL 提供登入表單（帳號、密碼欄位），使用者送出後與 MSW 模擬的 `/api/auth/login` 比對，成功後依角色導向對應頁面。

#### Scenario: 管理者登入成功
- **WHEN** 使用者輸入 admin 帳號與正確密碼並按下登入
- **THEN** 系統將角色設為 `admin`，導向 `/dashboard`，並顯示管理者名稱

#### Scenario: 一般使用者登入成功
- **WHEN** 使用者輸入 user 帳號與正確密碼並按下登入
- **THEN** 系統將角色設為 `user`，導向 `/dashboard`

#### Scenario: 密碼錯誤
- **WHEN** 使用者輸入帳號與錯誤密碼
- **THEN** 系統顯示錯誤訊息「帳號或密碼錯誤」，不進行頁面跳轉

### Requirement: 登出
系統 SHALL 提供登出功能，清除登入狀態並導回登入頁。

#### Scenario: 使用者登出
- **WHEN** 已登入使用者點擊「登出」按鈕
- **THEN** 系統清除 AuthContext 與 sessionStorage，並導向 `/login`

### Requirement: 路由保護
系統 SHALL 在未登入時阻止存取任何受保護路由。

#### Scenario: 未登入存取受保護頁面
- **WHEN** 未登入使用者直接存取 `/dashboard` 或其他受保護路由
- **THEN** 系統自動導向 `/login`

### Requirement: 管理者專屬頁面保護
系統 SHALL 在角色不足時阻止 user 角色存取員工管理頁。

#### Scenario: 一般使用者存取員工管理頁
- **WHEN** role 為 `user` 的已登入使用者嘗試存取 `/employees`
- **THEN** 系統導向 `/dashboard` 並顯示「權限不足」提示
