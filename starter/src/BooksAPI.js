const api = "https://reactnd-books-api.udacity.com";

let token = localStorage.token;

if (!token) token = localStorage.token = Math.random().toString(36).substr(-8);

const headers = {
  Accept: "application/json",
  Authorization: token,
};

export const get = (bookId) =>
  // Get information for book in universe
  fetch(`${api}/books/${bookId}`, { headers })
    .then((res) => res.json())
    .then((data) => data.book);

export const getAll = () =>
  // Gets all books placed on shelves
  fetch(`${api}/books`, { headers })
    .then((res) => res.json())
    .then((data) => data.books);

export const update = (book, shelf) =>
  // Move a book from the universe on/off shelves or change shelf
  // for existing books
  // Returns Object of arrays with keys currentlyreading, wanttoread,\
  // read
  fetch(`${api}/books/${book.id}`, {
    method: "PUT",
    headers: {
      ...headers,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ shelf }),
  }).then((res) => res.json());

export const search = (query, maxResults) =>
  // Searches the full book universe
  fetch(`${api}/search`, {
    method: "POST",
    headers: {
      ...headers,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query, maxResults }),
  })
    .then((res) => res.json())
    .then((data) => data.books);

// export const searchGet = (query) => {
//   return search(query).then((books) => {
//     return Promise.all(
//       !Object.hasOwn(books, "error") ? books.map((book) => get(book.id)) : []
//     );
//   });
// };

export async function searchGet(query) {
  // Data directly from search comes back w/o the shelf information
  // We first perform the query, then get the book information separately
  const books = await search(query);
  return Promise.all(
    !Object.hasOwn(books, "error") ? books.map((book) => get(book.id)) : []
  );
}
