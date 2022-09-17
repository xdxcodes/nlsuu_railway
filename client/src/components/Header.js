import React from 'react';

const Header = (props) => (
    <div className="header">
    <div className="header__container">
        <h1 className="header__title">{props.head}</h1>
        <h2 className="header__subtitle">{props.subhead}</h2>
        {/* <button className="header__signup">Sign Up</button> */}
    </div>
    </div>
)

export default Header