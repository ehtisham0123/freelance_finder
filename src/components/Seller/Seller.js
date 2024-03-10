import Home from "../Home";
import Chat from "./Chat/Chat";
import Services from "./Services/Services";
import HiredServices from "./Services/HiredServices";
import CreateService from "./Services/CreateService";
import EditService from "./Services/EditService"; 
import Service from "./Services/Service";
import EditProfile from "./Profile/EditProfile"; 
import Profile from "./Profile/Profile";
import Buyer from "./Buyers/Buyer";

import { useState } from "react";
import { Link ,Switch ,Route} from "react-router-dom";
import {reactLocalStorage} from 'reactjs-localstorage';

import logo from "../../logo.png";


function Seller({history,match,location}) {
  const checkProfile =  location.pathname.includes("seller/profile");
  const checkChat =  location.pathname.includes("seller/chat");
  
  const checkServices =  location.pathname.includes("seller/services");
  const checkErollments =  location.pathname.includes("seller/erollments");
  const [active, setActive] = useState(false);

   const logout = ()=>{
    reactLocalStorage.remove('token');
    reactLocalStorage.remove('user_id');
    reactLocalStorage.remove('user_role');
    history.push("/seller-login");
  }

  if (!reactLocalStorage.get('token')){
    history.push("/seller-login");
   }
  else if (reactLocalStorage.get('user_role') != 'seller'){
    logout();    
    history.push("/seller-login");
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
                </div>               <h3>Freelancer Lookout</h3>
              </div>
            </div>
            
          <ul className="list-unstyled components mb-5">
            
            <Link to={`${match.url}`}>
              <li 
               className={`${location.pathname === "/seller"  ? "active" : ""}`} 
              >
                <a>
                  <span className="fa fa-home mr-3"></span> Home
                </a>
              </li>
            </Link>

             <Link to={`${match.url}/profile`}>
              <li 
              className={`${checkProfile ? "active" : ""}`} 
              >
                <a>
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
                <a>
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
          
          <Route exact path={`${match.path}/services/hired-services/:id`} component={HiredServices} />

          <Route path={`${match.path}/services/create`} component={CreateService}/>
             
          <Route path={`${match.path}/services/view/:id`} component={Service}/>
                      
          <Route path={`${match.path}/services/edit/:id`} component={EditService}/> 
          
          <Route path={`${match.path}/services/buyer-profile/:id`} component={Buyer}/> 

        </Switch>
      </div>
  );
}

export default Seller;
