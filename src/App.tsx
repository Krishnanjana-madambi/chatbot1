import AuthPage from "./AuthPage";
import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'




function App() {
  return (
    <div>
      <h1>Hello Subspace 🚀</h1>
      <p>VITE_NHOST_Subdomain: {import.meta.env.VITE_NHOST_SUBDOMAIN}</p>
      <p>VITE_NHOST_Region: {import.meta.env.VITE_NHOST_REGION}</p>
      <p>My first Vite + React app is working!</p>
      <AuthPage />
    </div>
  )
}

export default App
