import { useState } from "react";



type Status = "Applied" | "Interviewing" | "Offer" | "Rejected";

type ApplicationFormProps = {
  onSubmit: (formData: {
    company: string;
    position: string;
    status: Status;
    dateApplied: string;
    notes?: string;
    location?: string;
    resumeUrl?: string;
  }) => void;

   initialData?: {
    company: string;
    position: string;
    status: "Applied" | "Interviewing" | "Offer" | "Rejected";
    dateApplied: string;
    notes?: string;
    location?: string;
    resumeUrl?: string;
  }; 
};

const statusOptions: Status[] = ["Applied", "Interviewing", "Offer", "Rejected"];

export default function ApplicationForm({ onSubmit }: ApplicationFormProps) {
  const [formData, setFormData] = useState<{
  company: string;
  position: string;
  status: Status;
  dateApplied: string;
  notes?: string;
  location?: string;
  resumeUrl?: string;
}>({
  company: "",
  position: "",
  status: "Applied", // default must be a valid union value
  dateApplied: new Date().toISOString().slice(0, 10), // default to today
  notes: "",
});


  const handleChange = (
  e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
) => {
  const { name, value } = e.target;

  if (name === "status") {
    // only allow exact union values
    if (["Applied", "Interviewing", "Offer", "Rejected"].includes(value)) {
      setFormData(prev => ({ ...prev, [name]: value as "Applied" | "Interviewing" | "Offer" | "Rejected" }));
    }
  } else {
    setFormData(prev => ({ ...prev, [name]: value }));
  }
};


  const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault();

  
  const submittedData = {
    ...formData,
    status: formData.status as "Applied" | "Interviewing" | "Offer" | "Rejected",
  };

  onSubmit(submittedData);
  setFormData({
    company: "",
    position: "",
    status: "Applied",
    dateApplied: new Date().toISOString().slice(0, 10),
    notes: "",
  });
};


  return (
    <form
      onSubmit={handleSubmit}
      className="bg-[#1a1a1a]/80 backdrop-blur-sm p-6 rounded-2xl shadow-xl max-w-md mx-auto mt-10 border border-white/10"
    >
      <h2 className="text-2xl font-semibold text-white mb-6">Add New Application</h2>

      <div className="mb-4">
        <label htmlFor="company" className="block text-sm text-gray-300 mb-1">
          Company
        </label>
        <input
          type="text"
          id="company"
          name="company"
          value={formData.company}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 bg-[#2a2a2a] text-white border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="position" className="block text-sm text-gray-300 mb-1">
          Position
        </label>
        <input
          type="text"
          id="position"
          name="position"
          value={formData.position}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 bg-[#2a2a2a] text-white border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="status" className="block text-sm text-gray-300 mb-1">
          Status
        </label>
        <select
          id="status"
          name="status"
          value={formData.status}
          onChange={handleChange}
          className="w-full px-4 py-2 bg-[#2a2a2a] text-white border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {statusOptions.map((status) => (
            <option key={status} value={status}>
              {status}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-4">
        <label htmlFor="dateApplied" className="block text-sm text-gray-300 mb-1">
          Date Applied
        </label>
        <input
          type="date"
          id="dateApplied"
          name="dateApplied"
          value={formData.dateApplied}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 bg-[#2a2a2a] text-white border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="mb-6">
        <label htmlFor="notes" className="block text-sm text-gray-300 mb-1">
          Notes
        </label>
        <textarea
          id="notes"
          name="notes"
          rows={4}
          value={formData.notes}
          onChange={handleChange}
          className="w-full px-4 py-2 bg-[#2a2a2a] text-white border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-colors"
      >
        Submit
      </button>
    </form>
  );
}
