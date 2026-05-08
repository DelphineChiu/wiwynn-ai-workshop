import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog'
import VehicleDialog from '@/components/VehicleDialog'

const STATUS_MAP = {
  'available': { label: '可用', variant: 'default' },
  'in-use': { label: '使用中', variant: 'secondary' },
  'maintenance': { label: '維修中', variant: 'destructive' },
}

export default function VehiclesPage() {
  const [vehicles, setVehicles] = useState([])
  const [loading, setLoading] = useState(true)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [editing, setEditing] = useState(null)
  const [deleteTarget, setDeleteTarget] = useState(null)

  const fetchVehicles = () => {
    fetch('/api/vehicles')
      .then(r => r.json())
      .then(data => { setVehicles(data); setLoading(false) })
  }

  useEffect(() => { fetchVehicles() }, [])

  const handleDelete = async () => {
    await fetch(`/api/vehicles/${deleteTarget.id}`, { method: 'DELETE' })
    setDeleteTarget(null)
    fetchVehicles()
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">車輛管理</h1>
        <Button onClick={() => { setEditing(null); setDialogOpen(true) }}>+ 新增車輛</Button>
      </div>

      {loading ? (
        <p className="text-muted-foreground">載入中...</p>
      ) : (
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>車牌號碼</TableHead>
                <TableHead>品牌</TableHead>
                <TableHead>型號</TableHead>
                <TableHead>年份</TableHead>
                <TableHead>狀態</TableHead>
                <TableHead>指派人員</TableHead>
                <TableHead className="text-right">操作</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {vehicles.map(v => (
                <TableRow key={v.id}>
                  <TableCell className="font-medium">{v.plateNumber}</TableCell>
                  <TableCell>{v.brand}</TableCell>
                  <TableCell>{v.model}</TableCell>
                  <TableCell>{v.year}</TableCell>
                  <TableCell>
                    <Badge variant={STATUS_MAP[v.status]?.variant}>{STATUS_MAP[v.status]?.label}</Badge>
                  </TableCell>
                  <TableCell>{v.assignedTo || '—'}</TableCell>
                  <TableCell className="text-right space-x-2">
                    <Button size="sm" variant="outline" onClick={() => { setEditing(v); setDialogOpen(true) }}>編輯</Button>
                    <Button size="sm" variant="destructive" onClick={() => setDeleteTarget(v)}>刪除</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}

      <VehicleDialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        vehicle={editing}
        onSave={fetchVehicles}
      />

      {/* 確認刪除 Dialog */}
      <Dialog open={!!deleteTarget} onOpenChange={() => setDeleteTarget(null)}>
        <DialogContent className="sm:max-w-sm">
          <DialogHeader>
            <DialogTitle>確認刪除</DialogTitle>
          </DialogHeader>
          <p className="text-sm text-muted-foreground">
            確定要刪除車輛 <strong>{deleteTarget?.plateNumber}</strong>？此操作無法復原。
          </p>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteTarget(null)}>取消</Button>
            <Button variant="destructive" onClick={handleDelete}>確認刪除</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
