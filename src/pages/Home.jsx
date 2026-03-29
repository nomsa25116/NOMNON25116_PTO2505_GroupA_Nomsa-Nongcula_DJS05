import SearchBar from "../components/SearchBar";
import GenreFilter from "../components/GenreFilter";
import SortSelect from "../components/SortSelect";
import PodcastGrid from "../components/PodcastGrid";
import Pagination from "../components/Pagination";
import styles from "./Home.module.css";

/**
 * Home page for the podcast explorer.
 * Renders search, genre, sort controls and the podcast grid.
 *
 * @param {{loading: boolean, error: string|null, genres: {id:number,title:string}[]}} props
 */
export default function Home({ loading, error, genres = [] }) {
  return (
    <main className={styles.home}>
      <section className={styles.controls}>
        <SearchBar />
        <GenreFilter genres={genres} />
        <SortSelect />
      </section>

      {loading && (
        <div className={styles.messageContainer}>
          <div className={styles.spinner}></div>
          <p>Loading podcasts...</p>
        </div>
      )}

      {error && <div className={styles.error}>Error: {error}</div>}

      {!loading && !error && (
        <>
          <PodcastGrid genres={genres} />
          <Pagination />
        </>
      )}
    </main>
  );
}
