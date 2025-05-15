"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation"; // lấy param id từ url
import { Employee } from "@/lib/types/employee/employee";
import { fetchEmployee } from "@/lib/api/employee/employeeService"; // bạn cần tạo hàm này

export default function EmployeeDetailPage() {
  const params = useParams();
  const id = params.id;

  const [employee, setEmployee] = useState<Employee | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id || Array.isArray(id)) return;

    fetchEmployee(id)
      .then((data) => setEmployee(data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <p>Đang tải thông tin nhân viên...</p>;
  if (error) return <p className="text-red-500">Lỗi: {error}</p>;
  if (!employee) return <p>Không tìm thấy nhân viên</p>;

  return (
    <div>
      <h1>Thông tin nhân viên: {employee.name}</h1>
      <p>Trạng thái: {employee.status}</p>
      <p>Ngày tạo: {new Date(employee.createdDate).toLocaleDateString()}</p>
      <p>Người tạo: {employee.createdBy}</p>
      {/* Hiển thị thêm thông tin khác nếu có */}
    </div>
  );
}
