// make a search to google books api
// https://www.googleapis.com/books/v1/volumes?q=harry+potter
export const searchGoogleBooks = (query: string) => {
  const URL = `https://www.googleapis.com/books/v1/volumes?q=${query}`
  console.log(URL)
  return fetch(URL);
}
