import React from "react";
import { Routes, Route } from "react-router-dom";
import DepartmentForm from "./Pages/DepartmentForm";
import FacultyDetails from "./Pages/FacultyDetails";
import Head from "./Pages/Head";

const App = () => {
  return (
    <div className="min-h-screen bg-[var(--bg-color)] p-6">
      {/* <Routes>
        <Route path="/" element={<Head/>} />
        <Route path="/DepartmentForm" element={<DepartmentForm />} />
        <Route path="/FacultyDetails" element={<FacultyDetails />} />
      </Routes> */}
    </div>
  );
};

export default App;
