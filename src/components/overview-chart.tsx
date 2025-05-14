"use client"

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts"

const data = [
  {
    name: "T1",
    total: 4,
    completed: 2,
  },
  {
    name: "T2",
    total: 3,
    completed: 3,
  },
  {
    name: "T3",
    total: 5,
    completed: 3,
  },
  {
    name: "T4",
    total: 6,
    completed: 4,
  },
  {
    name: "T5",
    total: 4,
    completed: 2,
  },
  {
    name: "T6",
    total: 3,
    completed: 1,
  },
  {
    name: "T7",
    total: 2,
    completed: 0,
  },
  {
    name: "T8",
    total: 4,
    completed: 2,
  },
  {
    name: "T9",
    total: 5,
    completed: 3,
  },
  {
    name: "T10",
    total: 3,
    completed: 1,
  },
  {
    name: "T11",
    total: 4,
    completed: 2,
  },
  {
    name: "T12",
    total: 3,
    completed: 1,
  },
]

export function OverviewChart() {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={data}>
        <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
        <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `${value}`} />
        <Tooltip />
        <Bar dataKey="total" fill="#adfa1d" radius={[4, 4, 0, 0]} name="Tổng số" />
        <Bar dataKey="completed" fill="#0ea5e9" radius={[4, 4, 0, 0]} name="Hoàn thành" />
      </BarChart>
    </ResponsiveContainer>
  )
}
