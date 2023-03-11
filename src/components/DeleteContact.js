import { Link, useLocation, useNavigate } from "react-router-dom";

const DeleteContact = (props) => {
  const navigate = useNavigate();
  const { state } = useLocation();

  const deleteContact = () => {
    props.removeContactHandler(state.id);

    navigate("/");
  };

  return (
    <div className="main">
      <div className="ui card centered">
        <h2>Are you sure you want to delete it?</h2>
        <div className="centered">
          <Link to={`/`}>
            <button className="ui button red">No I am not</button>
          </Link>
          <button className="ui button green" onClick={deleteContact}>
            Yes I am
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteContact;
