import { applyMiddleware, createStore, compose } from "redux";
import rootReducer from "./rootReducer";
import { persistStore } from "redux-persist";
import {thunk} from "redux-thunk";

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export default { store, persistor };
