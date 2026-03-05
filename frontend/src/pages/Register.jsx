import { useState } from "react"
import { useNavigate } from "react-router-dom"

export default function Register(){

  const [email,setEmail] = useState("")
  const [password,setPassword] = useState("")

  const navigate = useNavigate()

  const register = () => {

    if(!email || !password){
      alert("Fill all fields")
      return
    }

    const user = {
      email,
      password
    }

    localStorage.setItem("user_"+email, JSON.stringify(user))

    alert("Registration Successful")

    navigate("/login")

  }

  return(

    <div style={{padding:40}}>

      <h2>Candidate Registration</h2>

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

      <button onClick={register}>
        Register
      </button>

    </div>

  )

}