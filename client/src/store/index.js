import { createStore } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import rootReducer from "../reducers/index";
import storage from "redux-persist/lib/storage";

// Creates a store with persistStorage that will retain data on refresh

const persistConfig = {
	key: "root",
	storage
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export default () => {
	let store = createStore(persistedReducer);
	let persistor = persistStore(store);
	return {store, persistor};
};