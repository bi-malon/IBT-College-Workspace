import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="page page--narrow" style={{ textAlign: "center" }}>
      <p className="eyebrow">404</p>
      <h1>This page wandered off campus.</h1>
      <p>
        The page you're looking for doesn't exist. It may have moved, or the
        link might be out of date.
      </p>
      <Link to="/" className="btn btn--gold">
        Back to home
      </Link>
    </div>
  );
}
