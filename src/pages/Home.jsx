import React, { useEffect, useState } from "react";
import { fetchEntities } from "../services/swapiService";
import Card from "../components/Card";

const Home = () => {
  const [data, setData] = useState({
    people: [],
    planets: [],
    vehicles: [],
  });
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [people, planets, vehicles] = await Promise.all([
          fetchEntities("people"),
          fetchEntities("planets"),
          fetchEntities("vehicles"),
        ]);

        const sanitize = (arr, type) =>
          arr.map((item) => ({
            ...item,
            name: item.name || (type === "people" ? "Personaje desconocido" :
                   type === "planets" ? "Planeta desconocido" : "Vehículo desconocido"),
          }));

        setData({
          people: sanitize(people, "people"),
          planets: sanitize(planets, "planets"),
          vehicles: sanitize(vehicles, "vehicles"),
        });
      } catch (err) {
        console.error("Error al cargar datos:", err);
        setError("Ocurrió un error al cargar los datos.");
      }
    };

    loadData();
  }, []);

  if (error) return <p className="text-danger text-center mt-3">{error}</p>;

  return (
    <div className="container">
      {/* People */}
      <h2 className="mt-4">Characters</h2>
      <div className="d-flex flex-wrap justify-content-center">
        {data.people.map((person) => (
          <Card key={person.uid} entity={person} type="people" />
        ))}
      </div>

      {/* Planets */}
      <h2 className="mt-5">Planets</h2>
      <div className="d-flex flex-wrap justify-content-center">
        {data.planets.map((planet) => (
          <Card key={planet.uid} entity={planet} type="planets" />
        ))}
      </div>

      {/* Vehicles */}
      <h2 className="mt-5">Vehicles</h2>
      <div className="d-flex flex-wrap justify-content-center mb-5">
        {data.vehicles.map((vehicle) => (
          <Card key={vehicle.uid} entity={vehicle} type="vehicles" />
        ))}
      </div>
    </div>
  );
};

export default Home;
