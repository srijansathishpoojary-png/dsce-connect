// app/lib/complaintStore.ts

import { supabase } from "./supabase";
import { Complaint, UserType } from "./complaints";

/*
  Convert a Supabase database row into
  the Complaint structure used by the application.
*/
function mapDatabaseComplaint(row: any): Complaint {
  return {
    id: row.id,

    complainantType: row.complainant_type,
    complainantName: row.complainant_name,
    complainantId: row.complainant_id,

    title: row.title,
    category: row.category,
    description: row.description,
    location: row.location ?? "",

    priority: row.priority,
    status: row.status,

    submittedAt: row.submitted_at,

    assignedDepartment:
      row.assigned_department ?? "",

    assignedAuthority:
      row.assigned_authority ?? "",

    dueDate:
      row.due_date ?? "",

    escalationLevel:
      row.escalation_level ?? 0,

    escalatedTo:
      row.escalated_to ?? "",

    escalationReason:
      row.escalation_reason ?? "",

    adminRemarks:
      row.admin_remarks ?? "",

    resolutionDetails:
      row.resolution_details ?? "",

    updatedAt:
      row.updated_at,
  };
}

/*
  Convert an application Complaint into
  the Supabase database structure.
*/
function mapComplaintToDatabase(
  complaint: Complaint
) {
  return {
    id: complaint.id,

    complainant_type:
      complaint.complainantType,

    complainant_name:
      complaint.complainantName,

    complainant_id:
      complaint.complainantId,

    title:
      complaint.title,

    category:
      complaint.category,

    description:
      complaint.description,

    location:
      complaint.location || null,

    priority:
      complaint.priority,

    status:
      complaint.status || "Pending",

    submitted_at:
      complaint.submittedAt ||
      new Date().toISOString(),

    assigned_department:
      complaint.assignedDepartment || null,

    assigned_authority:
      complaint.assignedAuthority || null,

    due_date:
      complaint.dueDate || null,

    escalation_level:
      complaint.escalationLevel ?? 0,

    escalated_to:
      complaint.escalatedTo || null,

    escalation_reason:
      complaint.escalationReason || null,

    admin_remarks:
      complaint.adminRemarks || null,

    resolution_details:
      complaint.resolutionDetails || null,

    updated_at:
      complaint.updatedAt ||
      new Date().toISOString(),
  };
}

/*
  Get all complaints from Supabase.
*/
export async function getComplaints(): Promise<
  Complaint[]
> {
  const { data, error } =
    await supabase
      .from("complaints")
      .select("*")
      .order("submitted_at", {
        ascending: false,
      });

  if (error) {
    console.error(
      "Unable to read complaints:",
      error
    );

    return [];
  }

  return (data ?? []).map(
    mapDatabaseComplaint
  );
}

/*
  Add a new complaint to Supabase.
*/
export async function addComplaint(
  complaint: Complaint
): Promise<boolean> {
  const databaseComplaint =
    mapComplaintToDatabase(
      complaint
    );

  const { error } =
    await supabase
      .from("complaints")
      .insert(databaseComplaint);

  if (error) {
    console.error(
      "Unable to add complaint:",
      error
    );

    return false;
  }

  return true;
}

/*
  Find complaint using ticket ID.
*/
export async function getComplaintById(
  id: string
): Promise<Complaint | undefined> {
  const { data, error } =
    await supabase
      .from("complaints")
      .select("*")
      .eq("id", id)
      .maybeSingle();

  if (error) {
    console.error(
      "Unable to find complaint:",
      error
    );

    return undefined;
  }

  if (!data) {
    return undefined;
  }

  return mapDatabaseComplaint(data);
}

/*
  Get complaints submitted by a particular user.
*/
export async function getComplaintsByUser(
  userType: UserType,
  userId: string
): Promise<Complaint[]> {
  const { data, error } =
    await supabase
      .from("complaints")
      .select("*")
      .eq("complainant_type", userType)
      .eq("complainant_id", userId)
      .order("submitted_at", {
        ascending: false,
      });

  if (error) {
    console.error(
      "Unable to get user complaints:",
      error
    );

    return [];
  }

  return (data ?? []).map(
    mapDatabaseComplaint
  );
}

/*
  Update an existing complaint.
*/
export async function updateComplaint(
  updatedComplaint: Complaint
): Promise<boolean> {
  const databaseComplaint =
    mapComplaintToDatabase(
      updatedComplaint
    );

  const { error } =
    await supabase
      .from("complaints")
      .update(databaseComplaint)
      .eq(
        "id",
        updatedComplaint.id
      );

  if (error) {
    console.error(
      "Unable to update complaint:",
      error
    );

    return false;
  }

  return true;
}

/*
  Delete complaint.
*/
export async function deleteComplaint(
  id: string
): Promise<boolean> {
  const { error } =
    await supabase
      .from("complaints")
      .delete()
      .eq("id", id);

  if (error) {
    console.error(
      "Unable to delete complaint:",
      error
    );

    return false;
  }

  return true;
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