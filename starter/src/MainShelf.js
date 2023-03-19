import BookShelf from "./BookShelf";
import { useNavigate } from "react-router-dom";

const MainShelf = ({ shelfBooks, modifyShelf }) => {
  let navigate = useNavigate();

  return (
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
        <a onClick={() => navigate("/search")}>Add a book</a>
      </div>
    </div>
  );
};

export default MainShelf;
