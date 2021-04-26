function getTotalBooksCount(books) {
  return books.length;
}

function getTotalAccountsCount(accounts) {
  return accounts.length;
}

function getBooksBorrowedCount(books) {
  let result = books.reduce((acc, book) => {
    return acc + (book.borrows[0].returned === false);
  }, 0);
  return result;
}

// HELPER FUNCTION
function sortAndTrimArray(array) {
  const result = array.sort((objectA, objectB) =>
    objectA.count < objectB.count ? 1 : -1
  );
  return result.slice(0, 5);
}

function getMostCommonGenres(books) {
  const result = books.reduce((sumArr, book) => {
    if (sumArr.some((genreObject) => genreObject.name === book.genre)) {
      const selected = sumArr.find(
        (genreObject) => genreObject.name === book.genre
      );
      selected.count++;
    } else {
      const name = book.genre;
      const count = 1;
      sumArr.push({ name, count });
    }
    return sumArr;
  }, []);
  return sortAndTrimArray(result);
}

function getMostPopularBooks(books) {
  let mostPopular = [];

  for (let book of books) {
    const title = mostPopular.find(
      (currentBook) => currentBook.name === book.title
    );

    mostPopular.push({ name: book.title, count: book.borrows.length });
  }

  let mostPopularTomes = mostPopular.sort((countA, countB) =>
    countA.count < countB.count ? 1 : -1
  );
  return mostPopularTomes.slice(0, 5);
}

function getMostPopularAuthors(books, authors) {
  let result = [];

  let matchingAuthor = books.filter((book) =>
    authors.find((author) => author.id === book.authorId)
  );
  matchingAuthor.forEach((book) => {
    let author = authors.find((author) => author.id === book.authorId);
    result.push({
      name: `${author.name.first} ${author.name.last}`,
      count: book.borrows.length,
    });
  });

  let finalResult = result.sort((countA, countB) =>
    countA.count < countB.count ? 1 : -1
  );
  return finalResult.slice(0, 5);
}

module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};