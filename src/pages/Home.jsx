import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
  // 1. Estados para los datos, la carga y posibles errores
  const [cryptos, setCryptos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 2. Traemos la API Key desde el archivo .env
  const API_KEY = import.meta.env.VITE_API_KEY;

  useEffect(() => {
    // Función para pedir los datos a CoinCap
    const fetchCryptos = async () => {
      try {
        setLoading(true);
        
        // Hacemos la petición a los "assets" (las monedas)
        const response = await fetch("https://api.coincap.io/v2/assets?limit=20", {
          method: 'GET',
          headers: {
            // AQUÍ es donde enviamos tu clave para que nos den permiso
            'Authorization': `Bearer ${API_KEY}`,
            'Accept-Encoding': 'gzip'
          }
        });

        if (!response.ok) {
          throw new Error(`Error: ${response.status} - No autorizado o límite excedido`);
        }

        const data = await response.json();
        setCryptos(data.data); // Guardamos el array de monedas
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCryptos();
  }, [API_KEY]); // Se ejecuta una vez al montar el componente

  // 3. Renderizado de la interfaz
  return (
    <div className="home-container">
      <h1>Criptomonedas en Tiempo Real</h1>
      <p>Explora las principales monedas del mercado</p>

      {loading && <p>Cargando datos del mercado...</p>}
      
      {error && (
        <div style={{ color: 'red', padding: '10px', background: '#ffeeee' }}>
          <p>Hubo un problema: {error}</p>
          <small>Revisa que tu API KEY en el archivo .env sea correcta.</small>
        </div>
      )}

      {!loading && !error && (
        <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
          <thead>
            <tr style={{ borderBottom: '2px solid #ccc', textAlign: 'left' }}>
              <th>Rango</th>
              <th>Nombre</th>
              <th>Precio (USD)</th>
              <th>Acción</th>
            </tr>
          </thead>
          <tbody>
            {cryptos.map((coin) => (
              <tr key={coin.id} style={{ borderBottom: '1px solid #eee' }}>
                <td>{coin.rank}</td>
                <td>
                  <strong>{coin.name}</strong> <small>{coin.symbol}</small>
                </td>
                <td>
                  ${parseFloat(coin.priceUsd).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </td>
                <td>
                  {/* Este Link nos lleva a la página de detalle de cada moneda */}
                  <Link 
                    to={`/coin/${coin.id}`} 
                    style={{ color: '#007bff', textDecoration: 'none', fontWeight: 'bold' }}
                  >
                    Ver detalle →
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}