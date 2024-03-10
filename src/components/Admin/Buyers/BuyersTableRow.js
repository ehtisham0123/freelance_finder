import { Link } from "react-router-dom";
function BuyersTableRow({match,buyer,deleteBuyer}) {
  return (
      <tr role="row">
      <td className="img_cont">
        <img
            style = {{marginTop:"-5px",marginBottom:"-5px"}}
           src={`/uploads/${buyer.avatar}`} alt={buyer.name}
           className="user_img"
        />
      </td>
      <td>{buyer.firstname} {buyer.lastname}</td>
      <td>{buyer.email}</td>
      <td>{buyer.contact}</td>
      <td>{buyer.gender}</td>
      <td>{buyer.city}</td>
      <td>
        <Link to={`${match.url}/profile/${buyer.id}`}>
          <button className="btn btn-sm btn-outline-dark mr-1">
            View
          </button>
        </Link>
        <Link to={`${match.url}/edit/${buyer.id}`}>
          <button className="btn btn-sm btn-outline-dark mr-1">
            Edit
          </button>
        </Link>
        <button
          className="btn btn-sm btn-outline-dark"
          onClick={(e) => deleteBuyer(buyer.id)}
        >
          Delete
        </button>
      </td>
    </tr>
  );
}

export default BuyersTableRow;
