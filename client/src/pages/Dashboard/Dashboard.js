import React from "react";
import { addUser } from "../../actions/index";
import { connect } from "react-redux";
import DisplayRecipes from "../../components/DisplayRecipes";
import Navbar from "../../components/Navbar";
import "./Dashboard.css";

const mapStateToProps = state => {
    return { user: state[0] };
};

const mapDispatchToProps = dispatch => {
    return { addUser: user => dispatch(addUser(user)) };     
};

class ConnectedDashboard extends React.Component {
    state = {
        firstName: "",
        id: "",
        recipeCards: [],
        filteredRecipecards: []
    };

    handleDeleteButton = e => {
        var cardQueryUrl = "/api/cards/" + e.target.id;

        fetch(cardQueryUrl, {
            method: "DELETE"
        }).then(response => response.json);
            
        var recipeQueryURL = "/api/recipes/" + e.target.id;
        
        fetch(recipeQueryURL, {
            method: "DELETE"
        }).then(response => response.json);
        
        window.location.reload();
    };

    filterOnClick = e => {
        var url, data; 

        if (e.target.id === "all") {
            url = "/api/recipes";
            data = {
            user_id: this.props.user.id
            };
        } else {
            url = "/api/recipes/filter";
            data = {
            user_id: this.props.user.id,
                categoryName: e.target.id
            };
        }

        let self = this;

        fetch(url, {
            method: "POST",
            headers : { 
                "Content-Type": "application/json",
                "Accept": "application/json"
            }, 
            body:JSON.stringify(data)
        }).then(response => {
            if (response.status >= 400) {
                throw new Error("Bad response from server.");
            }
            return response.json();
        }).then(data => {
            self.setState({
                filteredRecipecards: data
            });
        }).catch(err => {
            console.log("Error: " + err);
        });
    };

       componentDidMount() {
        this.setState({
         firstName: this.props.user.firstName,
         id: this.props.user.id
        });

        let self = this;

        var data = {
        user_id: this.props.user.id
        };

        fetch("/api/recipes", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify(data)      
        }).then(response => {
            if (response.status >= 400) {
                throw new Error("Bad response from server.");
            }
            return response.json();
        }).then(data => {
            self.setState({
                filteredRecipecards: data
            });
        }).catch(err => {
            console.log("Error: " + err);
        });
    }; 
    
    render() {
        return (
            <div>
	            <Navbar firstName ={this.state.firstName}/>

	            <div className="container">
                    <div className="row filterholder">
                        <h1 className="subheading">Categories:</h1>
                        <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                            <div className="row filterlist">
                                <button className="filter standard white-button" id="all" onClick={this.filterOnClick}>All</button>
                                <button className="filter standard white-button" id="Appetizers" onClick={this.filterOnClick}>Appetizers</button>
                                <button className="filter standard white-button" id="Desserts" onClick={this.filterOnClick}>Desserts</button>
                                <button className="filter standard white-button" id="Soups" onClick={this.filterOnClick}>Soups</button>
                                <button className="filter standard white-button" id="Salads" onClick={this.filterOnClick}>Salads</button>
                                <button className="filter standard white-button" id="Pasta" onClick={this.filterOnClick}>Pasta</button>
                                <button className="filter standard white-button" id="Beef" onClick={this.filterOnClick}>Beef</button>
                                <button className="filter standard white-button" id="Chicken" onClick={this.filterOnClick}>Chicken</button>
                                <button className="filter standard white-button" id="Seafood" onClick={this.filterOnClick}>Seafood</button>
                            </div>
                        </div>
                    </div>

		            <DisplayRecipes 
                        recipeCards = {this.state.filteredRecipecards} 
                        handleDeleteButton = {this.handleDeleteButton}
		            />
		        </div>
            </div>
        );
    };
};

const Dashboard = connect(mapStateToProps, mapDispatchToProps)(ConnectedDashboard);  

export default Dashboard;