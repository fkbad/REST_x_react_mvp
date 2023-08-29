/*
 * component that serves as the multi-select form item for any form that wants to select on genre
 *
 * This will intiate a GET request
 * for all genres from the API
 *
 * It is intended to work as a 
 * react-bootstrap form component
 */

import Form from 'react-bootstrap/Form';


function GenreMultiSelect({ controlId, placeholder, onChange, name }) {
  /* 
   * props:
   *  controlId: the control id to be set for the overall form group
   *  placeholder: the placeholder text
   *  onChange: the function to call whenever a change occurs
   *            passed down from the parent form
   *  name: the name to use for the form control element 
   */
  return (
    <>
      <div>GENREMULTISELECT</div>
      <div>GENREMULTISELECT</div>
      <div>GENREMULTISELECT</div>
      <div>GENREMULTISELECT</div>
      <div>GENREMULTISELECT</div>
      <div>GENREMULTISELECT</div>
    </>
  );
}

export default GenreMultiSelect


