import React from "react";
import DepartmentForm from "./Pages/DepartmentForm"; // Adjust the import path as needed
import RegistrationForm from "./Pages/RegistrationForm";
import Login from "./Pages/LoginForm"
import Timetable from "./Pages/Timetable";
import { Outlet } from "react-router-dom";

const App = () => {
  const [sidebarOpen, setSidebarOpen] = React.useState(true);
  const location = useLocation();
  
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div 
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-200 ease-in-out md:relative md:translate-x-0",
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {/* Logo and close button for mobile */}
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-xl font-bold text-blue-900">College Portal</h2>
          <button 
            onClick={() => setSidebarOpen(false)}
            className="p-1 rounded-full hover:bg-gray-200 md:hidden"
          >
            <X size={20} />
          </button>
        </div>
        
        {/* Navigation Items */}
        <nav className="p-4 space-y-2">
          {SIDEBAR_ITEMS.map((item) => (
            <Link 
              key={item.path}
              to={item.path}
              className={cn(
                "flex items-center space-x-3 p-3 rounded-lg transition-colors",
                location.pathname === item.path
                  ? "bg-blue-100 text-blue-800"
                  : "text-gray-700 hover:bg-gray-100"
              )}
            >
              <item.icon size={20} />
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>
      </div>
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top bar for mobile menu button */}
        <header className="bg-white shadow-sm p-4 md:hidden">
          <button 
            onClick={() => setSidebarOpen(true)}
            className="p-1 rounded-full hover:bg-gray-200"
          >
            <Menu size={24} />
          </button>
        </header>
        
        {/* Page Content */}
        <main className="flex-1 overflow-auto bg-gray-50">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default App;