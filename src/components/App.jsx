import { Component } from 'react';
import ContactList from './Phonebook/Phonebook';
import { Form } from './ContactForm/ContactForm';
import Filter from './Filter/Filter';
import { nanoid } from 'nanoid';

export class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  componentDidMount() {
    const savedContacts = localStorage.getItem('contacts');
    const parsedContacts = JSON.parse(savedContacts);
    if (parsedContacts) {
      this.setState({ contacts: parsedContacts });
      return;
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.contacts !== prevState.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }



  handleFormSubmit = newContact => {
    newContact.id = nanoid();

    const duplicateName = this.state.contacts.find(
      contact => contact.name === newContact.name
    );

    if (duplicateName) {
      alert(`${newContact.name} is already in contacts.`);
    }

    this.setState(prevState => ({
      contacts: [...prevState.contacts, newContact],
    }));
  };

  // Записує в state значення поля фільтрації
  onChangeFilter = evt => {
    this.setState({ filter: evt.target.value });
    // console.log(evt.target.value);
  };

  // Фільтрує та повертає результат фільтру

  filterContacts = () => {
    const { contacts, filter } = this.state;

    const normalizedFilter = filter.toLowerCase();

    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  deleteContact = contactId => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== contactId),
    }));
  };

  render() {
    const filteredResults = this.filterContacts();
    return (
      <div>
        <h1>Phonebook</h1>
        <Form onSubmit={this.handleFormSubmit} />
        <h2>Contacts</h2>
        <Filter value={this.state.filter} onChange={this.onChangeFilter} />
        <ContactList
          contacts={filteredResults}
          onDeleteContact={this.deleteContact}
        />
      </div>
    );
  }
}
