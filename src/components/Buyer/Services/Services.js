import { useState, useEffect } from "react";
import { reactLocalStorage } from "reactjs-localstorage";
import axios from "axios";
import { Link } from "react-router-dom";

import ServicesTableRow from "./ServicesTableRow";
import Pagination from "./Pagination";
import Spinner from "../../Spinner.png";

function Services({ match, location }) {
  const token = reactLocalStorage.get("token");
  let user_id = reactLocalStorage.get("user_id");
  const [loading, setLoading] = useState(false);
  const [services, setServices] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [servicesPerPage, setServicesPerPage] = useState(5);
  const indexOfLastService = currentPage * servicesPerPage;
  const indexOfFirstService = indexOfLastService - servicesPerPage;
  const currentServices = services.slice(indexOfFirstService, indexOfLastService);

  useEffect(() => {
    setLoading(true);
    let getServicesData = async () => {
      await axios
        .get(`http://localhost:5000/buyer/services/`,{
          headers: {
            token: token,
          } 
        })
        .then((response) => {
          if (response.data) {
            setServices(response.data.result);
            setLoading(false);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    };
    getServicesData();
  }, []);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const searchService = async (name) => {
    setLoading(true);
    await axios
      .get(`http://localhost:5000/buyer/services/${name}`, {
        headers: {
          token: token,
        },
      })
      .then((response) => {
        if (response.data) {
          setServices(response.data.result);
          setLoading(false);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div id="content" className="p-4">
      <div className="card-body">
        <h3 className="card-title text-center">Services table</h3>
        <div className="row d-flex align-items-center justify-content-between mr-1">
         <div>
            <input
              type="search"
              className="form-control search_bar"
              placeholder="Search"
              onChange={(e) => searchService(e.target.value)}
            />
          </div>
          <Link to={`${match.url}/enrolled-services`}>
            <button className="btn btn-outline-dark mr-1">
              <i className="fa fa-briefcase mr-1"></i> Hired Services
            </button>
          </Link>
        </div>

        <table
          className="table table-responsive dataTable mt-3"
          role="grid"
          style={{ minHeight: "350px" }}
        >
          <thead>
            <tr role="row">
              <th style={{ minWidth: "150px" }}>Service Name</th>
              <th style={{ minWidth: "500px" }}>Service Details</th>
              <th style={{ minWidth: "150px" }}>Seller</th>
              <th style={{ minWidth: "50px" }}>Actions</th>
            </tr>
          </thead>
          {loading ? (
            <div className="loading">
              <img src={Spinner} className="loader" alt="Loader" />
              <h2>Loading</h2>
            </div>
          ) : (
            <tbody>
              {currentServices.map((service) => (
                <ServicesTableRow
                  match={match}
                  service={service}
                />
              ))}
            </tbody>
          )}
        </table>

        <div className="row d-flex align-items-center">
          <div className="col-8 col-md-3 ">
            Showing {indexOfFirstService + 1} to {indexOfLastService} of{" "}
            {services.length} entities
          </div>
          <div class="col-4">
            <label>
              <select
                class="form-control select"
                onChange={(e) => {
                  setServicesPerPage(e.target.value);
                }}
                value={servicesPerPage}
              >
                <option value="5">5</option>
                <option value="10">10</option>
                <option value="15">15</option>
                <option value="20">20</option>
              </select>
            </label>
          </div>
          <div className="col-12 col-md-4 d-flex justify-content-center">
            <Pagination
              servicesPerPage={servicesPerPage}
              totalServices={services.length}
              paginate={paginate}
              currentPage={currentPage}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Services;
