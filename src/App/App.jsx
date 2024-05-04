import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchContacts } from "../redux/contactsOps.js";
import ContactForm from "../components/ContactForm/ContactForm.jsx";
import SearchBox from "../components/SearchBox/SearchBox.jsx";
import ContactList from "../components/ContactList/ContactList.jsx";
import styles from "./App.module.css";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  return (
    <div className={styles.mainContainer}>
      <h1>Phonebook</h1>
      <ContactForm />
      <SearchBox />
      <ContactList />
    </div>
  );
}

export default App;