import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchEntityDetails } from "../services/swapiService";

const genericDescriptions = {
  people: "Personajes icónicos del universo Star Wars que han dejado su huella en la galaxia.",
  planets: "Planetas fascinantes que conforman la diversa galaxia de Star Wars.",
  vehicles: "Vehículos emblemáticos usados en distintas batallas y aventuras espaciales.",
};

const Single = () => {
  const { type, uid } = useParams();
  const [entity, setEntity] = useState(null);

  useEffect(() => {
    fetchEntityDetails(type, uid)
      .then((data) => setEntity(data))
      .catch((err) => console.error("Error al obtener detalles:", err));
  }, [type, uid]);

  if (!entity) return <p className="text-center mt-5">Cargando...</p>;

  const { properties, description } = entity;
  const name = properties.name || "Nombre desconocido";

  const getImageUrl = () => {
    const folder = type === "people" ? "characters" : type;
    return `https://starwars-visualguide.com/assets/img/${folder}/${uid}.jpg`;
  };

  return (
    <div className="container mt-4">
      <div className="row mb-5">
        <div className="col-md-5 text-center">
          <img
            src={getImageUrl()}
            alt={name}
            className="img-fluid rounded shadow"
            style={{ width: "400px", height: "300px", objectFit: "cover" }}
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "https://via.placeholder.com/400x300?text=No+Image";
            }}
          />
        </div>
        <div className="col-md-7 d-flex flex-column justify-content-start">
          <h2>{name}</h2>
          <p className="text-muted mt-2">
            {description && description.trim() !== ""
              ? description
              : genericDescriptions[type] || "Descripción no disponible."}
          </p>
        </div>
      </div>

      <div
        className="d-flex flex-row justify-content-start flex-wrap"
        style={{
          borderTop: "1px solid #ddd",
          paddingTop: "15px",
          position: "fixed",
          bottom: "60px",
          left: "0",
          right: "0",
          backgroundColor: "#fff",
          overflowX: "auto",
          whiteSpace: "nowrap",
          zIndex: 9999,
          paddingLeft: "300px", 
        }}
      >
        {type === "people" && (
          <>
            <span className="me-3"><strong>Birth Year:</strong> {properties.birth_year}</span>
            <span className="me-3"><strong>Gender:</strong> {properties.gender}</span>
            <span className="me-3"><strong>Height:</strong> {properties.height} cm</span>
            <span className="me-3"><strong>Mass:</strong> {properties.mass} kg</span>
            <span className="me-3"><strong>Hair Color:</strong> {properties.hair_color}</span>
            <span className="me-3"><strong>Eye Color:</strong> {properties.eye_color}</span>
            <span className="me-3"><strong>Skin Color:</strong> {properties.skin_color}</span>
          </>
        )}
        {type === "planets" && (
          <>
            <span className="me-3"><strong>Climate:</strong> {properties.climate}</span>
            <span className="me-3"><strong>Population:</strong> {properties.population}</span>
            <span className="me-3"><strong>Terrain:</strong> {properties.terrain}</span>
            <span className="me-3"><strong>Gravity:</strong> {properties.gravity}</span>
            <span className="me-3"><strong>Diameter:</strong> {properties.diameter} km</span>
            <span className="me-3"><strong>Rotation Period:</strong> {properties.rotation_period} hrs</span>
            <span className="me-3"><strong>Orbital Period:</strong> {properties.orbital_period} days</span>
            <span className="me-3"><strong>Surface Water:</strong> {properties.surface_water}%</span>
          </>
        )}
        {type === "vehicles" && (
          <>
            <span className="me-3"><strong>Model:</strong> {properties.model}</span>
            <span className="me-3"><strong>Class:</strong> {properties.vehicle_class}</span>
            <span className="me-3"><strong>Manufacturer:</strong> {properties.manufacturer}</span>
            <span className="me-3"><strong>Crew:</strong> {properties.crew}</span>
            <span className="me-3"><strong>Passengers:</strong> {properties.passengers}</span>
            <span className="me-3"><strong>Cost:</strong> {properties.cost_in_credits} credits</span>
            <span className="me-3"><strong>Length:</strong> {properties.length} meters</span>
            <span className="me-3"><strong>Speed:</strong> {properties.max_atmosphering_speed} km/h</span>
            <span className="me-3"><strong>Cargo Capacity:</strong> {properties.cargo_capacity} kg</span>
          </>
        )}
      </div>
    </div>
  );
};

export default Single;
