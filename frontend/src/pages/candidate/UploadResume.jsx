import { useState } from "react"
import { useParams } from "react-router-dom"
import api from "../../services/api"

export default function UploadResume(){

  const { id } = useParams()

  const [file,setFile] = useState(null)

  const email = localStorage.getItem("user_email")

  const upload = async () => {

    if(!file){
      alert("Select resume")
      return
    }

    const formData = new FormData()

    formData.append("file",file)
    formData.append("email",email)
    formData.append("opening_id",id)

    try{

      const res = await api.post("/resumes/upload", formData)

      alert("Resume uploaded successfully")

      console.log(res.data)

    }catch(err){

      console.log(err)

      alert("Upload failed")

    }

  }

  return(

    <div>

      <h1 className="text-2xl font-bold mb-4">
        Upload Resume
      </h1>

      <input
        type="file"
        onChange={(e)=>setFile(e.target.files[0])}
      />

      <br/><br/>

      <p>Applying as: {email}</p>

      <br/>

      <button
        onClick={upload}
        className="bg-blue-600 text-white px-6 py-2 rounded"
      >
        Submit
      </button>

    </div>

  )

}