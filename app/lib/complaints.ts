// app/lib/complaints.ts

export type UserType = "student" | "faculty";

export type ComplaintStatus =
  | "Pending"
  | "Under Review"
  | "Assigned"
  | "In Progress"
  | "Escalated"
  | "Resolved"
  | "Closed"
  | "Rejected";

export type Priority =
  | "Low"
  | "Medium"
  | "High"
  | "Urgent";

export interface Complaint {
  id: string;

  complainantType: UserType;

  complainantName: string;

  complainantId: string;

  title: string;

  category: string;

  description: string;

  location: string;

  priority: Priority;

  status: ComplaintStatus;

  assignedDepartment: string;

  assignedAuthority: string;

  submittedAt: string;

  dueDate: string;

  escalationLevel: number;

  escalatedTo: string;

  escalatedAt: string;

  escalationReason: string;

  adminRemarks: string;

  resolutionDetails: string;

  resolvedAt: string;
}