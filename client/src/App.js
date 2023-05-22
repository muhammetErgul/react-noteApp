import "./App.css";
//import ColorBtns from "./components/ColorBtns";
import Header from "./components/Header";
import ListNotes from "./components/ListNotes";
import SearchInput from "./components/SearchInput";
import Textarea from "./components/Textarea";

function App() {
  return (
    <div className=" flex flex-col justify-center items-center mx-auto px-4  h-screen bg-gray-800">
      <Header />
      <SearchInput />
      <Textarea />
      <ListNotes />
    </div>
  );
}

export default App;
