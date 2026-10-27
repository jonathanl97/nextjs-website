export default async function fetchWiki() {
  const fetchPlanets = [
    "Mercury (planet)",
    "Venus",
    "Earth",
    "Mars",
    "Jupiter",
    "Saturn",
    "Uranus",
    "Neptune",
  ];

  let planets = [];

  const data = sessionStorage.getItem("planets");
  if (data != null) {
    return JSON.parse(data);
  }

  for (let index = 0; index < fetchPlanets.length; index++) {
    try {
      const response = await fetch(
        "https://en.wikipedia.org/api/rest_v1/page/summary/" +
          fetchPlanets[index],
      );
      let { title, extract, originalimage } = await response.json();
      title = title.split(" ")[0];
      planets.push({ title, extract, originalimage });
    } catch (error) {
      console.log(error);
      throw new Error("Fetching data failed");
    }
  }
  sessionStorage.setItem("planets", JSON.stringify(planets));

  return planets;
}
