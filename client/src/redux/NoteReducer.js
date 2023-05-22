import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const localHost = process.env.REACT_APP_LOCAL_HOST;

export const getLocalStorage = () => {
  const notes = localStorage.getItem("notes");
  return notes ? JSON.parse(notes) : [];
};
export const setLocalStorage = (notes) => {
  localStorage.setItem("notes", JSON.stringify(notes));
};

export const getNotesAsync = createAsyncThunk(
  "notes/getNotesAsync",
  async () => {
    const res = await axios(`${localHost}/notes`);
    return res.data;
  }
);
export const addNoteAsync = createAsyncThunk(
  "notes/addNoteAsync",
  async (data) => {
    const res = await axios.post(`${localHost}/notes`, data);
    return res.data;
  }
);
export const deleteNoteAsync = createAsyncThunk(
  "notes/deleteNoteAsync",
  async (id) => {
    await axios.delete(`${localHost}/notes/${id}`);
    return id;
  }
);
export const editNoteAsync = createAsyncThunk(
  "notes/editNoteAsync",
  async (data) => {
    const res = await axios.put(`${localHost}/notes/${data.id}`, data);
    return res.data;
  }
);

export const noteSlice = createSlice({
  name: "note",
  initialState: {
    notes: [...getLocalStorage()],
    search: "",
    currentNote: [],
  },

  reducers: {
    searchNote: (state, actions) => {
      state.search = actions.payload;
    },
    onClickNote: (state, actions) => {
      state.currentNote = actions.payload;
    },
  },
  extraReducers(builder) {
    builder.addCase(getNotesAsync.fulfilled, (state, actions) => {
      state.notes = actions.payload;
    });
    builder.addCase(addNoteAsync.fulfilled, (state, actions) => {
      const item = state.notes.find(
        (note) => note.value === actions.payload.value
      );
      if (item) {
        return console.log("aynisindan var kardeş");
      } else {
        state.notes.push(actions.payload);
        setLocalStorage(state.notes);
      }
    });
    builder.addCase(deleteNoteAsync.fulfilled, (state, actions) => {
      const id = actions.payload;
      state.notes = state.notes.filter((note) => note.id !== id);
      setLocalStorage(state.notes);
    });

    builder.addCase(editNoteAsync.fulfilled, (state, action) => {
      state.notes.find((item) =>
        item.id === state.currentNote.id
          ? (item.value = action.payload.value)
          : ""
      );
      setLocalStorage(state.notes);
    });
  },
});

export const filtered = (state) => {
  return state.notes.notes.filter((item) =>
    item.value.toLocaleLowerCase().includes(state.notes.search)
  );
};

export const { addNote, searchNote, onClickNote } = noteSlice.actions;

export default noteSlice.reducer;
