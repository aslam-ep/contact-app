import ContactCard from "./ContactCard";
import { Link } from "react-router-dom";
import { useRef } from "react";

const ContactList = (props) => {
  const inputEle = useRef('');

  const renderContactList = props.contacts.map((contact) => {
    return <ContactCard contact={contact} key={contact.id} />;
  });

  const getSearchTerm = () => {
    props.searchKeyword(inputEle.current.value);
  };

  return (
    <div className="ui celled list">
      <h2>
        Contact List
        <Link to="/add">
          <button className="ui button blue" style={{ float: "right" }}>
            Add Contact
          </button>
        </Link>
      </h2>
      <div className="ui search">
        <div
          className="ui icon input"
          style={{ width: "100%", margin: "15px 0" }}
        >
          <input type="text" placeholder="Search contacts" className="prompt" ref={inputEle} value={props.term} onChange={getSearchTerm}/>
          <i className="search icon"></i>
        </div>
      </div>
      {renderContactList.length ? renderContactList : "No contacts available"}
    </div>
  );
};

export default ContactList;
