import { useState } from "react";
import { IoSearchSharp } from "react-icons/io5";

const SearchInput = ({ onSearch }) => {
  const [input, setInput] = useState("");

  function handleChange(event) {
    const value = event.target.value;
    setInput(value);
  }

  function handleSubmit(event) {
    event.preventDefault();
    onSearch(input);
  }

  return (
    <form className="flex items-center gap-2" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Search…"
        className="input input-bordered rounded-full"
        value={input}
        onChange={handleChange}
      />
      <button type="submit" className="btn btn-circle bg-sky-500 text-white">
        <IoSearchSharp className="w-6 h-6 outline-none" />
      </button>
    </form>
  );
};
export default SearchInput;
