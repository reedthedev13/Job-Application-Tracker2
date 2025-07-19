export interface Application {
  id?: string;
  company: string;
  position: string;
  location?: string;
  status: "Applied" | "Interviewing" | "Offer" | "Rejected";
  dateApplied: string;
  notes?: string;
  resumeUrl?: string;
  userId?: string;
   initialData?: Application;
}