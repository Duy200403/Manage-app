"use client"

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const lineData = [
  { name: "T1", efficiency: 65, target: 70 },
  { name: "T2", efficiency: 68, target: 70 },
  { name: "T3", efficiency: 72, target: 75 },
  { name: "T4", efficiency: 75, target: 75 },
  { name: "T5", efficiency: 78, target: 80 },
  { name: "T6", efficiency: 82, target: 80 },
  { name: "T7", efficiency: 80, target: 80 },
  { name: "T8", efficiency: 85, target: 85 },
  { name: "T9", efficiency: 87, target: 85 },
  { name: "T10", efficiency: 84, target: 85 },
  { name: "T11", efficiency: 88, target: 90 },
  { name: "T12", efficiency: 92, target: 90 },
]

const pieData = [
  { name: "Hoàn thành đúng hạn", value: 68, color: "#0ea5e9" },
  { name: "Hoàn thành trễ hạn", value: 12, color: "#f97316" },
  { name: "Chưa hoàn thành", value: 20, color: "#ef4444" },
]

const COLORS = ["#0ea5e9", "#f97316", "#ef4444"]

export function EfficiencyReport() {
  return (
    <Tabs defaultValue="line" className="space-y-4">
      <TabsList>
        <TabsTrigger value="line">Biểu đồ đường</TabsTrigger>
        <TabsTrigger value="pie">Biểu đồ tròn</TabsTrigger>
      </TabsList>

      <TabsContent value="line">
        <div className="h-[400px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={lineData}
              margin={{
                top: 20,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="efficiency"
                name="Hiệu suất thực tế"
                stroke="#0ea5e9"
                activeDot={{ r: 8 }}
              />
              <Line type="monotone" dataKey="target" name="Mục tiêu" stroke="#f97316" strokeDasharray="5 5" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </TabsContent>

      <TabsContent value="pie">
        <div className="h-[400px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                labelLine={true}
                outerRadius={150}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </TabsContent>
    </Tabs>
  )
}
