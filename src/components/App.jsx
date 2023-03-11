import { useState, useEffect } from 'react';
import ContactList from './Phonebook/Phonebook';
import Form from './ContactForm/ContactForm';
import Filter from './Filter/Filter';
import { nanoid } from 'nanoid';

// const getInitialContacts = () => {
//   const savedContacts = localStorage.getItem('contacts');
//   if (savedContacts !== null) {
//     const parsedContacts = JSON.parse(savedContacts);
//     return parsedContacts;
//   }
//   return getInitialContacts;
// };
const mountContacts = localStorage.getItem('contacts');
const parseContacts = JSON.parse(mountContacts);

export const App = () => {
  const [contacts, setContacts] = useState(parseContacts || []);
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
      return;
    }

    setContacts(prevState => [...prevState, newContact]);
  };

  // Записує в state значення поля фільтрації
  const onChangeFilter = evt => {
    setFilter(evt.target.value);
    // console.log(evt.target.value);
  };

  // Фільтрує та повертає результат фільтру

  const filterContacts = (name) => {
            return contacts.filter(e =>
            e.name.toLowerCase().includes(name.toLowerCase())
            )
  };

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
      <ContactList contacts={filterContacts(filter)} onDeleteContact={deleteContact} />
    </div>
  );
};
