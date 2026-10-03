// app/lib/complaintStore.ts

import type {
  Complaint,
  UserType,
} from "./complaints";

const STORAGE_KEY =
  "dsce-connect-complaints";

/*
  Get all complaints stored in the browser.
*/
export function getComplaints(): Complaint[] {
  if (typeof window === "undefined") {
    return [];
  }

  try {
    const stored =
      localStorage.getItem(STORAGE_KEY);

    if (!stored) {
      return [];
    }

    const parsed = JSON.parse(stored);

    if (!Array.isArray(parsed)) {
      return [];
    }

    return parsed as Complaint[];
  } catch (error) {
    console.error(
      "Unable to read complaints:",
      error
    );

    return [];
  }
}

/*
  Save all complaints.
*/
function saveComplaints(
  complaints: Complaint[]
): void {
  if (typeof window === "undefined") {
    return;
  }

  try {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(complaints)
    );
  } catch (error) {
    console.error(
      "Unable to save complaints:",
      error
    );
  }
}

/*
  Add a new complaint.
*/
export function addComplaint(
  complaint: Complaint
): Complaint[] {
  const complaints =
    getComplaints();

  const updated = [
    complaint,
    ...complaints,
  ];

  saveComplaints(updated);

  return updated;
}

/*
  Find complaint using ticket ID.
*/
export function getComplaintById(
  id: string
): Complaint | undefined {
  const complaints =
    getComplaints();

  return complaints.find(
    (complaint) =>
      complaint.id === id
  );
}

/*
  Get complaints submitted by
  a particular user.
*/
export function getComplaintsByUser(
  userType: UserType,
  userId: string
): Complaint[] {
  const complaints =
    getComplaints();

  return complaints.filter(
    (complaint) =>
      complaint.complainantType ===
        userType &&
      complaint.complainantId ===
        userId
  );
}

/*
  Update an existing complaint.
*/
export function updateComplaint(
  updatedComplaint: Complaint
): Complaint[] {
  const complaints =
    getComplaints();

  const updated =
    complaints.map(
      (complaint) =>
        complaint.id ===
        updatedComplaint.id
          ? updatedComplaint
          : complaint
    );

  saveComplaints(updated);

  return updated;
}

/*
  Delete complaint.
*/
export function deleteComplaint(
  id: string
): Complaint[] {
  const complaints =
    getComplaints();

  const remaining =
    complaints.filter(
      (complaint) =>
        complaint.id !== id
    );

  saveComplaints(remaining);

  return remaining;
}

/*
  Generate ticket ID.
*/
export function generateTicketId(
  userType: UserType
): string {
  const prefix =
    userType === "student"
      ? "STU"
      : "FAC";

  const randomNumber =
    Math.floor(
      100000 +
        Math.random() * 900000
    );

  return `${prefix}-${randomNumber}`;
}