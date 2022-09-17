import React from 'react';
import {useState} from 'react';
import Axios from 'axios';
import AuthHeader from './AuthHeader';

export default function Admin () {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleLogin = (e) =>{
        e.preventDefault()
        Axios.post('/admin/login', {email, password})
        .then(response =>  {
            if (response.status === 200) {
                // console.log(response.data)
              localStorage.setItem("user", JSON.stringify(response.data));
              window.location.replace("./admin-dash")
            }
            return response.data;
          });
    }
 
   const getCurrentUser = () => {
        return JSON.parse(localStorage.getItem('user'));;
      }

    const getAdminBoard = () => {
        return Axios.get( '/confess', { headers: AuthHeader() });
      }


return (
    <div>

        <form className="login-form" onSubmit={handleLogin}>
        <input className="username" type='email'  value={email} onChange={(e) => setEmail(e.target.value)}/>
        <input className="password" type='password'  value={password} onChange={(e) => setPassword(e.target.value)}/>
        <button className="sub-button">Login</button>
        </form>
    </div>
)}



