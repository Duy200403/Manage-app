"use client"

import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

const data = [
  {
    name: "T1",
    morning: 22,
    afternoon: 20,
  },
  {
    name: "T2",
    morning: 20,
    afternoon: 18,
  },
  {
    name: "T3",
    morning: 22,
    afternoon: 22,
  },
  {
    name: "T4",
    morning: 21,
    afternoon: 20,
  },
  {
    name: "T5",
    morning: 23,
    afternoon: 22,
  },
  {
    name: "T6",
    morning: 20,
    afternoon: 18,
  },
  {
    name: "T7",
    morning: 22,
    afternoon: 20,
  },
  {
    name: "T8",
    morning: 21,
    afternoon: 21,
  },
  {
    name: "T9",
    morning: 22,
    afternoon: 20,
  },
  {
    name: "T10",
    morning: 23,
    afternoon: 21,
  },
  {
    name: "T11",
    morning: 20,
    afternoon: 18,
  },
  {
    name: "T12",
    morning: 22,
    afternoon: 20,
  },
]

export function DutyReportChart() {
  return (
    <div className="h-[400px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
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
          <Bar dataKey="morning" name="Ca sáng" fill="#0ea5e9" />
          <Bar dataKey="afternoon" name="Ca chiều" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
