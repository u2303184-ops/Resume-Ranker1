import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"

export default function Login(){

  const [email,setEmail] = useState("")
  const [password,setPassword] = useState("")

  const navigate = useNavigate()

  const login = () => {

    const user = localStorage.getItem("user_"+email)

    if(!user){
      alert("User not found")
      return
    }

    const parsed = JSON.parse(user)

    if(parsed.password !== password){
      alert("Wrong password")
      return
    }

    localStorage.setItem("candidate_email", email)

    navigate("/candidate/dashboard")

  }

  return(

    <div style={{padding:40}}>

      <h2>Candidate Login</h2>

      <input
        placeholder="Email"
        onChange={(e)=>setEmail(e.target.value)}
      />

      <br/><br/>

      <input
        type="password"
        placeholder="Password"
        onChange={(e)=>setPassword(e.target.value)}
      />

      <br/><br/>

      <button onClick={login}>
        Login
      </button>

      <br/><br/>

      <p>
        New user? <Link to="/register">Register</Link>
      </p>

    </div>

  )

}