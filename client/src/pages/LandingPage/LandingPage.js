import React from "react";
import Header from "../../components/Header";
import UserLogin from "../../components/UserLogin";
import "./LandingPage.css";

class LandingPage extends React.Component {
  render() {
    	return (
      		<div className="background homepage">
		      	<Header />
		      	<UserLogin />
		    </div>
    	);
  	};
};

export default LandingPage;