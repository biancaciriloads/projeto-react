import { useState, useEffect } from 'react';

export function CatGame() {
    const [isPlaying, setIsPlaying] = useState(false);
    const [level, setLevel] = useState(1);
    const [score, setScore] = useState(0);
    const [energy, setEnergy] = useState(0);
    const [isJumping, setIsJumping] = useState(false);
    const [won, setWon] = useState(false);

    // Posição horizontal do gatinho na pista (em %)
    const [catPosition, setCatPosition] = useState(10);
    // Estado para controlar se o petisco atual já foi pego (some da tela)
    const [hasTreat, setHasTreat] = useState(true);

    const maxEnergy = level * 40;

    // Controle por Teclado (Setas e Espaço)
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (!isPlaying) return;

            if ((e.code === 'Space' || e.code === 'ArrowUp') && !isJumping) {
                e.preventDefault();
                triggerJump();
            } else if (e.code === 'ArrowRight') {
                e.preventDefault();
                moveForward();
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isPlaying, isJumping, catPosition, hasTreat]);

    const triggerJump = () => {
        setIsJumping(true);
        setTimeout(() => {
            setIsJumping(false);
        }, 600);
    };

    const moveForward = () => {
        setCatPosition((prev) => {
            const nextPos = prev + 10;
            // Se chegou perto do petisco (80%) e ele ainda está visível
            if (nextPos >= 75 && hasTreat) {
                handleCollect();
            }
            if (nextPos >= 90) {
                return 90; // Limite da pista
            }
            return nextPos;
        });
    };

    const startGame = () => {
        setIsPlaying(true);
        setScore(0);
        setEnergy(0);
        setLevel(1);
        setCatPosition(10);
        setHasTreat(true);
        setWon(false);
    };

    const handleCollect = () => {
        if (!hasTreat) return;

        setHasTreat(false); // O petisco some imediatamente
        const nextEnergy = energy + 20;
        const nextScore = score + 100;
        setScore(nextScore);

        if (nextEnergy >= maxEnergy) {
            if (level < 3) {
                setLevel(level + 1);
                setEnergy(0);
                // Reseta o gato e gera um novo petisco para o próximo nível
                setTimeout(() => {
                    setCatPosition(10);
                    setHasTreat(true);
                }, 500);
            } else {
                setWon(true);
                setIsPlaying(false);
            }
        }
    };

    const resetForNextTreat = () => {
        setCatPosition(10);
        setHasTreat(true);
    };

    return (
        <div className="bg-white p-6 rounded-2xl shadow-xl border border-gray-100 max-w-2xl mx-auto text-center font-sans">
            <div className="flex justify-between items-center mb-4 px-2">
                <div>
                    <h2 className="text-xl font-black text-gray-800">🐱 Aventura Felina: Rumo à Soneca</h2>
                    <p className="text-xs text-gray-500">Nível {level} de 3 — Use a ➡️ para avançar e ⬆️/Espaço para pular!</p>
                </div>
                <div className="bg-amber-100 text-amber-800 px-3 py-1 rounded-full text-xs font-bold">
                    Pontos: {score}
                </div>
            </div>

            {/* Barra de Progresso de Energia */}
            <div className="mb-4 px-2">
                <div className="flex justify-between text-xs font-semibold text-gray-600 mb-1">
                    <span>Energia para a Cama (Nível {level})</span>
                    <span>{energy} / {maxEnergy}</span>
                </div>
                <div className="w-full bg-gray-200 h-3 rounded-full overflow-hidden">
                    <div
                        className="bg-emerald-500 h-full transition-all duration-300"
                        style={{ width: `${(energy / maxEnergy) * 100}%` }}
                    ></div>
                </div>
            </div>

            {/* Cenário do Jogo Horizontal */}
            <div className="relative h-56 bg-gradient-to-b from-sky-200 via-sky-100 to-amber-100 rounded-2xl overflow-hidden border-2 border-gray-200 flex items-end p-6 shadow-inner mb-6">

                {/* Tela Inicial */}
                {!isPlaying && !won && (
                    <div className="absolute inset-0 bg-black/50 backdrop-blur-sm flex flex-col items-center justify-center text-white p-6 z-20">
                        <h3 className="text-2xl font-bold mb-2">Pronto para Correr?</h3>
                        <p className="text-xs text-gray-200 mb-6 max-w-xs">
                            Pressione a tecla ➡️ **Seta Direita** para o gatinho caminhar para frente e ⬆️ **Seta para Cima** (ou Espaço) para pular os obstáculos!
                        </p>
                        <button
                            onClick={startGame}
                            className="bg-amber-500 hover:bg-amber-600 text-white font-bold py-3 px-8 rounded-xl shadow-lg transition-all transform hover:scale-105 cursor-pointer"
                        >
                            Iniciar Jogo
                        </button>
                    </div>
                )}

                {/* Tela de Vitória */}
                {won && (
                    <div className="absolute inset-0 bg-emerald-950/90 flex flex-col items-center justify-center text-white p-6 z-20">
                        <span className="text-5xl mb-2">🛏️💤</span>
                        <h3 className="text-2xl font-bold mb-1">Missão Cumprida! Hora da Soneca!</h3>
                        <p className="text-xs text-emerald-200 mb-6">O gatinho chegou à caminha após percorrer toda a aventura.</p>
                        <button
                            onClick={startGame}
                            className="bg-white text-emerald-950 font-bold py-2.5 px-6 rounded-xl text-sm shadow hover:bg-emerald-50 transition-all cursor-pointer"
                        >
                            Jogar Novamente
                        </button>
                    </div>
                )}

                {/* Paisagem de Fundo */}
                <div className="absolute inset-0 opacity-20 pointer-events-none flex justify-around items-start pt-4 text-2xl">
                    ☁️ 🌳 ☁️ 🏡 ☁️
                </div>

                {/* Chão */}
                <div className="absolute bottom-0 left-0 right-0 h-10 bg-amber-800 border-t-4 border-amber-600"></div>

                {/* Elementos na Pista durante o Jogo */}
                {isPlaying && (
                    <div className="w-full relative h-full flex items-end pb-2">

                        {/* Gatinho (invertido horizontalmente com scale-x-[-1] para olhar para a direita) */}
                        <div
                            className={`absolute text-5xl transition-all duration-200 transform scale-x-[-1] ${isJumping ? '-translate-y-24 scale-x-[-1] scale-110' : 'translate-y-0'
                                }`}
                            style={{ left: `${catPosition}%` }}
                        >
                            🐈
                        </div>

                        {/* Obstáculo no meio do caminho */}
                        <div className="absolute left-1/2 bottom-2 text-3xl animate-pulse" title="Obstáculo">
                            🧶
                        </div>

                        {/* Petisco (só aparece se hasTreat for true, some ao ser pego) */}
                        {hasTreat ? (
                            <button
                                onClick={handleCollect}
                                className="absolute right-12 bottom-2 text-3xl animate-bounce bg-white/80 p-1.5 rounded-full shadow-md hover:scale-125 transition-transform cursor-pointer"
                                title="Clique ou aproxime-se para pegar o petisco!"
                            >
                                🐟
                            </button>
                        ) : (
                            <div className="absolute right-12 bottom-2 text-xs text-emerald-700 font-bold bg-emerald-100 px-2 py-1 rounded-md animate-fade-in">
                                +25% Energia! ✨
                            </div>
                        )}
                    </div>
                )}
            </div>

            {/* Controles de Tela e Próximo Petisco */}
            {isPlaying && (
                <div className="flex gap-4 justify-center items-center">
                    <button
                        onClick={moveForward}
                        className="flex-1 bg-amber-500 hover:bg-amber-600 text-white font-bold py-3 px-6 rounded-xl shadow transition-colors active:scale-95 cursor-pointer"
                    >
                        ➡️ Avançar (Seta Direita)
                    </button>
                    <button
                        onClick={triggerJump}
                        className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-6 rounded-xl shadow transition-colors active:scale-95 cursor-pointer"
                    >
                        ⬆️ Pular (Espaço / Seta Acima)
                    </button>
                    {!hasTreat && level < 3 && (
                        <button
                            onClick={resetForNextTreat}
                            className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 px-4 rounded-xl shadow text-xs cursor-pointer animate-bounce"
                        >
                            Próximo Petisco ➡️
                        </button>
                    )}
                </div>
            )}
        </div>
    );
}
