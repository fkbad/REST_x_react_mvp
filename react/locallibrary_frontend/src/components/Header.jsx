import { Outlet, Link } from "react-router-dom";

const Header = () => {
  return (
    <>
      <div id="links">
        <h1>React Router Contacts</h1>
        <nav>
          <ul>
            <li>
              <Link to={`add/books/`}>Add Book</Link>
            </li>
            <li>
              <Link to={`list/books/`}>List Books</Link>
            </li>
            <li>
              <Link to={`list/books/2`}>Book Page 2</Link>
            </li>
            <li>
              <Link to={`list/books/9`}>Book Page 9</Link>
            </li>
            <li>
              <Link to={`newthing`}>new thing</Link>
            </li>
          </ul>
        </nav>
      </div>
      <div id="detail">
        <Outlet />
      </div>
    </>
  );
};

export default Header;
