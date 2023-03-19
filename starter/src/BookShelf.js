import Book from "./Book";
import PropTypes from "prop-types";

const BookShelf = ({ shelfName, books, modifyShelf }) => {
  return (
    <div className="bookshelf">
      <h2 className="bookshelf-title">{shelfName}</h2>
      <div className="bookshelf-books">
        <ol className="books-grid">
          {books &&
            books.map((book, i) => (
              <Book key={i} book={book} modifyShelf={modifyShelf} />
            ))}
        </ol>
      </div>
    </div>
  );
};

BookShelf.propTypes = {
  shelfName: PropTypes.string.isRequired,
  books: PropTypes.array.isRequired,
  modifyShelf: PropTypes.func.isRequired,
};

export default BookShelf;
