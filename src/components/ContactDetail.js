import user from "../images/user.png";
import { Link, useLocation } from "react-router-dom";

const ContactDetails = (props) => {
  const { state } = useLocation();
  const {name, email} = state.contact;
  return (
    <div className="main">
      <div className="ui card centered">
        <div className="image">
          <img src={user} alt="user" />
        </div>
        <div className="content">
          <div className="header">{name}</div>
          <div className="description">{email}</div>
        </div>
      </div>
      <div className="center-div">
        <Link to="/">
            <button className="ui button blue center">Back to contact List</button>
        </Link>
      </div>
    </div>
  );
};

export default ContactDetails;
