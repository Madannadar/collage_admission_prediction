import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {RouterProvider,createBrowserRouter} from 'react-router-dom';
import {DepartmentForm,FacultyDetails,RegistrationForm } from './Pages/index.js'
import LoginForm from './Pages/LoginForm.jsx'
import RegistrationForm from "./Pages/RegistrationForm.jsx"
import * as routes from './Routes/Routes.js'
const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      // {
      //   path: '/',
      //   element: <LandingPage />,
      // },
      {    
        path: routes.REGISTRATION,
        element: <RegistrationForm />,
      },
      {
        path: routes.FACULTY_DETAILS,
        element: <FacultyDetails />,
      },
      {
        path: routes.DEPARTMENT_FORM,
        element: <DepartmentForm />,
      },
      {
        path: routes.LOGIN_FORM,
        element: <LoginForm/>,
      },
    ]
  }
])

createRoot(document.getElementById('root')).render(
  // <Provider store={store}>
  <RouterProvider router={router}>
    <App />
  </RouterProvider>
  // </Provider>
  
)
