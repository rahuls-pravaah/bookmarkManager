import React, { useContext } from "react";
import { BookmarkContext } from "../context/BookmarkContext";
import { useNavigate } from "react-router-dom";

function UserNav() {
  const { logout, userData } = useContext(BookmarkContext);
  const navigate = useNavigate();

  const logoutHandler = () => {
    logout();
  };

  const handleListOfBugs = () => {
    navigate("/list-of-bugs");
  };

  const navigateDashboardHandle = () => {
    navigate("/dashboard");
  }

  return (
    <div className="sticky top-0 z-50 flex justify-between bg-blue-400">
      <div className="flex p-1 justify-center items-center gap-4">
        <h1 className="text-white hover:cursor-pointer" onClick={navigateDashboardHandle}>
          {userData?.name || "username"}
        </h1>
        <button
          onClick={handleListOfBugs}
          className="text-white hover:cursor-pointer"
        >
          See Bugs
        </button>
      </div>
      <div className="flex p-1 font-bold">
        <button
          onClick={logoutHandler}
          className="text-white border rounded-md p-2 hover:bg-blue-600 hover:cursor-pointer shadow-xl"
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default UserNav;
