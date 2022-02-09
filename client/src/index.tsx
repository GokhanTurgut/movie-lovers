import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { store } from "./redux/store";
import { Provider } from "react-redux";
import Home from "./pages/Home";
import SignIn from "./pages/Auth/SignIn";
import SignUp from "./pages/Auth/SignUp";
import AuthSuccess from "./pages/Auth/AuthSuccess";
import NotFound from "./pages/NotFound";
import { RequireAuth, RequireNoAuth } from "./utils/authChecker";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />}>
            <Route index element={<Home />} />
            <Route
              path="signin"
              element={
                <RequireNoAuth>
                  <SignIn />
                </RequireNoAuth>
              }
            />
            <Route
              path="signup"
              element={
                <RequireNoAuth>
                  <SignUp />
                </RequireNoAuth>
              }
            />
            <Route
              path="signin/success"
              element={
                <RequireNoAuth>
                  <AuthSuccess />
                </RequireNoAuth>
              }
            />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
