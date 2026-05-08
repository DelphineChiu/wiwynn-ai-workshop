# Dashboard Capability

## Purpose

儀表板能力，提供車輛統計數據卡片、圖表視覺化呈現，以及全站一致的導覽列。

## Requirements

### Requirement: 關鍵數據卡片
儀表板 SHALL 在頁面上方顯示至少三張數據卡片：車輛總數、可用車輛數、使用中車輛數。

#### Scenario: 顯示車輛統計卡片
- **WHEN** 登入使用者進入 `/dashboard`
- **THEN** 頁面上方呈現三張卡片，各自顯示正確的統計數值，數值來源為 MSW `/api/vehicles`

#### Scenario: 數值即時反映
- **WHEN** 車輛資料發生異動（新增/刪除/狀態修改）
- **THEN** 使用者重新進入儀表板時，卡片數值已更新（in-memory store）

### Requirement: 統計圖表
儀表板 SHALL 在數據卡片下方顯示至少兩種圖表呈現車輛數據分佈。

#### Scenario: 車輛狀態圓餅圖
- **WHEN** 登入使用者進入 `/dashboard`
- **THEN** 頁面顯示 PieChart 呈現 available / in-use / maintenance 的數量比例，並附圖例

#### Scenario: 各狀態長條圖
- **WHEN** 登入使用者進入 `/dashboard`
- **THEN** 頁面顯示 BarChart 呈現相同的狀態數量，X 軸為狀態類別，Y 軸為數量

### Requirement: 導覽列
系統 SHALL 在所有受保護頁面提供一致的導覽列，包含頁面連結與登出按鈕。

#### Scenario: 管理者導覽列
- **WHEN** admin 角色使用者登入後瀏覽任意頁面
- **THEN** 導覽列顯示：儀表板、車輛管理、員工管理、登出

#### Scenario: 一般使用者導覽列
- **WHEN** user 角色使用者登入後瀏覽任意頁面
- **THEN** 導覽列顯示：儀表板、車輛管理、登出（不顯示員工管理）
