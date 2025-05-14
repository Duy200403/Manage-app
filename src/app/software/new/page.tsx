"use client";

import type React from "react";

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
import { Textarea } from "@/components/ui/textarea";
interface DatePickerProps {
  selected: Date | undefined;
  onChange: (date: Date | undefined) => void;
}
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import { Calendar } from "@/components/ui/calendar"; // component lịch gốc
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { cn } from "@/lib/utils";
import { create } from "domain";
export function DatePicker({ selected, onChange }: DatePickerProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-full justify-start text-left font-normal",
            !selected && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {selected ? format(selected, "PPP") : <span>Chọn ngày</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={selected}
          onSelect={onChange}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}
export default function NewSoftwarePage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    scope: "",
    startDate: "",
    endDate: "",
    leader: "",
    status: "",
    createdAt: "",
    createdBy: "",
    updatedAt: "",
    updatedBy: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("http://localhost:5281/api/Software", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Lỗi khi gửi dữ liệu");
      }

      router.push("/software");
    } catch (err) {
      alert("Đã xảy ra lỗi khi gửi dữ liệu.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-3xl font-bold">Thêm phần mềm mới</h1>

      <Card className="max-w-4xl">
        <form onSubmit={handleSubmit}>
          <CardHeader>
            <CardTitle>Thông tin phần mềm</CardTitle>
            <CardDescription>
              Nhập thông tin chi tiết về phần mềm mới
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="name">Tên phần mềm</Label>
                <Input
                  id="name"
                  placeholder="Nhập tên phần mềm"
                  required
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="scope">Phạm vi áp dụng</Label>
                <Select
                  onValueChange={(value) =>
                    setFormData({ ...formData, scope: value })
                  }
                >
                  <SelectTrigger id="scope">
                    <SelectValue placeholder="Chọn phạm vi áp dụng" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Toàn công ty">Toàn công ty</SelectItem>
                    <SelectItem value="Phòng ban cụ thể">
                      Phòng ban cụ thể
                    </SelectItem>
                    <SelectItem value="Nhóm cụ thể">Nhóm cụ thể</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Ngày bắt đầu phát triển</Label>
                <DatePicker
                  selected={
                    formData.startDate
                      ? new Date(formData.startDate)
                      : undefined
                  }
                  onChange={(date: Date | undefined) =>
                    setFormData({
                      ...formData,
                      startDate: date?.toISOString() || "",
                    })
                  }
                />
              </div>

              <div className="space-y-2">
                <Label>Ngày hoàn thành dự kiến</Label>
                <DatePicker
                  selected={
                    formData.endDate ? new Date(formData.endDate) : undefined
                  }
                  onChange={(date) =>
                    setFormData({
                      ...formData,
                      endDate: date?.toISOString() || "",
                    })
                  }
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="lead">Người chủ trì</Label>
                <Select
                  onValueChange={(value) =>
                    setFormData({ ...formData, leader: value })
                  }
                >
                  <SelectTrigger id="lead">
                    <SelectValue placeholder="Chọn người chủ trì" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Nguyễn Văn A">Nguyễn Văn A</SelectItem>
                    <SelectItem value="Trần Thị B">Trần Thị B</SelectItem>
                    <SelectItem value="Lê Văn C">Lê Văn C</SelectItem>
                    <SelectItem value="Phạm Thị D">Phạm Thị D</SelectItem>
                    <SelectItem value="Hoàng Văn E">Hoàng Văn E</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="status">Trạng thái</Label>
                <Select
                  onValueChange={(value) =>
                    setFormData({ ...formData, status: value })
                  }
                >
                  <SelectTrigger id="status">
                    <SelectValue placeholder="Chọn trạng thái" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Lên kế hoạch">Lên kế hoạch</SelectItem>
                    <SelectItem value="Đang phát triển">
                      Đang phát triển
                    </SelectItem>
                    <SelectItem value="Đang thử nghiệm">
                      Đang thử nghiệm
                    </SelectItem>
                    <SelectItem value="Hoàn thành">Hoàn thành</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* <div className="space-y-2">
              <Label htmlFor="description">Mô tả phần mềm</Label>
              <Textarea
                id="description"
                placeholder="Nhập mô tả chi tiết về phần mềm"
                className="min-h-[120px]"
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
              />
            </div> */}
          </CardContent>

          <CardFooter className="flex justify-between">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.push("/software")}
            >
              Hủy
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Đang lưu..." : "Lưu phần mềm"}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
