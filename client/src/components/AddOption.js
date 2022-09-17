import React from 'react';
import {useState} from 'react';
import Axios from 'axios';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



export default function AddOption (props) {

    const [error, setError] = useState(undefined)
    const [text, setText] = useState('')
    const [notify, setNotify] = useState('')

    const notifyMessage = () => toast.success('🦄 Will be published shortly', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        });

    const addOption = (e) =>{
        e.preventDefault()
        // const inp = e.target.elements.option.value.trim()
        // setText({text: inp})
        Axios.post('/confess', {confess: text})
        .then(res => {if(res.status === 200) 
            notifyMessage()
            e.target.elements.option.value = ''
        }).catch(err => console.log(err))
 
        // console.log(text)

        // const error = props.addOption(confess)
        
        // this.setState(() => ({ error}))

        // if(!error) {
        //     e.target.elements.option.value = '';
        // }
    }
        return (
            <div>
                {/* {this.state.error && <p className="error">{this.state.error}</p>} */}
                <form className="input-form" onSubmit={addOption}>
                <input className="input" type='text' name='option' maxLength="800" placeholder="Just Express Anonymously!" value={text} onChange={(e) => setText(e.target.value)}/>
                <button className="sub-button">Confess</button>
                </form>
            </div>
        )}





