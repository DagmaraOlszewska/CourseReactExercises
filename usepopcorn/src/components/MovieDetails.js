export function MovieDetails({ selectedId, onCloseMovie }) {
  return (
    <div className="details">
      {selectedId && (
        <button className="btn-back" onClick={onCloseMovie}>
          &larr;
        </button>
      )}
      {selectedId}
    </div>
  );
}
