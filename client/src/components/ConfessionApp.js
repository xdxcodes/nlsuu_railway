import React from 'react';
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



export default class ConfessionApp extends React.Component {
state = {
    options: [],
    selectedOption: undefined
}

    deleteAllConfess = () => {
    this.setState(()=> ({ options: [] }))
    }

    refreshSelectedOption = () => {
        this.setState(() => ({ selectedOption:undefined}))
    }

    pickOneConfess = () => {
        this.setState(()=>{
            
            const items = this.state.options.map(item => item.confess)
            console.log(items)
            const rando = Math.floor(Math.random() * items.length)
            const now = items[rando]
            this.setState(()=> ({
                selectedOption: now
            }))
        })
    }

    addOption = (option) => {
        if(!option) {
            return "Please add an option"
        } else if(this.state.options.indexOf(option) > -1) {
            return "Option already exists"
        }
        this.setState((prevStat)=>({options: prevStat.options.concat(option)}))
    }

    deleteConfess = (optiontoremove) => {
        this.setState((prevStat)=> ({
            options: prevStat.options.filter((text) => {
                return optiontoremove !== text
            })
        }))
    }

    componentDidMount() {

        try {
            // const posts = localStorage.getItem('options');
            // const options = JSON.parse(json)
            Axios.get('/main')
            .then(response => {
                this.setState({
                    options: response.data
                })
            })
            // if(options) {
            //     this.setState({
            //         options: options
            //     })
            // }
            
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
    
    render () {
        const header = 'NLSU TALES'
        const subhead = 'National Law Students Union Tales'
        return (
            <div>
                <Header head={header} subhead={subhead}/>
                <div className="container">
                <Action 
                hasOptions={this.state.options.length > 0}
                pickOneConfess={this.pickOneConfess}
                />
                <div className="widget">
                <div className="widget-scroll">
                <Options 
                allconfess={this.state.options}
                deleteAllConfess={this.deleteAllConfess}
                deleteConfess={this.deleteConfess}
                />
                </div>
                <AddOption 
                addOption={this.addOption}
                />
                </div>
                <Feedback />
                </div>
                <OptionModal
                selectedOption={this.state.selectedOption}
                refreshSelectedOption={this.refreshSelectedOption}
                />
                <Disclaimer />
                <ToastContainer toastStyle={{ backgroundColor: "#121212"}} />
            </div>
            
        )
    }
}


