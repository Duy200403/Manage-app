export interface CreateShiftPayload {
  employeeId: string[];
  shiftDate: string | undefined;
  startTime: string;
  endTime: string;
  createdDate: string;
  createdBy: string;
  updatedDate: string;
  updatedBy: string;
}
