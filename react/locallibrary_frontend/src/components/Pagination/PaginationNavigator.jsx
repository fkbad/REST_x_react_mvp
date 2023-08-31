import { Stack } from 'react-bootstrap';
import Pagination from 'react-bootstrap/Pagination';
import { Link } from 'react-router-dom';


function PaginationNavigator({
  emptyPagePath,
  currentPage,
  totalPageCount,

}) {
  /* function to generate a generic paginator for navigating between endpoints
   * of a paginated model list
   */

  let active = currentPage;
  let items = [];
  for (let number = 1; number <= totalPageCount; number++) {
    items.push(
      <Pagination.Item key={number} active={number === active}>
        {number}
      </Pagination.Item>,
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
