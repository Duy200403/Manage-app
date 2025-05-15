"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { createEmployee } from "@/lib/api/employee/createEmployeeService";
import { CreateEmployee } from "@/lib/types/employee/createEmployee";

export default function NewEmployeePage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [startDate, setStartDate] = useState<Date | undefined>();

  const [formData, setFormData] = useState<CreateEmployee>({
    name: "",
    status: "Đang làm việc",
    createdDate: "",
    createdBy: "admin",
    updatedDate: "",
    updatedBy: "admin",
  });

  const handleDateChange = (date: Date | undefined) => {
    setStartDate(date);
    setFormData({
      ...formData,
      createdDate: date ? new Date(date).toISOString() : "",
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const dataToSubmit: CreateEmployee = {
      ...formData,
      updatedDate: new Date().toISOString(),
    };

    try {
      await createEmployee(dataToSubmit);
      router.push("/employees");
    } catch (err) {
      alert("Đã xảy ra lỗi khi gửi dữ liệu.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-3xl font-bold">Thêm nhân viên mới</h1>

      <Card className="max-w-4xl">
        <form onSubmit={handleSubmit}>
          <CardHeader>
            <CardTitle>Thông tin nhân viên</CardTitle>
            <CardDescription>
              Nhập thông tin chi tiết về nhân viên mới
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="name">Họ và tên</Label>
                <Input
                  id="name"
                  placeholder="Nhập họ và tên"
                  required
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="status">Trạng thái</Label>
                <Select
                  value={formData.status}
                  onValueChange={(value) =>
                    setFormData({ ...formData, status: value })
                  }
                >
                  <SelectTrigger id="status">
                    <SelectValue placeholder="Chọn trạng thái" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Đang làm việc">Đang làm việc</SelectItem>
                    <SelectItem value="Nghỉ phép">Nghỉ phép</SelectItem>
                    <SelectItem value="Đã nghỉ việc">Đã nghỉ việc</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Ngày vào làm</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !startDate && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {startDate
                        ? format(startDate, "dd/MM/yyyy")
                        : "Chọn ngày"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={startDate}
                      onSelect={handleDateChange}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>
          </CardContent>

          <CardFooter className="flex justify-between">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.push("/employees")}
            >
              Hủy
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Đang lưu..." : "Lưu nhân viên"}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
