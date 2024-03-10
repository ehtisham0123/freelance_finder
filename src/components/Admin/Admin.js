import Home from "../Home";
import Buyers from "./Buyers/Buyers";
import CreateBuyer from "./Buyers/CreateBuyer"; 
import EditBuyer from "./Buyers/EditBuyer"; 
import Buyer from "./Buyers/Buyer";

import Sellers from "./Sellers/Sellers";
import CreateSeller from "./Sellers/CreateSeller";
import EditSeller from "./Sellers/EditSeller"; 
import Seller from "./Sellers/Seller";

import Services from "./Services/Services";
import HiredServices from "./Services/HiredServices";
import EditService from "./Services/EditService"; 
import Service from "./Services/Service";

import {useState} from "react";
import { Link ,Switch ,Route} from "react-router-dom";
import {reactLocalStorage} from 'reactjs-localstorage';

import logo from "../../logo.png";


function Admin({history,match,location}) {
  
  const checkBuyers =  location.pathname.includes("admin/buyers");
  const checkSellers =  location.pathname.includes("admin/sellers");
  const checkServices =  location.pathname.includes("admin/services");
  const [active, setActive] = useState(false);

  const logout = ()=>{
    reactLocalStorage.remove('token');
    reactLocalStorage.remove('user_id');
    reactLocalStorage.remove('user_role');
    history.push("/admin-login");
  }

  const toggleClass = () => {
      const currentState = active;
      setActive(!currentState );
  };

  if (!reactLocalStorage.get('token')){
    history.push("/admin-login");
   }
  else if (reactLocalStorage.get('user_role') !== 'admin'){
    logout();    
    history.push("/admin-login");
   
   }


  return (
      <div className="wrAdminer d-flex align-items-stretch">
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
                </div>        <h3>Freelance Lookout</h3>
            </div>
          </div>
            
          <ul className="list-unstyled components mb-5">
            <Link to={`${match.url}`}>
              <li 
               className={`${location.pathname === "/admin"  ? "active" : ""}`} 
              >
                <a>
                  <span className="fa fa-home mr-3"></span> Home
                </a>
              </li>
            </Link>


           <Link to={`${match.url}/sellers`}>
              <li
              className={`${checkSellers ? "active" : ""}`} 
              >
                <a>
                  <span className="fa fa-user mr-3"></span>
                  Sellers
                </a>
              </li>
            </Link>              


           <Link to={`${match.url}/buyers`}>
              <li
              className={`${checkBuyers ? "active" : ""}`} 
              >
                <a>
                  <span className="fa fa-male mr-3"></span>
                  Buyers
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
    
          <Route exact path={`${match.path}/buyers`} component={Buyers} />
          
          <Route path={`${match.path}/buyers/create`} component={CreateBuyer}/>
             
          <Route path={`${match.path}/buyers/profile/:id`} component={Buyer}/>
                      
          <Route path={`${match.path}/buyers/edit/:id`} component={EditBuyer}/>
          
          

          <Route exact path={`${match.path}/sellers`} component={Sellers} />
          
          <Route path={`${match.path}/sellers/create`} component={CreateSeller}/>
             
          <Route path={`${match.path}/sellers/profile/:id`} component={Seller}/>
                      
          <Route path={`${match.path}/sellers/edit/:id`} component={EditSeller}/>



          <Route exact path={`${match.path}/services`} component={Services} />
          
          <Route exact path={`${match.path}/services/hired-services/:id`} component={HiredServices} />
             
          <Route path={`${match.path}/services/view/:id`} component={Service}/>
                      
          <Route path={`${match.path}/services/edit/:id`} component={EditService}/>
             
        </Switch>
      </div>
  );
}

export default Admin;
