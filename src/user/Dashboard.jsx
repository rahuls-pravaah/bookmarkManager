import React, { useState, useEffect, useContext } from "react";
import { BookmarkContext } from "../context/BookmarkContext";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const {
    user,
    addBookmark,
    bookmark,
    deleteBookmarkHandler,
    editBookmarHandler,
    openModal,
  } = useContext(BookmarkContext);
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [myBookmark, setMyBookmark] = useState([]);
  const [isEditButtonClicked, setIsEditButtonClicked] = useState(false);
  const [editId, setEditId] = useState("");

  const addBookmarkHandler = (event) => {
    event.preventDefault();
    setError("");
    setMessage("");
    if (!title || !url) {
      setError("Please enter both a title and a url");
      return;
    }
    if (!isValidUrl(url)) {
      setError("Enter valid url");
      return;
    }
    const response = addBookmark(title, url);
    response
      .then((data) => {
        setMessage(data.message);
        setTimeout(() => {
          setMessage("");
        }, 5000);
      })
      .catch((error) => {
        setError(error);
        setTimeout(() => {
          setError("");
        }, 5000);
      });
    setTitle("");
    setUrl("");
  };

  const editHandler = (id, title, url) => {
    setIsEditButtonClicked(true);
    setTitle(title);
    setUrl(url);
    setEditId(id);
  };

  const isValidUrl = (urlString) => {
    try {
      return Boolean(new URL(urlString));
    } catch (e) {
      return false;
    }
  };

  const handleOpenConfirm = (id, title) => {
    openModal(
      <div>
        <h2 className="text-xl font-bold">Confirm Action</h2>
        <p className="mt-2">Are you sure you want to delete this bookamrk?</p>
        <p className="mt-2 text-blue-600 font-bold">{title}</p>
        <div className="flex justify-center items-center gap-10 mt-4 ">
          <button
            onClick={() => {
              deleteBookmarkHandler(id);
              openModal(null);
            }}
            className="p-2 hover:bg-red-600 text-red-600 hover:text-white font-bold border rounded-lg hover:cursor-pointer"
          >
            Yes
          </button>
          <button
            onClick={() => openModal(null)}
            className="p-2 hover:bg-blue-600 text-blue-600 hover:text-white font-bold border rounded-lg hover:cursor-pointer"
          >
            Cancel
          </button>
        </div>
      </div>
    );
  };

  useEffect(() => {
    if (!user) navigate("/login");
    function loadBookmark() {
      setMyBookmark(bookmark);
    }
    loadBookmark();
  }, [user, bookmark]);

  return (
    <div className="flex flex-col w-full mt-5">
      <form onSubmit={addBookmarkHandler}>
        <div className="flex justify-start items-start">
          <div className="flex flex-col md:flex-row gap-2 w-full md:w-auto">
            <input
              type="text"
              value={title}
              placeholder="Title"
              required
              onChange={(event) => setTitle(event.target.value)}
              className="border p-1 rounded outline-none "
            />
            <input
              type="url"
              value={url}
              placeholder="URL"
              required
              onChange={(event) => setUrl(event.target.value)}
              className="border p-1 rounded outline-none"
            />
            {isEditButtonClicked ? (
              <>
                <button
                  type="button"
                  onClick={() => {
                    editBookmarHandler(editId, title, url);
                    setIsEditButtonClicked(false);
                    setTitle("");
                    setUrl("");
                  }}
                  className="p-2 bg-blue-600 rounded-md hover:cursor-pointer hover:bg-blue-500 font-bold text-white "
                >
                  Update
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setIsEditButtonClicked(false);
                    setTitle("");
                    setUrl("");
                    setEditId("");
                  }}
                  className="p-2 bg-blue-600 rounded-md hover:cursor-pointer hover:bg-blue-500 font-bold text-white "
                >
                  Cancel
                </button>
              </>
            ) : (
              <button
                type="submit"
                className="p-2 bg-blue-600 rounded-md hover:cursor-pointer hover:bg-blue-500 font-bold text-white "
              >
                Add Bookmark
              </button>
            )}
          </div>
        </div>
      </form>
      {message && <div className="text-green-800 font-bold">{message}</div>}
      {error && <div className="text-red-600 font-bold">{error}</div>}
      {myBookmark.length !== 0 ? (
        myBookmark.map((data, index) => {
          return (
            <div
              key={data.id}
              className="flex justify-between items-center font-bold shadow-md p-2 bg-gray-100 mt-2 hover:bg-gray-300"
            >
              <div>
                <a href={data.url} target="_blank" className="text-blue-600">
                  {data.title}
                </a>
              </div>
              <div className="flex gap-2">
                <button
                  className="flex items-center hover:cursor-pointer text-blue-600 hover:bg-blue-700 hover:text-white border rounded-md p-1"
                  onClick={() => editHandler(data.id, data.title, data.url)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
                    <path
                      fillRule="evenodd"
                      d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Edit
                </button>
                <button
                  className="flex items-center hover:cursor-pointer hover:bg-red-700 hover:text-white text-red-600 border rounded-md p-1"
                  // onClick={() => {deleteBookmarkHandler(data.id);}}
                  onClick={() => handleOpenConfirm(data.id, data.title)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Delete
                </button>
              </div>
            </div>
          );
        })
      ) : (
        <div>No Bookmark added</div>
      )}
    </div>
  );
}

export default Dashboard;
