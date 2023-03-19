import { searchGet } from "./BooksAPI";
import { useEffect, useState } from "react";
import Book from "./Book";

const SearchPage = ({ showSearchPage, setShowSearchpage, modifyShelf }) => {
  const [searchVal, setSearchVal] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  //console.log("entering SearchPage with result", searchResult);
  //console.log(getAll());

  useEffect(() => {
    if (searchVal === "") return;
    let mounted = true;
    // We wait for promise to return and then update state
    searchGet(searchVal).then((data) => {
      if (mounted && data) {
        if (data.error === "empty query") {
          setSearchResult([]);
        } else {
          setSearchResult(data);
        }
      }
    });
    return () => {
      mounted = false;
    };
  }, [searchVal]);

  return (
    <div className="search-books">
      <div className="search-books-bar">
        <a
          className="close-search"
          onClick={() => setShowSearchpage(!showSearchPage)}
        >
          Close
        </a>
        <div className="search-books-input-wrapper">
          <input
            type="text"
            value={searchVal}
            onChange={(e) => setSearchVal(e.target.value)}
            placeholder="Search by title, author, or ISBN"
          />
        </div>
      </div>
      <div className="search-books-results">
        <div className="bookshelf">
          <h2 className="bookshelf-title">Currently Reading</h2>

          <div className="bookshelf-books">
            <ol className="books-grid">
              {searchResult &&
                searchResult.map((book, i) => (
                  <Book key={i} book={book} modifyShelf={modifyShelf} />
                ))}
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
