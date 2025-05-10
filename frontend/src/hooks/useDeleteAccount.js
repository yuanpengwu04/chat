import React, { useState } from "react";
import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";

const useDeleteAccount = () => {
  const [deleteLoading, setDeleteLoading] = useState(false);
  const { setAuthUser } = useAuthContext();

  const deleteAccount = async () => {
    setDeleteLoading(true);
    try {
      const res = await fetch(`/api/users/delete`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await res.json();
      console.log(data);

      if (data.error) {
        throw new Error(data.error);
      }

      localStorage.removeItem("userInfo");
      setAuthUser(null);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setDeleteLoading(false);
    }
  };
  return { deleteLoading, deleteAccount };
};

export default useDeleteAccount;
