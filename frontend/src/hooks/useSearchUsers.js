import { useState, useCallback } from "react";
import toast from "react-hot-toast";

const useSearchUsers = () => {
  const [loading, setLoading] = useState(false);
  const [searchResults, setSearchResults] = useState([]);

  const searchUsers = useCallback(async (searchTerm) => {
    if (!searchTerm.trim()) {
      setSearchResults([]);
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(
        `/api/search/users?searchTerm=${encodeURIComponent(searchTerm.trim())}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );

      if (!res.ok) {
        throw new Error("Failed to fetch search results");
      }

      const data = await res.json();

      if (data.error) {
        throw new Error(data.error);
      }

      setSearchResults(data);
    } catch (error) {
      console.error("Search error:", error);
      toast.error(error.message || "Failed to search users");
      setSearchResults([]);
    } finally {
      setLoading(false);
    }
  }, []);

  return { loading, searchResults, searchUsers };
};

export default useSearchUsers;
