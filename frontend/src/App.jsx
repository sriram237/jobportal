
import { useState } from 'react'
import './App.css'
import Registerpage from './Registerpage.jsx'
import LoginPage from './LoginPage.jsx'
import JobListPage from './jobListPage.jsx'
import ApplyJobPage from './ApplyJobPage.jsx'
import { BrowserRouter, Routes, Route } from "react-router-dom";


function App() {
 

  return (
    <BrowserRouter>
       <Routes>
            <Route path='/register' element={<Registerpage/>}/>
            <Route path='/login'    element={<LoginPage/>}/>
            <Route path='/jobs' element={<JobListPage/>}/>
            <Route path='/apply/:jobId' element={<ApplyJobPage/>}/>
       </Routes>

    </BrowserRouter>

  )
}

export default App
