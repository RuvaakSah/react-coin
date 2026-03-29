import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function Favorites() {
  const [favorites, setFavorites] = useState([]);
  const API_KEY = import.meta.env.VITE_API_KEY;

  useEffect(() => {
    const favIds = JSON.parse(localStorage.getItem('favorites')) || [];
    
    if (favIds.length > 0) {
      fetch("https://api.coincap.io/v2/assets", {
        headers: { Authorization: `Bearer ${API_KEY}` }
      })
        .then(res => res.json())
        .then(data => {
          const filtered = data.data.filter(coin => favIds.includes(coin.id));
          setFavorites(filtered);
        });
    }
  }, []);

  if (favorites.length === 0) return <p>No tienes criptomonedas favoritas aún.</p>;

  return (
    <div>
      <h1>Tus Favoritos</h1>
      <ul>
        {favorites.map(coin => (
          <li key={coin.id}>
            <Link to={`/coin/${coin.id}`}>{coin.name} - ${parseFloat(coin.priceUsd).toFixed(2)}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}