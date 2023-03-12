

import React from 'react';
import { useState, useEffect } from 'react';
import Modal from 'react-modal';

export default function Disclaimer () { 
    const [isOpen, setIsOpen] = useState(true);

  function toggleModal() {
    setIsOpen(!isOpen);
    localStorage.setItem("firstTime","done");
  }

    
    return (
<Modal
isOpen={(localStorage.getItem("firstTime")==null)}
onRequestClose={toggleModal}
contentLabel="Disclaimer"
ariaHideApp={false}
overlayClassName="myoverlay"
closeTimeoutMS={200}
className="modal"
><h3 className="modal__title">⚠️Disclaimer⚠️</h3>
 <p className="modal__body"> 
 <ul className="lists">
  <li className="listitem">Please don't make direct reference to anyone unless it's positive to them💝</li>
  <li className="listitem">Please don't Post anysort of hateful comments🤫</li>
  <li className="listitem">Do not use Profane language and Avoid Rumors💥</li>
  <li className="listitem">Please take confessions as funny as possible❤️‍🔥</li>
  <li className="listitem">All your confessions are completely Anonymous 👻 No one can see who confessed.</li>
  <li className="listitem">Your Privacy is our Priority. For post removal and suggestions, please contact nlsu.fun@protonmail.com</li>
  
</ul> 
 </p>
<button className="modal__button" onClick={toggleModal}>
   Accept & Continue
</button>
</Modal>
)}


// export default Disclaimer
