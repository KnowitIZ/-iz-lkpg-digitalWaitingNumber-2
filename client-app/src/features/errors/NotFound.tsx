import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div>
      <h5 className="text-danger">
        <i className="fa-solid fa-search"></i>
        Oops - we've looked everywhere but could not find what you are looking
        for!
      </h5>
      <Link to="/" className="btn btn-light">
        back to home
      </Link>
    </div>
  );
}
