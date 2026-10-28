import { CatGame } from '../components/CatGame';

export function GamePage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-xl mx-auto">
        <header className="mb-8 text-center">
          <h1 className="text-3xl font-black text-gray-800 mb-2">🎮 Aventura do Gatinho</h1>
          <p className="text-gray-600">Pule obstáculos, colete petiscos e alcance a soneca perfeita!</p>
        </header>

        <CatGame />

        <div className="mt-8 p-6 bg-white rounded-2xl shadow-sm border border-gray-100">
          <h2 className="text-xl font-bold text-gray-800 mb-4">📚 Conceitos Aplicados</h2>
          <ul className="space-y-2 text-gray-600">
            <li className="flex items-center gap-2"><span className="text-amber-500">✓</span> <strong>useState</strong> para estados do jogo (playing, energy, jumping, win/lose)</li>
            <li className="flex items-center gap-2"><span className="text-amber-500">✓</span> <strong>useEffect</strong> para listener de teclado (Space para pular)</li>
            <li className="flex items-center gap-2"><span className="text-amber-500">✓</span> <strong>Eventos de teclado e clique</strong> (keydown + onClick)</li>
            <li className="flex items-center gap-2"><span className="text-amber-500">✓</span> <strong>Animações CSS</strong> (transition, transform, animate-bounce)</li>
            <li className="flex items-center gap-2"><span className="text-amber-500">✓</span> <strong>Barra de progresso</strong> com largura dinâmica (0-100%)</li>
            <li className="flex items-center gap-2"><span className="text-amber-500">✓</span> <strong>Renderização condicional</strong> (tela inicial, jogando, vitória)</li>
            <li className="flex items-center gap-2"><span className="text-amber-500">✓</span> <strong>Componente reutilizável</strong> exportado via props</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default GamePage;