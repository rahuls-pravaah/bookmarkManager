import React, { useState, useEffect, useContext } from "react";
import { BookmarkContext } from "../context/BookmarkContext";
import { data, useNavigate } from "react-router-dom";

function Dashboard() {
  const {
    user,
    addBookmark,
    bookmark,
    deleteBookmarkHandler,
    editBookmarHandler,
  } = useContext(BookmarkContext);
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [myBookmark, setMyBookmark] = useState(bookmark);
  const [isEditButtonClicked, setIsEditButtonClicked] = useState(false);
  const [editId, setEditId] = useState("");

  const addBookmarkHandler = (event) => {
    event.preventDefault();
    if (!title || !url) {
      setError("Please enter both a title and a url");
      return;
    }
    const response = addBookmark(title, url);
    response
      .then((data) => {
        setMessage(data.message);
        setMyBookmark((prevBookmark) => [
          { id: data.docRef, title: title, url: url },
          ...prevBookmark,
        ]);
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

  useEffect(() => {
    if (!user) navigate("/login");
    function loadBookmark() {
      setMyBookmark(bookmark);
    }
    loadBookmark();
  }, [user, bookmark]);

  return (
    <div className="mt-10">
      <form onSubmit={addBookmarkHandler}>
        <div className="flex justify-start items-start">
          <div className="flex gap-2 ">
            <input
              type="text"
              value={title}
              placeholder="Title"
              required
              onChange={(event) => setTitle(event.target.value)}
              className="border p-1 rounded outline-none"
            />
            <input
              type="text"
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
                  onClick={() => {editBookmarHandler(editId, title, url); setIsEditButtonClicked(false); setTitle(""); setUrl("");}}
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
              className="flex justify-between font-bold shadow-md p-2 bg-gray-200 mt-2"
            >
              <div>
                <a href={data.url} target="_blank">
                  {data.title}
                </a>
              </div>
              <div className="flex gap-2">
                <button
                  className="hover:cursor-pointer"
                  onClick={() => editHandler(data.id, data.title, data.url)}
                >
                  Edit
                </button>
                <button
                  className="hover:cursor-pointer"
                  onClick={() => deleteBookmarkHandler(data.id)}
                >
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
Dashboard;
