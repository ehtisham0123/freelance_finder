import { useState, useEffect } from "react";
import { reactLocalStorage } from "reactjs-localstorage";
import LocationShowModal from "../../LocationShowModal";

import axios from "axios";
import { Link, useParams } from "react-router-dom";

function Buyer() {
  const token = reactLocalStorage.get("token");
  const [buyer, setBuyer] = useState([]);
  const [services, setServices] = useState([]);
  let { id } = useParams();
  useEffect(() => {
    let getBuyerData = async () => {
      await axios
        .get(`http://localhost:5000/seller/buyers/profile/${id}`, {
          headers: {
            token: token,
          },
        })
        .then((response) => {
          if (response.data) {
            setBuyer(response.data.result[0]);
            setServices(response.data.services);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    };
    getBuyerData();
  }, []);
  return (
    <div id="content" className="mx-5">
      <div className="text-center my-5 ">
        <h2>Buyer Profile</h2>
      </div>
      <div className="row">
        <div className="col-md-4 border pt-5 my-1 text-dark d-flex flex-column align-items-center">
          <div className="profile-img mb-3">
            <img src={`/uploads/${buyer.avatar}`} alt={buyer.name} />
          </div>
          <Link to={`../../chat/${buyer.id}`}>
            <button className="btn btn-outline-dark">
              <i className="fa fa-comment"></i> Message
            </button>
          </Link>
        </div>
          <div className="col-md-8 border p-4  my-1">
          <h2 className="text-dark mb-4">{buyer.name}</h2>
          <div className="profile-tab">
            <div className="row">
              <div className="col-md-4">
                <h5 className="headings">Full Name</h5>
              </div>
              <div className="col-md-8">
                <p>
                  {buyer.firstname} {buyer.lastname}
                </p>
              </div>
            </div>
            <div className="row">
              <div className="col-md-4">
                <h5 className="headings">Email</h5>
              </div>
              <div className="col-md-8">
                <p>{buyer.email}</p>
              </div>
            </div>
            <div className="row">
              <div className="col-md-4">
                <h5 className="headings">Gender</h5>
              </div>
              <div className="col-md-8">
                <p>{buyer.gender}</p>
              </div>
            </div>
            <div className="row">
              <div className="col-md-4">
                <h5 className="headings">Contact</h5>
              </div>
              <div className="col-md-8">
                <p>{buyer.contact}</p>
              </div>
            </div>
            <div className="row">
              <div className="col-md-4">
                <h5 className="headings">Age</h5>
              </div>
              <div className="col-md-8">
                <p>{buyer.age}</p>
              </div>
            </div>
            <div className="row">
              <div className="col-md-4">
                <h5 className="headings">House No</h5>
              </div>
              <div className="col-md-8">
                {buyer.housenumber ? (
                  <p>{buyer.housenumber}</p>
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
                {buyer.streetnumber ? (
                  <p>{buyer.streetnumber}</p>
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
                <p>{buyer.city}</p>
              </div>
            </div>
            <div className="row">
              <div className="col-md-4">
                <h5 className="headings">State</h5>
              </div>
              <div className="col-md-8">
                {buyer.state ? (
                  <p>{buyer.state}</p>
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
                <p>{buyer.country}</p>
              </div>
            </div>
            <div className="row">
              <div className="col-md-4">
                <h5 className="headings">Postal code</h5>
              </div>
              <div className="col-md-8">
                <p>{buyer.postalcode}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row gutters-sm mt-1">
        <div className="col-sm-6 h-100 mb-3">
          <LocationShowModal
            latitude={buyer.latitude}
            longitude={buyer.longitude}
          />
        </div>
        <div className="col-sm-6 mb-3">
          <div
            className="card -berry edge--bottom"
            style={{ height: "325px", "overflow-y": "auto" }}
          >
            <div className="card-body">
              <h6 className="d-flex align-items-center mb-3">
                <i className="material-icons text-dark mr-2">Hired Services</i>
              </h6>
              {services.map((service) => (
                <div className="row">
                  <div className="col-sm-10">
                <h5 className="headings">{service.name}</h5>
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

export default Buyer;
