"use client"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const employeeData = [
  {
    id: "E001",
    name: "Nguyễn Văn A",
    initials: "NVA",
    totalDuty: 24,
    morningShift: 14,
    afternoonShift: 10,
    percentage: 85,
  },
  {
    id: "E002",
    name: "Trần Thị B",
    initials: "TTB",
    totalDuty: 22,
    morningShift: 12,
    afternoonShift: 10,
    percentage: 78,
  },
  {
    id: "E003",
    name: "Lê Văn C",
    initials: "LVC",
    totalDuty: 20,
    morningShift: 10,
    afternoonShift: 10,
    percentage: 71,
  },
  {
    id: "E004",
    name: "Phạm Thị D",
    initials: "PTD",
    totalDuty: 18,
    morningShift: 8,
    afternoonShift: 10,
    percentage: 64,
  },
  {
    id: "E005",
    name: "Hoàng Văn E",
    initials: "HVE",
    totalDuty: 26,
    morningShift: 16,
    afternoonShift: 10,
    percentage: 92,
  },
  {
    id: "E006",
    name: "Vũ Văn F",
    initials: "VVF",
    totalDuty: 19,
    morningShift: 9,
    afternoonShift: 10,
    percentage: 67,
  },
  {
    id: "E007",
    name: "Đặng Thị G",
    initials: "DTG",
    totalDuty: 21,
    morningShift: 11,
    afternoonShift: 10,
    percentage: 75,
  },
]

export function EmployeeDutyReport() {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <div className="space-y-2">
          <Label htmlFor="month">Tháng</Label>
          <Select defaultValue="5">
            <SelectTrigger id="month">
              <SelectValue placeholder="Chọn tháng" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1">Tháng 1</SelectItem>
              <SelectItem value="2">Tháng 2</SelectItem>
              <SelectItem value="3">Tháng 3</SelectItem>
              <SelectItem value="4">Tháng 4</SelectItem>
              <SelectItem value="5">Tháng 5</SelectItem>
              <SelectItem value="6">Tháng 6</SelectItem>
              <SelectItem value="7">Tháng 7</SelectItem>
              <SelectItem value="8">Tháng 8</SelectItem>
              <SelectItem value="9">Tháng 9</SelectItem>
              <SelectItem value="10">Tháng 10</SelectItem>
              <SelectItem value="11">Tháng 11</SelectItem>
              <SelectItem value="12">Tháng 12</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="year">Năm</Label>
          <Select defaultValue="2023">
            <SelectTrigger id="year">
              <SelectValue placeholder="Chọn năm" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="2021">2021</SelectItem>
              <SelectItem value="2022">2022</SelectItem>
              <SelectItem value="2023">2023</SelectItem>
              <SelectItem value="2024">2024</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nhân viên</TableHead>
              <TableHead>Tổng số ca trực</TableHead>
              <TableHead>Ca sáng</TableHead>
              <TableHead>Ca chiều</TableHead>
              <TableHead>Tỷ lệ hoàn thành</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {employeeData.map((employee) => (
              <TableRow key={employee.id}>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={`/placeholder.svg?height=32&width=32`} alt={employee.name} />
                      <AvatarFallback>{employee.initials}</AvatarFallback>
                    </Avatar>
                    <span>{employee.name}</span>
                  </div>
                </TableCell>
                <TableCell>{employee.totalDuty}</TableCell>
                <TableCell>{employee.morningShift}</TableCell>
                <TableCell>{employee.afternoonShift}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Progress value={employee.percentage} className="h-2 w-[100px]" />
                    <span className="text-sm">{employee.percentage}%</span>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
