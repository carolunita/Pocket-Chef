import React from "react";
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";
import { render } from "react-dom";
import storeClass from "./store/index";
import App from "./App";
import "./style.css";

let stores = storeClass();
let store = stores.store;
let persistor = stores.persistor;

render (
	<Provider store={store}>
		<PersistGate loading={null} persistor={persistor}>
			<App />
		</PersistGate>	
	</Provider>,
	document.getElementById("app")
);