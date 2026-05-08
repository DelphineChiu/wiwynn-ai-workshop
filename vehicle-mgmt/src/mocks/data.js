export const users = [
  { id: 1, username: 'admin', password: 'admin123', role: 'admin', name: '系統管理員' },
  { id: 2, username: 'user', password: 'user123', role: 'user', name: '一般使用者' },
]

export let vehicles = [
  { id: 1, plateNumber: 'ABC-1234', brand: 'Toyota', model: 'Camry', year: 2022, status: 'available', assignedTo: '' },
  { id: 2, plateNumber: 'DEF-5678', brand: 'Honda', model: 'Civic', year: 2021, status: 'in-use', assignedTo: '張三' },
  { id: 3, plateNumber: 'GHI-9012', brand: 'Ford', model: 'Focus', year: 2020, status: 'maintenance', assignedTo: '' },
  { id: 4, plateNumber: 'JKL-3456', brand: 'Nissan', model: 'Sentra', year: 2023, status: 'available', assignedTo: '' },
  { id: 5, plateNumber: 'MNO-7890', brand: 'Mazda', model: 'Mazda3', year: 2022, status: 'in-use', assignedTo: '李四' },
]

export let employees = [
  { id: 1, name: '張三', department: '業務部', position: '業務專員', email: 'zhang@company.com', phone: '0912-345-678' },
  { id: 2, name: '李四', department: '工程部', position: '工程師', email: 'li@company.com', phone: '0923-456-789' },
  { id: 3, name: '王五', department: '行政部', position: '行政人員', email: 'wang@company.com', phone: '0934-567-890' },
  { id: 4, name: '趙六', department: '業務部', position: '業務主管', email: 'zhao@company.com', phone: '0945-678-901' },
  { id: 5, name: '陳七', department: '財務部', position: '會計', email: 'chen@company.com', phone: '0956-789-012' },
]

let nextVehicleId = 6
let nextEmployeeId = 6

export const getNextVehicleId = () => nextVehicleId++
export const getNextEmployeeId = () => nextEmployeeId++
