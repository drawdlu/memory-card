import "../style/ImageCard.css";

export default function ImageCard({ onClick, url, id }) {
  return (
    <button onClick={() => onClick(id)}>
      <img src={url} class="pokemon-image" />
    </button>
  );
}
