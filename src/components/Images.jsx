import { useEffect, useRef, useState } from "react";
import ImageCard from "./ImageCard";
import "../style/Images.css";

export default function Images({ goodClick, badClick }) {
  const [imageData, setImageData] = useState(null);
  let imagesLoaded = useRef(false);

  useEffect(() => {
    if (imagesLoaded.current) return;
    imagesLoaded.current = true;

    getImagesUrl().then((data) => {
      const imageArr = [];
      for (const item of data) {
        imageArr.push({ id: item.id, url: item.url, clicked: false });
      }

      setImageData(imageArr);
    });
  }, []);

  function randomizeImages(arr) {
    const lastIndex = arr.length - 1;

    for (let i = lastIndex; i > 0; --i) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }

    return arr;
  }

  function resetClickData(arr) {
    return arr.map((data) => ({ ...data, clicked: false }));
  }

  function handleBadClick() {
    badClick();
    setImageData((prev) => {
      let dataCopy = prev.map((data) => ({ ...data }));
      dataCopy = randomizeImages(dataCopy);
      dataCopy = resetClickData(dataCopy);

      return dataCopy;
    });
  }

  function handleGoodClick(id) {
    goodClick();
    setImageData((prev) => {
      let dataCopy = prev.map((data) => {
        if (data.id === id) {
          data.clicked = true;
        }

        return { ...data };
      });
      dataCopy = randomizeImages(dataCopy);

      return dataCopy;
    });
  }

  function handleClick(id) {
    const item = findItem(imageData, id);

    if (item.clicked === false) {
      handleGoodClick(id);
    } else {
      handleBadClick();
    }
  }

  function findItem(arr, id) {
    return arr.find((item) => item.id === id);
  }

  return (
    <>
      {imageData ? (
        <div className="images">
          {imageData.map((data) => (
            <ImageCard
              url={data.url}
              onClick={handleClick}
              key={data.id}
              id={data.id}
            />
          ))}
        </div>
      ) : (
        <div className="loading">Loading Images</div>
      )}
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
      return { url: data.sprites.other.home.front_shiny, id: id };
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
  const maxId = 1025;

  while (ids.size < 15) {
    const randomId = Math.floor(Math.random() * maxId) + 1;
    if (ids.has(randomId)) continue;

    ids.add(randomId);
  }

  return ids;
}
