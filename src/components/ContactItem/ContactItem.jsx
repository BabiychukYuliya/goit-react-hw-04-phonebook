import { Contact } from './ContactItem.styled';

const ContactItem = ({ contact, onDeleteContact }) => {
  return (
    <Contact>
      <p>{contact.name}</p>
      <p>{contact.number}</p>
      <button type="button" onClick={() => onDeleteContact(contact.id)}>
        Delete
      </button>
    </Contact>
  );
};

export default ContactItem;
