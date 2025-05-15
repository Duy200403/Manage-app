"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { CalendarIcon, X } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";

import { Employee } from "@/lib/types/employee/employee";
import { fetchEmployees } from "@/lib/api/employee/employeeService";
import { createShift } from "@/lib/api/schedule/createScheduleService";
import { createFormatDate } from "@/lib/utils/schedule/format";
import { CreateShiftPayload } from "@/lib/types/schedule/createSchedule";
export default function NewSchedulePage() {
  const router = useRouter();

  const [employees, setEmployees] = useState<Employee[]>([]);
  const [selectedEmployees, setSelectedEmployees] = useState<Employee[]>([]);
  const [employeeInput, setEmployeeInput] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [date, setDate] = useState<Date | undefined>();
  const [shiftType, setShiftType] = useState<"morning" | "afternoon">(
    "morning"
  );

  useEffect(() => {
    fetchEmployees()
      .then(setEmployees)
      .catch((err) => {
        console.error(err);
        toast.error("Lỗi khi tải danh sách nhân viên");
      });
  }, []);

  const availableEmployees = employees.filter(
    (emp) => !selectedEmployees.some((e) => e.id === emp.id)
  );

  const handleAddEmployee = (id: string) => {
    const emp = employees.find((e) => e.id === id);
    if (emp && !selectedEmployees.some((e) => e.id === emp.id)) {
      setSelectedEmployees([...selectedEmployees, emp]);
      setEmployeeInput("");
    }
  };

  const handleRemoveEmployee = (id: string) => {
    setSelectedEmployees(selectedEmployees.filter((e) => e.id !== id));
  };

  const handleToday = () => {
    setDate(new Date());
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const payload: CreateShiftPayload = {
      employeeId: selectedEmployees.map((e) => e.id),
      shiftDate: date?.toISOString(),
      startTime: shiftType === "morning" ? "08:00:00" : "13:30:00",
      endTime: shiftType === "morning" ? "12:00:00" : "17:30:00",
      createdDate: new Date().toISOString(),
      createdBy: "admin",
      updatedDate: new Date().toISOString(),
      updatedBy: "admin",
    };

    try {
      await createShift(payload);
      toast.success("Đã tạo ca trực");
      router.push("/schedule");
    } catch (error) {
      console.error(error);
      toast.error("Lỗi khi tạo ca trực");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-3xl font-bold">Thêm ca trực mới</h1>

      <Card className="max-w-4xl">
        <form onSubmit={handleSubmit}>
          <CardHeader>
            <CardTitle>Thông tin ca trực</CardTitle>
            <CardDescription>
              Nhập thông tin chi tiết về ca trực mới
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* ... phần UI giữ nguyên như cũ, dùng formatDate thay cho format */}
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <Label>Ngày trực</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full justify-start text-left font-normal"
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {date ? createFormatDate(date) : <span>Chọn ngày</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-2" align="start">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                      initialFocus
                    />
                    <div className="pt-2 flex justify-end">
                      <Button variant="ghost" size="sm" onClick={handleToday}>
                        Hôm nay
                      </Button>
                    </div>
                  </PopoverContent>
                </Popover>
              </div>

              <div className="space-y-2">
                <Label htmlFor="shift">Ca trực</Label>
                <RadioGroup
                  value={shiftType}
                  onValueChange={(value) =>
                    setShiftType(value as "morning" | "afternoon")
                  }
                  className="flex gap-4"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="morning" id="morning" />
                    <Label htmlFor="morning">Ca sáng (8:00 - 12:00)</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="afternoon" id="afternoon" />
                    <Label htmlFor="afternoon">Ca chiều (13:30 - 17:30)</Label>
                  </div>
                </RadioGroup>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Nhân viên trực</Label>
              <div className="flex flex-wrap gap-2 mb-2">
                {selectedEmployees.map((employee) => (
                  <Badge
                    key={employee.id}
                    variant="secondary"
                    className="flex items-center gap-1"
                  >
                    {employee.name}
                    <button
                      aria-label="Remove employee"
                      type="button"
                      onClick={() => handleRemoveEmployee(employee.id)}
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
              </div>
              <Select
                value={employeeInput}
                onValueChange={(value) => {
                  setEmployeeInput(value);
                  handleAddEmployee(value);
                }}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Chọn nhân viên" />
                </SelectTrigger>
                <SelectContent>
                  {availableEmployees.map((emp) => (
                    <SelectItem key={emp.id} value={emp.id}>
                      {emp.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <p className="text-sm text-muted-foreground mt-1">
                Chọn 2-3 nhân viên cho mỗi ca trực
              </p>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.push("/schedule")}
            >
              Hủy
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Đang lưu..." : "Lưu ca trực"}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
