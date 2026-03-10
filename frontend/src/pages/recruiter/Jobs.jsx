import { useEffect,useState } from "react"
import { useNavigate } from "react-router-dom"
import api from "../../services/api"

export default function Jobs(){

const [jobs,setJobs] = useState([])

const navigate = useNavigate()

useEffect(()=>{

loadJobs()

},[])

const loadJobs = async()=>{

const res = await api.get("/openings/all")

setJobs(res.data)

}

return(

<div style={{padding:40}}>

<h2>Job Openings</h2>

{jobs.map(job=>(

<div key={job.id} style={{marginBottom:20}}>

<b>{job.title}</b>

<br/>

Department: {job.department}

<br/>

Job ID: {job.id}

<br/><br/>

<button
onClick={()=>navigate(`/recruiter/job/${job.id}`)}
>
View Applicants
</button>

</div>

))}

</div>

)

}