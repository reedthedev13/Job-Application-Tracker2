import { useEffect, useState } from "react";
import type { Application } from "./types";
import { db, auth } from "../firebase";
import {
  collection,
  query,
  where,
  onSnapshot,
  addDoc,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";

import ApplicationCard from "./ApplicationCard";
import ApplicationForm from "./ApplicationForm";

const validStatuses = ["Applied", "Interviewing", "Offer", "Rejected"] as const;
type Status = (typeof validStatuses)[number];

const Dashboard = () => {
  const [applications, setApplications] = useState<Application[]>([]);
  const [editingApp, setEditingApp] = useState<Application | null>(null);
  const [showForm, setShowForm] = useState(false);

  const user = auth.currentUser;

  useEffect(() => {
    if (!user) return;
    const q = query(
      collection(db, "applications"),
      where("userId", "==", user.uid)
    );
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const apps: Application[] = [];
      querySnapshot.forEach((doc) => {
        apps.push({ id: doc.id, ...doc.data() } as Application);
      });
      setApplications(apps);
    });

    return () => unsubscribe();
  }, [user]);

  const addApplication = async (formData: {
    company: string;
    position: string;
    status: string;
    notes?: string;
    location?: string;
    resumeUrl?: string;
  }) => {
    if (!user) return;

    const status: Status = validStatuses.includes(formData.status as Status)
      ? (formData.status as Status)
      : "Applied";

    const application: Application = {
      ...formData,
      status,
      dateApplied: new Date().toISOString(),
      userId: user.uid,
    };

    await addDoc(collection(db, "applications"), application);
    setShowForm(false);
  };

  const updateApplication = async (app: Application) => {
    if (!app.id) return;

    const status: Status = validStatuses.includes(app.status)
      ? app.status
      : "Applied";

    const appRef = doc(db, "applications", app.id);

    try {
      await updateDoc(appRef, {
        ...app,
        status,
      });
      setEditingApp(null);
    } catch (error) {
      console.error("Error updating application:", error);
    }
  };

  const deleteApplication = async (id: string) => {
    await deleteDoc(doc(db, "applications", id));
  };

  return (
    <div className="min-h-screen bg-[#1b1b1f] text-[#fefefe] p-6">
      <div className="max-w-5xl mx-auto space-y-8">
        <div className="flex justify-between items-center border-b border-[#3d3d42] pb-4">
          <h2 className="text-3xl font-bold tracking-tight">
            Job Applications
          </h2>
          <button
            onClick={() => {
              setEditingApp(null);
              setShowForm(true);
            }}
            className="bg-[#ffb86b] text-[#1b1b1f] px-4 py-2 rounded-xl font-semibold shadow-md hover:shadow-lg hover:scale-105 transition-all duration-200"
          >
            + Add Application
          </button>
        </div>

        {(showForm || editingApp) && (
          <div className="bg-[#2b2b31] p-4 rounded-xl border border-[#3d3d42] shadow-md">
            <ApplicationForm
              onSubmit={editingApp ? updateApplication : addApplication}
              initialData={editingApp ?? undefined}
            />
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {applications.length === 0 && (
            <p className="text-[#a6a6a6]">No applications yet.</p>
          )}
          {applications.map((app) => (
            <ApplicationCard
              key={app.id}
              application={app}
              onEdit={(app) => {
                setEditingApp(app);
                setShowForm(true);
              }}
              onDelete={deleteApplication}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
