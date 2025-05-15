"use client";

import { useEffect, useState } from "react";
import { ScheduleTable } from "@/components/schedule-table";
import { fetchSchedule } from "@/lib/api/schedule/scheduleService";
import { formatScheduleData } from "@/lib/utils/schedule/format";
import { ScheduleDisplay } from "@/lib/types/schedule/schedule";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";

export default function SchedulePage() {
  const [displaySchedules, setDisplaySchedules] = useState<ScheduleDisplay[]>(
    []
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const rawSchedules = await fetchSchedule();
        const formatted = formatScheduleData(rawSchedules);
        setDisplaySchedules(formatted);
      } catch (err: any) {
        setError(err.message || "Lỗi không xác định");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <p>Đang tải dữ liệu...</p>;
  if (error) return <p className="text-red-500">Lỗi: {error}</p>;

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Quản lý lịch trực</h1>
        <Link href="/schedule/new">
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" />
            Thêm ca trực mới
          </Button>
        </Link>
      </div>
      <ScheduleTable schedules={displaySchedules} />
    </div>
  );
}
