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


function GenreMultiSelect({
  controlId,
  placeholder,
  onChange,
  name,
  label = "Genre(s)",
  caption = "ctrl/cmd + click to select multiple",
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

  function handleSelectChange(event) {
    /* function to handle the selection change
     */
    console.groupEnd()
    console.group("Genre Select Change Handler")
    // console.info(event)
    console.info(event.target.selectedOptions)
    console.info(event.target.value, event.target.name, event.target.options)
  }
  return (
    <>
      <Form.Group controlId={controlId}>
        <Form.Label>{label}</Form.Label>
        <Form.Select
          onChange={handleSelectChange}
          name={name}
          size="5"
          aria-label="Default select example"
          multiple
        >
          <option value="1">One</option>
          <option value="2">Two</option>
          <option value="3">Three</option>
        </Form.Select>
        <Form.Text className="text-muted">
          {caption}
        </Form.Text>
      </Form.Group >
    </>
  );
}

export default GenreMultiSelect


