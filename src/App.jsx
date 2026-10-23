
import { useState } from "react";

import JSX from "./components/JSX.jsx";
import Componentes from "./components/Componentes.jsx";
import Props from "./components/Props.jsx";
import VirtualDOM from "./components/VirtualDOM.jsx";
import ListasKeys from "./components/ListasKeys.jsx";
import RenderizacaoCondicional from "./components/RenderizacaoCondicional.jsx";
import StateUseState from "./components/StateUseState.jsx";
import Formularios from "./components/Formularios.jsx";
import UseEffect from "./components/UseEffect.jsx";
import ConsumoAPIs from "./components/ConsumoAPIs.jsx";
import ReactRouter from "./components/ReactRouter.jsx";

import "./styles/global.css";

const conceitos = [
  {
    id: "jsx",
    numero: "01",
    titulo: "JSX",
    descricao: "Como escrever a interface usando sintaxe semelhante a HTML.",
    Componente: JSX,
  },
  {
    id: "componentes",
    numero: "02",
    titulo: "Componentes",
    descricao: "Como dividir a interface em partes reutilizáveis.",
    Componente: Componentes,
  },
  {
    id: "props",
    numero: "03",
    titulo: "Props",
    descricao: "Como passar informações entre componentes.",
    Componente: Props,
  },
  {
    id: "virtual-dom",
    numero: "04",
    titulo: "Virtual DOM",
    descricao: "Como o React atualiza a interface quando os dados mudam.",
    Componente: VirtualDOM,
  },
  {
    id: "listas",
    numero: "05",
    titulo: "Listas e keys",
    descricao: "Como renderizar coleções com map() e key.",
    Componente: ListasKeys,
  },
  {
    id: "condicional",
    numero: "06",
    titulo: "Renderização condicional",
    descricao: "Como mostrar conteúdos diferentes conforme uma condição.",
    Componente: RenderizacaoCondicional,
  },
  {
    id: "state",
    numero: "07",
    titulo: "State e useState",
    descricao: "Como armazenar informações e atualizar a interface.",
    Componente: StateUseState,
  },
  {
    id: "formularios",
    numero: "08",
    titulo: "Formulários",
    descricao: "Como receber, validar e processar informações.",
    Componente: Formularios,
  },
  {
    id: "useeffect",
    numero: "09",
    titulo: "useEffect",
    descricao: "Como sincronizar componentes com sistemas externos.",
    Componente: UseEffect,
  },
  {
    id: "apis",
    numero: "10",
    titulo: "Consumo de APIs",
    descricao: "Como buscar e apresentar dados de serviços externos.",
    Componente: ConsumoAPIs,
  },
  {
    id: "router",
    numero: "11",
    titulo: "React Router",
    descricao: "Como organizar páginas e navegação por URLs.",
    Componente: ReactRouter,
  },
];

export default function App() {
  const [selecionado, setSelecionado] = useState(null);

  const atual = conceitos.find(
    (item) => item.id === selecionado
  );

  if (atual) {
    const PaginaConceito = atual.Componente;

    return (
      <main className="page detail-page">
        <button
          className="back-button"
          onClick={() => setSelecionado(null)}
        >
          ← Voltar aos conceitos
        </button>

        <PaginaConceito />
      </main>
    );
  }

  return (
    <main className="page home-page" aria-label="Conceitos React">
      <section className="concept-grid">
        {conceitos.map(({ id, numero, titulo, descricao }) => (
          <button
            className="concept-card"
            key={id}
            onClick={() => setSelecionado(id)}
          >
            <span className="number">{numero}</span>

            <span className="card-title">{titulo}</span>

            <span className="card-description">
              {descricao}
            </span>

            <span className="card-action">
              Explorar conceito <span aria-hidden="true">→</span>
            </span>
          </button>
        ))}
      </section>
    </main>
  );
}
