import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchSinglePodcast } from "../api/fetchPodcasts";
import { formatDate } from "../utils/formatDate";
import styles from "./ShowDetail.module.css";

export default function ShowDetail({ genres = [] }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [podcast, setPodcast] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setError(null);
    setPodcast(null);
    fetchSinglePodcast(id, setPodcast, setError, setLoading);
  }, [id]);

  const genreLabels = podcast?.genres?.map((genreId) => {
    const match = genres.find((genre) => genre.id === genreId);
    return match ? match.title : `Genre ${genreId}`;
  });

  return (
    <div className={styles.page}>
      <button className={styles.backButton} onClick={() => navigate(-1)}>
        ← Back
      </button>

      {loading && <div className={styles.message}>Loading podcast...</div>}

      {error && (
        <div className={styles.error}>
          Error occurred while fetching podcast: {error}
        </div>
      )}

      {!loading && !error && podcast && (
        <article className={styles.detail}>
          <header className={styles.header}>
            <img
              src={podcast.image}
              alt={podcast.title}
              className={styles.cover}
            />
            <div className={styles.headerInfo}>
              <h1>{podcast.title}</h1>
              <div className={styles.tags}>
                {genreLabels?.map((label) => (
                  <span key={label} className={styles.tag}>
                    {label}
                  </span>
                ))}
              </div>
              <p className={styles.updated}>
                Updated {formatDate(podcast.updated)}
              </p>
            </div>
          </header>

          {podcast.description && (
            <p className={styles.description}>{podcast.description}</p>
          )}

          <section className={styles.seasons}>
            <h2>Seasons</h2>
            {podcast.seasons?.length ? (
              podcast.seasons.map((season, seasonIndex) => (
                <details
                  key={season.id ?? seasonIndex}
                  className={styles.season}
                >
                  <summary className={styles.seasonSummary}>
                    {season.title} • {season.episodes?.length ?? 0} episodes
                  </summary>
                  <div className={styles.episodeList}>
                    {season.episodes?.map((episode, episodeIndex) => (
                      <article
                        key={episode.id ?? episodeIndex}
                        className={styles.episode}
                      >
                        <div className={styles.episodeMeta}>
                          <span>
                            S{seasonIndex + 1} • E{episodeIndex + 1}
                          </span>
                          <h3>{episode.title}</h3>
                        </div>
                        <p className={styles.episodeDescription}>
                          {episode.description
                            ? episode.description.length > 160
                              ? `${episode.description.slice(0, 160)}…`
                              : episode.description
                            : "No description available."}
                        </p>
                      </article>
                    ))}
                  </div>
                </details>
              ))
            ) : (
              <p>No seasons available for this show.</p>
            )}
          </section>
        </article>
      )}
    </div>
  );
}
