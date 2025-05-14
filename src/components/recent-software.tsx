import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

const recentSoftware = [
  {
    name: "Hệ thống quản lý nhân sự",
    status: "Đang phát triển",
    lead: "Nguyễn Văn A",
    initials: "NVA",
    date: "10/05/2023",
  },
  {
    name: "Ứng dụng quản lý tài sản",
    status: "Hoàn thành",
    lead: "Trần Thị B",
    initials: "TTB",
    date: "15/04/2023",
  },
  {
    name: "Phần mềm báo cáo tự động",
    status: "Đang thử nghiệm",
    lead: "Lê Văn C",
    initials: "LVC",
    date: "22/04/2023",
  },
  {
    name: "Hệ thống quản lý văn bản",
    status: "Đang phát triển",
    lead: "Phạm Thị D",
    initials: "PTD",
    date: "01/05/2023",
  },
]

export function RecentSoftware() {
  return (
    <div className="space-y-8">
      {recentSoftware.map((software) => (
        <div key={software.name} className="flex items-center">
          <Avatar className="h-9 w-9">
            <AvatarImage src={`/placeholder.svg?height=36&width=36`} alt={software.lead} />
            <AvatarFallback>{software.initials}</AvatarFallback>
          </Avatar>
          <div className="ml-4 space-y-1">
            <p className="text-sm font-medium leading-none">{software.name}</p>
            <p className="text-sm text-muted-foreground">Người chủ trì: {software.lead}</p>
          </div>
          <div className="ml-auto flex flex-col items-end gap-2">
            <Badge
              variant={
                software.status === "Hoàn thành"
                  ? "default"
                  : software.status === "Đang phát triển"
                    ? "secondary"
                    : "outline"
              }
            >
              {software.status}
            </Badge>
            <span className="text-xs text-muted-foreground">{software.date}</span>
          </div>
        </div>
      ))}
    </div>
  )
}
