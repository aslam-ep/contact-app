import React, { useState, useEffect } from "react";
import { v4 as uuid } from "uuid";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import api from "../api/contacts";
import "./App.css";
import Header from "./Header";
import AddContact from "./AddContact";
import ContactList from "./ContactList";
import ContactDetails from "./ContactDetail";
import DeleteContact from "./DeleteContact";
import EditContact from "./EditContact";

function App() {
  const LOCAL_STORAGE_KEY = "contacts";

  const [contacts, setContacts] = useState([]);

  // Retriver contacts
  const retriveContacts = async () => {
    const response = await api.get("/contacts");
    return response.data;
  };

  const addContactHandler = async (contact) => {
    const request = {
      id: uuid(),
      ...contact,
    };

    const response = await api.post("/contacts", request);

    setContacts([...contacts, response.data]);
  };

  const updateContactHandler = async (contact) => {
    const response = await api.put(`/contacts/${contact.id}`, contact);
    const { id, name, email } = response.data;
    setContacts(
      contacts.map((contact) => {
        return contact.id === id
          ? {
              ...response.data,
            }
          : contact;
      })
    );
  };

  const removeContactHandler = async (id) => {
    await api.delete(`/contacts/${id}`);

    const newContactList = contacts.filter((contact) => {
      return contact.id != id;
    });

    setContacts(newContactList);
  };

  useEffect(() => {
    // const retrivedContacts = JSON.parse(
    //   localStorage.getItem(LOCAL_STORAGE_KEY)
    // );
    // if (retrivedContacts.length) {
    //   setContacts(retrivedContacts);
    // }

    const getAllContacts = async () => {
      const allContacts = await retriveContacts();
      if (allContacts) {
        setContacts(allContacts);
      }
    };

    getAllContacts();
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
            <Route path="/" element={<ContactList contacts={contacts} />} />

            <Route
              path="/add"
              element={<AddContact addContactHandler={addContactHandler} />}
            />

            <Route
              path="/edit/:id"
              element={
                <EditContact updateContactHandler={updateContactHandler} />
              }
            />

            <Route path="/contact/:id" element={<ContactDetails />} />

            <Route
              path="/delete-contact/:id"
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
