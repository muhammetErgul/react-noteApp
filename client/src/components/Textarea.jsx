import { useState } from "react";
import { nanoid } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import { addNoteAsync } from "../redux/NoteReducer";

function Textarea() {
  const [note, setNote] = useState("");
  const [color, setColor] = useState("purple");
  const dispatch = useDispatch();
  const colors = ["red", "blue", "brown", "green", "gray"];

  const hanldeSubmit = async (e) => {
    e.preventDefault();
    if (note === "") return;
    await dispatch(addNoteAsync({ value: note, color: color }));
    setNote("");
  };
  return (
    <div>
      <form onSubmit={hanldeSubmit} className="form">
        <textarea
          placeholder="Enter your note here"
          className="textArea "
          value={note}
          onChange={(e) => setNote(e.target.value)}
        ></textarea>
        <div className="flex btnAndColors">
          <div className="colors flex m-2 pl-2">
            {colors.map((color) => (
              <button
                key={nanoid()}
                className="colorBox"
                value={color}
                type="button"
                style={{ backgroundColor: color, cursor: "pointer" }}
                onClick={(e) => setColor(e.target.value)}
              ></button>
            ))}
          </div>
          <button type="submit" className="bg-green-600 btn">
            Add
          </button>
        </div>
      </form>
    </div>
  );
}

export default Textarea;
