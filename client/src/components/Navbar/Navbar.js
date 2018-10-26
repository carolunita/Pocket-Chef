import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

class Navbar extends React.Component {
    state = {
        showMenu: false
    };

    handleOnClick = () => {
        if (this.state.showMenu === true) {
            this.setState({ showMenu: false });
        } else {
            this.setState({ showMenu: true });
        }
    };

    logout=()=>{
        localStorage.setItem("logged","no");
    
    }

    render() {
        return (
            <div className="navbar navbar-light">
                <img className="logo" src="http://i63.tinypic.com/2637eja.png" alt="Logo"/>
                <button className="white-button" id="collapse" onClick={this.handleOnClick}>&equiv;</button>
                
                <div className="nav-right">
                    <p className="welcome">Welcome, {this.props.firstName}!</p>
                    <Link to="/dashboard"><button id="recipe" className="gradient-button nav-button">Home</button></Link>
                    <Link to="/recipes"><button id="search" className="gradient-button nav-button">Search</button></Link>
                    <Link to="/shoppinglist"><button id="shoppinglist" className="gradient-button nav-button">Shop-List</button></Link>
                    <Link to="/"><button id="log out" className="gradient-button nav-button" onClick={this.logout}>Log Out</button></Link>
                </div>
                
                { this.state.showMenu ? <Opened /> : null }
            </div>
        );
    };
};

class Opened extends React.Component {
    logout=()=>{
        localStorage.setItem("logged","no");
        this.setState({
        loggedOut:true
        })
    }
    render() {
        return (
            <div className="nav-opened">
                <Link to="/dashboard"><button id="recipe" className="gradient-button nav-button">Home</button></Link>
                <Link to="/shoppinglist"><button id="shoppinglist" className="gradient-button nav-button">Shop-List</button></Link>
                <Link to="/recipes"><button id="search" className="gradient-button nav-button">Search</button></Link>
                <Link to="/shoppinglist"><button id="shoppinglist" className="gradient-button nav-button">Shop-List</button></Link>
                <button id="log out" className="gradient-button nav-button" onClick={this.logout}>Log Out</button>
                
            </div>
        );
    };
};

export default Navbar;