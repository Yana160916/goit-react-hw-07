import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { createSelector } from "reselect";

const API_URL = "https://6635f12c415f4e1a5e25c4e7.mockapi.io/contacts";

export const deleteContact = createAsyncThunk(
  "contacts/deleteContact",
  async (contactId, { rejectWithValue }) => {
    try {
      await axios.delete(`${API_URL}/${contactId}`);
      return contactId;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchContacts = createAsyncThunk(
  "contacts/fetchAll",
  async (_, { dispatch, rejectWithValue }) => {
    dispatch(setContactsLoading(true));
    try {
      const response = await axios.get(API_URL);
      return response.data;
    } catch (error) {
      dispatch(setContactsError(error.message));
      return rejectWithValue(error.message);
    } finally {
      dispatch(setContactsLoading(false));
    }
  }
);

export const addContact = createAsyncThunk(
  "contacts/addContact",
  async (contactData, { rejectWithValue }) => {
    try {
      const response = await axios.post(API_URL, contactData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

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
    setContactsLoading(state, action) {
      state.loading = action.payload;
    },
    setContactsError(state, action) {
      state.error = action.payload;
    },

    deleteContact(state, action) {
      state.items = state.items.filter(
        (contact) => contact.id !== action.payload
      );
    },
  },
  extraReducers: (builder) => {
    builder

      .addCase(deleteContact.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteContact.fulfilled, (state, action) => {
        state.loading = false;
        state.items = state.items.filter(
          (contact) => contact.id !== action.payload
        );
      })
      .addCase(deleteContact.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(fetchContacts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchContacts.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchContacts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setContactsLoading, setContactsError } = contactsSlice.actions;
export const contactsReducer = contactsSlice.reducer;
