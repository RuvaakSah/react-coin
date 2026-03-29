import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Root from './pages/Root';
import Home from './pages/Home';
import Coin from './pages/Coin';
import Favorites from './pages/Favorites';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Root />}>
          <Route index element={<Home />} />
          <Route path="coin/:id" element={<Coin />} />
          <Route path="favorites" element={<Favorites />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;