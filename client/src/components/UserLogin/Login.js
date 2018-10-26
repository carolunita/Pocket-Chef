import React from "react";
import SignupModal from "../../components/SignupModal";
import { addUser } from "../../actions/index";
import { connect } from "react-redux";
import { Redirect } from "react-router";
import axios from "axios";

const mapDispatchToProps = dispatch => {
    return { addUser: user => dispatch(addUser(user)) };
};

class ConnectedLogin extends React.Component {
    state = {
       email: "",
       password: "",
       id: "",
       firstName: "", 
       correctLogIn: undefined, 
       openModal: false,
       signedIn: false
    };


    componentDidMount=()=>
    {
        if (localStorage.getItem("logged")==="yes")
        this.setState({ signedIn: true });
    }

    handleChange = e => {
        e.preventDefault();
        this.setState({ [e.target.name]: e.target.value });
    };

    handleClearModal = () => {
        this.setState({ correctLogIn: undefined, openModal: false });
        window.location.reload();
    };

    handleLogin = e => {
        e.preventDefault();
        var data = {
            email: this.state.email,
            password: this.state.password,
        };

        axios.post("/api/users/login",data).then(response => {
            if (!response.data.error) {

                this.props.addUser({
                    firstName: response.data.firstName, 
                    lastName: response.data.lastName,
                    id: response.data.id
                });
                localStorage.setItem("logged","yes");
                localStorage.setItem("firstName",response.data.firstName);
                this.setState({ signedIn: true });

            } else {
                this.setState({correctLogIn:false, openModal: true});
            }
        }).catch(err => {
            console.log("Error: " + err);
        });
    }

  render() {
    return !this.state.signedIn ? (
        <div className="row text-center">           
            <div id="login"> <form>
                <input type="email" id="email" placeholder="email" name="email" onChange={this.handleChange}/>
                <input type="password" id="password" placeholder="password" name="password" onChange={this.handleChange}/>
                <button id="login-send" className="send" onClick={this.handleLogin}>Log Me In!</button>
                </form>
            </div>

            <SignupModal
                confirmSignup={this.state.correctLogIn}
                handleClearModal={this.handleClearModal}
                openModal={this.state.openModal}
            />
        </div> ) : <Redirect push to={{pathname:"/dashboard"}}/>
    };
};

const Login = connect(null, mapDispatchToProps)(ConnectedLogin);

export default Login;