import { useState, useEffect } from "react";
import { IoSearchSharp } from "react-icons/io5";
import useSearchUsers from "../../hooks/useSearchUsers";
import useConversation from "../../store/useConversation";
import { useAuthContext } from "../../context/AuthContext";
import toast from "react-hot-toast";

const SearchInput = () => {
  const [input, setInput] = useState(null);
  const { searchUsers, searchResults, loading } = useSearchUsers();
  const { setSelectedConversation } = useConversation();
  const { authUser } = useAuthContext();

  useEffect(() => {
    // Debounce search
    const timeoutId = setTimeout(() => {
      if (input.trim()) {
        searchUsers(input);
      }
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [input, searchUsers]);

  function handleChange(event) {
    const value = event.target.value;
    setInput(value);
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (input.trim()) {
      searchUsers(input);
    }
  }

  const handleUserClick = async (user) => {
    try {
      // If conversation already exists, use that ID
      const conversationId = user.conversationId;
      
      // Create a conversation object
      const conversation = {
        _id: conversationId || user._id, // Use existing conversation ID or user ID
        username: user.username,
        fullName: user.fullName,
        profilePic: user.profilePic,
        participants: [authUser._id, user._id]
      };
      

      
      
      
      // Set the selected conversation
      setSelectedConversation(conversation);
      
      // Clear search results and input
      setInput(null);
    } catch (error) {
      console.error("Error selecting user:", error);
      toast.error(error.message || "Failed to start conversation");
    }
  };

  return (
    <div className="relative">
      <form className="flex items-center gap-2" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Search by username..."
          className="input input-bordered rounded-full w-full"
          value={input}
          onChange={handleChange}
        />
        <button 
          type="submit" 
          className="btn btn-circle bg-sky-500 text-white"
          disabled={loading}
        >
          <IoSearchSharp className="w-6 h-6 outline-none" />
        </button>
      </form>
      
      {/* Display search results */}
      {!!input &&searchResults.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-lg max-h-60 overflow-y-auto z-50">
          {searchResults.map((user) => (
            <div
              key={user._id}
              className="p-3 hover:bg-gray-100 cursor-pointer flex items-center gap-3"
              onClick={() => {
                console.log(user);
                handleUserClick(user);
              }}
            >
              <div className="avatar">
                <div className="w-10 rounded-full">
                  <img src={user.profilePic || "/default-avatar.png"} alt={user.username} />
                </div>
              </div>
              <div>
                <p className="font-semibold">{user.username}</p>
                <p className="text-sm text-gray-500">{user.fullName}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchInput;
