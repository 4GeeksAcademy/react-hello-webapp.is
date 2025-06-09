const BASE_URL = "https://www.swapi.tech/api";

export const fetchEntities = async (type) => {
  const res = await fetch(`${BASE_URL}/${type}`);
  const data = await res.json();
  return data.results;
};

export const fetchEntityDetails = async (type, uid) => {
  const res = await fetch(`${BASE_URL}/${type}/${uid}`);
  const data = await res.json();
  return data.result;
};
