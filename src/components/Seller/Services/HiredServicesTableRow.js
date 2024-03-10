import { Link } from "react-router-dom";
function HiredServicesTableRow({ match, buyer, deleteEnrollment }) {
  return (
    <tr role="row">
      <td>{buyer.id}</td>
      <td className="img_cont">
        <img
            style = {{marginTop:"-5px",marginBottom:"-5px"}}
           src={`/uploads/${buyer.avatar}`} alt={buyer.name}
           className="user_img"
        />
      </td>
      <td>{buyer.firstname} {buyer.lastname}</td>
      <td>{buyer.email}</td>
      <td style={{ display: "flex" }}>
       <Link to={`/seller/services/buyer-profile/${buyer.id}`}>
          <button className="btn btn-sm btn-outline-primary mr-1">
            View Buyer Profile
          </button>
        </Link>
       <button
          className="btn btn-sm btn-outline-danger"
          onClick={(e) => deleteEnrollment(buyer.id)}
        >
          Delete Enrollment
        </button>
      </td>
    </tr>
  );
}

export default HiredServicesTableRow;
