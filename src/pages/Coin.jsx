import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

export default function Coin() {
  const { id } = useParams();
  const [coin, setCoin] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const API_KEY = import.meta.env.VITE_API_KEY;

  useEffect(() => {
    // 1. Obtener datos de la moneda
    fetch(`https://api.coincap.io/v2/assets/${id}`, {
      headers: { Authorization: `Bearer ${API_KEY}` }
    })
      .then(res => res.json())
      .then(data => setCoin(data.data));

    // 2. Comprobar si ya es favorita
    const favs = JSON.parse(localStorage.getItem('favorites')) || [];
    setIsFavorite(favs.includes(id));
  }, [id]);

  const toggleFavorite = () => {
    let favs = JSON.parse(localStorage.getItem('favorites')) || [];
    if (favs.includes(id)) {
      favs = favs.filter(favId => favId !== id);
      setIsFavorite(false);
    } else {
      favs.push(id);
      setIsFavorite(true);
    }
    localStorage.setItem('favorites', JSON.stringify(favs));
  };

  if (!coin) return <p>Cargando...</p>;

  return (
    <div>
      <h1>{coin.name} ({coin.symbol})</h1>
      <button onClick={toggleFavorite}>
        {isFavorite ? '⭐ Quitar de favoritos' : '☆ Añadir a favoritos'}
      </button>
      <div style={{ marginTop: '20px', border: '1px solid #ddd', padding: '20px' }}>
        <p>Precio: ${parseFloat(coin.priceUsd).toFixed(4)}</p>
        <p>Market Cap: ${parseFloat(coin.marketCapUsd).toLocaleString()}</p>
        <p>Cambio 24h: {parseFloat(coin.changePercent24Hr).toFixed(2)}%</p>
      </div>
    </div>
  );
}