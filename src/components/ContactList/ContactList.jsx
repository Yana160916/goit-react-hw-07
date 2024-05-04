import { useSelector } from 'react-redux';
import Contact from '../Contact/Contact.jsx';
import { selectFilteredContacts } from '../../redux/contactsSlice.js';
import { selectNameFilter } from '../../redux/filtersSlice.js'; 
import styles from './ContactList.module.css'; 

function ContactList() {
  const filteredContacts = useSelector(selectFilteredContacts); 
  const nameFilter = useSelector(selectNameFilter); 

  const filteredByName = filteredContacts.filter(contact =>
    contact.name.toLowerCase().includes(nameFilter.toLowerCase())
  );

  return (
    <div className={styles.container}>
      {filteredByName.map(contact => (
        <div key={contact.id} className={styles.contactContainer}>
          <Contact contact={contact} />
        </div>
      ))}
    </div>
  );
}

export default ContactList; 