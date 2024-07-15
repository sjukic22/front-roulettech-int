import { combineReducers } from "redux";
import accessReducer from "./Access/accessSlice"
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";

const persistConfig = {
  key: "core",
  storage,
  blacklist: [],
  whitelist: ["access"],
};

const rootReducer = combineReducers({
  access: accessReducer,
});

export default persistReducer(persistConfig, rootReducer);
