# Build with AI — 課程範例專案

這是一個 AI 課程的範例專案，用於學習 **OpenSpec 規格驅動開發**與 **Agent Skills** 的實際應用。

課程講義：[deanlin.net/course/wiwynn](https://deanlin.net/course/wiwynn)

---

## 專案簡介

此 repo 包含兩個子專案：

| 子專案 | 說明 |
|--------|------|
| **根目錄** | Node.js ESM 練習專案，含刻意設計的 ESLint 違規與失敗測試，用於體驗 AI 輔助修正流程 |
| **`vehicle-mgmt/`** | 課程主交付物 — 以 React + shadcn/ui 建構的車輛管理 SPA，含角色型存取控制 |

### vehicle-mgmt 功能

- **登入頁面** — 帳號密碼驗證，區分 `admin`（管理者）與 `user`（一般使用者）
- **儀表板** — 車輛統計卡片（總數／可用／使用中／維修中）+ PieChart / BarChart
- **車輛管理** — 查看、新增、編輯、刪除車輛（所有登入使用者）
- **員工管理** — 查看、新增、編輯、刪除員工（僅 admin）

所有 API 由 **MSW v2**（Mock Service Worker）模擬，無需真實後端。

---

## 啟動方式

### 前置需求

- Node.js >= 20

### 根目錄（練習專案）

```bash
npm install
npm run lint      # 執行 ESLint
npm test          # 執行 Jest 測試
```

### vehicle-mgmt（車輛管理 SPA）

```bash
cd vehicle-mgmt
npm install
npm run dev       # 啟動開發伺服器 → http://localhost:5173
```

**預設帳號**

| 帳號 | 密碼 | 角色 |
|------|------|------|
| `admin` | `admin123` | 管理者（全功能存取） |
| `user` | `user123` | 一般使用者（儀表板 + 車輛管理） |

---

## 關於 Agent Skills

專案內建的 Skills 放置於 `.claude/skills/` 目錄下，使用 [Claude Code](https://claude.ai/code) 並輸入 `/` 即可看到可用清單。

### 內建 Skills

| Skill | 說明 |
|-------|------|
| `git-smart-commit` | 將雜亂的 git 變更依功能邏輯自動拆分成多個有意義的 conventional commit |
| `git-pr-description` | 根據 branch 差異自動產生 Pull Request 的 Title 與 Description |
| `gen-test-cases` | 根據選取的程式碼或功能範圍，自動產生測試案例與對應測試程式 |
| `git-branch-name` | 根據變更內容，設計符合 kebab-case 命名規則的名稱 |

### OpenSpec 規格驅動開發

本專案使用 [OpenSpec](https://openspec.dev) 進行規格驅動開發。規格文件存放於 `openspec/` 目錄：

```
openspec/
├── config.yaml          # 專案 context 與 artifact 規則
├── specs/               # 各 capability 的主規格（已歸檔變更後同步）
└── changes/
    └── archive/         # 已完成的變更歸檔
```

常用指令：`/opsx:propose`、`/opsx:apply`、`/opsx:verify`、`/opsx:archive`
