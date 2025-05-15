"use client";

import { useState } from "react";
import { ScheduleDisplay } from "@/lib/types/schedule/schedule";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { MoreHorizontal, Search, Edit, Trash2, Calendar } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface Props {
  schedules: ScheduleDisplay[];
}

export function ScheduleTable({ schedules }: Props) {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredSchedules = schedules.filter(
    (schedule) =>
      schedule.date.includes(searchTerm) ||
      schedule.shift.toLowerCase().includes(searchTerm.toLowerCase()) ||
      schedule.employees.some((employee) =>
        employee.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
  );

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
            {filteredSchedules.map((schedule, index) => (
              <TableRow key={`${schedule.id}-${index}`}>
                <TableCell>{schedule.date}</TableCell>
                <TableCell>
                  <Badge
                    variant={
                      schedule.shift === "Sáng" ? "default" : "secondary"
                    }
                  >
                    {schedule.shift}
                  </Badge>
                </TableCell>
                <TableCell>{schedule.time}</TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    {schedule.employees.map((employee, index) => (
                      <Avatar
                        key={`${employee.id}-${index}`} // key duy nhất theo ca trực
                        className="h-8 w-8 border-2 border-background"
                      >
                        <AvatarImage
                          src="/placeholder.svg"
                          alt={employee.name}
                        />
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
  );
}
