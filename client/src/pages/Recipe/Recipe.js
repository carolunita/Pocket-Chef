import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar";
import "./Recipe.css";

const mapStateToProps = state => {
    return { user: state[0] };
};

class ConnectedRecipe extends React.Component {
    state = {
        title: "",
        ingredients: "",
        instructions: "",
        bg: "",
        link: "./dashboard"
    };

    componentDidMount() {
        let self = this;
        var recipeId = { id: Number(this.props.match.params.id) };

        fetch("/api/recipes/recipe", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify(recipeId)
        }).then(response => {
            if (response.status >= 400) {
                throw new Error("Bad response from server.");
            }
            return response.json();
        }).then(data => {
            self.setState({
                title: data[0].recipeName,
                ingredients: data[0].ingredients,
                instructions: data[0].instructions,
                bg: data[0].bg
            });
        }).catch(err => {
            console.log("Error: " + err);
        });

        this.checkIfCards();
    };

    checkIfCards() {
        var recipeId = { id: Number(this.props.match.params.id) };

        fetch("/api/cards/" + this.props.match.params.id, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify(recipeId)
        }).then(response => {
            if (response.status >= 400) {
                throw new Error("Bad response from server.");
            }
            return response.json();
        }).catch(err => {
            console.log("Error: " + err);
        });        
    }

    render() {      
        return (
        <div className="background recipepage" style={{ backgroundImage: "url(" + this.state.bg + ")" }}>
            <Navbar firstName={this.props.user.firstName} />
            <div className="row">
                <div className="about">
                    <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                        <button className="gradient-button set-title">{this.state.title}</button>
                    </div>


                    <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-9">
                        <div className="ingredients instructions">
                        <h2>Ingredients:</h2>
                        <ul className="list">
                            <li>
                            {this.state.ingredients}
                            </li>
                        </ul>
                        <p></p>
                         <h2>Instructions:</h2>
                        {this.state.instructions}
                        <p></p>
                            <Link to={"/dashboard"}>
                                <button className="back-button">Go Back</button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        )   
    };
};

const Recipe = connect(mapStateToProps)(ConnectedRecipe);

export default Recipe;