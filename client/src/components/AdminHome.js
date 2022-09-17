import React from 'react';
import {useState, useEffect} from 'react';
import Axios from 'axios';
import AuthHeader from './AuthHeader';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



export default class AdminHome extends React.Component {
    state = {
        options: [],
        selectedOption: undefined
    }
    

    notifyMessage = () => toast.success('🦄 Successfull', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        });

    getItems = (optiontodelete) => 
        this.state.options.filter((item) =>{
           return item._id !== optiontodelete
        })
    pushItems = (optiontoupdate) =>
        this.state.options.filter((item) =>{
            return item.confess !== optiontoupdate
        })
        
    
    deleteConfess = (optiontodelete) => {
        Axios.delete(`/confess/${optiontodelete}`, { headers: AuthHeader() })
        .then(res => {if(res.status === 200) 
            this.notifyMessage()
        }).then(
            this.setState({ 
                options: this.getItems(optiontodelete)
            })
        ).catch(err => console.log(err.response.data))
        
        console.log(optiontodelete)
    }

    updateConfess = (optiontoupdate, optiontodelete) => {
        Axios.post('/admin-review', {confess: optiontoupdate}, { headers: AuthHeader() })
        .then(res => {if(res.status === 200) 
            this.notifyMessage()
        }).then (Axios.delete(`/confess/${optiontodelete}`, { headers: AuthHeader() }))
        
        .then(
            this.setState({ 
                options: this.pushItems(optiontoupdate)
            })
        ).catch(err => console.log(err))
        
    }

    componentDidMount() {
        try {

            Axios.get('/admin-home', {
                headers: AuthHeader()
                })
            .then(response => {
                this.setState({
                    options: response.data
                })
            })  
            console.log(this.state.options)
        } catch (e) {
            //nothing
        }
    
    }
    
    render() {
        return (
            <div>
                <Options 
                unpublishedconfess={this.state.options}
                deleteConfess={this.deleteConfess}
                updateConfess={this.updateConfess}
                />
            </div>
        )
    }
   }



const Options = (props) => (
    <div>
        <div className="widget-header">
            <h3 className="widget-title"> Unpublished Confessions</h3>
            {/* <button className="button button--link" onClick={props.deleteAllConfess}>Remove All</button> */}
        </div>

    {props.unpublishedconfess.length === 0 && <p className="widget-message">Unauthorized! Please login to Authenticate </p> }

        {props.unpublishedconfess.map((items, index) =>{
            return (
                <Option 
                key={items._id}
                iden={items._id}
                optionText={items.confess}
                count={index + 1}
                deleteConfess={props.deleteConfess}
                updateConfess={props.updateConfess}
                />
            )
        })
        }
    </div>
)

const Option = (props) => (
    <div className="option" >
        <p>{props.count}. {props.optionText} ------</p>
        
        <button className="button button--link" onClick={(e)=> {
            props.deleteConfess(props.iden)
        }}
        >Remove</button>
        
        <button className="button button--link" onClick={(e)=> {
            props.updateConfess(props.optionText, props.iden)
        }}
        >Add</button>
        
        
    </div>
)



