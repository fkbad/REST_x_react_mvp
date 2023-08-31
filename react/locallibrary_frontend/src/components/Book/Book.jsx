import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Nav from 'react-bootstrap/Nav';
import ExpandableText from '../Helpers/ExpandableText';

function Book({ book }) {
  /* component to display a book
   */
  // state to track the current tab 
  // one of:
  //    general
  //    publication
  //    api
  const [currTab, setCurrTab] = useState("general")
  const tabNames = ["General", "Publication Info", "API Details"]

  // variable to hold the content of the cards
  let cardContent

  // to be shown in API code block
  const rawBookJSON = JSON.stringify(book, null, 2);
  console.log(book)

  const { author, genre, id, instances, isbn, language, summary, title, url } = book;
  //process the object fields
  const authorFirstName = author?.first_name ?? "Unknown"
  const authorLastName = author?.last_name ?? ""
  const authorFullName =
    authorFirstName.charAt(0).toUpperCase() + authorFirstName.slice(1)
    + " "
    + authorLastName.charAt(0).toUpperCase() + authorLastName.slice(1)

  // take the list of genres and languages and turn them into individual strings
  const genreNames = genre.map(g => g.name).join(", ");
  const languageNames = language.map(g => g.name).join(", ");

  // separate conditional checks for readability
  const isGeneral = currTab === "general"
  const isPublication = currTab === "publication"
  const isApi = currTab === "api"

  // make the title and author reusable
  const titleAndAuthor = (
    <>
      <Card.Title>{title}</Card.Title>
      <Card.Text as="i">{authorFullName}</Card.Text>
      <hr />
    </>

  )
  if (isGeneral) {
    cardContent = (<>
      {titleAndAuthor}
      <Card.Text>
        <ExpandableText
          descriptionLength={200}>
          {summary}
        </ExpandableText>
      </Card.Text>
    </>);

  } else if (isPublication) {
    cardContent = (
      <>
        {titleAndAuthor}
        <Card.Text>
          <b>ISBN-13: </b>{isbn}
        </Card.Text>
        <Card.Text>
          <b>Genre(s): </b>{genreNames}
        </Card.Text>
        <Card.Text>
          <b>Language(s): </b>{languageNames}
        </Card.Text>
      </>)

  } else if (isApi) {
    cardContent = (
      <>
        {titleAndAuthor}
        <Card.Text>
          Book API Endpoint: <a href={url}>{url} (link)</a>
        </Card.Text>
        <Card>
          <pre><code>{rawBookJSON}</code></pre>
        </Card>
      </>)
  }


  return (
    <Card>
      <Card.Header>
        <Nav variant="tabs" defaultActiveKey="general">
          <Nav.Item>
            <Nav.Link onClick={() => setCurrTab("general")} eventKey="general">{tabNames[0]}</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link onClick={() => setCurrTab("publication")} eventKey="publication" >{tabNames[1]}</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link onClick={() => setCurrTab("api")} eventKey="api"> {tabNames[2]} </Nav.Link>
          </Nav.Item>
        </Nav>
      </Card.Header>
      <Card.Body>
        {cardContent}
      </Card.Body>
    </Card >
  );
}

export default Book
