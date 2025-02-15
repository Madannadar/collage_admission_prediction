import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {RouterProvider,createBrowserRouter} from 'react-router-dom';
import {DepartmentForm,FacultyDetails,RegistrationForm } from './Pages/index.js'
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
        path: '/FacultyDetails',
        element: <FacultyDetails />,
      },
      {
        path: '/DepartmentForm',
        element: <DepartmentForm />,
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
