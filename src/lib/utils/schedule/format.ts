import { Schedule, ScheduleDisplay } from "@/lib/types/schedule/schedule";

function getInitials(name: string): string {
  return name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .toUpperCase();
}

function getShiftLabel(startTime: string): string {
  const hour = parseInt(startTime.split(":")[0], 10);
  return hour < 12 ? "Sáng" : "Chiều";
}

function formatTime(start: string, end: string): string {
  return `${start.slice(0, 5)} - ${end.slice(0, 5)}`;
}

function formatDate(isoDate: string): string {
  const date = new Date(isoDate);
  return date.toLocaleDateString("vi-VN");
}

export function formatScheduleData(data: Schedule[]): ScheduleDisplay[] {
  const grouped = new Map<string, ScheduleDisplay>();

  for (const item of data) {
    const key = `${item.shiftDate}-${item.startTime}`;
    if (!grouped.has(key)) {
      grouped.set(key, {
        id: item.id,
        date: formatDate(item.shiftDate),
        shift: getShiftLabel(item.startTime),
        time: formatTime(item.startTime, item.endTime),
        employees: [],
      });
    }

    const group = grouped.get(key);
    group?.employees.push({
      id: item.employee.id, // thêm dòng này
      name: item.employee.name,
      initials: getInitials(item.employee.name),
    });
  }

  return Array.from(grouped.values());
}
import { format } from "date-fns";

export function createFormatDate(date?: Date, pattern = "dd/MM/yyyy") {
  if (!date) return "";
  return format(date, pattern);
}
