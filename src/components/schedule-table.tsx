"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { MoreHorizontal, Search, Edit, Trash2, Calendar } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const scheduleData = [
  {
    id: "S001",
    date: "01/05/2023",
    shift: "Sáng",
    time: "8:00 - 12:00",
    employees: [
      { name: "Nguyễn Văn A", initials: "NVA" },
      { name: "Trần Thị B", initials: "TTB" },
    ],
  },
  {
    id: "S002",
    date: "01/05/2023",
    shift: "Chiều",
    time: "13:30 - 17:30",
    employees: [
      { name: "Lê Văn C", initials: "LVC" },
      { name: "Phạm Thị D", initials: "PTD" },
    ],
  },
  {
    id: "S003",
    date: "02/05/2023",
    shift: "Sáng",
    time: "8:00 - 12:00",
    employees: [
      { name: "Hoàng Văn E", initials: "HVE" },
      { name: "Vũ Văn F", initials: "VVF" },
    ],
  },
  {
    id: "S004",
    date: "02/05/2023",
    shift: "Chiều",
    time: "13:30 - 17:30",
    employees: [
      { name: "Đặng Thị G", initials: "DTG" },
      { name: "Bùi Văn H", initials: "BVH" },
    ],
  },
  {
    id: "S005",
    date: "03/05/2023",
    shift: "Sáng",
    time: "8:00 - 12:00",
    employees: [
      { name: "Ngô Thị I", initials: "NTI" },
      { name: "Đinh Văn K", initials: "DVK" },
    ],
  },
  {
    id: "S006",
    date: "03/05/2023",
    shift: "Chiều",
    time: "13:30 - 17:30",
    employees: [
      { name: "Nguyễn Văn A", initials: "NVA" },
      { name: "Lê Văn C", initials: "LVC" },
    ],
  },
]

export function ScheduleTable() {
  const [searchTerm, setSearchTerm] = useState("")

  const filteredSchedules = scheduleData.filter(
    (schedule) =>
      schedule.date.includes(searchTerm) ||
      schedule.shift.toLowerCase().includes(searchTerm.toLowerCase()) ||
      schedule.employees.some((employee) => employee.name.toLowerCase().includes(searchTerm.toLowerCase())),
  )

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Tìm kiếm lịch trực..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Ngày</TableHead>
              <TableHead>Ca trực</TableHead>
              <TableHead>Thời gian</TableHead>
              <TableHead>Nhân viên trực</TableHead>
              <TableHead className="text-right">Thao tác</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredSchedules.map((schedule) => (
              <TableRow key={schedule.id}>
                <TableCell>{schedule.date}</TableCell>
                <TableCell>
                  <Badge variant={schedule.shift === "Sáng" ? "default" : "secondary"}>{schedule.shift}</Badge>
                </TableCell>
                <TableCell>{schedule.time}</TableCell>
                <TableCell>
                  <div className="flex -space-x-2">
                    {schedule.employees.map((employee, index) => (
                      <Avatar key={index} className="h-8 w-8 border-2 border-background">
                        <AvatarImage src={`/placeholder.svg?height=32&width=32`} alt={employee.name} />
                        <AvatarFallback>{employee.initials}</AvatarFallback>
                      </Avatar>
                    ))}
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Mở menu</span>
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Thao tác</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>
                        <Calendar className="mr-2 h-4 w-4" />
                        Xem chi tiết
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Edit className="mr-2 h-4 w-4" />
                        Chỉnh sửa
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-destructive">
                        <Trash2 className="mr-2 h-4 w-4" />
                        Xóa
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
