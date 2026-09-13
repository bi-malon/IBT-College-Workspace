import "./Footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__inner">
        <p className="footer__line">
          CampusConnect &mdash; built by students, for students.
        </p>
        <p className="footer__meta">
          &copy; {new Date().getFullYear()} CampusConnect. A student
          community portal project.
        </p>
      </div>
    </footer>
  );
}
