/*
 * component that serves as the multi-select form item for any form that wants to select on genre
 *
 * This will intiate a GET request
 * for all genres from the API
 *
 * It is intended to work as a 
 * react-bootstrap form component
 */

import axios from "axios";
import { useEffect, useState } from 'react';
import Form from 'react-bootstrap/Form';
import GenreMultiSelectItem from './GenreMultiSelectItem';

let DUMMY_GENRES = [{
  url: "abc",
  id: 1,
  name: "turkish"
},
{
  url: "123",
  id: 2,
  name: "turkglish"
},
{
  id: 3,
  url: "giw",
  name: "french"
},
{
  url: "asf",
  id: 4,
  name: "dutch east indian"
},
]




function GenreMultiSelect({
  controlId,
  placeholder,
  onChange: parentOnChange,
  name,
  label = "Genre(s)",
  caption = "ctrl/cmd + click to select multiple",
  selectedValues,

}) {
  /* 
   * props:
   *  controlId: the control id to be set for the overall form group
   *  placeholder: the placeholder text
   *  onChange: the function to call whenever a change occurs
   *            passed down from the parent form
   *  name: the name to use for the form control element 
   *
   *  label: the title for this Form Component
   */

  const [genres, setGenres] = useState([]);
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
    fetchGenreHandler()

    // cleanup function
    return (() => {
      ignore_request_output = true;
      controller.abort()
    });

    function fetchGenreHandler() {
      // function to actually fetch from API
      setIsLoading(true);
      setError(null);


      // then chains are really nice, literally taking the output from the previous .then as the input to the next one
      // the first argument is a function you define to run when the Promise successfully returns
      axios.get(
        // just getting the list
        `http://localhost:8000/api/genres/`,
        {
          // axios signal config
          timeout: 5000,
          // the signal to look at for cancellations
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
            let outputGenres = parseGenreList(data)


            setIsLoading(false)
            setGenres(outputGenres);
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
    // dependency array empty 
    []
  );

  function parseGenreList(responseData) {
    /* 
     * function to take in the data response from the /genres/ GET
     * and turn it into an array of javascript objects
     */
    return responseData.results
  }

  function handleSelectChange({ target }) {
    /* function to handle the selection change
     *
     * Input:
     *    an event fed into the onChange prop of the selection
     *    we extract the event.target.selectedOptions field
     *    which holds all of the selected options
     *      
     *      You can call on the value of a selected options with 
     *      option.value
     */
    console.group("Genre Select Change Handler")
    console.warn(target.name)
    parentOnChange({ target })

    console.groupEnd()
  }
  return (
    <>
      <Form.Group controlId={controlId}>
        <Form.Label>{label}</Form.Label>
        <Form.Select
          // while the values in the html option elements are specified as strings, 
          // the array can be a mix of integers or strings and they are processed correctly
          // eg: 
          //    value = ["1", 2] // will bind values "1" and "2"
          value={selectedValues}
          onChange={handleSelectChange}
          name={name}
          size="5"
          aria-label="Default select example"
          multiple
        >
          {genres
            .map(({ id, name }) =>
              <GenreMultiSelectItem
                // primary key guarenteed to be unique from DB
                key={id}
                id={id}
                name={name} />)}
        </Form.Select>
        <Form.Text className="text-muted">
          {caption}
        </Form.Text>
      </Form.Group >
    </>
  );
}

export default GenreMultiSelect


