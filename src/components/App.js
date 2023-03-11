import React, { useState, useEffect } from "react";
import { v4 as uuid } from "uuid";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "./App.css";
import Header from "./Header";
import AddContact from "./AddContact";
import ContactList from "./ContactList";
import ContactDetails from "./ContactDetail";
import DeleteContact from "./DeleteContact";

function App() {
  const LOCAL_STORAGE_KEY = "contacts";

  const [contacts, setContacts] = useState([]);

  const addContactHandler = (contact) => {
    setContacts([...contacts, { id: uuid(), ...contact }]);
  };

  const removeContactHandler = (id) => {
    const newContactList = contacts.filter((contact) => {
      return contact.id != id;
    });

    setContacts(newContactList);
  };

  useEffect(() => {
    const retrivedContacts = JSON.parse(
      localStorage.getItem(LOCAL_STORAGE_KEY)
    );
    if (retrivedContacts.length) {
      setContacts(retrivedContacts);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(contacts));
  }, [contacts]);

  return (
    <div className="ui container">
      <Router>
        <Header />
        <div className="container" style={{ marginTop: "50px" }}>
          <Routes>
            <Route
              path="/"
              exact
              element={<ContactList contacts={contacts} />}
            />

            <Route
              path="/add"
              exact
              element={<AddContact addContactHandler={addContactHandler} />}
            />

            <Route path="/contact/:id" exact element={<ContactDetails />} />

            <Route
              path="/delete-contact/:id"
              exact
              element={
                <DeleteContact removeContactHandler={removeContactHandler} />
              }
            />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
