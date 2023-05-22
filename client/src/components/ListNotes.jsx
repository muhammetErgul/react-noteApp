import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  filtered,
  getNotesAsync,
  deleteNoteAsync,
  onClickNote,
} from "../redux/NoteReducer";
import DisabledByDefaultIcon from "@mui/icons-material/DisabledByDefault";
import EditIcon from "@mui/icons-material/Edit";
import EditScreen from "./EditScreen";

function ListNotes() {
  const filteredNote = useSelector(filtered);
  const dispatch = useDispatch();
  const [edit, setEdit] = useState(false);

  useEffect(() => {
    dispatch(getNotesAsync());
  }, [dispatch]);

  const noteSubmit = (note) => {
    dispatch(onClickNote(note));
    setEdit(true);
  };

  return (
    <div className="listNote">
      <ul className="flex flex-wrap m-2 pl-2">
        {filteredNote?.map((note) => (
          <li
            key={note.id}
            className="note"
            style={{ backgroundColor: note.color }}
            onClick={() => noteSubmit(note)}
          >
            {note.value}
            <div className="btns">
              <button
                className="deleteBtn"
                onClick={() => dispatch(deleteNoteAsync(note.id))}
              >
                <DisabledByDefaultIcon fontSize="" />
              </button>
              <button className="editBtn">
                <EditIcon />
              </button>
            </div>
          </li>
        ))}
      </ul>
      {edit && <EditScreen edit={edit} setEdit={setEdit} />}
    </div>
  );
}

export default ListNotes;
