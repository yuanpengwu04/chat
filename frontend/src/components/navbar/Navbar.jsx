import React from "react";
import LogoutButton from "./LogoutButton";
import { FaCog } from "react-icons/fa";
import { FaArrowLeft } from "react-icons/fa";

const Navbar = ({ page }) => {
  return (
    <div className="bg-[#9696ee] text-white flex items-center justify-between px-6 py-3">
      <div className="brand-header text-4xl font-bold">Mirth</div>
	  <div className="flex items-center gap-4">
      {page === "home" ? (
        <button
          className="btn btn-circle bg-[#7676ce] hover:bg-[#8686de]"
          onClick={() => {
            window.location.href = "/settings";
          }}
        >
          <FaCog className="w-5 h-5 text-white" />
        </button>
      ) : (
        <button
          className="btn btn-circle bg-[#7676ce] hover:bg-[#8686de]"
          onClick={() => {
            window.location.href = "/";
          }}
        >
          <FaArrowLeft className="w-5 h-5 text-white" />
        </button>
      )}
	  <LogoutButton />
	  </div>
    </div>
  );
};

export default Navbar;