import React from "react";
import ReactDOM from "react-dom";

// Provider负责传递store
import { Provider } from "react-redux";

// 引入判断是否登录组件

import { PersistGate } from "redux-persist/integration/react";

import Router from "./Router.js";

import "./index.css";
import { store, persistor } from "./store";

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Router />
      </PersistGate>
    </Provider>
  );
}

export default App;
