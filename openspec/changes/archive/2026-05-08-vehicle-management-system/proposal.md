## Why

企業車隊管理缺乏統一的數位化工具，導致車輛狀態追蹤與員工指派流程混亂，需要一套以角色權限區分的管理介面，提升車隊調度效率。

## What Changes

- 新增登入頁面，支援帳號密碼驗證並區分管理者（admin）與一般使用者（user）角色
- 新增首頁儀表板，顯示車輛數量、可用車輛、使用中車輛等關鍵指標卡片，並附統計圖表
- 新增車輛管理頁，支援查看、新增、編輯、刪除車輛資料（所有登入使用者可用）
- 新增員工管理頁，支援查看、新增、編輯、刪除員工資料（**僅管理者可存取**）
- 使用 MSW（Mock Service Worker）模擬後端 API，無需真實後端即可運行

## Capabilities

### New Capabilities

- `auth`: 登入頁面與身份驗證，角色區分（admin / user），登出功能，路由保護
- `dashboard`: 儀表板首頁，關鍵數據卡片（車輛總數、可用數、使用中），Bar/Pie 圖表統計
- `vehicle-management`: 車輛列表、新增車輛、編輯車輛、刪除車輛的 CRUD 操作
- `employee-management`: 員工列表、新增員工、編輯員工、刪除員工，僅管理者角色可存取
- `mock-api`: MSW handler 模擬所有 API 端點，提供假資料與 CRUD 邏輯

### Modified Capabilities

（無現有 Capability 需要修改）

## Impact

- **新建 React 應用**：Vite + React，搭配 shadcn/ui（Tailwind CSS）
- **前端路由**：React Router v6，含受保護路由（ProtectedRoute）
- **狀態管理**：React Context 管理登入狀態與角色
- **Mock API**：MSW v2，攔截 `/api/*` 請求
- **圖表**：Recharts（與 shadcn/ui 整合）
- **無後端依賴**：所有資料由 MSW 的 in-memory store 提供
