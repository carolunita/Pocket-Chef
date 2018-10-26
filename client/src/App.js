import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import AddRecipe from "./pages/AddRecipe";
import Dashboard from "./pages/Dashboard";
import DoesNotExist from "./pages/DoesNotExist";
import LandingPage from "./pages/LandingPage";
import Recipe from "./pages/Recipe";
import SearchRecipes from "./pages/SearchRecipes";
import ShoppingList from "./pages/ShoppingList";
//import { createStore, compose } from 'redux'
//import MainReducer from './reducers/MainReducer'
//mport { Provider } from 'react-redux'

// const store = compose(window.devToolsExtension ? window.devToolsExtension() : f => f)(createStore)(MainReducer)


const App = () => (
    //<Provider store={store}>
    <BrowserRouter>
        <Switch>
            <Route path="/" component={LandingPage} exact={true} />
            <Route path="/addrecipe" component={AddRecipe} />
            <Route path="/dashboard" component={Dashboard} />
            <Route path="/recipe/:id" component={Recipe} />
            <Route path="/recipes" component={SearchRecipes} />
            <Route path="/shoppinglist" component={ShoppingList} />
            <Route component={DoesNotExist} />
        </Switch>
    </BrowserRouter>
   // </Provider>
);

export default App;