import "./App.css";
import { useState, useEffect } from "react";
import SearchPage from "./SearchPage";
import { getAll, update } from "./BooksAPI";
import BookShelf from "./BookShelf";

function App() {
  const [showSearchPage, setShowSearchpage] = useState(false);
  const [shelfBooks, setShelfBooks] = useState([]);

  // Load books at mount
  useEffect(() => {
    let mounted = true;
    setCurrentShelf(mounted);
    return () => {
      mounted = false;
    };
  }, []);

  async function setCurrentShelf() {
    return getAll().then((books) => {
      console.log("Setting shelf books", books);
      setShelfBooks(books);
    });
  }

  const modifyShelf = (bookid, shelf) => {
    console.log("modifyShelf", bookid, shelf);
    // Important then(setCurrentShelf) instead of then(setCurrentShelf())
    update({ id: bookid }, shelf).then(setCurrentShelf);
  };

  return (
    <div className="app">
      {showSearchPage ? (
        <SearchPage
          showSearchPage={showSearchPage}
          setShowSearchpage={setShowSearchpage}
          modifyShelf={modifyShelf}
        />
      ) : (
        <div className="list-books">
          {/* <div> <BookShelf shelfName="Want to Read"  /> </div> */}
          <div className="list-books-title">
            <h1>MyReads</h1>
          </div>
          <div className="list-books-content">
            <div>
              <BookShelf
                shelfName="Want to Read"
                books={shelfBooks.filter((book) => book.shelf === "wantToRead")}
                modifyShelf={modifyShelf}
              />
              <BookShelf
                shelfName="Currently Reading"
                books={shelfBooks.filter(
                  (book) => book.shelf === "currentlyReading"
                )}
                modifyShelf={modifyShelf}
              />
              <BookShelf
                shelfName="Read"
                books={shelfBooks.filter((book) => book.shelf === "read")}
                modifyShelf={modifyShelf}
              />
            </div>
          </div>
          <div className="open-search">
            <a onClick={() => setShowSearchpage(!showSearchPage)}>Add a book</a>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
