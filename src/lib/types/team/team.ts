export interface DevelopmentTeam {
  id: string;
  softwareId: string;
  memberName: string;
  status: string;
  createdDate: string;
  createdBy: string;
  updatedDate: string;
  updatedBy: string;
  software: {
    name: string;
    startDate: string;
    endDate: string;
    scope: string;
    leader: string;
    status: string;
  };
}
