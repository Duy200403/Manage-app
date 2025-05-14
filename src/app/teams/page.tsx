import { Button } from "@/components/ui/button"
import { PlusCircle } from "lucide-react"
import { TeamTable } from "@/components/team-table"
import Link from "next/link"

export default function TeamsPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Quản lý nhóm phát triển</h1>
        <Link href="/teams/new">
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" />
            Thêm nhóm mới
          </Button>
        </Link>
      </div>

      <TeamTable />
    </div>
  )
}
