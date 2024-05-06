import { useDispatch } from 'react-redux'; 
import PropTypes from 'prop-types';
import styles from '../Contact/Contact.module.css'
import { FaUser, FaPhone } from 'react-icons/fa6'; 
import { deleteContact } from '../../redux/contactsOps.js';

function Contact({ contact }) {
  const dispatch = useDispatch(); 

  const onDeleteClick = () => {
  dispatch(deleteContact(contact.id));
};

  return (
    <div className={styles.contactContainerClass}> 
      <li>
        <p className={styles.paragraphClass}>
          <FaUser className={styles.icon} /> 
          {contact.name}
        </p>
        <p className={styles.paragraphClass}>
          <FaPhone className={styles.icon} /> {contact.number}
        </p>
      </li>
      <button className={styles.deleteButtonClass} onClick={onDeleteClick}>Delete</button>
    </div>
  );
}

Contact.propTypes = {
  contact: PropTypes.object.isRequired,
};

export default Contact;

