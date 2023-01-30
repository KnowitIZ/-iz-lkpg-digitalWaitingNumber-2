import { observer } from "mobx-react-lite";
import { Link, NavLink } from "react-router-dom";
import { useStore } from "../stores/store";

export default observer(function Menu() {
  const { accountStore } = useStore();

  const logout = () => {
    accountStore.logout();
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <div className="container-fluid">
        <NavLink className="navbar-brand" to="/">
          DWN
        </NavLink>

        <>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              {accountStore.isLoggedIn ? null : (
                <li className="nav-item">
                  <NavLink
                    className="nav-link"
                    aria-current="page"
                    to="/customers/landing"
                  >
                    Onplace Customers
                  </NavLink>
                </li>
              )}

              {accountStore.isInRole("Managers") ||
              accountStore.isInRole("Employees") ? (
                <li className="nav-item dropdown">
                  <a
                    className="nav-link dropdown-toggle"
                    href="/"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Waiting Numbers
                  </a>
                  <ul className="dropdown-menu">
                    <li>
                      <NavLink className="dropdown-item" to="/waitingnumbers">
                        List
                      </NavLink>
                    </li>
                  </ul>
                </li>
              ) : null}
            </ul>

            {accountStore.user ? (
              <ul className="navbar-nav d-flex">
                <li className="nav-item dropdown">
                  <a
                    className="nav-link dropdown-toggle"
                    href="/"
                    id="navbarDropdown"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <>
                      Welcome{" "}
                      {accountStore.isInRole("Customers") ? "Customer" : null}
                      {accountStore.isInRole("Admins") ? "Admin" : null}
                      {accountStore.isInRole("Employees") ? "Employee" : null}
                      {accountStore.isInRole("Managers") ? "Manager" : null}
                      {": "}
                      {accountStore.user.userName}
                      <i className="fa-solid fa-user mx-1"></i>
                    </>
                  </a>
                  <ul
                    className="dropdown-menu"
                    aria-labelledby="navbarDropdown"
                    style={{ left: "auto", right: 0 }}
                  >
                    <li>
                      <hr className="dropdown-divider" />
                    </li>
                    <li>
                      <button className="dropdown-item" onClick={logout}>
                        <i className="fa-solid fa-power-off mx-1"></i>
                        Logout
                      </button>
                    </li>
                  </ul>
                </li>
              </ul>
            ) : (
              <ul className="navbar-nav navbar-dark bg-primary d-flex">
                {accountStore.isLoggedIn ? null : (
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/login">
                      <i className="fa-solid fa-right-to-bracket mx-2"></i>
                      Login
                    </NavLink>
                  </li>
                )}
              </ul>
            )}
          </div>
        </>
      </div>
    </nav>
  );
});
