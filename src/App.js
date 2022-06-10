import React, { useState, Fragment , useEffect } from "react";
import "./App.css";

import EditableRow from "./components/EditableRow";
import { nanoid } from "nanoid";
import ReadOnlyRow from "./components/ReadonlyRow";
const App = () => {
  const [contacts, setContacts] = useState([]);
  const [addFormData, setAddFormData] = useState({
    fullName: "",
    address: "",
    phoneNumber: "",
    email: "",
  });
  useEffect(() => {
    const json = localStorage.getItem("contacts");
    const loadedContacts = JSON.parse(json);
    if (loadedContacts) {
      setContacts(loadedContacts);
    }
  }, []);
  useEffect(() => {
    const json = JSON.stringify(contacts);
    localStorage.setItem("contacts", json);
  }, [contacts]);

  const [editFormData, setEditFormData] = useState({
    fullName: "",
    address: "", 
    phoneNumber: "",
    email: "",
  });
  const [editContactId, setEditContactId] = useState(null);

  const handleAddFormChange = (event) => {
    event.preventDefault();
    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value;
    const newFormData = {...addFormData };
    newFormData[fieldName] = fieldValue;
    setAddFormData(newFormData);

  
  };

  const handleAddContactFormSubmit = (event) => {
    event.preventDefault();

    const newContact = {
      id: nanoid(),
      fullName: addFormData.fullName,
      address: addFormData.address,
      phoneNumber: addFormData.phoneNumber,
      email: addFormData.email,

      
    };

    const newContacts = [...contacts, newContact];
    setContacts(newContacts);

    
  };

  const handleEditFormChange = (event) => {
    event.preventDefault();
    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value;
    const newFormData = { ...editFormData };
    newFormData[fieldName] = fieldValue;
    setEditFormData(newFormData);
  };
  const handleEditContactFormSubmit = (event) => {
    event.preventDefault();

    const editedContact = {
      id: editContactId,
      fullName: editFormData.fullName,
      address: editFormData.address,
      phoneNumber: editFormData.phoneNumber,
      email: editFormData.email,
    };
    const newContacts = [...contacts];
    const index = contacts.findIndex((contact) => contact.id === editContactId);
    newContacts[index] = editedContact; 
    setContacts(newContacts);
    setEditContactId(null);


    
  };

  const handleEditClick = (event, contact) => {
    event.preventDefault();setEditContactId(contact.id);

    const formValues = {
      fullName: contact.fullName,
      address: contact.address,
      phoneNumber: contact.phoneNumber,
      email: contact.email,
    };

    setEditFormData(formValues);
  };

  const handleCancelClick = () => {
    setEditContactId(null);
  };

  const handleDeleteClick = (contactId) => {
    const newContacts = [...contacts];
    const index = contacts.findIndex((contact) => contact.id === contactId);
    newContacts.splice(index, 1);
    setContacts(newContacts);
  };
  return (
    <div className="app-container">
    <form onSubmit={handleEditContactFormSubmit}>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Address</th>
              <th>Phone Number</th>
              <th>Email</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
          {contacts.map((contact) => (
              <Fragment key={contact.id}>
                {editContactId === contact.id ? (
                  <EditableRow
                    editFormData={editFormData}
                    handleEditFormChange={handleEditFormChange}
                    handleCancelClick={handleCancelClick}
                  />
                ) : (
                  <ReadOnlyRow
                    contact={contact}
                    handleEditClick={handleEditClick}
                    handleDeleteClick={handleDeleteClick}
                  ></ReadOnlyRow>
                )}
                </Fragment>
            ))}
          </tbody>
        </table>
      </form>
      <h2>Add New Contact</h2>
      <form onSubmit={handleAddContactFormSubmit}>
        <input
          type="text"
          name="fullName"
          
          placeholder="Enter a name..."
          onChange={handleAddFormChange}
        />
        <input
          type="text"
          name="address"
          
          placeholder="Enter an address..."
          onChange={handleAddFormChange}
        />
        <input
          type="number"name="phoneNumber"
          
          placeholder="Enter a phone number..."
          onChange={handleAddFormChange}
        />
        <input
          type="email"
          name="email"
          
          placeholder="Enter an email..."
          onChange={handleAddFormChange}
        />
        <button type="submit">Add</button>
        <button className="btn btn-danger btn-md" onClick={()=> setContacts([])}>Remove all</button>
      </form>
    </div>
  );
};
export default App;
