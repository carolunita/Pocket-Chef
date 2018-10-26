import React from "react";
import { Link } from "react-router-dom";
import RecipeCard from "../../components/RecipeCard";
import "./DisplayRecipes.css";

const DisplayRecipes = props => {
    return (
        <div className="row">
            <h2 className="subheading dashboard">Recipes:</h2>
            <div className="recipecard-panel">
                <Link to="/addrecipe">
                    <div className="col-12 col-sm-12 col-md-6 col-lg-4 col-xl-4 cardbox">
                        <div className="card">
                            <button className="white-button card-fill">Add a New <br/>Recipe</button>
                        </div>
                    </div>
                </Link>

                { props.recipeCards.map(card => (
                    <RecipeCard 
                        key = {card.recipeName}
                        id = {card.id}
                        recipeCardText = {card.recipeName}
                        recipeCardD = {card.ingredients}
                        recipeCardI = {card.instructions}
                        recipeCardBg = {card.bg}
                        handleDeleteButton = {props.handleDeleteButton}
                        cardLink = {"/recipe/" + card.id}
                    />
                ))}
            </div>
        </div>
    );
};

export default DisplayRecipes;