// app/lib/complaintStore.ts

import { supabase } from "./supabase";
import {
  Complaint,
  UserType,
} from "./complaints";

/*
  Convert a Supabase database row
  into the application's Complaint type.
*/
function mapComplaint(row: any): Complaint {
  return {
    id: row.id,

    complainantType:
      row.complainant_type,

    complainantName:
      row.complainant_name,

    complainantId:
      row.complainant_id,

    title:
      row.title,

    category:
      row.category,

    description:
      row.description,

    location:
      row.location,

    priority:
      row.priority,

    status:
      row.status,

    assignedDepartment:
      row.assigned_department || "",

    assignedAuthority:
      row.assigned_authority || "",

    submittedAt:
      row.submitted_at,

    dueDate:
      row.due_date || "",

    escalationLevel:
      row.escalation_level ?? 0,

    escalatedTo:
      row.escalated_to || "",

    escalatedAt:
      row.escalated_at || "",

    escalationReason:
      row.escalation_reason || "",

    adminRemarks:
      row.admin_remarks || "",

    resolutionDetails:
      row.resolution_details || "",

    resolvedAt:
      row.resolved_at || "",
  };
}

/*
  Get all complaints from Supabase.
*/
export async function getComplaints(): Promise<Complaint[]> {
  const { data, error } = await supabase
    .from("complaints")
    .select("*")
    .order("submitted_at", {
      ascending: false,
    });

  if (error) {
    console.error(
      "Unable to fetch complaints:",
      error
    );

    return [];
  }

  return (data || []).map(mapComplaint);
}

/*
  Get one complaint using ticket ID.
*/
export async function getComplaintById(
  id: string
): Promise<Complaint | undefined> {
  const { data, error } = await supabase
    .from("complaints")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (error) {
    console.error(
      "Unable to fetch complaint:",
      error
    );

    return undefined;
  }

  if (!data) {
    return undefined;
  }

  return mapComplaint(data);
}

/*
  Get complaints submitted by
  a particular user.
*/
export async function getComplaintsByUser(
  userType: UserType,
  userId: string
): Promise<Complaint[]> {
  const { data, error } = await supabase
    .from("complaints")
    .select("*")
    .eq("complainant_type", userType)
    .eq("complainant_id", userId)
    .order("submitted_at", {
      ascending: false,
    });

  if (error) {
    console.error(
      "Unable to fetch user complaints:",
      error
    );

    return [];
  }

  return (data || []).map(mapComplaint);
}

/*
  Add a new complaint.
*/
export async function addComplaint(
  complaint: Complaint
): Promise<Complaint | null> {
  const { data, error } = await supabase
    .from("complaints")
    .insert({
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
        complaint.location,

      priority:
        complaint.priority,

      status:
        complaint.status,

      assigned_department:
        complaint.assignedDepartment || null,

      assigned_authority:
        complaint.assignedAuthority || null,

      submitted_at:
        complaint.submittedAt,

      due_date:
        complaint.dueDate || null,

      escalation_level:
        complaint.escalationLevel ?? 0,

      escalated_to:
        complaint.escalatedTo || null,

      escalated_at:
        complaint.escalatedAt || null,

      escalation_reason:
        complaint.escalationReason || null,

      admin_remarks:
        complaint.adminRemarks || null,

      resolution_details:
        complaint.resolutionDetails || null,

      resolved_at:
        complaint.resolvedAt || null,
    })
    .select("*")
    .single();

  if (error) {
    console.error(
      "Unable to add complaint:",
      error
    );

    return null;
  }

  return mapComplaint(data);
}

/*
  Update an existing complaint.
*/
export async function updateComplaint(
  complaint: Complaint
): Promise<boolean> {
  const { error } = await supabase
    .from("complaints")
    .update({
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
        complaint.location,

      priority:
        complaint.priority,

      status:
        complaint.status,

      assigned_department:
        complaint.assignedDepartment || null,

      assigned_authority:
        complaint.assignedAuthority || null,

      submitted_at:
        complaint.submittedAt,

      due_date:
        complaint.dueDate || null,

      escalation_level:
        complaint.escalationLevel ?? 0,

      escalated_to:
        complaint.escalatedTo || null,

      escalated_at:
        complaint.escalatedAt || null,

      escalation_reason:
        complaint.escalationReason || null,

      admin_remarks:
        complaint.adminRemarks || null,

      resolution_details:
        complaint.resolutionDetails || null,

      resolved_at:
        complaint.resolvedAt || null,
    })
    .eq("id", complaint.id);

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
  Delete a complaint.
*/
export async function deleteComplaint(
  id: string
): Promise<boolean> {
  const { error } = await supabase
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
  Generate a unique ticket ID.
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