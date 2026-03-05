import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../../services/api";

export default function JobDetails() {

  const { id } = useParams();
  const navigate = useNavigate();

  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const fetchJob = async () => {
      try {

        const res = await api.get(`/openings/${id}`);

        console.log("Job:", res.data);

        setJob(res.data);

      } catch (err) {

        console.error("Error fetching job:", err);

      } finally {
        setLoading(false);
      }
    };

    fetchJob();

  }, [id]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!job) {
    return <p>Job not found</p>;
  }

  return (
    <div>

      <h1 className="text-3xl font-bold mb-4">
        {job.title}
      </h1>

      <p className="text-gray-600 mb-2">
        {job.department}
      </p>

      <p className="mb-6">
        {job.description}
      </p>

      <button
        onClick={() => navigate(`/candidate/apply/${job.id}`)}
        className="bg-green-600 text-white px-6 py-2 rounded"
      >
        Apply Now
      </button>

    </div>
  );
}