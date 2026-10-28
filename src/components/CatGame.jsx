import { useState, useEffect } from 'react';

export function CatGame() {
    const [isPlaying, setIsPlaying] = useState(false);
    const [energy, setEnergy] = useState(0);
    const [isJumping, setIsJumping] = useState(false);
    const [gameOver, setGameOver] = useState(false);
    const [won, setWon] = useState(false);

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.code === 'Space' && isPlaying && !isJumping) {
                e.preventDefault();
                triggerJump();
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isPlaying, isJumping]);

    const triggerJump = () => {
        setIsJumping(true);
        setTimeout(() => {
            setIsJumping(false);
        }, 500);
    };

    const handleCollectTreat = () => {
        const newEnergy = energy + 25;
        setEnergy(newEnergy);
        if (newEnergy >= 100) {
            setWon(true);
            setIsPlaying(false);
        }
    };

    const startGame = () => {
        setIsPlaying(true);
        setEnergy(0);
        setGameOver(false);
        setWon(false);
    };

    return (
        <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-100 max-w-xl mx-auto text-center">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">🐱 Aventura do Gatinho</h2>
            <p className="text-sm text-gray-500 mb-6">Pule os obstáculos, colete petiscos e alcance a soneca!</p>

            {/* Barra de Energia / Progresso */}
            <div className="mb-4">
                <div className="flex justify-between text-xs font-semibold text-gray-600 mb-1">
                    <span>Energia para a Soneca</span>
                    <span>{energy}%</span>
                </div>
                <div className="w-full bg-gray-200 h-3 rounded-full overflow-hidden">
                    <div
                        className="bg-amber-500 h-full transition-all duration-300"
                        style={{ width: `${energy}%` }}
                    ></div>
                </div>
            </div>

            {/* Tela do Jogo */}
            <div className="relative h-48 bg-gradient-to-b from-sky-100 to-amber-50 rounded-xl overflow-hidden border border-gray-200 flex items-end justify-between p-6 mb-6">

                {!isPlaying && !gameOver && !won && (
                    <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-white p-4">
                        <p className="mb-4 text-sm font-medium">Pressione o botão ou a Barra de Espaço para pular!</p>
                        <button
                            onClick={startGame}
                            className="bg-amber-500 hover:bg-amber-600 text-white font-bold py-2.5 px-6 rounded-xl shadow-lg transition-all"
                        >
                            Iniciar Jogo
                        </button>
                    </div>
                )}

                {won && (
                    <div className="absolute inset-0 bg-emerald-900/80 flex flex-col items-center justify-center text-white p-4">
                        <h3 className="text-xl font-bold mb-1">🎉 Meta Batida! Ração e Soneca!</h3>
                        <p className="text-xs text-emerald-200 mb-4">O gatinho comeu bem e caprichou no cochilo.</p>
                        <button
                            onClick={startGame}
                            className="bg-white text-emerald-900 font-bold py-2 px-5 rounded-xl text-sm"
                        >
                            Jogar de Novo
                        </button>
                    </div>
                )}

                {/* Personagem Gatinho */}
                <div className={`text-4xl transition-all duration-300 transform ${isJumping ? '-translate-y-20' : 'translate-y-0'}`}>
                    🐈
                </div>

                {/* Elemento Interativo / Petisco para coletar */}
                {isPlaying && (
                    <div className="flex items-center gap-4">
                        <button
                            onClick={handleCollectTreat}
                            className="text-2xl animate-bounce bg-white p-2 rounded-full shadow-md hover:scale-110 transition-transform cursor-pointer"
                            title="Pegar petisco!"
                        >
                            🐟
                        </button>
                    </div>
                )}
            </div>

            {/* Controles */}
            {isPlaying && (
                <div className="flex gap-3 justify-center">
                    <button
                        onClick={triggerJump}
                        className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-6 rounded-xl shadow transition-colors"
                    >
                        Pular (Espaço)
                    </button>
                    <button
                        onClick={handleCollectTreat}
                        className="bg-amber-500 hover:bg-amber-600 text-white font-semibold py-2 px-6 rounded-xl shadow transition-colors"
                    >
                        Pegar Petisco 🐟
                    </button>
                </div>
            )}
        </div>
    );
}