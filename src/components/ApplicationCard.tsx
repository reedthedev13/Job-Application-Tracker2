import React from "react";
import type { Application } from "./types";

interface Props {
  application: Application;
  onEdit: (app: Application) => void;
  onDelete: (id: string) => void;
}

const ApplicationCard: React.FC<Props> = ({
  application,
  onEdit,
  onDelete,
}) => {
   return (
    <div className="bg-[#23272f]/80 backdrop-blur-md border border-[#2d3340] rounded-2xl shadow-xl p-6 text-[#f3f4f6] transition-all duration-200 hover:shadow-2xl hover:-translate-y-1">
      <h3 className="text-xl font-bold mb-1 tracking-tight">
        {application.position} <span className="font-normal text-[#a1a1aa]">@ {application.company}</span>
      </h3>
      <p className="mb-1">
        <span className="text-[#a1a1aa]">Status:</span>{" "}
        <strong
          className={
            application.status === "Offer"
              ? "text-[#22d3ee]"
              : application.status === "Rejected"
              ? "text-[#f87171]"
              : application.status === "Interviewing"
              ? "text-[#fbbf24]"
              : "text-[#6366f1]"
          }
        >
          {application.status}
        </strong>
      </p>
      <p className="mb-1 text-[#a1a1aa]">
        Date Applied:{" "}
        <span className="text-[#f3f4f6]">
          {new Date(application.dateApplied).toLocaleDateString()}
        </span>
      </p>
      {application.location && (
        <p className="mb-1 text-[#a1a1aa]">
          Location: <span className="text-[#f3f4f6]">{application.location}</span>
        </p>
      )}
      {application.notes && (
        <p className="mb-1 text-[#a1a1aa]">
          Notes: <span className="text-[#f3f4f6]">{application.notes}</span>
        </p>
      )}
      {application.resumeUrl && (
        <p className="mb-3">
          <a
            href={application.resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#06b6d4] underline hover:text-[#22d3ee] transition-colors"
          >
            Resume
          </a>
        </p>
      )}
      <div className="flex space-x-3 mt-2">
        <button
          onClick={() => onEdit(application)}
          className="bg-gradient-to-tr from-[#6366f1] to-[#06b6d4] text-white px-4 py-1.5 rounded-lg font-semibold shadow hover:scale-105 hover:shadow-lg transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-[#06b6d4]/60"
        >
          Edit
        </button>
        <button
          onClick={() => application.id && onDelete(application.id)}
          className="bg-[#f87171] text-white px-4 py-1.5 rounded-lg font-semibold shadow hover:bg-[#ef4444] hover:scale-105 transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-[#f87171]/60"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default ApplicationCard;
