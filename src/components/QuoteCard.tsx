import React from "react";

type Quote = {
  id: string;
  text: string;
  author: string;
};

export default function QuoteCard({
  quote,
  onToggleFavorite,
  isFavorited,
}: {
  quote: Quote;
  onToggleFavorite: (id: string) => void;
  isFavorited: boolean;
}) {
  return (
    <article className="quote-card">
      <p className="quote-text">“{quote.text}”</p>
      <p className="quote-author">— {quote.author}</p>
      <div className="quote-actions">
        <button onClick={() => onToggleFavorite(quote.id)}>{isFavorited ? "저장함" : "저장"}</button>
        <button
          onClick={() => {
            const url = encodeURIComponent(`${quote.text} — ${quote.author}`);
            const shareUrl = `https://twitter.com/intent/tweet?text=${url}`;
            window.open(shareUrl, "_blank", "noopener");
          }}>
          공유
        </button>
      </div>
    </article>
  );
}
