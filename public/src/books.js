function findAuthorById (authors, id) {
  for (i in authors) {
    if (authors[i].id === id) {
      return authors[i]
    }
  }
}

function findBookById (books, id) {
  for (i in books) {
    if (books[i].id === id) {
      return books[i]
    }
  }
}

function partitionBooksByBorrowedStatus (books) {
  let booksOut = books.filter(book => book.borrows[0].returned === false)
  let booksIn = books.filter(book => book.borrows[0].returned === true)
  let borrowStats = [booksOut, booksIn]

  return borrowStats
}

function getBorrowersForBook (book, accounts) {
  let borrowed = book.borrows
  let result = borrowed
    .map(status => {
      let borrowersInfo = findAuthorById(accounts, status.id) //Passes in accoutn insteat of authorId from map
      borrowersInfo.returned = status.returned
      return borrowersInfo
    })
    .slice(0, 10) //Cuts off after tenth
  return result
}

module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook
}
