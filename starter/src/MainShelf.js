import BookShelf from "./BookShelf";
import { Link } from "react-router-dom";

const MainShelf = ({ shelfBooks, modifyShelf }) => {
  return (
    <div className="list-books">
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
        <Link to="/search">Add a book</Link>
      </div>
    </div>
  );
};

export default MainShelf;
