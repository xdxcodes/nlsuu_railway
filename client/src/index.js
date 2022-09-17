import React from 'react'
import ReactDOM from 'react-dom/client';
import ConfessionApp from './components/ConfessionApp'
import Admin from './components/Admin'
import AdminHome from './components/AdminHome'
import 'normalize.css/normalize.css';
import './styles.scss'
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import { createRoot } from 'react-dom/client';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const container = document.getElementById('root');
const root = createRoot(container);

const Links = (
    <Router>
    <Routes>
            <Route path="/" element={<ConfessionApp />} /> 
            <Route path="/admin-rev" element={<Admin />} />
            <Route path="/admin-dash" element={<AdminHome />} />
            
    </Routes>
    <ToastContainer toastStyle={{ backgroundColor: "#121212"}} />
    </Router>
    )
    
root.render(Links);