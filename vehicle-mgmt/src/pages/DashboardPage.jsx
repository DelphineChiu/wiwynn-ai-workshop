import { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ChartContainer, ChartTooltip, ChartTooltipContent, ChartLegend, ChartLegendContent } from '@/components/ui/chart'
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts'

const STATUS_LABELS = {
  'available': '可用',
  'in-use': '使用中',
  'maintenance': '維修中',
}

const CHART_CONFIG = {
  available: { label: '可用', color: 'var(--color-chart-1)' },
  'in-use': { label: '使用中', color: 'var(--color-chart-2)' },
  maintenance: { label: '維修中', color: 'var(--color-chart-3)' },
}

export default function DashboardPage() {
  const [vehicles, setVehicles] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/vehicles')
      .then(r => r.json())
      .then(data => { setVehicles(data); setLoading(false) })
  }, [])

  const stats = {
    total: vehicles.length,
    available: vehicles.filter(v => v.status === 'available').length,
    inUse: vehicles.filter(v => v.status === 'in-use').length,
    maintenance: vehicles.filter(v => v.status === 'maintenance').length,
  }

  const chartData = Object.entries(STATUS_LABELS).map(([key, label]) => ({
    status: key,
    name: label,
    value: vehicles.filter(v => v.status === key).length,
  }))

  if (loading) return <div className="text-center py-10 text-muted-foreground">載入中...</div>

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">儀表板</h1>

      {/* 統計卡片 */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard title="車輛總數" value={stats.total} desc="全部車輛" />
        <StatCard title="可用車輛" value={stats.available} desc="狀態：可用" color="text-green-600" />
        <StatCard title="使用中" value={stats.inUse} desc="狀態：使用中" color="text-blue-600" />
        <StatCard title="維修中" value={stats.maintenance} desc="狀態：維修中" color="text-orange-500" />
      </div>

      {/* 圖表 */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">車輛狀態分佈</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={CHART_CONFIG} className="h-56 w-full">
              <PieChart>
                <Pie data={chartData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label>
                  {chartData.map((entry) => (
                    <Cell key={entry.status} fill={CHART_CONFIG[entry.status]?.color} />
                  ))}
                </Pie>
                <ChartTooltip content={<ChartTooltipContent />} />
                <ChartLegend content={<ChartLegendContent />} />
              </PieChart>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">各狀態車輛數量</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={CHART_CONFIG} className="h-56 w-full">
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis allowDecimals={false} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="value" radius={4}>
                  {chartData.map((entry) => (
                    <Cell key={entry.status} fill={CHART_CONFIG[entry.status]?.color} />
                  ))}
                </Bar>
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

function StatCard({ title, value, desc, color = 'text-foreground' }) {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className={`text-3xl font-bold ${color}`}>{value}</div>
        <p className="text-xs text-muted-foreground mt-1">{desc}</p>
      </CardContent>
    </Card>
  )
}
