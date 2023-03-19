import "./App.css";
import { useState, useEffect } from "react";
import SearchPage from "./SearchPage";
import { getAll, update } from "./BooksAPI";
import BookShelf from "./BookShelf";

function App() {
  const [showSearchPage, setShowSearchpage] = useState(false);
  const [shelfs, setShelfs] = useState([]);
  const [shelfBooks, setShelfBooks] = useState([]);
  var mounted = false;

  useEffect(() => {
    // Run only once at mount
    mounted = true;
    setCurrentShelf(mounted);
    return () => {
      mounted = false;
    };
  }, []);

  async function setCurrentShelf(mounted) {
    return getAll().then((books) => {
      mounted && setShelfBooks(books);
      // setShelfs(
      //   books.map((book) => {
      //     return { id: book.id, shelf: book.shelf };
      //   })
      // );
    });
  }

  const modifyShelf = (bookid, shelf) => {
    console.log("modifyShelf", bookid, shelf);
    //const newShelfs = shelfs.filter((book) => book.id !== bookid);
    update({ id: bookid }, shelf).then(setCurrentShelf(mounted));
    // if (shelf != "none")
    //   setShelfs([...newShelfs, { id: bookid, shelf: shelf }]);
    // console.log("shelfs", shelfs);
  };

  console.log("shelfs are", shelfs);

  return (
    <div className="app">
      {showSearchPage ? (
        <SearchPage
          showSearchPage={showSearchPage}
          setShowSearchpage={setShowSearchpage}
          modifyShelf={modifyShelf}
        />
      ) : (
        //pass shelfname and only books on that shelf

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
