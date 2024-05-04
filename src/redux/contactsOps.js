import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import {
  setContactsLoading,
  setContactsError,
} from "../redux/contactsSlice.js";

const API_URL = "https://6635f12c415f4e1a5e25c4e7.mockapi.io/contacts";

export const fetchContacts = createAsyncThunk(
  "contacts/fetchAll",
  async (_, thunkAPI) => {
    thunkAPI.dispatch(setContactsLoading(true));
    try {
      const response = await axios.get(API_URL);
      return response.data;
    } catch (error) {
      thunkAPI.dispatch(setContactsError(error.message));
      return thunkAPI.rejectWithValue(error.message);
    } finally {
      thunkAPI.dispatch(setContactsLoading(false));
    }
  }
);

export const addContact = createAsyncThunk(
  "contacts/addContact",
  async (contactData, thunkAPI) => {
    try {
      const response = await axios.post(API_URL, contactData);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const deleteContact = createAsyncThunk(
  "contacts/deleteContact",
  async (contactId, thunkAPI) => {
    try {
      await axios.delete(`${API_URL}/${contactId}`);
      return contactId;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
