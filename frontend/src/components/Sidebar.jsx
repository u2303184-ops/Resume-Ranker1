import { Link, useNavigate } from "react-router-dom"

export default function Sidebar({ role }) {

  const navigate = useNavigate()

  const logout = () => {
    localStorage.removeItem("candidate_email")
    navigate("/login")
  }

  const email = localStorage.getItem("candidate_email")

  return (

    <div style={{
      width: "250px",
      background: "#1e293b",
      color: "white",
      minHeight: "100vh",
      padding: "20px"
    }}>

      <h2 style={{marginBottom:"30px"}}>
        AI Resume Ranker
      </h2>

      {email && (
        <p style={{fontSize:"14px", marginBottom:"20px"}}>
          Logged in as:<br/>
          {email}
        </p>
      )}

      {role === "candidate" && (

        <div style={{display:"flex", flexDirection:"column", gap:"10px"}}>

          <Link to="/candidate/dashboard">Dashboard</Link>

          <Link to="/candidate/jobs">Browse Jobs</Link>

          <Link to="/candidate/applications">My Applications</Link>

          <button
            onClick={logout}
            style={{
              marginTop:"20px",
              background:"#ef4444",
              color:"white",
              border:"none",
              padding:"8px",
              cursor:"pointer"
            }}
          >
            Logout
          </button>

        </div>

      )}

    </div>

  )

}
