import { Outlet, Link } from "react-router-dom";

const Header = () => {
  return (
    <>
      <div id="links">
        <h1>React Router Contacts</h1>
        <nav>
          <ul>
            <li>
              <Link to={`add`}>Add Book</Link>
            </li>
            <li>
              <Link to={`list`}>List Books</Link>
            </li>
            <li>
              <Link to={`newthing`}>new thing</Link>
            </li>
            <li>
              <Link to={`genremulti`}>Genre Multi Select Debugging</Link>
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
