export type UserType = "student" | "faculty";

export type ComplaintStatus =
  | "Pending"
  | "Under Review"
  | "Assigned"
  | "In Progress"
  | "Escalated"
  | "Resolution Submitted"
  | "Resolved"
  | "Rejected"
  | "Closed";

export type Priority = "Low" | "Medium" | "High" | "Urgent";

export type Department =
  | "Administration"
  | "Accounts / Finance"
  | "Academic Department"
  | "HR"
  | "Infrastructure / Maintenance"
  | "IT Department"
  | "Hostel"
  | "Transport"
  | "Security"
  | "Library"
  | "Student Affairs"
  | "Examination Section"
  | "Other";

export type Complaint = {
  id: string;

  // Who submitted the complaint
  complainantType: UserType;
  complainantName: string;
  complainantId: string;

  // Complaint information
  title: string;
  category: string;
  description: string;
  location: string;

  // Management
  priority: Priority;
  status: ComplaintStatus;

  // Department and authority
  assignedDepartment: Department | "";
  assignedAuthority: string;

  // Dates
  submittedAt: string;
  dueDate: string;

  // Escalation
  escalationLevel: number;
  escalatedTo: string;
  escalatedAt: string;
  escalationReason: string;

  // Administration
  adminRemarks: string;
  resolutionDetails: string;
  resolvedAt: string;
};