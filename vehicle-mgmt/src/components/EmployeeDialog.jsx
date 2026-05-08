import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

const schema = z.object({
  name: z.string().min(1, '請輸入姓名'),
  department: z.string().min(1, '請輸入部門'),
  position: z.string().min(1, '請輸入職稱'),
  email: z.string().email('Email 格式不正確'),
  phone: z.string().min(1, '請輸入電話'),
})

export default function EmployeeDialog({ open, onClose, employee, onSave }) {
  const isEdit = !!employee

  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    resolver: zodResolver(schema),
  })

  useEffect(() => {
    if (employee) reset(employee)
    else reset({ name: '', department: '', position: '', email: '', phone: '' })
  }, [employee, open])

  const onSubmit = async (data) => {
    const url = isEdit ? `/api/employees/${employee.id}` : '/api/employees'
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
          <DialogTitle>{isEdit ? '編輯員工' : '新增員工'}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
          <Field label="姓名 *" error={errors.name?.message}>
            <Input placeholder="王小明" {...register('name')} />
          </Field>
          <Field label="部門 *" error={errors.department?.message}>
            <Input placeholder="業務部" {...register('department')} />
          </Field>
          <Field label="職稱 *" error={errors.position?.message}>
            <Input placeholder="業務專員" {...register('position')} />
          </Field>
          <Field label="Email *" error={errors.email?.message}>
            <Input type="email" placeholder="name@company.com" {...register('email')} />
          </Field>
          <Field label="電話 *" error={errors.phone?.message}>
            <Input placeholder="0912-345-678" {...register('phone')} />
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
