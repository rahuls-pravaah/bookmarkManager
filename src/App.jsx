import react from "react";
import "./App.css";
import Router from "./routes/router";
import { BookmarkProvider } from "./context/BookmarkContext";

function App() {
  return (
    <BookmarkProvider>
      <Router />
    </BookmarkProvider>
  );
}

export default App;
