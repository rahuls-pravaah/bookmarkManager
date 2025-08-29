import React, { createContext, useState, useEffect } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import {
  doc,
  setDoc,
  getDoc,
  collection,
  addDoc,
  query,
  getDocs,
  deleteDoc,
  updateDoc,
  onSnapshot,
  orderBy,
} from "firebase/firestore";
import { auth, db } from "../firebase";
import { useNavigate } from "react-router-dom";

export const BookmarkContext = createContext();

export function BookmarkProvider({ children }) {
  const [user, setUser] = useState(true);
  const [userData, setUserData] = useState(null);
  const [bookmark, setBookmark] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const authUnsubscribe = onAuthStateChanged(auth, async (user) => {
      setUser(user);
      setLoading(false);

      if (user) {
        // Fetch user data
        const userDocRef = doc(db, "users", user.uid);
        const userDocSnap = await getDoc(userDocRef);
        if (userDocSnap.exists()) {
          setUserData(userDocSnap.data());
        } else {
          setUserData(null);
        }

        // Set up the real-time bookmarks listener
        const bookmarkCollectionRef = collection(
          db,
          "users",
          user.uid,
          "bookmarks"
        );
        const q = query(bookmarkCollectionRef, orderBy("createdAt", "desc"));

        const bookmarkUnsubscribe = onSnapshot(q, (snapshot) => {
          const fetchedBookmarks = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setBookmark(fetchedBookmarks);
        });

        return () => {
          authUnsubscribe();
          bookmarkUnsubscribe();
        };
      } else {
        setUserData(null);
        setBookmark([]);
      }
    });

    // This is the cleanup for the onAuthStateChanged listener
    return () => authUnsubscribe();
  }, []); // The empty dependency array ensures this effect runs only once

  const login = async (email, password) => {
    try {
      const response = await signInWithEmailAndPassword(auth, email, password);
      const user = response.user;
      if (user) {
        const userDocRef = doc(db, "users", user.uid);
        const userDocSnap = await getDoc(userDocRef);
        setUserData(userDocSnap.data());
        setUser(user);
        return;
      }
      setUser(null);
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;

      switch (errorCode) {
        case "auth/invalid-email":
          alert("The email address is not valid.");
          break;
        case "auth/user-not-found":
          alert("No user found with this email.");
          break;
        case "auth/wrong-password":
          alert("Incorrect password. Please try again.");
          break;
        default:
          alert(errorMessage);
          break;
      }
    }
  };

  function logout() {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        console.log("User logged out.");
        navigate("/login");
        setUser(null);
      })
      .catch((error) => {
        console.error("Logout error:", error);
      });
  }

  const signup = async (fullname, email, password) => {
    try {
      const userData = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userData.user;
      await setDoc(doc(db, "users", user.uid), {
        name: fullname,
        email: user.email,
        createdAt: new Date(),
      });
      return { message: "user created successfully" };
    } catch (error) {
      console.log(error);
    }
  };

  const addBookmark = async (title, url) => {
    try {
      const bookmarkCollectionRef = collection(
        db,
        "users",
        user.uid,
        "bookmarks"
      );
      const docRef = await addDoc(bookmarkCollectionRef, {
        title: title,
        url: url,
        createdAt: new Date(),
      });
      return { message: "Bookmarks added successfully", docRef: docRef.id };
    } catch (error) {
      console.log(error);
      alert("Something went wrong, try again");
    }
  };

  const editBookmarHandler = async (bookmarkId, title, url) => {
    console.log(bookmarkId, title, url);

    const docRef = doc(db, "users", user.uid, "bookmarks", bookmarkId);
    await updateDoc(docRef, {
      title: title,
      url: url,
      updatedAt: new Date(),
    });
    setBookmark((prevBookmarks) =>
      prevBookmarks.map((data) =>
        data.id === bookmarkId ? { ...data, title, url } : data
      )
    );
  };

  const deleteBookmarkHandler = async (bookmarkId) => {
    const docRef = doc(db, "users", user.uid, "bookmarks", bookmarkId);
    await deleteDoc(docRef);
    setBookmark((prevBookmarks) =>
      prevBookmarks.filter((data) => data.id !== bookmarkId)
    );
  };

  return (
    <BookmarkContext.Provider
      value={{
        user,
        userData,
        login,
        signup,
        logout,
        addBookmark,
        bookmark,
        deleteBookmarkHandler,
        editBookmarHandler,
        loading,
      }}
    >
      {children}
    </BookmarkContext.Provider>
  );
}
