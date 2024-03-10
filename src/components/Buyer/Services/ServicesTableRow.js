import { Link } from "react-router-dom";
function ServicesTableRow({ match, service }) {
  return (
    <tr role="row">
      <td>{service.name}</td>
      <td>{service.details}</td>
      <td>{service.seller_name}</td>
      <td>
        <Link to={`/buyer/services/view/${service.id}`}>
          <button className="btn btn-sm btn-outline-dark mr-1">View</button>
        </Link>   
      </td>
    </tr>
  );
}

export default ServicesTableRow;
