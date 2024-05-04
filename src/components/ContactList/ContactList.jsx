import { useSelector } from 'react-redux';
import Contact from '../Contact/Contact.jsx';
import { selectFilteredContacts } from '../../redux/contactsSlice.js';
import styles from './ContactList.module.css'; 

function ContactList() {
  const filteredContacts = useSelector(selectFilteredContacts); 

  return (
    <div className={styles.container}>
      {filteredContacts.map(contact => (
        <div key={contact.id} className={styles.contactContainer}>
          <Contact contact={contact} />
        </div>
      ))}
    </div>
  );
}

export default ContactList;