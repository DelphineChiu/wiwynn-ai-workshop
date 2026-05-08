## Context

這是一個全新的前端應用程式，使用 Vite + React + shadcn/ui 建立，無現有程式碼需遷移。目標為最小可行性（MVP）實作，以 MSW 模擬後端，讓示範與開發可在純前端環境中進行。

## Goals / Non-Goals

**Goals:**
- 完整的角色型存取控制（RBAC）：admin 可存取所有頁面，user 無法進入員工管理頁
- 使用 shadcn/ui 元件庫提供一致、專業的 UI 風格
- MSW v2 攔截所有 `/api/*` 請求，含 CRUD in-memory 模擬
- React Router v6 受保護路由機制
- 儀表板圖表使用 Recharts（shadcn chart 元件）

**Non-Goals:**
- 真實後端 API 或資料庫
- 單元測試 / E2E 測試
- i18n 多語系（預設中文 UI）
- 分頁、搜尋、排序的進階功能
- 密碼加密（MVP 使用明文比對模擬）

## Decisions

### D1：前端框架 — Vite + React

**選擇 Vite** 取代 CRA，因為啟動速度快、設定簡潔，且與 shadcn/ui 官方推薦一致。

### D2：UI 元件 — shadcn/ui（Tailwind CSS）

shadcn/ui 提供可直接複製至專案的元件（非外部依賴），搭配 Tailwind CSS class，適合快速建構。使用 `shadcn@latest` CLI 初始化並按需安裝元件（Button、Card、Dialog、Table、Form、Input 等）。

### D3：Mock API — MSW v2

**選擇 MSW** 而非 json-server 或假 fetch，因為：
- 在 Service Worker 層攔截，不修改應用程式程式碼
- 支援 browser 環境（`setupWorker`）
- handlers 可模擬完整 REST 行為（GET/POST/PUT/DELETE）
- In-memory array 作為假資料庫，重整後重置符合 demo 需求

### D4：狀態管理 — React Context

規模較小，不引入 Redux 或 Zustand。`AuthContext` 儲存 `{ user, role, token }`，登入後持久化到 `sessionStorage`，頁面重整後保持登入狀態。

### D5：路由保護 — ProtectedRoute 元件

```
ProtectedRoute({ requiredRole? })
  ├─ 未登入 → redirect /login
  └─ role 不符 → redirect /403 或 /dashboard
```

### D6：資料模型

**車輛（Vehicle）**
```
{ id, plateNumber, brand, model, year, status: 'available'|'in-use'|'maintenance', assignedTo? }
```

**員工（Employee）**
```
{ id, name, department, position, email, phone }
```

**使用者（User，僅 MSW 內部）**
```
{ id, username, password, role: 'admin'|'user', name }
```

### D7：圖表 — Recharts via shadcn Chart

儀表板使用 shadcn 的 `<ChartContainer>` 包裝 Recharts，呈現：
- BarChart：各部門車輛使用狀況
- PieChart：車輛狀態分佈（available / in-use / maintenance）

## Risks / Trade-offs

| 風險 | 緩解策略 |
|------|---------|
| MSW 在某些瀏覽器隱私模式下 Service Worker 可能無法啟動 | 添加 fallback 提示，開發時使用 Chrome |
| shadcn/ui 需手動安裝各元件，初始設定步驟較多 | tasks.md 中逐步列出所需 `shadcn add` 指令 |
| sessionStorage 登入狀態在多 tab 間不共享 | MVP 可接受，非需求範圍 |
| In-memory 假資料重整後消失 | 符合 demo 預期行為，無需修正 |

## Migration Plan

全新應用，無遷移需求。部署步驟：
1. `npm create vite@latest` 初始化
2. 安裝 shadcn/ui、MSW、React Router、Recharts
3. 執行 `npx msw init public/` 產生 service worker
4. `npm run dev` 啟動開發伺服器

## Open Questions

- 預設帳號資料：MVP 中 admin/admin123 及 user/user123 硬編碼於 MSW handler，是否符合需求？ → 假設是
- 車輛「指派員工」是否需要關聯選擇器？ → MVP 以文字輸入，非關聯選擇
