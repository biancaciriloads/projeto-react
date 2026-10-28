import { useState, useEffect } from 'react';

export function ApiPage() {
  const [cats, setCats] = useState([]);
  const [breeds, setBreeds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedBreed, setSelectedBreed] = useState('');

  useEffect(() => {
    const fetchBreeds = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch('https://api.thecatapi.com/v1/breeds');
        if (!response.ok) throw new Error('Falha ao buscar raças');
        const data = await response.json();
        setBreeds(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchBreeds();
  }, []);

  useEffect(() => {
    if (!selectedBreed) {
      setCats([]);
      return;
    }

    const fetchCatsByBreed = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch(
          `https://api.thecatapi.com/v1/images/search?limit=8&breed_ids=${selectedBreed}&has_breeds=1`
        );
        if (!response.ok) throw new Error('Falha ao buscar imagens');
        const data = await response.json();
        setCats(data);
      } catch (err) {
        setError(err.message);
        setCats([]);
      } finally {
        setLoading(false);
      }
    };
    fetchCatsByBreed();
  }, [selectedBreed]);

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <header className="mb-8 text-center">
          <h1 className="text-3xl font-black text-gray-800 mb-2">🌐 API de Gatos</h1>
          <p className="text-gray-600">
            Consumo da <a href="https://thecatapi.com" target="_blank" rel="noopener" className="text-amber-600 hover:underline">The Cat API</a>
            para buscar raças e imagens de felinos.
          </p>
        </header>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-8">
          <label htmlFor="breed-select" className="block text-sm font-semibold text-gray-700 mb-2">
            Selecione uma raça:
          </label>
          <select
            id="breed-select"
            value={selectedBreed}
            onChange={(e) => setSelectedBreed(e.target.value)}
            className="w-full md:w-64 px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-colors"
            disabled={loading && breeds.length === 0}
          >
            <option value="">-- Escolha uma raça --</option>
            {loading && breeds.length === 0 ? (
              <option disabled>Carregando raças...</option>
            ) : (
              breeds.map((breed) => (
                <option key={breed.id} value={breed.id}>
                  {breed.name}
                </option>
              ))
            )}
          </select>
          {error && (
            <p className="mt-3 text-sm text-red-600 flex items-center gap-1">
              ⚠ {error}
            </p>
          )}
        </div>

        {loading && cats.length === 0 && selectedBreed && (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-10 w-10 border-3 border-amber-500 border-t-transparent"></div>
            <span className="ml-3 text-gray-600">Buscando gatinhos...</span>
          </div>
        )}

        {!loading && selectedBreed && cats.length === 0 && !error && (
          <div className="text-center py-12 text-gray-500">
            <p className="text-lg">Nenhuma imagem encontrada para esta raça.</p>
          </div>
        )}

        {cats.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {cats.map((cat) => (
              <div
                key={cat.id}
                className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-lg transition-shadow group"
              >
                <div className="aspect-square relative overflow-hidden bg-gray-100">
                  <img
                    src={cat.url}
                    alt={`Gato da raça ${cat.breeds?.[0]?.name || 'desconhecida'}`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                </div>
                {cat.breeds && cat.breeds.length > 0 && (
                  <div className="p-3 bg-gray-50 border-t border-gray-100">
                    <p className="font-semibold text-gray-800 text-sm truncate">
                      {cat.breeds[0].name}
                    </p>
                    <p className="text-xs text-gray-500 truncate">
                      {cat.breeds[0].origin}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        <div className="mt-8 p-6 bg-white rounded-2xl shadow-sm border border-gray-100">
          <h2 className="text-xl font-bold text-gray-800 mb-4">📚 Conceitos Aplicados</h2>
          <ul className="space-y-2 text-gray-600">
            <li className="flex items-center gap-2"><span className="text-amber-500">✓</span> <strong>useEffect</strong> para side effects (fetch de dados)</li>
            <li className="flex items-center gap-2"><span className="text-amber-500">✓</span> <strong>useState</strong> para múltiplos estados (cats, breeds, loading, error, selectedBreed)</li>
            <li className="flex items-center gap-2"><span className="text-amber-500">✓</span> <strong>Lista com .map</strong> renderizando cards de gatos</li>
            <li className="flex items-center gap-2"><span className="text-amber-500">✓</span> <strong>Renderização condicional</strong> (loading, error, empty state, lista)</li>
            <li className="flex items-center gap-2"><span className="text-amber-500">✓</span> <strong>Tratamento de erros</strong> com try/catch e estado de erro</li>
            <li className="flex items-center gap-2"><span className="text-amber-500">✓</span> <strong>Dependências do useEffect</strong> (selectedBreed para re-fetch)</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default ApiPage;