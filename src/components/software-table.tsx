"use client";

import { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { MoreHorizontal, Search, Edit, Trash2, Eye } from "lucide-react";

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return "Không xác định";

  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = date.getFullYear();

  return `Ngày ${day} tháng ${month}, năm ${year}`;
}
function translateStatus(status: string): string {
  switch (status) {
    case "Completed":
      return "Hoàn thành";
    case "InProgress":
      return "Đang phát triển";
    default:
      return status;
  }
}

type Software = {
  id: number;
  name: string;
  startDate: string;
  endDate: string;
  scope: string;
  leader: string;
  status: string;
};
export function SoftwareTable() {
  const [softwareData, setSoftwareData] = useState<Software[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null); // Cho phép error là chuỗi hoặc null

  useEffect(() => {
    fetch("http://localhost:5281/api/Software?includeDevelopmentTeams=false")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Lỗi khi gọi API: " + res.status);
        }
        return res.json();
      })
      .then((data) => {
        // Kiểm tra xem data có chứa $values và đảm bảo đó là mảng
        if (data && Array.isArray(data["$values"])) {
          setSoftwareData(data["$values"]); // Truy xuất đúng mảng $values
        } else {
          setError("Dữ liệu trả về không hợp lệ.");
          setSoftwareData([]); // Đảm bảo là mảng rỗng khi có lỗi
        }
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const filteredSoftware = softwareData.filter(
    (software) =>
      software.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      software.leader?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      software.status?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <p>Đang tải dữ liệu...</p>;
  if (error) return <p className="text-red-500">Lỗi: {error}</p>;

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Tìm kiếm phần mềm..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Tên phần mềm</TableHead>
              <TableHead>Ngày bắt đầu</TableHead>
              <TableHead>Ngày hoàn thành</TableHead>
              <TableHead>Phạm vi</TableHead>
              <TableHead>Người chủ trì</TableHead>
              <TableHead>Trạng thái</TableHead>
              <TableHead className="text-right">Thao tác</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredSoftware.map((software, index) => (
              <TableRow key={software.id || index}>
                <TableCell className="font-medium">{software.name}</TableCell>
                <TableCell>{formatDate(software.startDate)}</TableCell>
                <TableCell>{formatDate(software.endDate)}</TableCell>
                <TableCell>{software.scope}</TableCell>
                <TableCell>{software.leader}</TableCell>
                <TableCell>
                  <Badge
                    variant={
                      software.status === "Hoàn thành"
                        ? "destructive"
                        : software.status === "Đang phát triển"
                        ? "secondary"
                        : software.status === "Lên kế hoạch"
                        ? "default"
                        : software.status === "Đang thử nghiệm"
                        ? "default"
                        : "outline"
                    }
                  >
                    {translateStatus(software.status)}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Mở menu</span>
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Thao tác</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>
                        <Eye className="mr-2 h-4 w-4" />
                        Xem chi tiết
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Edit className="mr-2 h-4 w-4" />
                        Chỉnh sửa
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-destructive">
                        <Trash2 className="mr-2 h-4 w-4" />
                        Xóa
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
