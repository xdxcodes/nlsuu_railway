import React from 'react';
import moment from 'moment';

const Option = (props) => (
    <div className="option" >
        <p className="option__text">{props.count}. {props.optionText}</p>
        <p className="time">{moment(props.time).format('ll')}</p>
        
        {/* <button className="button button--link" onClick={(e)=> {
            props.deleteConfess(props.optionText)
        }}
        >Remove</button> */}
        
    </div>
)
export default Option;