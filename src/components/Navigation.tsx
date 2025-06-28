import { Link } from 'react-router-dom';

export default function Navigation() {
  return (
    <nav className="navigation">
      <ul className="nav-links">
        <li>
          <Link to="/" className="nav-link">
            ホーム
          </Link>
        </li>
        <li>
          <Link to="/about" className="nav-link">
            About
          </Link>
        </li>
      </ul>
    </nav>
  );
}
