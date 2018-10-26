import React from "react";
import { addUser } from "../../actions/index";
import { connect } from "react-redux";
import Navbar from "../../components/Navbar";
import "./DoesNotExist.css";

const mapStateToProps = state => {
    return { user: state[0] };
};

const mapDispatchToProps = dispatch => {
    return { addUser: user => dispatch(addUser(user)) };
};

class ConnectedDoesNotExist extends React.Component {
	state = {
        firstName: "Lost Chef",
    };

  componentDidMount() {
    this.setState({
        firstName: this.props.user.firstName,
        });
    };

    render() {
        return (
            <div>
            	<Navbar firstName={this.state.firstName}/>
				<h1 className="error top dne">ERROR 404</h1>
                <img src="https://media.giphy.com/media/26ueYXr2bONg1Y8ms/giphy.gif" className="img-fluid" alt="Gordon Ramsey"/>
				<h2 className="error dne">Page Not Found!</h2>
            </div>
        );
    };
};

const DoesNotExist = connect(mapStateToProps, mapDispatchToProps)(ConnectedDoesNotExist);  

export default DoesNotExist;