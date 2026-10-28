import { Link } from 'react-router-dom';

export function Navbar() {
  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/jogo', label: 'O Jogo' },
    { path: '/api', label: 'API de Gatos' },
    { path: '/cadastro', label: 'Cadastro' },
  ];

  return (
    <nav className="w-full bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="text-xl font-black text-gray-800 flex items-center gap-2">
            <span>🐱</span> CatLab
          </Link>
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className="text-gray-600 hover:text-amber-600 font-medium transition-colors px-3 py-2 rounded-lg hover:bg-amber-50"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;