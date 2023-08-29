import BookForm from './BookForm';

const AddBook = () => {
  const handleOnSubmit = (book) => {
    console.group("in AddBook submit handler)")
    console.info("received", book, "from child Book Form")
  };

  return (
    <>
      <BookForm handleOnSubmit={handleOnSubmit} />
    </>
  );
};

export default AddBook;
