export interface Schedule {
  id: string;
  shiftDate: string;
  startTime: string;
  endTime: string;
  employeeId: string;
  employee: {
    id: string;
    name: string;
  };
}

export interface ScheduleDisplay {
  id: string;
  date: string;
  shift: string;
  time: string;
  employees: {
    id: string;
    name: string;
    initials: string;
  }[];
}
