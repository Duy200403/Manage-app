"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { set } from "date-fns";

type Software = {
  id: string;
  name: string;
};

export default function NewTeamPage() {
  const router = useRouter();
  const [softwareList, setSoftwareList] = useState<Software[]>([]);
  const [selectedMembers, setSelectedMembers] = useState<string[]>([]);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [formData, setFormData] = useState({
    softwareId: "",
    status: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const availableMembers = [
    "Nguyễn Văn A",
    "Trần Thị B",
    "Lê Văn C",
    "Phạm Thị D",
    "Hoàng Văn E",
    "Vũ Văn F",
    "Đặng Thị G",
    "Bùi Văn H",
    "Ngô Thị I",
    "Đinh Văn K",
  ].filter((m) => !selectedMembers.includes(m));

  useEffect(() => {
    fetch("http://localhost:5281/api/Software?includeDevelopmentTeams=false")
      .then((res) => res.json())
      .then((data) => {
        const list = data.$values || [];
        console.log("📃 Danh sách phần mềm:", list);
        setSoftwareList(data.$values || []);
      })
      .catch((error) => {
        console.error("Lỗi khi lấy danh sách phần mềm:", error);
        setErrorMessage(
          "Không thể tải danh sách phần mềm. Vui lòng thử lại sau."
        );
      });
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Kiem tra xem nguoi dung chon it nhat mot thanh vien
    if (selectedMembers.length === 0) {
      setErrorMessage("Vui lòng chọn ít nhất một thành viên.");
      setIsSubmitting(false);
      return;
    }
    // Kiem tra xem nguoi dung nhap day du thong tin
    if (!formData.softwareId || !formData.status) {
      setErrorMessage("Vui lòng điền đầy đủ thông tin.");
      setIsSubmitting(false);
      return;
    }
    const now = new Date().toISOString();

    try {
      const res = await fetch("http://localhost:5281/api/DevelopmentTeam", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          softwareId: formData.softwareId,
          memberName: selectedMembers.join(", "),
          status: formData.status,
          createdDate: now,
          createdBy: "admin",
          updatedDate: now,
          updatedBy: "admin",
        }),
      });

      if (res.ok) {
        setErrorMessage("✅ Tạo nhóm thành công!");
        router.push("/teams");
      } else {
        const errorText = await res.text();
        setErrorMessage("❌ Lỗi: " + errorText);
      }
    } catch (error) {
      console.error("Lỗi gửi dữ liệu:", error);
      setErrorMessage("❌ Lỗi kết nối máy chủ");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto mt-8">
      {/* Trạng thái */}
      <div>
        <label className="block font-medium mb-1">Trạng thái:</label>
        <select
          value={formData.status}
          onChange={(e) => setFormData({ ...formData, status: e.target.value })}
          required
          className="w-full border px-3 py-2 rounded"
        >
          <option value="">-- Chọn trạng thái --</option>
          <option value="Đang Hoat Động">Đang hoạt động</option>
          <option value="Ngưng Hoạt Động">Tạm ngưng</option>
        </select>
      </div>

      {/* Phần mềm */}
      <div>
        <label className="block font-medium mb-1">Phần mềm:</label>
        <select
          value={formData.softwareId}
          onChange={(e) =>
            setFormData({ ...formData, softwareId: e.target.value })
          }
          required
          className="w-full border px-3 py-2 rounded"
        >
          <option value="">-- Chọn phần mềm --</option>
          {softwareList.map((s) => (
            <option key={s.id} value={s.id}>
              {s.name}
            </option>
          ))}
        </select>
      </div>

      {/* Thành viên nhóm */}
      <div>
        <label className="block font-medium mb-1">Thành viên:</label>
        <select
          onChange={(e) => {
            const value = e.target.value;
            if (value && !selectedMembers.includes(value)) {
              setSelectedMembers([...selectedMembers, value]);
            }
          }}
          className="w-full border px-3 py-2 rounded"
        >
          <option value="">-- Chọn thành viên --</option>
          {availableMembers.map((m) => (
            <option key={m} value={m}>
              {m}
            </option>
          ))}
        </select>
        <div className="flex flex-wrap gap-2 mt-2">
          {selectedMembers.map((m) => (
            <span
              key={m}
              className="bg-gray-200 px-2 py-1 rounded text-sm cursor-pointer"
              onClick={() =>
                setSelectedMembers((prev) => prev.filter((name) => name !== m))
              }
            >
              {m} ✕
            </span>
          ))}
        </div>
      </div>

      {/* Hiển thị thông báo lỗi nếu có */}
      {errorMessage && (
        <div className="text-red-600 text-sm">
          <pre>{errorMessage}</pre>
        </div>
      )}

      {/* Submit */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        {isSubmitting ? "Đang lưu..." : "Lưu nhóm"}
      </button>
    </form>
  );
}
