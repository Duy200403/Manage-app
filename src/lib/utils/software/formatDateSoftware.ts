export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return "Không xác định";

  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = date.getFullYear();

  return `${day}-${month}-${year}`;
}

export function translateStatus(status: string): string {
  switch (status) {
    case "Completed":
      return "Hoàn thành";
    case "InProgress":
      return "Đang phát triển";
    default:
      return status;
  }
}
