import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './app'
import 'react-toastify/dist/ReactToastify.css'
import './styles/index.css'
import { UserProvider } from './context/UserContext'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <UserProvider>
      <App />
    </UserProvider>
  </React.StrictMode>,
)
