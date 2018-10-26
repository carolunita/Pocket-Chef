import React from "react";
import { addUser } from "../../actions/index";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar";
import axios from "axios";
import "./AddRecipe.css";

const mapDispatchToProps = dispatch => {
    return { addUser: user => dispatch(addUser(user)) };
};

const mapStateToProps = state => {
    return { user: state[0] };
};

class ConnectedAddRecipe extends React.Component {
    state = {
        categoryName: "",
        recipeName: "",
        ingredients: "",
        instructions: "",
        bg: "",
        firstName: localStorage.getItem("firstName"),
        UserId: this.props.user.id,
        recipeAddSuccess: false,
        recipeLink:"./dashboard"
    };

    handleChange = e => {
        e.preventDefault();
        this.setState({ [e.target.name]: e.target.value });
    };

    saveRecipe = e => {
        e.preventDefault();
        
        var data = {
            categoryName: this.state.categoryName,
            recipeName: this.state.recipeName,
            ingredients: this.state.ingredients,
            instructions: this.state.instructions,
            UserId: this.state.UserId,
            bg: this.state.bg
        };

        axios.post("/api/recipes/create", data).then(response => {
            if (response.status >= 400) {
                throw new Error("Bad response from server.");
            }
            this.setState({ recipeAddSuccess: true });
            return response.json();
        }).catch(err => {
            console.log("Error: " + err);
        });
    };

    render() {
        return !this.state.recipeAddSuccess ? (
            <div>
            <Navbar firstName={this.state.firstName}/>             
                <div className="container">
                    <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                        <h2 className="formh2">Creating a New Recipe...</h2>

                        <select 
                            className="form-control"
                            name="categoryName"
                            id="category"
                            onChange={this.handleChange}
                        >
                            <option value="default">Select a category</option>
                            <option value="Appetizers">Appetizers</option>
                            <option value="Desserts">Desserts</option>
                            <option value="Soups">Soups</option>
                            <option value="Salads">Salads</option>
                            <option value="Pasta">Pasta</option>
                            <option value="Beef">Beef</option>
                            <option value="Chicken">Chicken</option>
                            <option value="Seafood">Seafood</option>
                        </select>
                        
                        <input
                            className="title"
                            type="text"
                            id="title"
                            name="recipeName"
                            onChange={this.handleChange}
                            placeholder="Recipe Name"
                        />

                        <textarea
                            className="form-input larger"
                            type="text"
                            id="ingredients"
                            name="ingredients"
                            onChange={this.handleChange}
                            placeholder="Ingredients"
                        />

                        <textarea
                            className="form-input larger"
                            type="text"
                            minlength="10"
                            maxlength="3000"
                            id="instructions"
                            name="instructions"
                            onChange={this.handleChange}
                            placeholder="Instructions"
                        />

                        <input
                            className="url"
                            type="text"
                            id="setbg"
                            name="bg"
                            onChange={this.handleChange}
                            placeholder="Image url"
                        />
                        
                        <button id="saveDeck" className="white-button oversized create" onClick={this.saveRecipe}>Save Recipe</button>

                        <Link to={this.state.recipeLink}>
                            <button
                                className="white-button oversized create"
                            >
                                Back
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        ) : <Redirect to={{pathname:"/dashboard"}}/>
    };
};

const AddRecipe = connect(mapStateToProps, mapDispatchToProps)(ConnectedAddRecipe);

export default AddRecipe;