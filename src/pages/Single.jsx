import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchEntityDetails } from "../services/swapiService";
import { Container, Row, Col } from "react-bootstrap";

const Single = () => {
  const { type, uid } = useParams();
  const [entity, setEntity] = useState(null);

  useEffect(() => {
    fetchEntityDetails(type, uid).then(setEntity);
  }, [type, uid]);

  if (!entity) return <p className="text-center mt-5">Loading...</p>;

  const { properties, description } = entity;

  return (
    <Container className="mt-5 text-light">
      <Row>
        <Col md={4}>
          <img
            className="img-fluid rounded"
            src={`https://starwars-visualguide.com/assets/img/${type}/${uid}.jpg`}
            onError={(e) => {
              e.target.src =
                "https://starwars-visualguide.com/assets/img/placeholder.jpg";
            }}
            alt={properties.name}
          />
        </Col>
        <Col md={8}>
          <h2>{properties.name}</h2>
          <p>{description || "No description available."}</p>
          <Row className="mt-4">
            {Object.entries(properties).map(([key, val]) => (
              <Col xs={6} md={4} key={key} className="mb-2">
                <strong>{key.replaceAll("_", " ")}:</strong> {val}
              </Col>
            ))}
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default Single;
