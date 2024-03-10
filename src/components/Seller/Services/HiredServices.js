import { useState, useEffect } from "react";
import { reactLocalStorage } from "reactjs-localstorage";
import axios from "axios";
import { Link,useParams } from "react-router-dom";

import HiredServicesTableRow from "./HiredServicesTableRow";
import Pagination from "./Pagination";
import Spinner from "../../Spinner.png";

function HiredBuyers({ match, location }) {
  const token = reactLocalStorage.get("token");
  const [loading, setLoading] = useState(false);
  const [buyers, setBuyers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [buyersPerPage, setBuyersPerPage] = useState(5);
  const indexOfLastBuyer = currentPage * buyersPerPage;
  const indexOfFirstBuyer = indexOfLastBuyer - buyersPerPage;
  const currentBuyers = buyers.slice(indexOfFirstBuyer, indexOfLastBuyer);


  let { id } = useParams();

  useEffect(() => {
    setLoading(true);
    let getBuyersData = async () => {
      await axios
        .get(`http://localhost:5000/seller/services/hired-services/${id}`, {
          headers: {
            token: token,
          }, 
        })
        .then((response) => {
          if (response.data) {
            setBuyers(response.data.result);
            setLoading(false);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    };
    getBuyersData();
  }, []);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

   const deleteEnrollment = async (buyer_id) => {
    await axios
      .delete(`http://localhost:5000/seller/services/enrollment/service/${id}/buyer/${buyer_id}`,
      {
        headers: {
          token: token,
        },
      }
      )
      .then((res) => {
      setBuyers(buyers.filter((buyer) => buyer.id !== buyer_id));
      });
  };


  return (
    <div id="content" className="p-4">
      <div className="card-body">
        <h3 className="card-title text-center mb-5">Hired Services table</h3>
        <table
          className="table table-responsive dataTable mt-3"
          role="grid"
          style={{ minHeight: "350px" }}
        >
          <thead>
            <tr role="row">
              <th style={{ minWidth: "100" }}>#</th>
              <th style={{ minWidth: "100px" }}>Photo</th>
              <th style={{ minWidth: "200px" }}>Buyer Name</th>
              <th style={{ minWidth: "300px" }}>Buyer Email</th>
              <th style={{ minWidth: "100px" }}>Actions</th>
            </tr>
          </thead>
          {loading ? (
            <div className="loading">
              <img src={Spinner} className="loader" alt="loader" />
              <h2>Loading</h2>
            </div>
          ) : (
            <tbody>
              {currentBuyers.map((buyer) => (
                <HiredServicesTableRow
                  match={match}
                  buyer={buyer}
                  deleteEnrollment={deleteEnrollment}
                />
              ))}
            </tbody>
          )}
        </table>

        <div className="row d-flex align-items-center">
          <div className="col-8 col-md-3 ">
            Showing {indexOfFirstBuyer + 1} to {indexOfLastBuyer} of{" "}
            {buyers.length} entities
          </div>
          <div class="col-4">
            <label>
              <select
                class="form-control select"
                onChange={(e) => {
                  setBuyersPerPage(e.target.value);
                }}
                value={buyersPerPage}
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
              servicesPerPage={buyersPerPage}
              totalServices={buyers.length}
              paginate={paginate}
              currentPage={currentPage}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default HiredBuyers;
