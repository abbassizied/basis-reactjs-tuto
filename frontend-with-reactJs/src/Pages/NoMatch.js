import { Link } from "react-router-dom";

export function NoMatch() {
  return (
    <>
      <h1>Oops!</h1>
      <h2>404</h2>
      <div>Page Not Found!</div>
      <p>
        <Link to="/">Go to the home page</Link>
      </p>
    </>
  );
}
