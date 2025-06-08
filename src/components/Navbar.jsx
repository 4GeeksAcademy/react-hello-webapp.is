import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { Navbar, Container, Nav, Dropdown } from "react-bootstrap";

const Navigation = () => {
  const { favorites, toggleFavorite } = useContext(AppContext);

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Link to="/" className="navbar-brand">
          SWAPI App
        </Link>
        <Nav className="ms-auto">
          <Dropdown>
            <Dropdown.Toggle variant="secondary" id="dropdown-basic">
              Favorites ({favorites.length})
            </Dropdown.Toggle>
            <Dropdown.Menu>
              {favorites.length === 0 && (
                <Dropdown.Item disabled>No favorites</Dropdown.Item>
              )}
              {favorites.map((fav, i) => (
                <Dropdown.Item
                  key={i}
                  as={Link}
                  to={`/${fav.type}/${fav.uid}`}
                  onClick={(e) => e.stopPropagation()}
                >
                  {fav.name}{" "}
                  <span
                    style={{ cursor: "pointer", color: "red", float: "right" }}
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      toggleFavorite(fav);
                    }}
                  >
                    ❌
                  </span>
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default Navigation;
