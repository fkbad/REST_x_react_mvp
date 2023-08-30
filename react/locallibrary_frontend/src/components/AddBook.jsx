import axios from 'axios';
import BookForm from './BookForm';

const AddBook = () => {
  const handleOnSubmit = (book) => {
    console.group("in AddBook submit handler)")
    console.info("received", book, "from child Book Form")

    let POST_URL = "http://localhost:8000/api/books/"
    axios.post(`${POST_URL}`, book)
      .then(function(response) {
        console.log(response);
      })
      .catch(function(error) {
        console.log(error);
      });

    console.groupEnd()

  };

  return (
    <>
      <BookForm handleOnSubmit={handleOnSubmit} />
    </>
  );
};

export default AddBook;
