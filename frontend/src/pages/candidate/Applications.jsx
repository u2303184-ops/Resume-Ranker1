import { useState } from "react";
import api from "../../services/api";

export default function Applications() {

  const [email, setEmail] = useState("");
  const [applications, setApplications] = useState([]);

  const fetchApplications = async () => {
    const res = await api.get(
      `/candidate/applications?email=${email}`
    );
    setApplications(res.data);
  };

  return (
    <div>

      <h1 className="text-2xl font-bold mb-6">
        My Applications
      </h1>

      <input
        placeholder="Enter Email"
        className="border p-2 rounded"
        onChange={(e) => setEmail(e.target.value)}
      />
      <button
        onClick={fetchApplications}
        className="bg-indigo-600 text-white px-4 py-2 rounded ml-2"
      >
        Search
      </button>

      <div className="mt-6 space-y-4">
        {applications.map(app => (
          <div key={app.id} className="bg-white p-4 rounded shadow">
            <p><strong>Job:</strong> {app.job_title}</p>
            <p><strong>Score:</strong> {app.score}%</p>
            <p><strong>Status:</strong> {app.status}</p>
          </div>
        ))}
      </div>

    </div>
  );
}
