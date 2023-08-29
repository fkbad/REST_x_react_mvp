import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';
import GenreMultiSelect from './genre/GenreMultiSelect';




function BookForm({ handleOnSubmit }) {
  const [title, setTitle] = useState('')
  const [isbn, setIsbn] = useState('')
  const [summary, setSummary] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)

  function handleFormSubmission(event) {
    event.preventDefault();
    const formValues = [title, isbn, summary]
    let errorMessage = ''

    // https://www.freecodecamp.org/news/react-crud-app-how-to-create-a-book-management-app-from-scratch/
    const allFieldsFilled = formValues.every((field) => {
      const value = `${field}`.trim();
      return value !== '' && value !== '0';
    });

    if (allFieldsFilled) {
      const book = {
        title,
        isbn,
        summary,
      };
      handleOnSubmit(book);
    } else {
      errorMessage = 'Please fill out all the fields.';
    }
    setErrorMessage(errorMessage);
  }
  function handleInputChange(event) {
    // event.target is a reference to the object where this function was called upon
    // the name and value are both required props
    // for the form control that this function gets attached to
    // 
    // value is 
    // name is self-defined for control flow in this function
    console.group("BookForm Input Changed")
    const { name: fieldName, value } = event.target;
    console.info("input update happened with:", fieldName, value)
    if (fieldName === "title") {
      setTitle(value)
    } else if (fieldName === "isbn") {
      setIsbn(value)
    } else if (fieldName === "summary") {
      setSummary(value)
    } else {
      console.error("somehow submitted on a fieldname that wasn't title, isbn or summar:", fieldName, value)
    }

    console.groupEnd()

  };

  const variant = "Secondary"
  return (
    <Card
      bg={variant.toLowerCase()}
      key={variant}
      text={variant.toLowerCase() === 'light' ? 'dark' : 'white'}
      className="mb-2"
      body>
      {errorMessage && <p>{errorMessage}</p>}
      <Form onSubmit={handleFormSubmission}>
        <Row>
          {/* title and isbn */}
          <Col>
            <Form.Group controlId="bookFormTitle">
              <Form.Label>Title</Form.Label>
              <Form.Control
                // name for handleInputChange to parse with
                name="title"
                onChange={handleInputChange}
                type="text"
                placeholder="Enter title" />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="bookFormISBN">
              <Form.Label>ISBN-13</Form.Label>
              <Form.Control
                // name for handleInputChange to parse with
                name="isbn"
                onChange={handleInputChange}
                type="text"
                placeholder="13 Digit ISBN-13 Identifer" />
            </Form.Group>
          </Col>
        </Row>
        {/* summary */}
        <Row>
          <GenreMultiSelect
            contolId="bookFormGenre"
            placeholder="Select Genre(s)"
            onChange={handleInputChange}
            // name for handleInputChange to parse with
            name="genre"
          />
          <Form.Group controlId="bookFormSummary">
            <Form.Label>Summary</Form.Label>
            <Form.Control
              placeholder="A Brief Summary of the Book"
              // name for handleInputChange to parse with
              name="summary"
              onChange={handleInputChange}

              // make this element be turned into a <textarea>
              // as tall as 6 rows. Since the summary is multiple sentences
              as="textarea"
              rows={6} />
          </Form.Group>
        </Row>
        <Button variant='primary' type='submit' >Submit</Button>
      </Form >
    </Card>
  );
}

export default BookForm
