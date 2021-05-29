import { Link } from "react-router-dom";
import logo from "../logo.png"

function Navbar() {

  return (
    <nav className="navbar" role="navigation" aria-label="main navigation">
      <div className="navbar-brand">
        <a href="/">
          <img alt="Manga Rosa Logo" src={ logo } width="200" />
        </a>
      </div>
    
      <div id="navbarBasicExample" className="navbar-end">
        <Link className="navbar-item" to="/registros">Registros</Link>
        <Link className="navbar-item" to="/generateLink">Gerar link de convite</Link>
      </div>
    </nav>
  );
}

export default Navbar;
