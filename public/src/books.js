function findAuthorById(authors, id) {
  return authors.find((author) => author.id == id);
}

function findBookById(books, id) {
  return books.find((book) => book.id == id);
}

function partitionBooksByBorrowedStatus(books) {
  let returnedBooks = [];
  let notReturnedBooks = [];

  books.forEach((book) => {
    const borrowsList = book.borrows;
    if (borrowsList.every((borrow) => borrow.returned == true)){
      returnedBooks.push(book)
    } else {
      notReturnedBooks.push(book)
    }
  })
  return [[...notReturnedBooks],[...returnedBooks]]
}

function getBorrowersForBook(book, accounts) {
  let extendedBorrowsList = [];
  book.borrows.forEach((borrow) => {
    const found = accounts.find((account) => account.id == borrow.id)
    extendedBorrowsList.push({...borrow,...found})
  })
  if (extendedBorrowsList.length < 11) {
    return extendedBorrowsList;
  } else {
    return extendedBorrowsList.splice(0,10);
  }
}

module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};