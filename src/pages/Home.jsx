import React, { useEffect, useState } from "react";
import { fetchEntities } from "../services/swapiService";
import EntityCard from "../components/Card"; // Asegúrate que el componente Card está en components
import { Container } from "react-bootstrap";

const Home = () => {
  const [people, setPeople] = useState([]);
  const [planets, setPlanets] = useState([]);
  const [vehicles, setVehicles] = useState([]);

  useEffect(() => {
    fetchEntities("people").then(setPeople);
    fetchEntities("planets").then(setPlanets);
    fetchEntities("vehicles").then(setVehicles);
  }, []);

  const renderRow = (title, items, type) => (
    <div className="mb-4">
      <h4>{title}</h4>
      <div className="d-flex overflow-auto">
        {items.map((item) => (
          <EntityCard key={item.uid} entity={item} type={type} />
        ))}
      </div>
    </div>
  );

  return (
    <Container className="mt-4">
      {renderRow("Characters", people, "people")}
      {renderRow("Planets", planets, "planets")}
      {renderRow("Vehicles", vehicles, "vehicles")}
    </Container>
  );
};

export default Home;
