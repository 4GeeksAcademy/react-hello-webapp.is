const BASE_URL = "https://www.swapi.tech/api";

export const fetchEntities = async (type) => {
  const res = await fetch(`${BASE_URL}/${type}`);
  const data = await res.json();

  return data.results.map((item) => ({
    uid: item.uid,
    name: item.name,

    description: `Información básica sobre ${item.name}.`,
  }));
};

export const fetchEntityDetails = async (type, uid) => {
  const res = await fetch(`${BASE_URL}/${type}/${uid}`);
  const data = await res.json();
  const result = data.result;

  const description =
    result.description && result.description.trim() !== ""
      ? result.description
      : `Descripción no disponible para ${result.properties.name}.`;

  return {
    uid: result.uid,
    description,
    properties: result.properties || {},
  };
};
