import { Navigate } from "react-router-dom"

export default function ProtectedRoute({ children }) {

  const email = localStorage.getItem("candidate_email")

  if (!email) {
    return <Navigate to="/login" />
  }

  return children
}