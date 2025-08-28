import React, { useContext } from "react";
import { BookmarkContext } from "../context/BookmarkContext";

function UserNav() {
  const { logout, userData } = useContext(BookmarkContext);
  
  
  const logoutHandler = () => {
    logout();
  };
  return (
    <div className="flex justify-center items-center bg-blue-400">
      <div className="flex gap-4 p-1 font-bold">
        <h1 className="text-white border rounded-md p-2 hover:bg-blue-600 shadow-xl">
          {userData?.name || "username"}
        </h1>
        <button
          onClick={logoutHandler}
          className="text-white border rounded-md p-2 hover:bg-blue-600 shadow-xl"
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default UserNav;
