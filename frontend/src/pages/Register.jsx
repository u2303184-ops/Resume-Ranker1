import { useState } from "react"
import { useNavigate } from "react-router-dom"
import api from "../services/api"

export default function Register(){

  const [email,setEmail] = useState("")
  const [password,setPassword] = useState("")
  const [role,setRole] = useState("candidate")

  const navigate = useNavigate()

  const register = async () => {

    if(!email || !password){
      alert("Fill all fields")
      return
    }

    try{

      await api.post("/auth/signup", {email, password , role})
      alert("Registration Successful")

      navigate("/login")

    }catch(err){

      alert(err.response?.data?.detail || "Registration failed")

    }

  }

  return(

    <div style={{padding:40}}>

      <h2>Register</h2>

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

      <select
        onChange={(e)=>setRole(e.target.value)}
      >
        <option value="candidate">Candidate</option>
        <option value="recruiter">Recruiter</option>
      </select>

      <br/><br/>

      <button onClick={register}>
        Register
      </button>

    </div>

  )

}

