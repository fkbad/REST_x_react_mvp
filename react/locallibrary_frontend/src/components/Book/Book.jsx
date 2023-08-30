function Book({
  url,
  id,
  title,
  isbn,
  summary,
  author,
  genre,
  language,
}) {
  /* component to display a book
   */
  return (
    <>
      <p>{url}</p>
      <p>{id}</p>
      <p>{title}</p>
      <p>{isbn}</p>
      <p>{summary}</p>
      {/* <p>{author}</p> */}
      {/* <p>{genre}</p> */}
      {/* <p>{url}</p> */}
      {/* <p>{url}</p> */}
    </>
  );
}

export default Book
