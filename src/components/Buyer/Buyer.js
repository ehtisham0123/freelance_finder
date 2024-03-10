import { useState } from "react";
import { Link ,Switch ,Route} from "react-router-dom";
import {reactLocalStorage} from 'reactjs-localstorage';

import Home from "../Home";

import Chat from "./Chat/Chat";

import EnrolledServices from "./Services/EnrolledServices";
import Services from "./Services/Services";
import Service from "./Services/Service";

import EditProfile from "./Profile/EditProfile"; 
import Profile from "./Profile/Profile";

import Seller from "./Sellers/Seller";

import logo from "../../logo.png";


function Buyer({history,match,location}) {
  const checkProfile =  location.pathname.includes("buyer/profile");
  const checkServices =  location.pathname.includes("buyer/services");
  const checkChat =  location.pathname.includes("buyer/chat");
  const checkErollments =  location.pathname.includes("buyer/erollments");
  const [active, setActive] = useState(false);

const logout = () => {
    reactLocalStorage.remove('token');
    reactLocalStorage.remove('user_id');
    reactLocalStorage.remove('user_role');
    history.push("/buyer-login");
  }

  if (!reactLocalStorage.get('token')){
    history.push("/buyer-login");
   }
  else if (reactLocalStorage.get('user_role') != 'buyer'){
    logout();    
    history.push("/buyer-login");
   }

  const toggleClass = () => {
      const currentState = active;
      setActive(!currentState );
  };

  
  return (
      <div className="wrapper d-flex align-items-stretch">
            <nav id="sidebar" className={active ? 'active': null}>
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
                <h3>Freelancer Lookout</h3>
            </div>
          </div>
            
          <ul className="list-unstyled components mb-5">
            
            <Link to={`${match.url}`}>
              <li 
               className={`${location.pathname === "/buyer"  ? "active" : ""}`} 
              >
                <a href="">
                  <span className="fa fa-home mr-3"></span> Home
                </a>
              </li>
            </Link>

             <Link to={`${match.url}/profile`}>
              <li 
              className={`${checkProfile ? "active" : ""}`} 
              >
                <a href="">
                  <span className="fa fa-id-card mr-3"></span> Profile
                </a>
              </li>
            </Link>

              <Link to={`${match.url}/chat`}>
              <li 
              className={`${checkChat ? "active" : ""}`} 
              >
                <a href="">
                  <span className="fa fa-comment mr-3"></span> Chat
                </a>
              </li>
            </Link>


            <Link to={`${match.url}/services`}>
              <li
              className={`${checkServices ? "active" : ""}`} 
              >
                <a href="#">
                  <span className="fa fa-briefcase mr-3" aria-hidden="true"></span>
                  Services
                </a>
              </li>
            </Link>     
            <Link onClick={logout}>
              <li>
                <a href="">
                   <span className="fa fa-sign-out mr-3" aria-hidden="true"></span>
                    Logout
                </a>  
              </li>
            </Link>    
          </ul>
        </nav>
        <Switch>

          <Route exact path={`${match.path}`}  component={Home} />  

          <Route exact path={`${match.path}/chat/:id?`}  component={Chat} />  

          <Route path={`${match.path}/profile/edit/`} component={EditProfile}/>
          
          <Route path={`${match.path}/profile/`} component={Profile}/>
          
                      
          <Route exact path={`${match.path}/services`} component={Services} />
             
          <Route path={`${match.path}/services/enrolled-services`} component={EnrolledServices} />
             
          <Route path={`${match.path}/services/view/:id`} component={Service}/>
                      
          <Route path={`${match.path}/services/seller-profile/:id`} component={Seller}/> 


        </Switch>
      </div>
  );
}

export default Buyer;
