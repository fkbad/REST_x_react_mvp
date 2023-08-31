import { Stack } from 'react-bootstrap';
import Pagination from 'react-bootstrap/Pagination';
import { Link, useNavigate } from 'react-router-dom';


function PaginationNavigator({
  emptyPagePath,
  currentPage,
  totalPageCount,

}) {
  /* function to generate a generic paginator for navigating between endpoints
   * of a paginated model list
   */
  let navigate = useNavigate()

  let active = currentPage;
  let items = [];
  for (let number = 1; number <= totalPageCount; number++) {
    const path = emptyPagePath + number
    items.push(
      // https://stackoverflow.com/questions/70582335/react-router-v6-how-to-place-link-into-a-button-and-event-handler
      // event.prevent default is to make sure that clicking on the item doesn't actually
      // refresh the page due to having the href property.
      // including the href makes the link appear on hover
      <Pagination.Item onClick={((event) => { event.preventDefault(); navigate(path) })} href={path} key={number} active={number === active
      }>
        {number}
      </Pagination.Item >,
    );
  }
  return (
    // https://react-bootstrap.github.io/docs/layout/stack/#horizontal
    // using this to organize elements
    <div>
      <Pagination>{items}</Pagination>
    </div>
  );
}

export default PaginationNavigator
