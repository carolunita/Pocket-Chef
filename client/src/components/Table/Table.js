import React, { Component } from "react";
import { connect } from "react-redux";
import {
  deleteIngredient,
  toggleIngredient,
  setVisibilityFilter
} from "../../actions/actionCreator";
import { SHOW_ALL, SHOW_PURCHASED, SHOW_TOPURCHASE } from "../../actions/actionsTypes";
import { bindActionCreators } from "redux";

class Table extends Component {
  render() {
    return (
      <div className="col-lg-10 offset-lg-1 col-md-10 col-sm-12 col-xs-12">
        <nav style={{ marginTop: "60px" }}>
          <ol className="breadcrumb">
            <li
              className={"breadcrumb-item "+ (this.props.visibilityFilter === SHOW_ALL ? 'topurchase' : '') }
              onClick={() => this.props.setVisibilityFilter(SHOW_ALL)}
            >
             All
            </li>
            <li
               className={"breadcrumb-item "+ (this.props.visibilityFilter === SHOW_PURCHASED ? 'topurchase' : '') }
              onClick={() => this.props.setVisibilityFilter(SHOW_PURCHASED)}
            >
              Purchased
            </li>
            <li
               className={"breadcrumb-item "+ (this.props.visibilityFilter === SHOW_TOPURCHASE ? 'topurchase' : '') }
              onClick={() => this.props.setVisibilityFilter(SHOW_TOPURCHASE)}
            >
              To Purchase
            </li>
          </ol>
        </nav>
        {this.props.ingredients.length !== 0 ? (
          <table
            style={{ marginTop: "60px" }}
            className="table table-hover table-dark"
          >
            <thead>
              <tr>
                <th scope="col">Ingredients</th>
                <th scope="col">List Status</th>
              </tr>
            </thead>
            <tbody>
              {this.props.ingredients.map(ingredient => (
                <tr key={ingredient.id}>
                  <td
                    style={{
                      textDecoration: ingredient.purchased ? "line-through" : "none"
                    }}
                  >
                    {ingredient.text} {ingredient.purchased === true ? "(purchased)" : ""}
                  </td>
                  <td>
                    <span
                      className="fas fa-minus-circle"
                      onClick={() => this.props.deleteIngredient(ingredient.id)}
                      style={{
                        color: "white",
                        fontSize: "20pt",
                        marginRight: "20px"
                      }}
                    />
                    <span
                      className="fas fa-check-circle"
                      onClick={() => this.props.toggleIngredient(ingredient.id)}
                      style={{ color: "white", fontSize: "20pt" }}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div
            style={{ marginTop: "50px" }}
            className="col-lg-10 col-md-10 col-xs-12 col-sm-12 offset-lg-1"
          >
            <div className="alert alert-danger" role="alert">
              Ingredients list is empty
            </div>
          </div>
        )}{" "}
      </div>
    );
  }
}

const getVisibleIngredients = (ingredients, filter) => {
  switch (filter) {
    case SHOW_ALL:
      return ingredients;
    case SHOW_PURCHASED:
      return ingredients.filter(t => t.purchased);
    case SHOW_TOPURCHASE:
      return ingredients.filter(t => !t.purchased);
    default:
      throw new Error("Unknown filter: " + filter);
  }
};

const mapStateToProps = state => {
  return { ingredients: getVisibleIngredients(state.ingredients, state.visibilityFilter),
    visibilityFilter: state.visibilityFilter
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      deleteIngredient,
      toggleIngredient,
      setVisibilityFilter
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Table);  
