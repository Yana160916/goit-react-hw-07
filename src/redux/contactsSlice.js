import { createSelector, createSlice } from "@reduxjs/toolkit";

const selectContacts = (state) => state.contacts.items;
const selectFilter = (state) => state.filters.name;

export const selectFilteredContacts = createSelector(
  [selectContacts, selectFilter],
  (contacts, filter) =>
    contacts.filter((contact) =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    )
);

const contactsSlice = createSlice({
  name: "contacts",
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {
    addContact(state, action) {
      state.items.push(action.payload);
    },
    deleteContact(state, action) {
      state.items = state.items.filter(
        (contact) => contact.id !== action.payload
      );
    },
    setContactsLoading(state, action) {
      state.loading = action.payload;
    },
    setContactsError(state, action) {
      state.error = action.payload;
    },
  },
});

export const {
  addContact,
  deleteContact,
  setContactsLoading,
  setContactsError,
} = contactsSlice.actions;
export const contactsReducer = contactsSlice.reducer;
