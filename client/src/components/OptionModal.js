import React from 'react';
import Modal from 'react-modal'

const OptionModal = (props) => (
<Modal
isOpen={!!props.selectedOption}
contentLabel={'Random Confession'}
onRequestClose={props.refreshSelectedOption}
ariaHideApp={false}
overlayClassName="myoverlay"
closeTimeoutMS={200}
className="modal"
><h3 className="modal__title">Just for you!</h3>
{props.selectedOption && <p className="modal__body">{props.selectedOption}</p>}
<button className="modal__button" onClick={props.refreshSelectedOption}>
   Close 
</button>
</Modal>)


export default OptionModal