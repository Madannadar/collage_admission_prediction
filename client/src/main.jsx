import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {RouterProvider,createBrowserRouter} from 'react-router-dom';
import RegistrationForm from './Pages/RegistrationForm.jsx';

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
        path: '/register',
        element: <RegistrationForm />,
      },
      // {
      //   path: '/chatbot',
      //   element: <ChatBot />,
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
