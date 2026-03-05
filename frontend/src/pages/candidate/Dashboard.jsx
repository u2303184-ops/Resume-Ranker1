export default function Dashboard(){

  const email = localStorage.getItem("candidate_email")

  return(

    <div>

      <h1>Welcome to Candidate Portal</h1>

      <p style={{marginTop:"10px"}}>
        Logged in as: {email}
      </p>

      <div style={{marginTop:"30px"}}>

        <h3>Quick Actions</h3>

        <ul>
          <li>Browse Jobs</li>
          <li>Upload Resume</li>
          <li>Track Applications</li>
        </ul>

      </div>

    </div>

  )

}