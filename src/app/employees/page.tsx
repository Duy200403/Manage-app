import { Button } from "@/components/ui/button"
import { PlusCircle } from "lucide-react"
import { EmployeeTable } from "@/components/employee-table"
import Link from "next/link"

export default function EmployeesPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Quản lý nhân viên</h1>
        <Link href="/employees/new">
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" />
            Thêm nhân viên mới
          </Button>
        </Link>
      </div>

      <EmployeeTable />
    </div>
  )
}
