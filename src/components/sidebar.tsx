"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { BarChart3, Calendar, Code2, Home, LayoutDashboard, Settings, Users } from "lucide-react"

const routes = [
  {
    label: "Tổng quan",
    icon: LayoutDashboard,
    href: "/",
    color: "text-sky-500",
  },
  {
    label: "Quản lý phần mềm",
    icon: Code2,
    href: "/software",
    color: "text-violet-500",
  },
  {
    label: "Nhóm phát triển",
    icon: Users,
    href: "/teams",
    color: "text-pink-700",
  },
  {
    label: "Nhân viên",
    icon: Users,
    href: "/employees",
    color: "text-orange-700",
  },
  {
    label: "Lịch trực",
    icon: Calendar,
    href: "/schedule",
    color: "text-emerald-500",
  },
  {
    label: "Báo cáo thống kê",
    icon: BarChart3,
    href: "/reports",
    color: "text-green-700",
  },
  {
    label: "Cài đặt",
    icon: Settings,
    href: "/settings",
    color: "text-gray-700",
  },
]

export default function Sidebar() {
  const pathname = usePathname()

  return (
    <div className="space-y-4 py-4 flex flex-col h-full bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-50 border-r">
      <div className="px-3 py-2 flex-1">
        <Link href="/" className="flex items-center pl-3 mb-8">
          <div className="relative w-8 h-8 mr-4 rounded-full bg-blue-600 flex items-center justify-center">
            <Home className="w-4 h-4 text-white" />
          </div>
          <h1 className="text-xl font-bold">Ban CNTT</h1>
        </Link>
        <div className="space-y-1">
          {routes.map((route) => (
            <Link
              key={route.href}
              href={route.href}
              className={cn(
                "text-sm group flex p-3 w-full justify-start font-medium cursor-pointer hover:text-slate-900 dark:hover:text-slate-50 hover:bg-slate-200 dark:hover:bg-slate-800 rounded-lg transition",
                pathname === route.href ? "bg-slate-200 dark:bg-slate-800" : "text-slate-500 dark:text-slate-400",
              )}
            >
              <div className="flex items-center flex-1">
                <route.icon className={cn("h-5 w-5 mr-3", route.color)} />
                {route.label}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
