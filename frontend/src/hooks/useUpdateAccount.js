import React, { useState } from "react";
import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";

const useUpdateAccount = () => {
  const [loading, setLoading] = useState();
  const { setAuthUser } = useAuthContext();

  const updateAccount = async ({
    username,
    fullName,
    password,
    confirmPassword,
    gender,
	profilePic,
  }) => {
    const success = handleInputError({
      fullName,
      username,
      password,
      confirmPassword,
      gender,
	  profilePic,
    });
    if (!success) return;

    setLoading(true);
    try {
      const res = await fetch(`/api/users/update`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fullName,
          username,
          password,
          confirmPassword,
          gender,
		  profilePic,
        }),
      });

      const data = await res.json();
      //console.log(data);

      if (data.error) {
        throw new Error(data.error);
      }

      localStorage.setItem("userInfo", JSON.stringify(data));
      setAuthUser(data);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };
  return { loading, updateAccount };
};

export default useUpdateAccount;

const handleInputError = ({
  fullName,
  username,
  password,
  confirmPassword,
  gender,
  profilePic,
}) => {
  if (fullName && username && password && confirmPassword && gender) {
    toast.error("No fields are filled");
    return false;
  }

  if (password !== confirmPassword) {
    toast.error("Passwords do not match");
    return false;
  }

  if (password && password.length < 6) {
    toast.error("Password must be at least 6 characters");
    return false;
  }

  return true;
};
