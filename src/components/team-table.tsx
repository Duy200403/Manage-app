"use client";

import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
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
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Search, MoreHorizontal, Edit, Trash2, Eye, Users } from "lucide-react";

import { DevelopmentTeam } from "@/lib/types/team/team";
import { fetchDevelopmentTeams } from "@/lib/api/team/teamService";
import { formatDate } from "@/lib/utils/team/formatDateTeam";

export function TeamTable() {
  const [teams, setTeams] = useState<DevelopmentTeam[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchDevelopmentTeams().then(setTeams);
  }, []);

  const filteredTeams = teams.filter(
    (team) =>
      team.software.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      team.status.toLowerCase().includes(searchTerm.toLowerCase()) ||
      team.memberName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Tìm kiếm nhóm..."
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
              <TableHead>Tên nhóm</TableHead>
              <TableHead>Thành viên</TableHead>
              <TableHead>Trạng thái</TableHead>
              <TableHead>Ngày tạo</TableHead>
              <TableHead>Người tạo</TableHead>
              <TableHead className="text-right">Thao tác</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredTeams.map((team, index) => (
              <TableRow key={team.id || index}>
                <TableCell className="font-medium">
                  {team.software.name}
                </TableCell>
                <TableCell>
                  <div className="flex -space-x-2">
                    <Avatar className="h-8 w-8 border-2 border-background">
                      <AvatarFallback>
                        {team.memberName
                          .split(" ")
                          .map((word) => word[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge
                    variant={
                      team.status === "Đang Hoạt Động" ? "default" : "secondary"
                    }
                  >
                    {team.status}
                  </Badge>
                </TableCell>
                <TableCell>{formatDate(team.createdDate)}</TableCell>
                <TableCell>{team.createdBy}</TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
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
                        <Users className="mr-2 h-4 w-4" />
                        Quản lý thành viên
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
