import { Outlet, Link } from 'react-router-dom';

export default function Root() {
  return (
    <div>
      <nav style={{ padding: '1rem', background: '#2c3e50', color: 'white' }}>
        <Link to="/" style={{ margin: '10px', color: 'white' }}>Home</Link>
        <Link to="/favorites" style={{ margin: '10px', color: 'white' }}>Favoritos</Link>
      </nav>
      <main style={{ padding: '20px' }}>
        <Outlet />
      </main>
    </div>
  );
}