import React from "react";
import MessageContainer from "../../components/messages/MessageContainer";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";

const Home = () => {
  return (
  <div className="h-screen w-screen flex flex-col">
    <Navbar page="home" />
    <div className="flex justify-center h-full w-full rounded-lg overflow-hidden bg-gray-400/10 bg-clip-padding backdrop-filter backdrop-blur-lg">
      <Sidebar />
      <MessageContainer />
    </div>
  </div>
  );
};
export default Home;
