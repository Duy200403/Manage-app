import { Button } from "@/components/ui/button"
import { PlusCircle } from "lucide-react"
import { SoftwareTable } from "@/components/software-table"
import Link from "next/link"

export default function SoftwarePage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Quản lý phần mềm</h1>
        <Link href="/software/new">
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" />
            Thêm phần mềm mới
          </Button>
        </Link>
      </div>

      <SoftwareTable />
    </div>
  )
}
