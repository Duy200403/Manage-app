"use client"

import { useState } from "react"
import { Calendar } from "@/components/ui/calendar"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

// Dữ liệu mẫu cho lịch trực
const dutyData = [
  { date: new Date(2023, 4, 1), employees: ["Nguyễn Văn A", "Trần Thị B"] },
  { date: new Date(2023, 4, 2), employees: ["Lê Văn C", "Phạm Thị D"] },
  { date: new Date(2023, 4, 3), employees: ["Hoàng Văn E", "Vũ Văn F"] },
  { date: new Date(2023, 4, 8), employees: ["Nguyễn Văn A", "Đặng Thị G"] },
  { date: new Date(2023, 4, 9), employees: ["Bùi Văn H", "Ngô Thị I"] },
  { date: new Date(2023, 4, 10), employees: ["Đinh Văn K", "Trần Thị B"] },
  { date: new Date(2023, 4, 15), employees: ["Lê Văn C", "Hoàng Văn E"] },
  { date: new Date(2023, 4, 16), employees: ["Phạm Thị D", "Vũ Văn F"] },
  { date: new Date(2023, 4, 17), employees: ["Nguyễn Văn A", "Đặng Thị G"] },
  { date: new Date(2023, 4, 22), employees: ["Bùi Văn H", "Đinh Văn K"] },
  { date: new Date(2023, 4, 23), employees: ["Ngô Thị I", "Trần Thị B"] },
  { date: new Date(2023, 4, 24), employees: ["Lê Văn C", "Phạm Thị D"] },
  { date: new Date(2023, 4, 29), employees: ["Hoàng Văn E", "Vũ Văn F"] },
  { date: new Date(2023, 4, 30), employees: ["Nguyễn Văn A", "Bùi Văn H"] },
  { date: new Date(2023, 4, 31), employees: ["Đặng Thị G", "Ngô Thị I"] },
]

// Hàm kiểm tra xem một ngày có ca trực hay không
const hasDuty = (date: Date) => {
  return dutyData.some(
    (duty) =>
      duty.date.getDate() === date.getDate() &&
      duty.date.getMonth() === date.getMonth() &&
      duty.date.getFullYear() === date.getFullYear(),
  )
}

// Hàm lấy thông tin ca trực cho một ngày cụ thể
const getDutyInfo = (date: Date) => {
  return dutyData.find(
    (duty) =>
      duty.date.getDate() === date.getDate() &&
      duty.date.getMonth() === date.getMonth() &&
      duty.date.getFullYear() === date.getFullYear(),
  )
}

export function CalendarView() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date())
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const handleDateSelect = (date: Date | undefined) => {
    if (date && hasDuty(date)) {
      setSelectedDate(date)
      setIsDialogOpen(true)
    } else {
      setSelectedDate(date)
    }
  }

  const dutyInfo = selectedDate ? getDutyInfo(selectedDate) : undefined

  return (
    <div className="flex flex-col space-y-4">
      <Calendar
        mode="single"
        selected={selectedDate}
        onSelect={handleDateSelect}
        className="rounded-md border"
        modifiers={{
          duty: (date) => hasDuty(date),
        }}
        modifiersClassNames={{
          duty: "bg-green-100 font-bold text-green-900 dark:bg-green-900 dark:text-green-50",
        }}
      />

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Ca trực ngày {selectedDate?.toLocaleDateString("vi-VN")}</DialogTitle>
            <DialogDescription>Thông tin chi tiết về ca trực</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <h4 className="font-medium">Nhân viên trực:</h4>
              <div className="flex flex-col space-y-2">
                {dutyInfo?.employees.map((employee, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={`/placeholder.svg?height=32&width=32`} alt={employee} />
                      <AvatarFallback>
                        {employee
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <span>{employee}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex justify-between">
              <Badge>Ca sáng: 8:00 - 12:00</Badge>
              <Badge>Ca chiều: 13:30 - 17:30</Badge>
            </div>
          </div>
          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Đóng
            </Button>
            <Button>Chỉnh sửa</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
