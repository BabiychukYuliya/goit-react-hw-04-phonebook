import { useState, useEffect } from 'react';
import ContactList from './Phonebook/Phonebook';
import Form from './ContactForm/ContactForm';
import Filter from './Filter/Filter';
import { nanoid } from 'nanoid';

const getInitialContacts = () => {
  const savedContacts = localStorage.getItem('contacts');
  if (savedContacts !== null) {
    const parsedContacts = JSON.parse(savedContacts);
    return parsedContacts;
  }
  return getInitialContacts;
};

export const App = () => {
  const [contacts, setContacts] = useState(getInitialContacts);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const handleFormSubmit = newContact => {
    newContact.id = nanoid();

    const duplicateName = contacts.find(
      contact => contact.name === newContact.name
    );

    if (duplicateName) {
      alert(`${newContact.name} is already in contacts.`);
    }

    setContacts(prevState => [...prevState, newContact]);
  };

  // Записує в state значення поля фільтрації
  const onChangeFilter = evt => {
    setFilter(evt.target.value);
    // console.log(evt.target.value);
  };

  // Фільтрує та повертає результат фільтру

  const visibleContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(filter.toLowerCase())
  );

  const deleteContact = contactId => {
    setContacts(prevState =>
      prevState.filter(contact => contact.id !== contactId)
    );
  };


  return (
    <div>
      <h1>Phonebook</h1>
      <Form onSubmit={handleFormSubmit} />
      <h2>Contacts</h2>
      <Filter value={filter} onChange={onChangeFilter} />
      <ContactList contacts={visibleContacts} onDeleteContact={deleteContact} />
    </div>
  );
};
