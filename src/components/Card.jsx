import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { Button, Card as BootstrapCard } from "react-bootstrap";

const Card = ({ entity, type }) => {
  const { toggleFavorite, favorites } = useContext(AppContext);
  const isFav = favorites.some((f) => f.uid === entity.uid && f.type === type);

  const imgPlaceholderStyle = {
    width: "224px",
    height: "126px",
    backgroundColor: "#ddd",
  };

  const summaryProps = {
    people: [
      `Gender: ${entity.gender || "N/A"}`,
      `Height: ${entity.height || "N/A"} cm`,
    ],
    planets: [
      `Climate: ${entity.climate || "N/A"}`,
      `Terrain: ${entity.terrain || "N/A"}`,
    ],
    vehicles: [
      `Model: ${entity.model || "N/A"}`,
      `Class: ${entity.vehicle_class || "N/A"}`,
    ],
  };

  const summary = summaryProps[type] || [];

  return (
    <BootstrapCard className="m-2" style={{ width: "14rem" }}>
      <div style={imgPlaceholderStyle} />
      <BootstrapCard.Body>
        <BootstrapCard.Title>{entity.name}</BootstrapCard.Title>
        {summary.map((line, i) => (
          <BootstrapCard.Text
            key={i}
            style={{ fontSize: "0.85rem", marginBottom: "0.25rem" }}
          >
            {line}
          </BootstrapCard.Text>
        ))}
        <Link to={`/single/${type}/${entity.uid}`}>
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
      </BootstrapCard.Body>
    </BootstrapCard>
  );
};

export default Card;
