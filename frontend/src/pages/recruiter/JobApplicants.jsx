import { useEffect,useState } from "react"
import { useParams } from "react-router-dom"
import api from "../../services/api"

export default function JobApplicants(){

const {id} = useParams()

const [candidates,setCandidates] = useState([])

const [selected,setSelected] = useState(null)

useEffect(()=>{

loadRanking()

},[])

const loadRanking = async()=>{

const res = await api.get(`/ranking/opening/${id}`)

setCandidates(res.data)

}

/* ADDED FUNCTION */
const updateStatus = async (appId,status)=>{

await api.put(`/recruiter/update_status/${appId}?status=${status}`)

alert("Status updated")

loadRanking()

}

return(

<div style={{padding:40}}>

<h2>Applicants for Job {id}</h2>

<hr/>

{candidates.map((c,index)=>(

<div key={index}
style={{
border:"1px solid gray",
padding:15,
marginBottom:20
}}
>

<b>Rank #{c.rank}</b>

<br/>

Candidate: {c.email}

<br/>

Score: {c.score}

<br/>

Skill Match: {c.skill_match} %

<br/>

Experience Match: {c.experience_match} %

<br/><br/>

<b>Missing Skills:</b>

<br/>

{c.missing_skills}

<br/><br/>

<button
onClick={()=>setSelected(c)}
>
Explain Match
</button>

&nbsp;

<button
onClick={()=>window.open(`/resumes/view/${c.email}`)}
>
View Resume
</button>

&nbsp;

<button
onClick={()=>updateStatus(c.id,"accepted")}
>
Accept
</button>

&nbsp;

<button
onClick={()=>updateStatus(c.id,"rejected")}
>
Reject
</button>

</div>

))}

{selected && (

<div style={{
border:"2px solid black",
padding:20,
marginTop:40
}}>

<h3>AI Explanation</h3>

<pre>
{selected.rag_explanation}
</pre>

</div>

)}

</div>

)

}