export default function Images({ goodClick, badClick }) {
  return (
    <>
      <button onClick={goodClick}>Good</button>
      <button onClick={badClick}>Bad</button>
    </>
  );
}
