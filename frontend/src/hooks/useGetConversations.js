import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";

const useGetConversations = () => {
  const [loading, setLoading] = useState(false);
  const [conversations, setConversations] = useState([]);
  const { authUser } = useAuthContext();

  useEffect(() => {
    const getConversations = async () => {
      if (!authUser) return;

      setLoading(true);
      try {
        const res = await fetch(`/api/conversations/${authUser._id}`, {
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include", // This ensures cookies are sent with the request
        });
        const data = await res.json();

        if (data.error) {
          throw new Error(data.error);
        }
        setConversations(data);
      } catch (error) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };
    getConversations();
  }, [authUser]); // Add authUser as a dependency

  return { loading, conversations };
};

export default useGetConversations;
