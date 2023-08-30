import axios from "axios";
import { useEffect, useState } from "react";
import Book from "./Book";
import { useNavigate, useParams } from "react-router-dom";

const BookList = () => {

  // get the URL parameter
  const { pageNumber } = useParams()
  const navigate = useNavigate();

  // https://stackoverflow.com/questions/72149973/react-router-dom-v6-params-only-numbers
  // how to parse for only integers 
  // and redirect if not
  useEffect(() => {
    if (!/\d+/.test(pageNumber)) {
      navigate(-1);
    }
  }, [pageNumber, navigate]);

  const [books, setBooks] = useState([]);
  // to store loading status 
  const [isLoading, setIsLoading] = useState(false);
  // to store and errors from fetching from the API
  // either null or some error
  const [error, setError] = useState(null);
  useEffect(() => {

    // flag for ignoring stale request responses
    let ignore_request_output = false;
    // signal controller to be able to cancel axios request 
    let controller = new AbortController();
    fetchBookPage(pageNumber)

    // cleanup function
    return (() => {
      ignore_request_output = true;
      controller.abort()
    });

    // -------------

    function fetchBookPage() {
      // function to actually fetch from API
      setIsLoading(true);
      setError(null);

      console.info("fetching page number:", pageNumber)


      axios.get(
        `http://localhost:8000/api/books/?page=${pageNumber}`,
        {
          timeout: 5000,
          signal: controller.signal,
        }
      )
        .then(response => {
          return response.data
        })
        .then((data) => {
          if (!ignore_request_output) {
            setError(false)
            console.info("received data", data);

            setIsLoading(false)
            setBooks(data.results);
            console.warn("books now:", books)
          } else {
            console.warn("received request where ignore_request_output was True", data)
          }

          console.groupEnd()

        }).catch(
          error => {
            console.error("RECEIVED AXIOS ERROR:", error);
            console.groupEnd();
            setIsLoading(false)
            setError(error)
          }

        );
      // END OF FETCH GENRE HANDLER
    }
  },
    // dependency array empty such that this happens immediately
    []
  );


  let content
  let fallbackMessage

  if (books.length > 0 && !error) {
    content = (<>
      <h2>List of Book, page:{pageNumber}</h2>
      {books.map(({ author, genre, id, instances, isbn, language, summary, title, url }) => {
        return <Book
          key={id}
          id={id}
          title={title}
          isbn={isbn}
          summary={summary}
        />
      }
      )}

    </>);
  }

  else {
    if (books.length === 0) {
      fallbackMessage = `No Books Found`
    }
    if (error) {
      fallbackMessage = `${error}`
    }
    if (isLoading) {
      fallbackMessage = "Loading..."
    }
    content = <p>{fallbackMessage}</p>

  }



  // filler for now
  return (
    <>
      {content}
    </>
  );
};

export default BookList;
