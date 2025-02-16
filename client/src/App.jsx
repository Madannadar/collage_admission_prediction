import React, { useEffect, useState } from "react";
import { Outlet, Link, useLocation, useNavigate } from "react-router-dom";
import { cn } from "./lib/utils"; // Assuming you have this utility from shadcn
import * as routes from './Routes/Routes.js';

// Import icons (using Lucide React)
import { 
  Home, 
  UserPlus, 
  Calendar, 
  Users, 
  Building2, 
  LogIn,
  Menu,
  X,
  TrendingUpDown,
  LogOut 
} from "lucide-react";

const SIDEBAR_ITEMS = [
  { icon: Home, label: "Dashboard", path: routes.LANDING_PAGE },
  { icon: UserPlus, label: "Registration", path: routes.REGISTRATION },
  { icon: Calendar, label: "Timetable", path: routes.TIME_TABLE },
  { icon: Users, label: "Faculty Details", path: routes.FACULTY_DETAILS },
  { icon: Building2, label: "Department", path: routes.DEPARTMENT_FORM },
  { icon: LogIn, label: "Login", path: routes.LOGIN_FORM },
  { icon: TrendingUpDown, label: "AI Admission Prediction", path: routes.AI_PREDICTION },
  { icon: LogOut , label: "Logout" },
];

const App = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [user, setUser] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  // Check if user is in localStorage on component mount
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else if (!location.pathname === '/register' || !location.pathname === '/login' ) {
      navigate(routes.LOGIN_FORM);
    }
  }, [navigate, location.pathname]);

  // Handle logout
  const handleLogout = () => {
    const confirmLogout = window.confirm("Are you sure you want to logout?");
    if (confirmLogout) {
      localStorage.removeItem('user');
      setUser(null);
      navigate(routes.LOGIN_FORM);
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div 
        className={cn(
          "fixed inset-y-0 left-0 z-10 w-64 bg-white shadow-lg transform transition-transform duration-200 ease-in-out md:relative md:translate-x-0",
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
        <nav className="p-4 space-y-2 z-0">
          {SIDEBAR_ITEMS.map((item) => {
            // Hide Login and Registration buttons if user is present
            if ((item.label === "Login" || item.label === "Registration") && user) {
              return null;
            }
            // Handle Logout button click
            if (item.label === "Logout") {
              return (
                <button
                  key={item.label}
                  onClick={handleLogout}
                  className={cn(
                    "flex items-center space-x-3 p-3 rounded-lg transition-colors w-full text-left",
                    "text-gray-700 bg-white hover:bg-gray-100"
                  )}
                >
                  <item.icon size={20} />
                  <span>{item.label}</span>
                </button>
              );
            }
            return (
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
            );
          })}
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