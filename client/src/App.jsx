import React from "react";
import DepartmentForm from "./Pages/DepartmentForm" // Adjust the import path as needed
import RegistrationForm from "./components/ui/RegistrationForm";

const App = () => {
  return (
    <div className="min-h-screen bg-[var(--bg-color)] p-6">
      <RegistrationForm />
    </div>
  );
};

export default App;