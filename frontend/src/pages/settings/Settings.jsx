import React, { useState } from "react";
import Navbar from "../../components/navbar/Navbar";
import GenderCheckbox from "../signup/GenderCheckbox";
import FormInput from "../../components/form/FormInput";
import { useAuthContext } from "../../context/AuthContext";
import useUpdateAccount from "../../hooks/useUpdateAccount";
import toast from "react-hot-toast";
import useDeleteAccount from "../../hooks/useDeleteAccount";

const Settings = () => {
  const { authUser } = useAuthContext();
  const [inputs, setInputs] = useState({
    fullName: "",
    username: "",
    password: "",
    confirmPassword: "",
    gender: "",
    profilePic: "",
  });

  const { loading, updateAccount } = useUpdateAccount();
  const { deleteLoading, deleteAccount } = useDeleteAccount();

  function handleChange(event) {
    const { name, value } = event.target;
    setInputs((prev) => {
      return { ...prev, [name]: value };
    });
  }

  function handleCheckboxChange(value) {
    setInputs((prev) => {
      return { ...prev, gender: value };
    });
  }

  //const handleFileChange = (event) => {
  //  setInputs({ ...prev, profilePic: event.target.files[0] });
  //};

  const handleSubmit = async (event) => {
    event.preventDefault();
    await updateAccount(inputs);
    console.log("Update account requested:", inputs);
    toast.success("Your account has been updated.");
  };

  const handleDeleteAccount = async () => {
    if (
      window.confirm(
        "Are you sure you want to delete your account? This cannot be undone."
      )
    ) {
      await deleteAccount();
      //console.log("Account deleted");
    }
  };

  return (
    <div className="h-screen w-screen flex flex-col">
      <Navbar page="settings" />
      <div className="flex flex-col w-full items-center justify-center h-full w-full rounded-lg overflow-hidden bg-gray-400/10 bg-clip-padding backdrop-filter backdrop-blur-lg">
        <h1 className="text-4xl font-semibold text-center text-gray-300 brand-header">
          Update Your Account
        </h1>
        <form onSubmit={handleSubmit}>
          <div className="flex items-center gap-8">
            <FormInput
              field={`Username`}
              placeholder={authUser.username}
              optionalOrRequired={`Optional`}
              name="username"
              value={inputs.username}
              onChange={handleChange}
            />

            <FormInput
              field={`Full Name`}
              placeholder={authUser.fullName}
              optionalOrRequired={`Optional`}
              name="fullName"
              value={inputs.fullName}
              onChange={handleChange}
            />
          </div>

          <div className="flex items-center gap-8">
            <FormInput
              type="password"
              field={`Password`}
              placeholder={`New Password`}
              optionalOrRequired={`Optional`}
              name="password"
              value={inputs.password}
              onChange={handleChange}
            />

            <FormInput
              type="password"
              field={`Confirm Password`}
              placeholder={`Confirm New Password`}
              optionalOrRequired={`Optional`}
              name="confirmPassword"
              value={inputs.confirmPassword}
              onChange={handleChange}
            />
          </div>

          <div>
            <p className="fieldset fieldset-legend">Gender</p>
            <GenderCheckbox
              value={inputs.gender}
              onChange={handleCheckboxChange}
            />
            <p className="fieldset fieldset-label">Optional</p>
          </div>

          <div className="flex items-center justify-center w-full">
            <FormInput
              field={`Profile Picture URL`}
              placeholder={`Direct link to profile picture`}
              optionalOrRequired={`Optional`}
              name="profilePic"
              value={inputs.profilePic}
              onChange={handleChange}
            />
          </div>

          <div className="flex flex-col items-center">
            <button
              type="submit"
              disabled={loading}
              className="btn btn-primary w-1/2 bg-[#7676ce] hover:bg-[#8686de]"
            >
              {loading ? (
                <span class="loading loading-dots loading-sm"></span>
              ) : (
                "Update Account"
              )}
            </button>

            <button
              type="button"
              disabled={deleteLoading}
              onClick={handleDeleteAccount}
              className="btn btn-error w-1/2 mt-4 bg-red-500 hover:bg-red-600"
            >
              {deleteLoading ? (
                <span class="loading loading-dots loading-sm"></span>
              ) : (
                "Delete Account"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Settings;
