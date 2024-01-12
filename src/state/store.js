import { createStore, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";
import gameReducer from "./reducer/reducer";
import rootSaga from "./sagas/sagas";

const sagaMiddleware = createSagaMiddleware();

const store = createStore(gameReducer, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(rootSaga);

export default store;
