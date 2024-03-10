import { useState, useEffect } from "react";
import { reactLocalStorage } from "reactjs-localstorage";
import LocationShowModal from "../../LocationShowModal";

import axios from "axios";
import { Link, useParams } from "react-router-dom";

function Seller() {
  const token = reactLocalStorage.get("token");
  const [seller, setSeller] = useState([]);
  const [services, setServices] = useState([]);
  let { id } = useParams();
  useEffect(() => {
    let getUserData = async () => {
      await axios
        .get(`http://localhost:5000/admin/sellers/profile/${id}`, {
          headers: {
            token: token,
          },
        })
        .then((response) => {
          if (response.data) {
            setSeller(response.data.result[0]);
            setServices(response.data.services);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    };
    getUserData();
  }, []);
  return (
    <div id="content" className="mx-5">
      <div className="text-center my-5 ">
        <h2>Seller Profile</h2>
      </div>

     <div className="row">
        <div className="col-md-4 border pt-5 my-1 text-dark d-flex flex-column align-items-center">
          <div className="profile-img mb-3">
            <img src={`/uploads/${seller.avatar}`} alt={seller.name} />
          </div>
          <Link to={`../../sellers/edit/${seller.id}`}>
            <button className="btn btn-outline-dark my-3">
              <i class="fa fa-edit"></i> Edit Profile
            </button>
          </Link>
        </div>
          <div className="col-md-8 border p-4  my-1">
          <h2 className="text-dark mb-4">{seller.name}</h2>
          <div className="profile-tab">
            <div className="row">
              <div className="col-md-4">
                <h5 className="headings">Full Name</h5>
              </div>
              <div className="col-md-8">
                <p>
                  {seller.firstname} {seller.lastname}
                </p>
              </div>
            </div>
            <div className="row">
              <div className="col-md-4">
                <h5 className="headings">Email</h5>
              </div>
              <div className="col-md-8">
                <p>{seller.email}</p>
              </div>
            </div>
            <div className="row">
              <div className="col-md-4">
                <h5 className="headings">Gender</h5>
              </div>
              <div className="col-md-8">
                <p>{seller.gender}</p>
              </div>
            </div>
            <div className="row">
              <div className="col-md-4">
                <h5 className="headings">Contact</h5>
              </div>
              <div className="col-md-8">
                <p>{seller.contact}</p>
              </div>
            </div>
            <div className="row">
              <div className="col-md-4">
                <h5 className="headings">Age</h5>
              </div>
              <div className="col-md-8">
                <p>{seller.age}</p>
              </div>
            </div>
            <div className="row">
              <div className="col-md-4">
                <h5 className="headings">House No</h5>
              </div>
              <div className="col-md-8">
                {seller.housenumber ? (
                  <p>{seller.housenumber}</p>
                ) : (
                  <p className="text-dark">Null </p>
                )}
              </div>
            </div>
            <div className="row">
              <div className="col-md-4">
                <h5 className="headings">Street</h5>
              </div>
              <div className="col-md-8">
                {seller.streetnumber ? (
                  <p>{seller.streetnumber}</p>
                ) : (
                  <p className="text-dark">Null </p>
                )}
              </div>
            </div>
            <div className="row">
              <div className="col-md-4">
                <h5 className="headings">City</h5>
              </div>
              <div className="col-md-8">
                <p>{seller.city}</p>
              </div>
            </div>
            <div className="row">
              <div className="col-md-4">
                <h5 className="headings">State</h5>
              </div>
              <div className="col-md-8">
                {seller.state ? (
                  <p>{seller.state}</p>
                ) : (
                  <p className="text-dark">Null </p>
                )}
              </div>
            </div>
            <div className="row">
              <div className="col-md-4">
                <h5 className="headings">Country</h5>
              </div>
              <div className="col-md-8">
                <p>{seller.country}</p>
              </div>
            </div>
            <div className="row">
              <div className="col-md-4">
                <h5 className="headings">Postal code</h5>
              </div>
              <div className="col-md-8">
                <p>{seller.postalcode}</p>
              </div>
            </div>
          </div>
        </div>v>
      </div>



       <div className="row gutters-sm mt-1">
        <div className="col-sm-6 h-100 mb-3">
          <LocationShowModal
            latitude={seller.latitude}
            longitude={seller.longitude}
          />
        </div>
        <div className="col-sm-6 mb-3">
          <div
            className="card -berry edge--bottom"
            style={{ height: "325px", "overflow-y": "auto" }}
          >
            <div className="card-body">
              <h6 className="d-flex align-items-center mb-3">
                <i className="material-icons text-dark mr-2">Services</i>
              </h6>
              {services.map((service) => (
                <div className="row">
                  <div className="col-sm-10">
                    <h6 className="mb-0">{service.name}</h6>
                  </div>
                  <div className="col-sm-2 text-dark  text-right">
                    <p>
                      <Link to={`../../services/view/${service.id}`}>
                        <button className="btn btn-sm btn-outline-dark mr-1">
                          View
                        </button>
                      </Link>
              
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>







    </div>
  );
}

export default Seller;
