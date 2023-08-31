import axios from "axios";
import { useEffect, useState } from "react";
import Book from "./Book";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import PaginationNavigator from "../Pagination/PaginationNavigator";
import { Stack } from "react-bootstrap";
import { styled } from "styled-components";

const MyBookListWrapper = styled.div`
display: flex;
flex-direction: column;
flex-wrap: no-wrap;
align-items: flex-start;
width: 50vw;
`;


const BookList = () => {
  // STATE, URL PARAMETERS, and CONSTANTS

  // list of book returned from the fetch
  const [books, setBooks] = useState([]);

  // state to track the pagination info
  //   count
  //   next
  //   previous
  //   length of results
  const [paginationInfo, setPaginationInfo] = useState(null)

  // state to keep track of total pages. 
  // Could potentially change if records are added or removed 
  // as the user switches pages
  const [totalPages, setTotalPages] = useState(null)

  // boolean value
  const [isLoading, setIsLoading] = useState(false);

  // to store any errors raised fetching from the API
  // either null or some error
  const [error, setError] = useState(null);


  // path to Book List
  let API_ROOT = "http://localhost:8000/api/books/";
  // empty page search parameter appended for easy appending in request
  let API_ROOT_WITH_EMPTY_PAGE = `${API_ROOT}?page=`;

  let location = useLocation();
  let locationNoPageNumber = removePageNumberFromLocation(location);

  // variable to fill in with page contents based on 
  // state
  let content
  //
  // variable to store a message to be filled in
  // when there isn't a book list 
  let fallbackMessage

  // get the URL ?page=X parameter
  let { pageNumber } = useParams()
  pageNumber = +pageNumber
  if (pageNumber === undefined) {
    // default page number when there is no number
    // parsed from URL
    pageNumber = 1
  }

  // CUSTOM HOOKS

  // Hook to redirect user if they give a non-integer hook
  // https://stackoverflow.com/questions/72149973/react-router-dom-v6-params-only-numbers
  // how to parse for only integers 
  // and redirect if not
  const navigate = useNavigate();
  useEffect(() => {
    if (!/\d+/.test(pageNumber)) {
      navigate(-1);
    }
  }, [pageNumber, navigate]);


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

  // REQUEST SENDING CODE
  //
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
  // HELPER FUNCTIONS
  //
  function removePageNumberFromLocation(location) {
    /* function to take in a page location
     * (/list/books/number)
     * and remove the final number from it
     * returning /list/books
     *
     * generalized so this logic could be used in other modules
     *
     * Inputs:
     *    location: the Location object of the webpage, returned from the router.useLocation() hook
     *              has fields:
     *                pathname: eg: /list/books/4
     *                search
     *                hash
     *                state
     *                key
     *
     * Outputs:
     *    string: the location with any number removed
     */
    // remove everything after the last backslash
    // https://stackoverflow.com/questions/14462407/remove-everything-after-last-backslash
    console.groupCollapsed("removing page number")
    console.info("from: ", location)

    const pathString = location.pathname
    let strippedPathString = pathString.substr(0, pathString.lastIndexOf("/") + 1);
    console.info("after processing:", strippedPathString)
    console.groupEnd()

    return strippedPathString
  }
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

  // CONTENT DETERMINING CODE
  if (books.length > 0 && !error) {
    content = (
      <>
        <h2>Book List</h2>
        <Stack gap={3} className="align-items-center">
          <PaginationNavigator
            emptyPagePath={locationNoPageNumber}
            currentPage={pageNumber}
            totalPageCount={totalPages}
          />
          <MyBookListWrapper>
            <Stack gap={3}>
              {books.map(book =>
                <Book className="w-100"
                  book={book}
                />
              )}
            </Stack>
          </MyBookListWrapper>
          <PaginationNavigator
            emptyPagePath={locationNoPageNumber}
            currentPage={pageNumber}
            totalPageCount={totalPages}
          />

        </Stack >
      </>
    );
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


  // RENDER COMPONENT
  return (
    <Stack direction="vertical" className="align-items-center">
      {content}
    </Stack>
  );
}

export default BookList;

