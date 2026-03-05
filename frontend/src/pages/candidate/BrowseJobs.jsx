

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";

export default function BrowseJobs() {

  const [jobs, setJobs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const res = await api.get("/openings/all");
      console.log("Jobs:", res.data); // debug
      setJobs(res.data);
    } catch (err) {
      console.error("Error fetching jobs:", err);
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">
        Browse Jobs
      </h1>

      {jobs.length === 0 ? (
        <p>No jobs available</p>
      ) : (
        jobs.map((job) => (
          <div
            key={job.id}
            className="border p-4 mb-4 rounded shadow"
          >
            <h2 className="text-xl font-semibold">
              {job.title}
            </h2>

            <p className="text-gray-500">
              {job.department}
            </p>

            <p className="mb-3">
              {job.description}
            </p>

            <button
              onClick={() => navigate(`/candidate/jobs/${job.id}`)}
              className="bg-blue-600 text-white px-4 py-2 rounded"
            >
              View Details
            </button>
          </div>
        ))
      )}
    </div>
  );
}
