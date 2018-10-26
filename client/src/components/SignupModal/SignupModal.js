import React from "react";
import { Link } from 'react-router-dom';
import Modal from "react-modal";
import "./SignupModal.css";

const SignupModal = props => {
    return (
        <Modal
            isOpen={props.openModal}
            contentLabel="Confirm Signup"
            onRequestClose={props.handleClearModal}
            className="modalpanel"
            ariaHideApp={false}
        >
            { props.confirmSignup ? (
                <div className="modalbox">
                    <h1 className="modalh1">Thank you for signing up!</h1>
                    <Link to="/"><button onClick={props.handleClearModal} className="gradient-button modalbutton">Get Started!</button></Link>
                </div>
            ) : (
                <div className="modalbox">
                    <h1>Sorry, invalid login credentials!<br/>Please try again!</h1>
                    <button onClick={props.handleClearModal} className="gradient-button modalbutton">Uh oh!</button>
                </div>
            )}
        </Modal>
    );
};

export default SignupModal;