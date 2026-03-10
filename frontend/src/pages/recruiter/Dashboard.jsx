import { Link,useNavigate } from "react-router-dom"

export default function Dashboard(){

const navigate = useNavigate()

return(

<div style={{padding:40}}>

<h1>Recruiter Dashboard</h1>

<br/>

<Link to="/recruiter/jobs">Manage Job Openings</Link>

<br/><br/>

<Link to="/recruiter/create-job">Create Job Opening</Link>

<br/><br/>

<button
onClick={()=>{
localStorage.clear()
navigate("/login")
}}
>
Logout
</button>

</div>

)

}
