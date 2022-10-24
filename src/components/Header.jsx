import { Link } from "react-router-dom";

const Header = ({ title, cUSDBalance, setTab }) => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark pt-5 mb-5">
      <div className="container-fluid">
        <div
          style={{ cursor: "pointer" }}
          onClick={() => setTab("1")}
          className="navbar-brand"
          href="/"
        >
          MemeStore
        </div>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <a className="nav-link active" aria-current="page" href="#">
                Home
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                Features
              </a>
            </li>
          </ul>
          <div className="ms-auto">{cUSDBalance} cUSD</div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
