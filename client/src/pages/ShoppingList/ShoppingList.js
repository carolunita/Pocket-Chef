import React, { Component } from 'react'
import CreateShoppingList from "../../components/CreateShoppingList"
import Navbar from "../../components/Navbar";
import Table from "../../components/Table";
import { createStore, compose } from 'redux'
import MainReducer from '../../reducers/MainReducer'
import { Provider } from 'react-redux'

const store = compose(window.devToolsExtension ? window.devToolsExtension() : f => f)(createStore)(MainReducer)

class ShoppingList extends Component {
  state = {
    firstName: localStorage.getItem("firstName")
  };
  render() {
    return (
    <div>
      <Navbar firstName={this.state.firstName}/>
      <Provider store={store}>
        <div className="App">
            <div className="container" style={{ marginTop: "80px"}} >
            <div className="row">
                <div className="col-lg-10 offset-lg-2 col-md-10 col-sm-12 col-xs-12">
                <CreateShoppingList />
                </div>
                <Table />
            </div>
            </div>
        </div>
        </Provider>
      </div>
    );
  }
}

export default ShoppingList;
