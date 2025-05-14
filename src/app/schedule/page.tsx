import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CalendarView } from "@/components/calendar-view"
import { ScheduleTable } from "@/components/schedule-table"
import { PlusCircle } from "lucide-react"
import Link from "next/link"

export default function SchedulePage() {
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

      <Tabs defaultValue="calendar" className="space-y-4">
        <TabsList>
          <TabsTrigger value="calendar">Lịch</TabsTrigger>
          <TabsTrigger value="list">Danh sách</TabsTrigger>
        </TabsList>
        <TabsContent value="calendar" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Lịch trực tháng 5/2023</CardTitle>
              <CardDescription>Xem và quản lý lịch trực theo dạng lịch</CardDescription>
            </CardHeader>
            <CardContent>
              <CalendarView />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="list" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Danh sách ca trực</CardTitle>
              <CardDescription>Xem và quản lý lịch trực theo dạng danh sách</CardDescription>
            </CardHeader>
            <CardContent>
              <ScheduleTable />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
