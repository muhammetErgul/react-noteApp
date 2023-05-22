import React, { useEffect, useState } from "react";
import { searchNote } from "../redux/NoteReducer";
import { useDispatch } from "react-redux";

function SearchInput() {
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(searchNote(search.toLocaleLowerCase()));
  }, [dispatch, search]);
  return (
    <div>
      <input
        type="text"
        className=" mb-3 mt-3 text-xl p-2 rounded-full py-3 px-10 input"
        placeholder="Search..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
    </div>
  );
}

export default SearchInput;
