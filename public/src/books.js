function findAuthorById(authors, id) {
  const foundAuthor = authors.find((author) => author.id === id);
  return foundAuthor;
}

function findBookById(books, id) {
  const foundBook = books.find((book) => book.id === id);
  return foundBook;
}

function partitionBooksByBorrowedStatus(books) {
  let booksOut = books.filter((book) => book.borrows[0].returned === false);
  let booksIn = books.filter((book) => book.borrows[0].returned === true);
  let borrowStats = [booksOut, booksIn];

  return borrowStats;
}

function getBorrowersForBook(book, accounts) {
  let borrowed = book.borrows;
  let result = borrowed
    .map((status) => {
      let borrowersInfo = findAuthorById(accounts, status.id);
      //Passes in account instead of author, id from map
      borrowersInfo.returned = status.returned;
      return borrowersInfo;
    })
    .slice(0, 10); //Cuts off after tenth
  return result;
}

module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};
