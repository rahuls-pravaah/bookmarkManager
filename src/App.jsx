import react from "react";
import "./App.css";
import Router from "./routes/router";
import { BookmarkProvider } from "./context/BookmarkContext";
import Modal from "./components/Modal";

function App() {
  return (
    <BookmarkProvider>
      <Router />
      <Modal />
    </BookmarkProvider>
  );
}

export default App;
