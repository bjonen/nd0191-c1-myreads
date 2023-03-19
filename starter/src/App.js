import "./App.css";
import { useState, useEffect } from "react";
import SearchPage from "./SearchPage";
import { getAll, update } from "./BooksAPI";
import { Route, Routes } from "react-router-dom";
import MainShelf from "./MainShelf";

function App() {
  const [shelfBooks, setShelfBooks] = useState([]);

  // Load books on shelf once at mount
  useEffect(() => {
    let mounted = true;
    setCurrentShelf(mounted);
    return () => {
      mounted = false;
    };
  }, []);

  async function setCurrentShelf() {
    return getAll().then((books) => {
      setShelfBooks(books);
    });
  }

  const modifyShelf = (bookid, shelf) => {
    // Update API. Once complete pull the current information
    // from API and set state to trigger re-render.
    // Important then(setCurrentShelf) instead of then(setCurrentShelf())
    update({ id: bookid }, shelf).then(setCurrentShelf);
  };

  return (
    <Routes>
      <Route
        exact
        path=""
        element={
          <MainShelf shelfBooks={shelfBooks} modifyShelf={modifyShelf} />
        }
      />
      <Route
        path="/search"
        element={<SearchPage modifyShelf={modifyShelf} />}
      />
    </Routes>
  );
}
export default App;
