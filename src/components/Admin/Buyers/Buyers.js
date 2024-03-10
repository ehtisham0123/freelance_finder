import { useState, useEffect } from "react";
import BuyersTableRow from "./BuyersTableRow";
import { reactLocalStorage } from "reactjs-localstorage";
import axios from "axios";
import { Link } from "react-router-dom";
import Pagination from "./Pagination";
import Spinner from '../../Spinner.png';

function Buyers({ match, location }) {
  const token = reactLocalStorage.get("token");
  const [loading, setLoading] = useState(false);
  const [buyers, setBuyers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [buyersPerPage, setBuyersPerPage] = useState(5);
  const indexOfLastBuyer = currentPage * buyersPerPage;
  const indexOfFirstBuyer = indexOfLastBuyer - buyersPerPage;
  const currentBuyers = buyers.slice(
    indexOfFirstBuyer,
    indexOfLastBuyer
  );

  useEffect(() => {
    setLoading(true);
    let getBuyersData = async () => {
      await axios
        .get(`http://localhost:5000/admin/buyers/`,{
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

  const deleteBuyer = async (id) => {
    await axios.delete(`http://localhost:5000/admin/buyers/${id}`,{
          headers: {
            token: token,
          },
        }).then((res) => {
      const newbuyers = buyers.filter((buyer) => buyer.id !== id);
      setBuyers(newbuyers);
    });
  };

  const searchBuyer = async (name) => {
    setLoading(true);
    await axios
      .get(`http://localhost:5000/admin/buyers/${name}`,{
          headers: {
            token: token,
          }
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

  return (
    <div id="content" className="p-4">
      <div className="card-body">
        <h3 className="card-title text-center">Buyers Table</h3>
        <div className="row d-flex align-items-center justify-content-between mr-1">
          <div>
            <input
              type="search"
              className="form-control search_bar ml-3"
              placeholder="Search"
              onChange={(e) => searchBuyer(e.target.value)}
            />
          </div>
          <Link to={`${match.url}/create`}>
            <button className="btn btn-outline-primary mr-1">
              <i className="fa fa-buyer-plus"></i> Add Buyer
            </button>
          </Link>
        </div>

        <table
          className="table table-responsive dataTable mt-3"
          role="grid"
          style={{ minHeight: "350px"}}
        >
          <thead>
            <tr role="row">
              <th style={{ minWidth: "5px" }}>Photo</th>
              <th style={{ minWidth: "100px" }}>Name</th>
              <th style={{ minWidth: "200px" }}>Email</th>
              <th style={{ minWidth: "50px" }}>Contact</th>
              <th style={{ minWidth: "50px" }}>Gender</th>
              <th style={{ minWidth: "50px" }}>City</th>
              <th style={{ minWidth: "180px" }}>Actions</th>
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
                <BuyersTableRow match={match} buyer={buyer} deleteBuyer={deleteBuyer}/>
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
              buyersPerPage={buyersPerPage}
              totalBuyers={buyers.length}
              paginate={paginate}
              currentPage={currentPage}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Buyers;
