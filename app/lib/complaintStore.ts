// app/lib/complaintStore.ts

import { Complaint, UserType } from "./complaints";

const STORAGE_KEY = "dsce-connect-complaints";

/*
  Get all complaints stored in the browser.
*/
export function getComplaints(): Complaint[] {
  if (typeof window === "undefined") {
    return [];
  }

  try {
    const stored = localStorage.getItem(STORAGE_KEY);

    if (!stored) {
      return [];
    }

    return JSON.parse(stored) as Complaint[];
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
) {
  if (typeof window === "undefined") {
    return;
  }

  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(complaints)
  );
}

/*
  Add a new complaint.
*/
export function addComplaint(
  complaint: Complaint
) {
  const complaints = getComplaints();

  complaints.unshift(complaint);

  saveComplaints(complaints);
}

/*
  Find complaint using ticket ID.
*/
export function getComplaintById(
  id: string
): Complaint | undefined {
  const complaints = getComplaints();

  return complaints.find(
    (complaint) => complaint.id === id
  );
}

/*
  Get complaints submitted by a particular user.
*/
export function getComplaintsByUser(
  userType: UserType,
  userId: string
): Complaint[] {
  const complaints = getComplaints();

  return complaints.filter(
    (complaint) =>
      complaint.complainantType === userType &&
      complaint.complainantId === userId
  );
}

/*
  Update an existing complaint.
*/
export function updateComplaint(
  updatedComplaint: Complaint
) {
  const complaints = getComplaints();

  const updated = complaints.map(
    (complaint) =>
      complaint.id === updatedComplaint.id
        ? updatedComplaint
        : complaint
  );

  saveComplaints(updated);
}

/*
  Delete complaint.
*/
export function deleteComplaint(
  id: string
) {
  const complaints = getComplaints();

  const remaining = complaints.filter(
    (complaint) => complaint.id !== id
  );

  saveComplaints(remaining);
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
      100000 + Math.random() * 900000
    );

  return `${prefix}-${randomNumber}`;
}