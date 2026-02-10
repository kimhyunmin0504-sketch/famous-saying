import React, { useEffect, useState } from "react";
import { quotes } from "./data/quotes";
import QuoteCard from "./components/QuoteCard";
import ArchBackground from "./background/ArchBackground";

function App() {
  const [current, setCurrent] = useState(() => quotes[Math.floor(Math.random() * quotes.length)]);
  const [favorites, setFavorites] = useState<string[]>(() => {
    try {
      const raw = localStorage.getItem("favorites");
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  function nextQuote() {
    const idx = Math.floor(Math.random() * quotes.length);
    setCurrent(quotes[idx]);
  }

  function toggleFavorite(id: string) {
    setFavorites((prev) => (prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]));
  }

  return (
    <div className="app">
      <ArchBackground />
      <header>
        <h1>오늘의 명언</h1>
        <p className="subtitle">작은 위로와 힘이 되는 한 문장들</p>
      </header>

      <main>
        <QuoteCard quote={current} onToggleFavorite={toggleFavorite} isFavorited={favorites.includes(current.id)} />
        <div className="controls">
          <button onClick={nextQuote}>다음 명언</button>
          <button
            onClick={() => {
              const el = document.getElementById("favorites-list");
              if (el) el.classList.toggle("open");
            }}>
            저장된 명언 ({favorites.length})
          </button>
        </div>

        <section id="favorites-list" className="favorites">
          <h2>저장된 명언</h2>
          {favorites.length === 0 && <div className="empty">저장된 명언이 없습니다.</div>}
          <ul>
            {favorites.map((id) => {
              const q = quotes.find((x) => x.id === id);
              if (!q) return null;
              return (
                <li key={id}>
                  <blockquote>“{q.text}”</blockquote>
                  <cite>- {q.author}</cite>
                  <div className="fav-actions">
                    <button onClick={() => setCurrent(q)}>보기</button>
                    <button onClick={() => toggleFavorite(id)}>제거</button>
                  </div>
                </li>
              );
            })}
          </ul>
        </section>
      </main>

      <footer>
        <small>© 2026 Famous Saying — MVP</small>
      </footer>
    </div>
  );
}

export default App;
