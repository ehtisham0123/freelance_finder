import "./App.css";
import {reactLocalStorage} from 'reactjs-localstorage';

import Home from "./Home";
import Admin from "./components/Admin/Admin";
import Seller from "./components/Seller/Seller";
import Buyer from "./components/Buyer/Buyer";

import AdminLogin from "./components/Admin/AdminLogin";
import SellerLogin from "./components/Seller/SellerLogin";
import SellerSignup from "./components/Seller/SellerSignup";
import BuyerLogin from "./components/Buyer/BuyerLogin";
import BuyerSignup from "./components/Buyer/BuyerSignup";

import { Link, Switch, Route } from "react-router-dom";
import { useState } from "react";


import logo from "./logo.png";

function App({ location,history }) {



  const [active, setActive] = useState(false);
  const toggleClass = () => {
    const currentState = active;
    setActive(!currentState);
  };
  return (
    <div className="App">
      <Switch>
        <Route path="/admin" component={Admin} />
        <Route path="/seller" component={Seller} />
        <Route path="/buyer" component={Buyer} />
        <div className="wrapper d-flex align-items-stretch"  >
          <nav id="sidebar" className={active ? "active" : null}>
            <div className="custom-menu">
              <button
                type="button"
                id="sidebarCollapse"
                className="btn btn-primary"
                onClick={toggleClass}
              ></button>
            </div>
            <div
              className="img bg-wrap text-center py-4"
            >
              <div className="user-logo">
                <div
                  className="img"
                >
                  <img
                  src={logo}
                  width="220"
                 />
                </div>
                <h3>Freelance Lookout</h3>
              </div>
            </div>
            <ul className="list-unstyled components mb-5">
              <Link to={`/`}>
                <li className={`${location.pathname === "/" ? "active" : ""}`}>
                  <a>
                    <span className="fa fa-home mr-3"></span>
                    Home
                  </a>
                </li>
              </Link>
              <Link to={`/admin-login`}>
                <li
                  className={`${
                    location.pathname === "/admin-login" ? "active" : ""
                  }`}
                >
                  <a>
                    <span className="fa fa-sign-in mr-3"></span>
                    Admin Login
                  </a>
                </li>
              </Link>
              <Link to={`/seller-signup`}>
                <li
                  className={`${
                    location.pathname === "/seller-signup" ? "active" : ""
                  }`}
                >
                  <a className="d-flex align-items-center">
                    <span className="fa fa-user-plus mr-3"></span>
                    Seller Registration
                  </a>
                </li>
              </Link>
              <Link to={`/seller-login`}>
                <li
                  className={`${
                    location.pathname === "/seller-login" ? "active" : ""
                  }`}
                >
                  <a className="d-flex align-items-center">
                    <span className="fa fa-sign-in mr-3"></span>                      
                    Seller Login
                  </a>
                </li>
              </Link>
              <Link to={`/buyer-signup`}>
                <li
                  className={`${
                    location.pathname === "/buyer-signup" ? "active" : ""
                  }`}
                >
                  <a>
                    <span className="fa fa-user-plus mr-3"></span>
                    Buyer Registration
                  </a>
                </li>
              </Link>
              <Link to={`/buyer-login`}>
                <li
                  className={`${
                    location.pathname === "/buyer-login" ? "active" : ""
                  }`}
                >
                  <a>
                    <span className="fa fa-sign-in mr-3"></span>
                    Buyer Login
                  </a>
                </li>
              </Link>
            </ul>
          </nav>

          <Route exact path="/" component={Home} />
          <Route path="/admin-login" component={AdminLogin} />
          <Route path="/seller-login" component={SellerLogin} />
          <Route path="/seller-signup/" component={SellerSignup} />
          <Route path="/buyer-login" component={BuyerLogin} />
          <Route path="/buyer-signup" component={BuyerSignup} />
        </div>
      </Switch>
    </div>
  );
}

export default App;
