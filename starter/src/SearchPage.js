import { getAll, get, search } from "./BooksAPI";
import { useEffect, useState } from "react";
import Book from "./Book";

const SearchPage = ({ showSearchPage, setShowSearchpage }) => {
  const [searchVal, setSearchVal] = useState("react");
  const [abc, setAbc] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  // console.log(stuff);
  console.log("entering SearchPage with result", searchResult);

  // let mydata = [];
  // if (searchVal !== "") {
  //   mydata = search(searchVal, 20).value;
  //   console.log(mydata);
  // }

  useEffect(() => {
    let mounted = true;
    // We wait for promise to return and then update state
    search(searchVal).then((data) => {
      if (mounted) {
        setSearchResult(data);
      }
    });
    console.log("done", searchResult.value);
    return () => {
      mounted = false;
    };
  }, []);

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
              {searchResult.map((book, i) => (
                <Book key={i} book={book} />
              ))}
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
