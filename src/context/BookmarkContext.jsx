import React, { createContext, useState, useEffect } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  sendEmailVerification
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
  serverTimestamp,
} from "firebase/firestore";
import { auth, db, storage } from "../firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useNavigate } from "react-router-dom";

export const BookmarkContext = createContext();

export function BookmarkProvider({ children }) {
  const [user, setUser] = useState(null);
  const [userData, setUserData] = useState(null);
  const [bookmark, setBookmark] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorFromContext, setErrorFromContext] = useState("");
  const [modalContent, setModalContentn] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    let bookmarkUnsubscribe;
    const authUnsubscribe = onAuthStateChanged(auth, async (user) => {
      setUser(user);
      setLoading(false);
      if (bookmarkUnsubscribe) bookmarkUnsubscribe();
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
        const q = query(bookmarkCollectionRef, orderBy("recentClick", "desc"));

        bookmarkUnsubscribe = onSnapshot(q, (snapshot) => {
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
    return () => {authUnsubscribe(); if (bookmarkUnsubscribe) bookmarkUnsubscribe();};
  }, []);

  const login = async (email, password) => {
    try {
      const response = await signInWithEmailAndPassword(auth, email, password);
      if(!response.user.emailVerified){
        setUser(false);
        return {success: false, message: "Please verify your email before login"}
      }
      
      const user = response.user;
      if (user) {
        const userDocRef = doc(db, "users", user.uid);
        const userDocSnap = await getDoc(userDocRef);
        setUserData(userDocSnap.data());
        setUser(user);
        setErrorFromContext("");
        return;
      }
      setUser(null);
    } catch (error) {
      console.log(error);
      switch (error.code) {
        case "auth/invalid-credential":
          setErrorFromContext("Invalid credential");
          break;
        case "auth/invalid-email":
          setErrorFromContext("The email address is not valid.");
          break;
        case "auth/user-not-found":
          setErrorFromContext("No user found with this email.");
          break;
        case "auth/wrong-password":
          setErrorFromContext("Incorrect password. Please try again.");
          break;
        default:
          setErrorFromContext(
            "An unexpected error occurred. Please try again later."
          );
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
      await sendEmailVerification(userData.user);
      const user = userData.user;
      await setDoc(doc(db, "users", user.uid), {
        name: fullname,
        email: user.email,
        createdAt: new Date(),
      });
      return { message: `user created successfully.
                          Please check your email to verify` };
    } catch (error) {
      console.log(error);
      switch (error.code) {
        case "auth/email-already-in-use":
          setErrorFromContext("Email already exist");
          break;

        case "auth/weak-password":
          setErrorFromContext("Password length more than 6 character");
          break;

        default:
          setErrorFromContext(
            "An unexpected error occurred. Please try again later."
          );
          break;
      }
      setTimeout(() => {
        setErrorFromContext("");
      }, 5000);
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
        recentClick: serverTimestamp(),
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

  const openModal = (content) => setModalContentn(content);
  const closeModal = () => setModalContentn(null);

  const sendResetPasswordLink = async (email) => {
    try {
      await sendPasswordResetEmail(auth, email);
      return {success: true, message: "Password reset email sent"}
    } catch (error) {
      setErrorFromContext(error);
      return;
    }
  };

  const addBugHandler = async (title, description, image, imageUrl="") => {
    try {
      let finalImageUrl = imageUrl;
      if (image) {
        const imageRef = ref(storage, `bugs/${user.uid}/${Date.now()}_${image.name}`);
        await uploadBytes(imageRef, image);
        finalImageUrl = await getDownloadURL(imageRef);
      }
      const bugCollectionRef = collection(
        db,
        "users",
        user.uid,
        "bugs"
      );
      const docRef = await addDoc(bugCollectionRef, {
        title: title,
        description: description,
        imageName: image,
        imageUrl: finalImageUrl,
        createdAt: serverTimestamp(),
      });
      return { message: "Bug reported successfully", docRef: docRef.id };
    } catch (error) {
      console.log(error);
      alert("Something went wrong, try again");
    }
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
        errorFromContext,
        modalContent,
        openModal,
        closeModal,
        sendResetPasswordLink,
        addBugHandler,
      }}
    >
      {children}
    </BookmarkContext.Provider>
  );
}
