import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";

import Dashboard from "./pages/candidate/Dashboard";
import BrowseJobs from "./pages/candidate/BrowseJobs";
import JobDetails from "./pages/candidate/JobDetails";
import UploadResume from "./pages/candidate/UploadResume";
import Applications from "./pages/candidate/Applications";

import ProtectedRoute from "./components/ProtectedRoute";
import CandidateLayout from "./layouts/CandidateLayout";
import Register from "./pages/Register";

function App() {

  return (

    <BrowserRouter>

      <Routes>

        {/* Login */}
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />


        {/* Candidate Dashboard */}
        <Route
          path="/candidate/dashboard"
          element={
            <ProtectedRoute>
              <CandidateLayout>
                <Dashboard />
              </CandidateLayout>  
            </ProtectedRoute>
          }
        />

        {/* Browse Jobs */}
        <Route
          path="/candidate/jobs"
          element={
            <ProtectedRoute>
              <BrowseJobs />
            </ProtectedRoute>
          }
        />

        {/* Job Details */}
        <Route
          path="/candidate/jobs/:id"
          element={
            <ProtectedRoute>
              <JobDetails />
            </ProtectedRoute>
          }
        />

        {/* Apply */}
        <Route
          path="/candidate/apply/:id"
          element={
            <ProtectedRoute>
              <UploadResume />
            </ProtectedRoute>
          }
        />

        {/* Applications */}
        <Route
          path="/candidate/applications"
          element={
            <ProtectedRoute>
              <Applications />
            </ProtectedRoute>
          }
        />

      </Routes>

    </BrowserRouter>

  );
}

export default App;