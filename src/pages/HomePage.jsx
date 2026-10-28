import { Link } from 'react-router-dom';

export function HomePage() {
  const features = [
    {
      icon: '🎮',
      title: 'Mini-Game Interativo',
      description: 'Aventura do Gatinho com animações, teclado, cliques e barra de progresso até a soneca.',
    },
    {
      icon: '🌐',
      title: 'Consumo de API Real',
      description: 'Integração com The Cat API para buscar raças e imagens de felinos com loading e tratamento de erros.',
    },
    {
      icon: '📝',
      title: 'Formulário Controlado',
      description: 'Cadastro completo com validação em tempo real, múltiplos estados e feedback visual moderno.',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-emerald-50 flex flex-col">
      <main className="flex-1 flex flex-col items-center justify-center p-6">
        <div className="max-w-4xl w-full text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-black text-gray-800 mb-4">
            Bem-vindo ao <span className="text-amber-600">CatLab</span>
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Projeto acadêmico SENAI demonstrando conceitos fundamentais do React:
            componentes, hooks, roteamento, consumo de API e formulários controlados.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl w-full mb-12">
          {features.map((feature, index) => (
            <Link
              key={index}
              to={['/jogo', '/api', '/cadastro'][index]}
              className="group bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-xl hover:border-amber-200 transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </Link>
          ))}
        </div>

        <div className="flex gap-4 justify-center">
          <Link
            to="/jogo"
            className="bg-amber-500 hover:bg-amber-600 text-white font-bold py-3 px-8 rounded-xl shadow-lg transition-all transform hover:scale-105"
          >
            Começar Jogando 🎮
          </Link>
          <Link
            to="/api"
            className="bg-white border-2 border-amber-500 text-amber-600 hover:bg-amber-50 font-bold py-3 px-8 rounded-xl transition-all"
          >
            Ver API de Gatos 🌐
          </Link>
        </div>
      </main>

      <footer className="py-6 text-center text-sm text-gray-500 border-t border-gray-100 bg-white">
        <p>SENAI - Frameworks Front-end | React + Vite + Tailwind CSS + React Router</p>
      </footer>
    </div>
  );
}

export default HomePage;