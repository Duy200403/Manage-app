import { DevelopmentTeam } from "@/lib/types/team/team";
import { API_BASE_URL } from "../../constants";

export async function fetchDevelopmentTeams(): Promise<DevelopmentTeam[]> {
  try {
    const res = await fetch(
      `${API_BASE_URL}/DevelopmentTeam?includeSoftware=true`
    );

    if (!res.ok) {
      throw new Error(`HTTP error! Status: ${res.status}`);
    }

    const text = await res.text();
    if (!text) {
      console.warn("❗ API trả về rỗng.");
      return [];
    }

    let data: any;
    try {
      data = JSON.parse(text);
    } catch (jsonError) {
      console.error("❌ Không thể parse JSON:", jsonError, "\nNội dung:", text);
      return [];
    }

    return data?.$values ?? [];
  } catch (error) {
    console.error("❌ Lỗi khi fetch development teams:", error);
    return [];
  }
}
