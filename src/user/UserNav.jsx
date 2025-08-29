import React, { useContext } from "react";
import { BookmarkContext } from "../context/BookmarkContext";

function UserNav() {
  const { logout, userData } = useContext(BookmarkContext);

  const logoutHandler = () => {
    logout();
  };
  return (
    <div className="flex justify-between bg-blue-400">
      <div className="flex p-1 justify-center items-center">
        <h1 className="text-white">
          {userData?.name || "username"}
        </h1>
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
