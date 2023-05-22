import { configureStore } from "@reduxjs/toolkit";
import noteReducer from "./NoteReducer";

export const store = configureStore({
  reducer: {
    notes: noteReducer,
  },
});
