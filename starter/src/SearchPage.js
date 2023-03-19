import { searchGet } from "./BooksAPI";
import { useEffect, useState } from "react";
import Book from "./Book";
import { Link, useSearchParams } from "react-router-dom";
import PropTypes from "prop-types";

const SearchPage = ({ modifyShelf }) => {
  let [searchParams, setSearchParams] = useSearchParams("");
  const [searchResult, setSearchResult] = useState([]);

  const getQuery = () => {
    // Extract query string from url
    var q = "";
    Array.from(searchParams.entries()).forEach((x) => {
      if (x[0] == "query") {
        q = x[1];
      }
    });
    return q;
  };

  useEffect(() => {
    const q = getQuery();
    if (q === "") {
      setSearchResult([]);
      return;
    }
    let mounted = true;
    // We wait for promise to return and then update state
    searchGet(q).then((data) => {
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
  }, [searchParams]);

  return (
    <div className="search-books">
      <div className="search-books-bar">
        <Link to="/" className="close-search">
          Close
        </Link>
        <div className="search-books-input-wrapper">
          <input
            type="text"
            value={getQuery()}
            onChange={(e) =>
              setSearchParams(
                e.target.value !== "" ? { query: e.target.value } : {}
              )
            }
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

SearchPage.propTypes = {
  modifyShelf: PropTypes.func.isRequired,
};

export default SearchPage;
