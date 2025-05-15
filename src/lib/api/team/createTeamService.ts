import { CreateTeam } from "@/lib/types/team/createTeam";
import { API_BASE_URL } from "@/lib/constants";
import { Software } from "@/lib/types/team/createTeam";

export async function createTeam(
  formData: CreateTeam,
  selectedMembers: string[]
): Promise<void> {
  const now = new Date().toISOString();

  const body = {
    softwareId: formData.softwareId,
    memberName: selectedMembers.join(", "),
    status: formData.status,
    createdDate: now,
    createdBy: "admin",
    updatedDate: now,
    updatedBy: "admin",
  };
  try {
    const response = await fetch(`${API_BASE_URL}/DevelopmentTeam`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      throw new Error("Lỗi khi tạo đội phát triển mới");
    }
  } catch (err) {
    throw new Error("Đã xảy ra lỗi khi gửi dữ liệu.");
  }
}

export async function fetchSoftwareList(): Promise<Software[]> {
  const res = await fetch(
    "${API_BASE_URL}/Software?includeDevelopmentTeams=false"
  );
  if (!res.ok) throw new Error("Không thể tải danh sách phần mềm.");
  const data = await res.json();
  return data.$values || [];
}
