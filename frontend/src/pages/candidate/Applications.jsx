import { useEffect, useState } from "react"
import api from "../../services/api"

export default function Applications(){

  const [applications,setApplications] = useState([])

  const fetchApplications = async () => {

    const email = localStorage.getItem("user_email")

    const res = await api.get(`/applications/candidate/${email}`)

    console.log(res.data)

    setApplications(res.data)

  }

  useEffect(()=>{
    fetchApplications()
  },[])

  return(

    <div>

      <h1 className="text-2xl font-bold mb-6">
        My Applications
      </h1>

      <div className="mt-6 space-y-4">

        {applications.length === 0 && (
          <p>No applications found</p>
        )}

        {applications.map((app, index) => (

          <div key={index} className="bg-white p-4 rounded shadow">

            <p><strong>Job:</strong> {app.job_title}</p>

            <p><strong>Department:</strong> {app.department}</p>

            <p><strong>Status:</strong> {app.status}</p>

            <p><strong>Matched Skills:</strong> {app.skill_match}%</p>

            <p><strong>Experience Match:</strong> {app.experience_match}%</p>

            <p><strong>Missing Skills:</strong> {app.missing_skills}</p>

            {app.score && (
              <p><strong>Rank Score:</strong> {app.score}</p>
            )}

          </div>

        ))}

      </div>


    </div>

  )

}