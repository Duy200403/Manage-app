import { CreateEmployee } from "@/lib/types/employee/createEmployee";
import { API_BASE_URL } from "@/lib/constants";

// Gửi dữ liệu phần mềm mới lên server
export async function createEmployee(formData: CreateEmployee): Promise<void> {
  try {
    const response = await fetch(`${API_BASE_URL}/Employee`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      throw new Error("Lỗi khi tạo phần mềm mới");
    }
  } catch (err) {
    throw new Error("Đã xảy ra lỗi khi gửi dữ liệu.");
  }
}
