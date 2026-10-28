import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { HomePage } from './pages/HomePage';
import { GamePage } from './pages/GamePage';
import { ApiPage } from './pages/ApiPage';
import { FormPage } from './pages/FormPage';

export function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Navbar />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/jogo" element={<GamePage />} />
            <Route path="/api" element={<ApiPage />} />
            <Route path="/cadastro" element={<FormPage />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;