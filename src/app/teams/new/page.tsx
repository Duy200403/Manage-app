"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

import { Software, CreateTeam } from "@/lib/types/team/createTeam";
import {
  fetchSoftwareList,
  createTeam,
} from "@/lib/api/team/createTeamService";

const AVAILABLE_MEMBERS = [
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
];

export default function NewTeamPage() {
  const router = useRouter();
  const [softwareList, setSoftwareList] = useState<Software[]>([]);
  const [selectedMembers, setSelectedMembers] = useState<string[]>([]);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [formData, setFormData] = useState<CreateTeam>({
    softwareId: "",
    status: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    fetchSoftwareList()
      .then(setSoftwareList)
      .catch((error) => {
        console.error(error);
        setErrorMessage(
          "Không thể tải danh sách phần mềm. Vui lòng thử lại sau."
        );
      });
  }, []);

  const availableMembers = AVAILABLE_MEMBERS.filter(
    (m) => !selectedMembers.includes(m)
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    if (selectedMembers.length === 0) {
      setErrorMessage("Vui lòng chọn ít nhất một thành viên.");
      return;
    }

    if (!formData.softwareId || !formData.status) {
      setErrorMessage("Vui lòng điền đầy đủ thông tin.");
      return;
    }

    setIsSubmitting(true);
    try {
      await createTeam(formData, selectedMembers);
      router.push("/teams");
    } catch (error: any) {
      setErrorMessage("❌ Lỗi: " + error.message);
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
