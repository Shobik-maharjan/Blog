import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
// import "quill/dist/quill.core.css";
import "react-quill/dist/quill.core.css";
import "react-quill/dist/quill.snow.css";
import "./index.css";
import { Provider } from "react-redux";
import store from "./redux/store.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
