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
      className="bg-[#23272f]/80 backdrop-blur-md p-8 rounded-2xl shadow-2xl max-w-lg mx-auto border border-[#23272f] text-[#f3f4f6] space-y-5"
    >
      <h2 className="text-2xl font-bold mb-2 text-[#f3f4f6]">Add New Application</h2>

      <div>
        <label htmlFor="company" className="block text-sm text-[#a1a1aa] mb-1">
          Company
        </label>
        <input
          type="text"
          id="company"
          name="company"
          value={formData.company}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 bg-[#18181b] text-[#f3f4f6] border border-[#23272f] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6366f1]/60 transition"
        />
      </div>

      <div>
        <label htmlFor="position" className="block text-sm text-[#a1a1aa] mb-1">
          Position
        </label>
        <input
          type="text"
          id="position"
          name="position"
          value={formData.position}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 bg-[#18181b] text-[#f3f4f6] border border-[#23272f] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6366f1]/60 transition"
        />
      </div>

      <div>
        <label htmlFor="status" className="block text-sm text-[#a1a1aa] mb-1">
          Status
        </label>
        <select
          id="status"
          name="status"
          value={formData.status}
          onChange={handleChange}
          className="w-full px-4 py-2 bg-[#18181b] text-[#f3f4f6] border border-[#23272f] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#06b6d4]/60 transition"
        >
          {statusOptions.map((status) => (
            <option key={status} value={status}>
              {status}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="dateApplied" className="block text-sm text-[#a1a1aa] mb-1">
          Date Applied
        </label>
        <input
          type="date"
          id="dateApplied"
          name="dateApplied"
          value={formData.dateApplied}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 bg-[#18181b] text-[#f3f4f6] border border-[#23272f] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#06b6d4]/60 transition"
        />
      </div>

      <div>
        <label htmlFor="location" className="block text-sm text-[#a1a1aa] mb-1">
          Location
        </label>
        <input
          type="text"
          id="location"
          name="location"
          value={formData.location}
          onChange={handleChange}
          className="w-full px-4 py-2 bg-[#18181b] text-[#f3f4f6] border border-[#23272f] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6366f1]/60 transition"
        />
      </div>

      <div>
        <label htmlFor="resumeUrl" className="block text-sm text-[#a1a1aa] mb-1">
          Resume URL
        </label>
        <input
          type="url"
          id="resumeUrl"
          name="resumeUrl"
          value={formData.resumeUrl}
          onChange={handleChange}
          className="w-full px-4 py-2 bg-[#18181b] text-[#f3f4f6] border border-[#23272f] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#06b6d4]/60 transition"
        />
      </div>

      <div>
        <label htmlFor="notes" className="block text-sm text-[#a1a1aa] mb-1">
          Notes
        </label>
        <textarea
          id="notes"
          name="notes"
          rows={3}
          value={formData.notes}
          onChange={handleChange}
          className="w-full px-4 py-2 bg-[#18181b] text-[#f3f4f6] border border-[#23272f] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6366f1]/60 transition"
        />
      </div>

      <button
        type="submit"
        className="w-full bg-gradient-to-tr from-[#6366f1] to-[#06b6d4] hover:from-[#06b6d4] hover:to-[#6366f1] text-white py-2.5 px-4 rounded-xl font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#06b6d4]/60"
      >
        Submit
      </button>
    </form>
  );
}
