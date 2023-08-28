import axios from "axios";
import { useState, useEffect, useCallback } from 'react';



function Getter() {
  /* basic component to wrap an axios call
   *
   * sample url:
http://localhost:8000/api/genres/1/

   * for origami genre
   */
  const [genre, setGenre] = useState(false);
  // to store loading status 
  const [isLoading, setIsLoading] = useState(false);
  // to store and errors from fetching from the API
  // either null or some error
  const [error, setError] = useState(null);


  useEffect(() => {
    let ignore_request_output = false;
    console.group("UseEffect hook called")
    let controller = new AbortController();
    fetchGenreHandler()
    console.groupEnd()


    return () => {
      // This is what React folks call the "cleanup" function
      // refer to the `setup` parameter of the useEffect docs:
      // https://react.dev/reference/react/useEffect#parameters
      //
      // every time useEffect is called, it runs your "setup" function 
      // (which is the first and default argument to useEffect)
      //
      // the setup function itself can return a "cleanup" function
      // this cleanup function is to be run every time useEffect is 
      // called again.
      //
      // Lifecycle is then like this:
      //
      // First ever render => 
      //        useEffect #1 setup 
      // Second ever render => 
      //        useEffect #1 cleanup => useEffect #2 setup
      //
      // Conceptually, the cleanup control flow is to resolve
      // anything that could remain unfinished if useEffect ends earlier
      // or is updated.
      // In practice, this is particularly useful when useEffect
      // has a side effect of communicating (and waiting) on an
      // external resource. 
      //
      // ===
      // In this specific useEffect, this cleanup function
      // updates the property of the `attributes` object
      //
      // the reason this matters, is because this attributes object
      // is fed as an argument into our fetchGenreHandler function.
      // and in that function, this boolean value
      // determines whether or not the genre returned 
      // from the axios HTTP request should be used 
      // to call setGenre and update the displayed genre 
      //
      // This is then added to avoid race conditions. 
      // If the component re-renders before the response to the 
      // previous request is done, then that first response
      // is stale.
      // So by setting this flag, we tell fetchGenreHandler 
      // to ignore the response it gets
      ignore_request_output = true;
      controller.abort()
    }

    function fetchGenreHandler() {
      // function to actually fetch from API
      setIsLoading(true);
      setError(null);


      // then chains are really nice, literally taking the output from the previous .then as the input to the next one
      // the first argument is a function you define to run when the Promise successfully returns
      axios.get(
        `http://localhost:8000/api/genres/${Math.round(Math.random() * 4 + 1)}/`,
        {
          // axios signal config
          timeout: 5000,
          signal: controller.signal,
        }
      )
        .then(response => {
          console.info("axios successfully returned with:", response);
          return response.data
        })

        .then((data) => {
          if (!ignore_request_output) {
            setError(false)
            console.info("received data", data);
            const { books, name, url } = data;

            let outputGenre = {
              /*
               * genre object has fields:
               * books
               * id
               * name
               * url
              */
              books: books,
              name: name,
              url: url,
            }
            console.info("returning genre object", outputGenre);

            setIsLoading(false)

            setGenre(outputGenre);
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





    // no dependencies so useEffect is only run once upon component loading
  }, []);


  // fill in the content based on the combination of state:
  let content = <p>Found no genre</p>

  if (genre) {
    content = (<section>
      <p>{genre.name}</p>
      <p>{genre.url}</p>
      <p>{genre.books}</p>
    </section>
    );
  }



  if (error) {
    content = <p>{error.name}{error.code}</p>;
  }

  if (isLoading) {
    content = <p>Loading...</p>;
  }

  console.info("content determined to be:", content)
  return (
    <section>
      {content}
    </section>
  );
}

export default Getter

