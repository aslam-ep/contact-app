import ContactCard from "./ContactCard";

const ContactList = (props) => {
  const removeContactCard = (id) => {
    props.removeContactHandler(id);
  };

  const renderContactList = props.contacts.map((contact) => {
    return <ContactCard contact={contact} clickHandler={removeContactCard} key={contact.id}/>;
  });

  return <div className="ui celled list">{renderContactList}</div>;
};

export default ContactList;
