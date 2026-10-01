import { Complaint } from "./complaints";

const STORAGE_KEY = "dsceComplaints";

export function getComplaints(): Complaint[] {
  if (typeof window === "undefined") {
    return [];
  }

  try {
    const saved = localStorage.getItem(STORAGE_KEY);

    if (!saved) {
      return [];
    }

    return JSON.parse(saved) as Complaint[];
  } catch {
    return [];
  }
}

export function saveComplaints(
  complaints: Complaint[]
): void {
  if (typeof window === "undefined") {
    return;
  }

  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(complaints)
  );
}

export function addComplaint(
  complaint: Complaint
): void {
  const complaints = getComplaints();

  complaints.push(complaint);

  saveComplaints(complaints);
}

export function updateComplaint(
  updatedComplaint: Complaint
): void {
  const complaints = getComplaints();

  const updated = complaints.map((complaint) =>
    complaint.id === updatedComplaint.id
      ? updatedComplaint
      : complaint
  );

  saveComplaints(updated);
}

export function getComplaintById(
  id: string
): Complaint | undefined {
  const complaints = getComplaints();

  return complaints.find(
    (complaint) => complaint.id === id
  );
}

export function generateTicketId(
  type: "student" | "faculty"
): string {
  const prefix = type === "student" ? "STU" : "FAC";

  const randomNumber = Math.floor(
    100000 + Math.random() * 900000
  );

  return `${prefix}-${randomNumber}`;
}