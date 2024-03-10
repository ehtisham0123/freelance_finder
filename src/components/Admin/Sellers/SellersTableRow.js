import { Link } from "react-router-dom";
function SellersTableRow({match,seller,deleteSeller}) {
  return (
      <tr role="row">
      <td className="img_cont">
        <img
            style = {{marginTop:"-5px",marginBottom:"-5px"}}
           src={`/uploads/${seller.avatar}`} alt={seller.name}
           className="user_img"
        />
      </td>
      <td>{seller.firstname} {seller.lastname}</td>
      <td>{seller.email}</td>
      <td>{seller.contact}</td>
      <td>{seller.gender}</td>
      <td>{seller.city}</td>
      <td>
        <Link to={`${match.url}/profile/${seller.id}`}>
          <button className="btn btn-sm btn-outline-dark mr-1">
            View
          </button>
        </Link>
        <Link to={`${match.url}/edit/${seller.id}`}>
          <button className="btn btn-sm btn-outline-dark mr-1">
            Edit
          </button>
        </Link>
        <button
          className="btn btn-sm btn-outline-dark"
          onClick={(e) => deleteSeller(seller.id)}
        >
          Delete
        </button>
      </td>
    </tr>
  );
}

export default SellersTableRow;
