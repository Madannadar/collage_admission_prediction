import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {RouterProvider,createBrowserRouter} from 'react-router-dom';
import {DepartmentForm,FacultyDetails,RegistrationForm,LoginForm,Timetable,Dashboard,ML, BudgetAllocation, ResourseAllocation} from './Pages/index.js'
import * as routes from './Routes/Routes.js'
const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: routes.LANDING_PAGE,
        element: <Dashboard />,
      },
      {
        path: routes.BUDGETALLOCATION,
        element: <BudgetAllocation />,
      },
      {    
        path: routes.REGISTRATION,
        element: <RegistrationForm />,
      },
      {
        path:routes.TIME_TABLE,
        element:<Timetable/>,
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
      {
        path: routes.AI_PREDICTION,
        element: <ML/>,
      },
      {
        path: routes.RESOURSEALLOCATION,
        element: <ResourseAllocation/>,
      }
      // {
      //   path: routes.AI_PREDICTION,
      //   element: <ML/>,
      // },
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
