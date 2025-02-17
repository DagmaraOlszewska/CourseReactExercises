import { useEffect, useRef, useState } from "react";
import { StarRating } from "./StarRating";
import { Loader } from "./Loader";
import { useKey } from "../hooks/useKey";
const KEY = "bbe6463b";

export function MovieDetails({
  selectedId,
  onCloseMovie,
  onAddWatched,
  watched,
}) {
  const [movie, setMovie] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [userRating, setUserRating] = useState("");
  const countRef = useRef(0);

  const isWatched = watched.map((watch) => watch.imdbID).includes(selectedId);
  const watchedUserRating = watched.find(
    (watch) => watch.imdbID === selectedId
  )?.userRating;

  const {
    Title: title,
    Year: year,
    Poster: poster,
    Runtime: runtime,
    imdbRating,
    Plot: plot,
    Released: released,
    Actors: actors,
    Director: director,
    Genre: genre,
  } = movie;

  function handleAdd() {
    const newWatchedMovie = {
      imdbID: selectedId,
      title,
      year,
      poster,
      imdbRating: Number(imdbRating),
      runtime: runtime ? Number(runtime.split(" ").at(0)) : 0,
      userRating,
      countRatingDecisions: countRef.current,
    };
    onAddWatched(newWatchedMovie);
    onCloseMovie();
  }

  useEffect(
    function () {
      if (userRating) countRef.current++;
    },
    [userRating]
  );

  useEffect(
    function () {
      async function getMovieDetails() {
        setIsLoading(true);
        const res = await fetch(
          `http://www.omdbapi.com/?apikey=${KEY}&i=${selectedId}`
        );
        const data = await res.json();
        setMovie(data);
        setIsLoading(false);
      }
      getMovieDetails();
    },
    [selectedId]
  );

  useEffect(
    function () {
      if (!title) return;
      document.title = `Movie | ${title}`;

      return function () {
        document.title = "usePopcorn";
      };
    },
    [title]
  );

  useKey("Escape", onCloseMovie);

  return (
    <div className="details">
      {isLoading ? (
        <Loader />
      ) : (
        <>
          {" "}
          {selectedId && (
            <>
              <header>
                <button className="btn-back" onClick={onCloseMovie}>
                  &larr;
                </button>
                <img src={poster} alt={`Poster of ${movie}`} />
                <div className="details-overview">
                  <h2>{title}</h2>
                  <p>
                    {released} &bull; {runtime}
                  </p>
                  <p>{genre}</p>
                  <p>
                    <span>⭐️</span>
                    {imdbRating} iMDb rating
                  </p>
                </div>
              </header>
              <section>
                <div className="rating">
                  {!isWatched ? (
                    <>
                      <StarRating maxRating={10} onSetRating={setUserRating} />
                      {userRating > 0 && (
                        <button className="btn-add" onClick={handleAdd}>
                          Add to list
                        </button>
                      )}
                    </>
                  ) : (
                    <p>
                      You rated with movie {watchedUserRating} <span>🌟</span>
                    </p>
                  )}
                </div>
                <p>
                  <em>{plot}</em>
                </p>
                <p>Starring {actors}</p>
                <p>Directed by {director}</p>
              </section>
            </>
          )}
        </>
      )}
    </div>
  );
}
