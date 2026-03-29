import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import { PodcastProvider } from "./context/PodcastContext";
import { fetchPodcasts } from "./api/fetchPodcasts";
import { genres } from "./data";
import Header from "./components/Header";
import Home from "./pages/Home";
import ShowDetail from "./pages/ShowDetail";
import styles from "./App.module.css";

/**
 * Root component of the Podcast Explorer app.
 * Handles data fetching and route setup.
 */
export default function App() {
  const [podcasts, setPodcasts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchPodcasts(setPodcasts, setError, setLoading);
  }, []);

  return (
    <>
      <Header />

      <PodcastProvider initialPodcasts={podcasts}>
        <main className={styles.main}>
          <Routes>
            <Route
              path="/"
              element={<Home loading={loading} error={error} genres={genres} />}
            />
            <Route
              path="/show/:id"
              element={<ShowDetail genres={genres} />}
            />
          </Routes>
        </main>
      </PodcastProvider>
    </>
  );
}
