import "./Footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__inner">
        <p className="footer__line">CampusConnect &mdash;</p>
        <p className="footer__meta">
          &copy; {new Date().getFullYear()} CampusConnect.
        </p>
      </div>
    </footer>
  );
}
