import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const EditContact = (props) => {
  const navigate = useNavigate();
  const [id, setID] = useState();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const {state} = useLocation();

  useEffect(() => {
    const {id, name, email} = state.contact;

    setName(name);
    setEmail(email);
    setID(id);
  }, []);

  const editContact = (e) => {
    e.preventDefault();
    if (!name.trim().length || !email.trim().length) {
        alert("All fileds are required");
        return;
    }
    
    props.updateContactHandler({
        id: id,
        name: name, 
        email: email
    });

    navigate('/');
  };

  return (
    <div className="ui main">
      <h2>Edit Contact</h2>
      <form className="ui form" onSubmit={editContact}>
        <div className="field">
          <label>Name</label>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="field">
          <label>Email</label>
          <input
            type="text"
            name="name"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <button className="ui button blue">Update</button>
      </form>
    </div>
  );
};

export default EditContact;
