import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import api from "../services/api"

export default function Login(){

  const [email,setEmail] = useState("")
  const [password,setPassword] = useState("")

  const navigate = useNavigate()

  const login = async () => {

    if(!email || !password){
      alert("Fill all fields")
      return
    }

    try{

      const res = await api.post("/auth/login", {email: email, password: password})

      console.log(res.data)

      const role = res.data.role

      // Save logged in user
      localStorage.setItem("user_email", email)
      localStorage.setItem("user_role", role)

      // Redirect based on role
      if(role === "candidate"){
        navigate("/candidate/dashboard")
      }

      if(role === "recruiter"){
        navigate("/recruiter/dashboard")
      }

    }catch(err){

      alert("Invalid credentials")

    }

  }

  return(

    <div style={{padding:40}}>

      <h2>Login</h2>

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
