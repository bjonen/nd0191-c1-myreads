import { useState } from "react";
import { update } from "./BooksAPI";

const Book = ({ book, modifyShelf }) => {
  console.log("Adding book", book, book.shelf);
  const [optVal, setOptVal] = useState(book.shelf);

  const handleChange = (e) => {
    let val = e.target.value;
    if (val !== "none") {
      //console.log("updating book to ", val);
      //update(book, val);
      setOptVal(val);
      modifyShelf(book.id, val);
    }
  };

  return (
    <li>
      <div className="book">
        <div className="book-top">
          <div
            className="book-cover"
            style={{
              width: 128,
              height: 188,
              //backgroundImage: "url(" + book.imageLinks.smallThumbnail + ")",
              backgroundImage:
                Object.hasOwn(book, "imageLinks") &&
                `url(${book.imageLinks.smallThumbnail})`,
            }}
          ></div>
          {optVal != "none" ? (
            <div className="book-shelf-changer">
              <select value={optVal} onChange={handleChange}>
                <option value="none" disabled>
                  Move to...
                </option>
                <option value="currentlyReading">Currently Reading</option>
                <option value="wantToRead">Want to Read</option>
                <option value="read">Read</option>
                <option value="none">None</option>
              </select>
            </div>
          ) : (
            <div className="book-shelf-changer">
              <select value={optVal} onChange={handleChange}>
                <option value="none" disabled>
                  Add to...
                </option>
                <option value="currentlyReading">Currently Reading</option>
                <option value="wantToRead">Want to Read</option>
                <option value="read">Read</option>
              </select>
            </div>
          )}
        </div>
        <div className="book-title">{book.title}</div>
        <div className="book-authors">{book.authors}</div>
      </div>
    </li>
  );
};

export default Book;
