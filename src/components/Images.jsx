import { useEffect, useRef } from "react";

export default function Images({ goodClick, badClick }) {
  let imagesLoaded = useRef(false);

  useEffect(() => {
    if (imagesLoaded.current) return;
    imagesLoaded.current = true;

    getImagesUrl().then((urls) => {
      console.log(urls);
    });
  }, []);

  return (
    <>
      <button onClick={goodClick}>Good</button>
      <button onClick={badClick}>Bad</button>
    </>
  );
}

async function getImagesUrl() {
  const imageIds = getUniquePokemonIds();

  const fetchData = Array.from(imageIds).map(async (id) => {
    try {
      const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
      if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
      const data = await res.json();
      return data.sprites.other.home.front_shiny;
    } catch (err) {
      console.error(`Fetch error for ID ${id}: `, err);
      return null;
    }
  });

  const result = await Promise.all(fetchData);

  const imageUrls = result.filter((data) => data !== null);

  return imageUrls;
}

function getUniquePokemonIds() {
  const ids = new Set();

  while (ids.size < 20) {
    const randomId = Math.floor(Math.random() * 1025) + 1;
    if (ids.has(randomId)) continue;

    ids.add(randomId);
  }

  return ids;
}
