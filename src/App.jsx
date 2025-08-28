import { useState } from "react";
import "./App.css";
import Router from "./routes/router";
import { BookmarkProvider } from "./context/BookmarkContext";

function App() {
  const [count, setCount] = useState(0);

  return (
    <BookmarkProvider>
      <Router />
    </BookmarkProvider>
  );
}

export default App;
