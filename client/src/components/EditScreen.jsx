import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { editNoteAsync } from "../redux/NoteReducer";
function EditScreen({ edit, setEdit }) {
  const dispatch = useDispatch();
  const item = useSelector((state) => state.notes.currentNote);
  const [editNote, setEditNote] = useState(item.value);

  const saveSubmit = async () => {
    await dispatch(editNoteAsync({ value: editNote, id: item.id }));
    setEdit(!edit);
  };

  return (
    <div className="editContainer">
      <div className="editContent">
        <div className="header">
          <h2>Note Edit</h2>
          <button className="closeBtn" onClick={() => setEdit(false)}>
            X
          </button>
        </div>
        <div className="editBody">
          <textarea
            className="editText"
            value={editNote}
            onChange={(e) => setEditNote(e.target.value)}
          ></textarea>
        </div>
        <div className="subBtn">
          <button className="editSaveBtn" onClick={() => saveSubmit()}>
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

export default EditScreen;
