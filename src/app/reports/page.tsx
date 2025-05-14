import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DutyReportChart } from "@/components/duty-report-chart"
import { EmployeeDutyReport } from "@/components/employee-duty-report"
import { EfficiencyReport } from "@/components/efficiency-report"

export default function ReportsPage() {
  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-3xl font-bold">Báo cáo thống kê</h1>

      <Tabs defaultValue="duty" className="space-y-4">
        <TabsList>
          <TabsTrigger value="duty">Báo cáo ca trực</TabsTrigger>
          <TabsTrigger value="employee">Báo cáo theo nhân viên</TabsTrigger>
          <TabsTrigger value="efficiency">Báo cáo hiệu quả</TabsTrigger>
        </TabsList>

        <TabsContent value="duty" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Báo cáo số ca trực theo thời gian</CardTitle>
              <CardDescription>Thống kê số lượng ca trực theo từng tháng</CardDescription>
            </CardHeader>
            <CardContent>
              <DutyReportChart />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="employee" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Báo cáo lịch trực theo nhân viên</CardTitle>
              <CardDescription>Thống kê số lượt trực theo từng nhân viên</CardDescription>
            </CardHeader>
            <CardContent>
              <EmployeeDutyReport />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="efficiency" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Báo cáo hiệu quả công việc</CardTitle>
              <CardDescription>Biểu đồ hiệu quả công việc theo thời gian</CardDescription>
            </CardHeader>
            <CardContent>
              <EfficiencyReport />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
