import axios from "axios";
import { useEffect, useState } from "react";
import Book from "./Book";
import { useNavigate, useParams } from "react-router-dom";
import PaginationNavigator from "../Pagination/PaginationNavigator";

const BookList = () => {

  // get the URL parameter
  let { pageNumber } = useParams()
  pageNumber = +pageNumber

  let API_ROOT = "http://localhost:8000/api/books/"
  let API_ROOT_WITH_EMPTY_PAGE = `${API_ROOT}?page=`

  if (pageNumber === undefined) {
    // default page number when there is no number
    // parsed from URL
    pageNumber = 1
  }
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

  // state to track the pagination info
  //   count
  //   next
  //   previous
  //   length of results
  const [paginationInfo, setPaginationInfo] = useState(null)

  // state to keep track of total pages. Could potentially
  // change if records are added or removed as the user switches pages
  const [totalPages, setTotalPages] = useState(null)

  // to store loading status 
  const [isLoading, setIsLoading] = useState(false);

  // to store and errors from fetching from the API
  // either null or some error
  const [error, setError] = useState(null);


  // hook to recalculate the total number of pages 
  useEffect(() => {
    // console.warn("books now:", books);
    // console.warn("pagination info now:", paginationInfo);

    if (paginationInfo !== null) {
      let calculatedTotalPageCount = getTotalPagesFromPaginationInfo(paginationInfo)
      console.info("total page count found to be:", calculatedTotalPageCount)
      setTotalPages(calculatedTotalPageCount)
    }
  }, [paginationInfo, pageNumber]);

  function getTotalPagesFromPaginationInfo({ count: totalModelCount, next, previous, resultLength }) {
    /* function to calculate the total number of pages, given the pagination info
     * from a Django REST framework List GET response
     *
     * Input:
     *     paginationInfo object with fields:
     *        count: total number of DB models
     *        next: the URI of the next page's endpoint, if it exists, null if not
     *        previous: the URI of the previous page's endpoint, if it exists, null if not
     *        resultLength: the amount of models returned in this response
     */

    let pageSize = null
    if (next !== null) {
      // if there is another page, we know the current page is full
      // which means that the result length must be the pagination length
      pageSize = resultLength

      return Math.ceil(totalModelCount / pageSize)
    } else {
      // this means we are on the last page
      return pageNumber
    }

  }

  // GET book data
  useEffect(() => {
    console.info("books, paginationInfo:", books, paginationInfo)

    // flag for ignoring stale request responses
    let ignore_request_output = false;
    // signal controller to be able to cancel axios request 
    let controller = new AbortController();
    fetchBookPage()

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
        `${API_ROOT_WITH_EMPTY_PAGE}${pageNumber}`,
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
            const { count, next, previous, results: bookList } = data

            setBooks(bookList);

            const paginationInfoFromData = {
              count: count,
              next: next,
              previous: previous,
              resultLength: bookList?.length ?? 0
            }
            console.warn("pagination info FROM DATA determined to be:", paginationInfoFromData)
            setPaginationInfo(paginationInfoFromData)

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
    [pageNumber]
  );



  let content
  let fallbackMessage

  if (books.length > 0 && !error) {
    content = (<>
      <h2>List of Book, page:{pageNumber}</h2>
      <PaginationNavigator
        emptyPagePath={API_ROOT_WITH_EMPTY_PAGE}
        totalPageCount={totalPages} />
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
      <PaginationNavigator
        emptyPagePath={API_ROOT_WITH_EMPTY_PAGE}
        totalPageCount={totalPages} />

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
}

export default BookList;
