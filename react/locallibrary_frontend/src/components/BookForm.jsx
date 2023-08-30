import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';
import GenreSelect from './genre/GenreSelect';
import AuthorSelect from './Author/AuthorSelect';
import LanguageSelect from './Language/LanguageSelect';

function BookForm({ handleOnSubmit }) {
  const [title, setTitle] = useState('')
  const [isbn, setIsbn] = useState('')
  const [summary, setSummary] = useState('')
  const [selectedGenres, setSelectedGenres] = useState([])
  const [selectedAuthor, setSelectedAuthor] = useState("")
  const [selectedLanguages, setSelectedLanguages] = useState([])


  const [errorMessage, setErrorMessage] = useState(null)

  function handleFormSubmission(event) {
    event.preventDefault();

    const formValues = [title, isbn, summary, selectedLanguages, selectedAuthor, selectedGenres]
    let errorMessage = ''

    console.info("Form submission with values:", formValues)
    // https://www.freecodecamp.org/news/react-crud-app-how-to-create-a-book-management-app-from-scratch/
    // even works for numbers and arrays! 
    // if any field is an empty string, or an empty array
    // this will return false
    const allFieldsFilled = formValues.every((field) => {
      const value = `${field}`.trim();
      return value !== '' && value !== '0';
    });

    if (allFieldsFilled) {
      const book = {
        title,
        isbn,
        summary,
        selectedAuthor,
        selectedGenres,
        selectedLanguages
      };
      handleOnSubmit(book);
    } else {
      errorMessage = 'Please fill out all the fields.';
    }
    setErrorMessage(errorMessage);
  }
  function handleNonGenericInputChange({ target }) {
    // event.target is a reference to the object where this function was called upon
    // the name and value are both required props
    // for the form control that this function gets attached to
    // 
    // value is 
    // name is self-defined for control flow in this function
    console.group("BookForm Input Changed")

    // all of these fields follow the same logic of having 
    // using the event.target.value
    const { value, name: fieldName } = target

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
  function handleGenericInputChange({ modelName, selectedValues }) {
    /* function to handle changes in any of the kinds of "Generic" 
     * select components.
     *
     * Inputs:
     *    one object with fields:
     *    modelName: the name of the model for that component
     *    selectedValues: either a single ID or an array of ID's
     *                    which are the values and primary keys of all 
     *                    selected models.
     */

    // we only would have these 3 generic components in the BookForm
    let isGenre = modelName === "genre"
    let isAuthor = modelName === "author"
    let isLanguage = modelName === "language"

    console.group("Generic Input Change in Book Form")
    if (isGenre) {
      console.info("genre selected changed with:", selectedValues)
      setSelectedGenres(selectedValues)
      console.info("set genre to:", selectedGenres)

    } else if (isAuthor) {
      console.info("author selected changed with:", selectedValues)
      setSelectedAuthor(selectedValues)
      console.info("set author to:", selectedAuthor)

    } else if (isLanguage) {
      console.info("language selected changed with:", selectedValues)
      setSelectedLanguages(selectedValues)
      console.info("set languages to:", selectedLanguages)
    }

    console.groupEnd()
  }


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
                onChange={handleNonGenericInputChange}
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
                onChange={handleNonGenericInputChange}
                type="text"
                placeholder="13 Digit ISBN-13 Identifer" />
            </Form.Group>
          </Col>
        </Row>
        {/* summary */}
        <Row>
          <GenreSelect
            onChange={handleGenericInputChange}
            parentFormName='BookForm'
            selectedValues={selectedGenres}
            // can have multiple genres per book
            canSelectMultiple={true}
          />
          <AuthorSelect
            onChange={handleGenericInputChange}
            parentFormName='BookForm'
            selectedValues={selectedAuthor}
            // only 1 author per book
            canSelectMultiple={false}
          />
          <LanguageSelect
            onChange={handleGenericInputChange}
            parentFormName='BookForm'
            selectedValues={selectedLanguages}
            // can have muliple languages for a book
            canSelectMultiple={true}
          />


          <Form.Group controlId="bookFormSummary">
            <Form.Label>Summary</Form.Label>
            <Form.Control
              placeholder="A Brief Summary of the Book"
              // name for handleInputChange to parse with
              name="summary"
              onChange={handleNonGenericInputChange}

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
