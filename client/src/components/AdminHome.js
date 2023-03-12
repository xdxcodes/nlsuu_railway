
import React from 'react';
import { useState, useEffect } from 'react';

import Axios from 'axios';
import AuthHeader from './AuthHeader';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



export default function AdminHome () {

    const [options, setOption] = useState([]);
    const [filt, setFilter] = useState('general')
    

    const notifyMessage = () => toast.success('🦄 Successfull', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        });


        useEffect(() => {
            try {
    
                Axios.get(`https://nlsu.cyclic.app/admin-home/${filt}`, {
                    headers: AuthHeader()
                    })
                .then(response => {
                    setOption(response.data)
                })  
                console.log(options)
            } catch (e) {
                //nothing
            }
        
        }, [filt]);



    const getItems = (optiontodelete) => {
        
        options.filter((item) => {
                return item._id !== optiontodelete
            }
        )
        console.log(options)
    }

    const pushItems = (optiontoupdate) => {
        console.log(optiontoupdate)
        options.filter((item) => {
                return optiontoupdate !== item.confess
            })
        
    }
        
    
    const deleteConfess = (optiontodelete, type) => {
        Axios.delete(`https://nlsu.cyclic.app/confess/${optiontodelete}`, { headers: AuthHeader() })
        .then(res => {if(res.status === 200) 
            notifyMessage()
        }).then(
            setOption(options.filter((item) => {
                return item._id !== optiontodelete
            }
        ))
        ).catch(err => console.log(err.response.data))
        
        console.log(optiontodelete)
    }

    const updateConfess = (optiontoupdate, optiontodelete, type) => {
        Axios.post(`https://nlsu.cyclic.app/admin-review`, {confess: optiontoupdate, group: type}, { headers: AuthHeader() })
        .then(res => {if(res.status === 200) 
            notifyMessage()
        }).then (Axios.delete(`https://nlsu.cyclic.app/confess/${optiontodelete}`, { headers: AuthHeader() }))
        
        .then(
            setOption(
                
                options.filter((item) => {
                        return optiontoupdate !== item.confess
                    })
                
            )
        ).catch(err => console.log(err))
        
    }


    
    
        return (
            <div>

            <div className="filter"> 
                <div>
                    <button onClick={()=> setFilter('general')} className="filter-button">General</button>
                    <button onClick={()=> setFilter('tnnlu')} className="filter-button">TNNLU</button>
                    <button onClick={()=> setFilter('nlsiu')} className="filter-button">NLSIU</button>
                    <button onClick={()=> setFilter('nalsar')} className="filter-button">NALSAR</button>
                    <button onClick={()=> setFilter('nliu')} className="filter-button">NLIU</button>
                    <button onClick={()=> setFilter('wbnujs')} className="filter-button">WBNUJS</button>
                    <button onClick={()=> setFilter('hnlu')} className="filter-button">HNLU</button>
            
                 </div>
             </div>

                <Options 
                unpublishedconfess={options}
                deleteConfess={deleteConfess}
                updateConfess={updateConfess}
                head={filt}
                />


            </div>
        )
    
   }



const Options = (props) => (
    <div>
        <div className="widget-header">
            <h3 className="widget-title"> {props.head.toUpperCase()} Unpublished Confessions </h3>
            {/* <button className="button button--link" onClick={props.deleteAllConfess}>Remove All</button> */}
        </div>
    
    {props.unpublishedconfess.length === 0 && <p className="widget-message">Unauthorized! Please login to Authenticate </p> }

        {props.unpublishedconfess.map((items, index) =>{
            return (
                <Option 
                key={items._id}
                iden={items._id}
                optionText={items.confess}
                group={items.group}
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
            props.deleteConfess(props.iden, props.group)
        }}
        >Remove</button>
        
        <button className="button button--link" onClick={(e)=> {
            props.updateConfess(props.optionText, props.iden, props.group)
        }}
        >Add</button>
        
        
    </div>
)



