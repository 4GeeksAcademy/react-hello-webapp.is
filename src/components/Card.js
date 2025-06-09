import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { Button, Card } from "react-bootstrap";

const EntityCard = ({ entity, type }) => {
  const { toggleFavorite, favorites } = useContext(AppContext);
  const isFav = favorites.some((f) => f.uid === entity.uid && f.type === type);

  return (
    <Card className="m-2" style={{ width: "12rem" }}>
      <Card.Img
        variant="top"
        src={`https://starwars-visualguide.com/assets/img/${type}/${entity.uid}.jpg`}
        onError={(e) => {
          e.target.src =
            "https://starwars-visualguide.com/assets/img/placeholder.jpg";
        }}
      />
      <Card.Body>
        <Card.Title>{entity.name}</Card.Title>
        <Link to={`/${type}/${entity.uid}`}>
          <Button variant="outline-primary" size="sm">
            Details
          </Button>
        </Link>
        <Button
          variant={isFav ? "danger" : "outline-secondary"}
          size="sm"
          className="ms-2"
          onClick={() => toggleFavorite({ ...entity, type })}
        >
          {isFav ? "★" : "☆"}
        </Button>
      </Card.Body>
    </Card>
  );
};

export default EntityCard;
