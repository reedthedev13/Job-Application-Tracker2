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
    <div className="bg-[#d5bdaf]/90 backdrop-blur-sm border border-[#5c4a3e] rounded-xl shadow-md p-5 text-[#1e1b17]">
      <h3 className="text-2xl font-semibold mb-1">
        {application.position} @ {application.company}
      </h3>
      <p className="mb-1">
        Status: <strong>{application.status}</strong>
      </p>
      <p className="mb-1">
        Date Applied: {new Date(application.dateApplied).toLocaleDateString()}
      </p>
      {application.location && <p className="mb-1">Location: {application.location}</p>}
      {application.notes && <p className="mb-1">Notes: {application.notes}</p>}
      {application.resumeUrl && (
        <p className="mb-3">
          <a
            href={application.resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#6b4f3c] underline hover:text-[#8b6e54] transition-colors"
          >
            Resume
          </a>
        </p>
      )}
      <div className="flex space-x-3">
        <button
          onClick={() => onEdit(application)}
          className="bg-[#8b6e54] text-white px-4 py-1 rounded-lg hover:bg-[#a78966] transition-colors"
        >
          Edit
        </button>
        <button
          onClick={() => application.id && onDelete(application.id)}
          className="bg-[#7c3c3c] text-white px-4 py-1 rounded-lg hover:bg-[#9e4e4e] transition-colors"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default ApplicationCard;
