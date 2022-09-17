import React from 'react';
import Option from './Option'

const Options = (props) => (
    <div>
        <div className="widget-header">
            <h3 className="widget-title">SPOOKY TALES</h3>
            
        </div>

    {props.allconfess.length === 0 && <p className="widget-message">Your confessions will appear Here! </p> }

        {props.allconfess.map((items, index) =>{
            return (
                <Option 
                key={items._id} 
                optionText={items.confess}
                time={items.createdAt}
                count={index + 1}
                deleteConfess={props.deleteConfess}
                />
            )
        })
        }
    </div>
)

export default Options