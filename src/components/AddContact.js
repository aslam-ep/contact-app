import { useState } from "react";

const AddContact = (props) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const addContact = (e) => {
    e.preventDefault();
    if (!name.trim().length || !email.trim().length) {
        alert("All fileds are required");
        return;
    }
    
    props.addContactHandler({
        name: name, 
        email: email
    });

    setName('');
    setEmail('');
  };

  return (
    <div className="ui main">
      <h2>Add Contact</h2>
      <form className="ui form" onSubmit={addContact}>
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
        <button className="ui button blue">Add</button>
      </form>
    </div>
  );
};

export default AddContact;
