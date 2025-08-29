import React, {useEffect, useContext} from "react";
import Navbar from "./Navbar";
import { NavLink } from "react-router-dom";
import { BookmarkContext } from "../context/BookmarkContext";
import { useNavigate } from "react-router-dom";

function Home() {
  const {user, loading} = useContext(BookmarkContext);
  const navigate = useNavigate();
  useEffect(()=>{
    if(user && !loading) navigate("/dashboard")
    else navigate('/')
  },[user, loading])
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4 py-10">
      <div className="max-w-3xl w-full bg-white shadow-lg rounded-lg p-8">
        {/* Title */}
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          Welcome to Bookmark Manager
        </h1>

        {/* What is this */}
        <p className="text-gray-700 mb-6">
          Bookmark Manager is a simple web application that helps you save,
          organize, and manage your favorite website links in one place. Instead
          of relying on your browser's built-in bookmark tool, this app gives
          you more control and a cleaner interface to manage your web resources.
        </p>

        {/* How to use */}
        <h2 className="text-xl font-semibold text-gray-800 mb-2">How to Use</h2>
        <p className="text-gray-700 mb-6">
          To get started, click the <NavLink to="/signup" className="text-blue-700 hover:cursor-pointer"><strong>Create an account</strong></NavLink>.
          You’ll be able to add new bookmarks by entering a website name and its
          URL. Once added, you can view your bookmarks, open them in a new tab,
          or remove them if no longer needed.
        </p>

        {/* Features */}
        <h2 className="text-xl font-semibold text-gray-800 mb-2">Features</h2>
        <ul className="flex flex-col justify-start items-start list-disc list-inside text-gray-700 mb-8">
          <li>Add and store website bookmarks</li>
          <li>View all saved links in one place</li>
          <li>Delete bookmarks you no longer need</li>
          <li>Clean and user-friendly interface</li>
          <li>Fast and responsive design with Tailwind CSS</li>
        </ul>
      </div>
    </div>
  );
}

export default Home;
