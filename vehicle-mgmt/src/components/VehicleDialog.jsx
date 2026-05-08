import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

const schema = z.object({
  plateNumber: z.string().min(1, '請輸入車牌號碼'),
  brand: z.string().min(1, '請輸入品牌'),
  model: z.string().min(1, '請輸入型號'),
  year: z.coerce.number().int().min(2000).max(2099),
  status: z.enum(['available', 'in-use', 'maintenance']),
  assignedTo: z.string().optional(),
})

export default function VehicleDialog({ open, onClose, vehicle, onSave }) {
  const isEdit = !!vehicle
  const [employees, setEmployees] = useState([])

  const { register, handleSubmit, reset, setValue, watch, formState: { errors } } = useForm({
    resolver: zodResolver(schema),
    defaultValues: { status: 'available', year: new Date().getFullYear() },
  })

  useEffect(() => {
    if (open) {
      fetch('/api/employees').then(r => r.json()).then(setEmployees)
    }
  }, [open])

  useEffect(() => {
    if (vehicle) reset(vehicle)
    else reset({ plateNumber: '', brand: '', model: '', year: new Date().getFullYear(), status: 'available', assignedTo: '' })
  }, [vehicle, open])

  const onSubmit = async (data) => {
    const url = isEdit ? `/api/vehicles/${vehicle.id}` : '/api/vehicles'
    const method = isEdit ? 'PUT' : 'POST'
    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
    if (res.ok) {
      onSave()
      onClose()
    }
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{isEdit ? '編輯車輛' : '新增車輛'}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
          <Field label="車牌號碼 *" error={errors.plateNumber?.message}>
            <Input placeholder="ABC-1234" {...register('plateNumber')} />
          </Field>
          <Field label="品牌 *" error={errors.brand?.message}>
            <Input placeholder="Toyota" {...register('brand')} />
          </Field>
          <Field label="型號 *" error={errors.model?.message}>
            <Input placeholder="Camry" {...register('model')} />
          </Field>
          <Field label="年份" error={errors.year?.message}>
            <Input type="number" {...register('year')} />
          </Field>
          <Field label="狀態">
            <Select value={watch('status')} onValueChange={v => setValue('status', v)}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="available">可用</SelectItem>
                <SelectItem value="in-use">使用中</SelectItem>
                <SelectItem value="maintenance">維修中</SelectItem>
              </SelectContent>
            </Select>
          </Field>
          <Field label="指派人員">
            <Select value={watch('assignedTo') ?? ''} onValueChange={v => setValue('assignedTo', v === '__none__' ? '' : v)}>
              <SelectTrigger><SelectValue placeholder="選擇員工（選填）" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="__none__">— 不指派 —</SelectItem>
                {employees.map(e => (
                  <SelectItem key={e.id} value={e.name}>{e.name}（{e.department}）</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </Field>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>取消</Button>
            <Button type="submit">{isEdit ? '儲存' : '新增'}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

function Field({ label, error, children }) {
  return (
    <div className="space-y-1">
      <Label>{label}</Label>
      {children}
      {error && <p className="text-xs text-destructive">{error}</p>}
    </div>
  )
}
