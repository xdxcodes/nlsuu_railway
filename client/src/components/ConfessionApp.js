
import { React, useState, useEffect } from 'react';
import Axios from 'axios';
import AddOption from './AddOption'
import Header from './Header'
import Options from './Options'
import Action from './Action'
import OptionModal from './OptionModal'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Feedback from './contact';
import Disclaimer from './disclaimer'




export default function ConfessionApp () {

const [options, setOption] = useState([]);
const [selected, setSelected] = useState(undefined);
const [filt, setFilter] = useState('general')


   const deleteAllConfess = () => {
    setOption([])
    }

   const refreshSelectedOption = () => {
        setSelected(undefined)
    }

   const pickOneConfess = () => {
        
            
            const items = options.map(item => item.confess)
            console.log(items)
            const rando = Math.floor(Math.random() * items.length)
            const now = items[rando]
            setSelected(now)
        
    }

   const addOption = (option) => {
        if(!option) {
            return "Please add an option"
        } else if(options.indexOf(option) > -1) {
            return "Option already exists"
        }
        setOption((prevStat)=>({options: prevStat.options.concat(option)}))
    }

   const deleteConfess = (optiontoremove) => {
        setOption((prevStat)=> ({
            options: prevStat.options.filter((text) => {
                return optiontoremove !== text
            })
        }))
    }

    useEffect(()=> {

        try {
            // const posts = localStorage.getItem('options');
            // const options = JSON.parse(json)
            Axios.get(`https://nlsuu-production.up.railway.app/group/${filt}`)
            .then(response => {
                setOption(response.data)
            })
            // if(options) {
            //     this.setState({
            //         options: options
            //     })
            // }
            
        } catch (e) {
            //nothing
        }
    
    }, [filt])

    const filter = () => {
        //this.setState(()=> ({ options: [{"_id":"62ea1e2be97f59ea9289ca45","confess":"Site under Development","createdAt":"2022-08-03T07:05:15.869Z","updatedAt":"2022-08-03T07:05:15.869Z","__v":0}] }))
        try {
            Axios.get(`https://nlsuu-production.up.railway.app/group/general`)
            .then(response => {
                setOption(response.data)
            })
            
        } catch (e) {
            //nothing
        }
    
    
    }
    
    // componentDidUpdate(prevProps, prevState) {
    //     if(prevState.options.length !== this.state.options.length) {
    //         const json = JSON.stringify(this.state.options);
    //         localStorage.setItem('options', json);
    //     }
    
    // }
    
  
        const header = 'NLSU TALES'
        const subhead = 'National Law University Tales'
        return (
            <div>
                <Header head={header} subhead={subhead}/>
                <div className="container">
                <Action 
                hasOptions={options.length > 0}
                pickOneConfess={pickOneConfess}
                />
                
                <div className="filter"> 
                <div>
            <button onClick={()=> setFilter('general')} className="filter-button">General</button>
            <button onClick={()=> setFilter('nlsiu')} className="filter-button">NLSIU</button>
            <button onClick={()=> setFilter('tnnlu')} className="filter-button">TNNLU</button>
            <button onClick={()=> setFilter('nalsar')} className="filter-button">NALSAR</button>
            <button onClick={()=> setFilter('nliu')} className="filter-button">NLIU</button>
            <button onClick={()=> setFilter('wbnujs')} className="filter-button">WBNUJS</button>
            <button onClick={()=> setFilter('hnlu')} className="filter-button">HNLU</button>
            <button onClick={()=> setFilter('nuals')} className="filter-button">NUALS</button>
            
            </div>
                
                </div>
                <div className="widget">
                
                <div className="widget-scroll">
                <Options 
                allconfess={options}
                deleteAllConfess={deleteAllConfess}
                deleteConfess={deleteConfess}
                head={filt}
                />
                </div>
                <AddOption 
                addOption={addOption}
                head={filt}
                />
                </div>
                <Feedback />
                </div>
                <OptionModal
                selectedOption={selected}
                refreshSelectedOption={refreshSelectedOption}
                />
                
                <Disclaimer />
                
                <ToastContainer toastStyle={{ backgroundColor: "#121212"}} />
            </div>
            
        )
    
}


