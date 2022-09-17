import React from 'react';

const Action = (props) => (
    <div>
        <button 
        onClick={props.pickOneConfess}
        disabled={!props.hasOptions}
        className="big-button">🪄  Just  For  You  🪄
        </button>
    </div>
)

export default Action