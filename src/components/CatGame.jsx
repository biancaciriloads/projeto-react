import { useState, useEffect } from 'react';

export function CatGame() {
    const [isPlaying, setIsPlaying] = useState(false);
    const [level, setLevel] = useState(1);
    const [score, setScore] = useState(0);
    const [energy, setEnergy] = useState(0);
    const [isJumping, setIsJumping] = useState(false);
    const [gameOver, setGameOver] = useState(false);
    const [won, setWon] = useState(false);

    // Metas de energia para cada nível (Nível 1, 2 e 3 até a cama)
    const maxEnergy = level * 50;

    // Gerenciamento de teclado (Barra de Espaço para Pular)
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
        }, 600); // Duração do pulo
    };

    const startGame = () => {
        setIsPlaying(true);
        setScore(0);
        setEnergy(0);
        setLevel(1);
        setGameOver(false);
        setWon(false);
    };

    // Ação de coletar petisco ao interagir/colidir
    const handleCollect = () => {
        const nextEnergy = energy + 10;
        const nextScore = score + 100;
        setScore(nextScore);

        if (nextEnergy >= maxEnergy) {
            if (level < 3) {
                setLevel(level + 1);
                setEnergy(0); // Avança de nível
            } else {
                setWon(true); // Chegou na cama no Nível 3!
                setIsPlaying(false);
            }
        } else {
            setEnergy(nextEnergy);
        }
    };

    return (
        <div className="bg-white p-6 rounded-2xl shadow-xl border border-gray-100 max-w-2xl mx-auto text-center font-sans">
            <div className="flex justify-between items-center mb-4 px-2">
                <div>
                    <h2 className="text-xl font-black text-gray-800">🐱 Aventura Felina: Rumo à Soneca</h2>
                    <p className="text-xs text-gray-500">Nível {level} de 3 — Desvie dos obstáculos e colete petiscos!</p>
                </div>
                <div className="bg-amber-100 text-amber-800 px-3 py-1 rounded-full text-xs font-bold">
                    Pontos: {score}
                </div>
            </div>

            {/* Barra de Progresso de Energia do Nível */}
            <div className="mb-4 px-2">
                <div className="flex justify-between text-xs font-semibold text-gray-600 mb-1">
                    <span>Progresso para o Nível Seguinte / Cama</span>
                    <span>{energy} / {maxEnergy}</span>
                </div>
                <div className="w-full bg-gray-200 h-3 rounded-full overflow-hidden">
                    <div
                        className="bg-emerald-500 h-full transition-all duration-300"
                        style={{ width: `${(energy / maxEnergy) * 100}%` }}
                    ></div>
                </div>
            </div>

            {/* Tela do Jogo / Cenário Horizontal em Movimento */}
            <div className="relative h-56 bg-gradient-to-b from-sky-200 via-sky-100 to-amber-100 rounded-2xl overflow-hidden border-2 border-gray-200 flex items-end p-6 shadow-inner mb-6">

                {/* Tela Inicial */}
                {!isPlaying && !gameOver && !won && (
                    <div className="absolute inset-0 bg-black/50 backdrop-blur-sm flex flex-col items-center justify-center text-white p-6 z-20">
                        <h3 className="text-2xl font-bold mb-2">Pronto para a Aventura?</h3>
                        <p className="text-xs text-gray-200 mb-6 max-w-xs">
                            Use a **Barra de Espaço** ou o botão **Pular** para desviar de obstáculos e clique em **🐟 Petisco** para coletar energia!
                        </p>
                        <button
                            onClick={startGame}
                            className="bg-amber-500 hover:bg-amber-600 text-white font-bold py-3 px-8 rounded-xl shadow-lg transition-all transform hover:scale-105"
                        >
                            Iniciar Jogo
                        </button>
                    </div>
                )}

                {/* Tela de Vitória (Chegou na Cama) */}
                {won && (
                    <div className="absolute inset-0 bg-emerald-950/90 flex flex-col items-center justify-center text-white p-6 z-20">
                        <span className="text-5xl mb-2">🛏️💤</span>
                        <h3 className="text-2xl font-bold mb-1">Missão Cumprida! Hora da Soneca!</h3>
                        <p className="text-xs text-emerald-200 mb-6">O gatinho comeu todos os petiscos e caprichou no cochilo.</p>
                        <button
                            onClick={startGame}
                            className="bg-white text-emerald-950 font-bold py-2.5 px-6 rounded-xl text-sm shadow hover:bg-emerald-50 transition-all"
                        >
                            Jogar Novamente
                        </button>
                    </div>
                )}

                {/* Fundo com efeito de movimento simulado (nuvens/cenário) */}
                <div className="absolute inset-0 opacity-20 pointer-events-none flex justify-around items-start pt-4 text-2xl animate-pulse">
                    ☁️ 🌳 ☁️ 🏡 ☁️
                </div>

                {/* Pista / Chão */}
                <div className="absolute bottom-0 left-0 right-0 h-10 bg-amber-800 border-t-4 border-amber-600"></div>

                {/* Elementos interativos na pista quando o jogo roda */}
                {isPlaying && (
                    <div className="w-full flex justify-between items-end relative z-10 pb-2">

                        {/* Personagem Gatinho com animação de pulo */}
                        <div className={`text-5xl transition-transform duration-300 transform ${isJumping ? '-translate-y-24 scale-110' : 'translate-y-0'}`}>
                            🐈
                        </div>

                        {/* Obstáculo simulado vindo na direção do gato */}
                        <div className="text-3xl animate-bounce text-red-600 font-bold" title="Obstáculo!">
                            🧶
                        </div>

                        {/* Petisco interativo para o gato coletar */}
                        <button
                            onClick={handleCollect}
                            className="text-3xl animate-pulse bg-white/80 p-2 rounded-full shadow-md hover:scale-125 transition-transform cursor-pointer"
                            title="Clique para pegar o petisco!"
                        >
                            🐟
                        </button>
                    </div>
                )}
            </div>

            {/* Painel de Controles */}
            {isPlaying && (
                <div className="flex gap-4 justify-center">
                    <button
                        onClick={triggerJump}
                        className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-6 rounded-xl shadow transition-colors active:scale-95"
                    >
                        ⬆️ Pular (Espaço)
                    </button>
                    <button
                        onClick={handleCollect}
                        className="flex-1 bg-amber-500 hover:bg-amber-600 text-white font-bold py-3 px-6 rounded-xl shadow transition-colors active:scale-95"
                    >
                        🐟 Pegar Petisco
                    </button>
                </div>
            )}
        </div>
    );
}