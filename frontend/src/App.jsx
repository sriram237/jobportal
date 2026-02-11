
import { useState } from 'react'
import './App.css'
import Registerpage from './registerpage'
import LoginPage from './LoginPage'
import JobListPage from './jobListPage'
import ApplyJobPage from './ApplyJobPage'
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
