import { useState } from "react";
import JSX from "./components/JSX.jsx";
import Componentes from "./components/Componentes.jsx";
import Props from "./components/Props.jsx";
import VirtualDOM from "./components/VirtualDOM.jsx";
import ListasKeys from "./components/ListasKeys.jsx";
import RenderizacaoCondicional from "./components/RenderizacaoCondicional.jsx";
import "./styles/global.css";

const conceitos = [
  { id: "jsx", numero: "01", titulo: "JSX", descricao: "Como escrever a interface usando sintaxe semelhante a HTML.", Componente: JSX },
  { id: "componentes", numero: "02", titulo: "Componentes", descricao: "Como dividir a interface em partes reutilizáveis.", Componente: Componentes },
  { id: "props", numero: "03", titulo: "Props", descricao: "Como passar informações entre componentes.", Componente: Props },
  { id: "virtual-dom", numero: "04", titulo: "Virtual DOM", descricao: "Como o React atualiza a interface quando os dados mudam.", Componente: VirtualDOM },
  { id: "listas", numero: "05", titulo: "Listas e keys", descricao: "Como renderizar coleções de elementos com map() e key.", Componente: ListasKeys },
  { id: "condicional", numero: "06", titulo: "Renderização condicional", descricao: "Como mostrar conteúdos diferentes conforme uma condição.", Componente: RenderizacaoCondicional },
];

export default function App() {
  const [selecionado, setSelecionado] = useState(null);
  const atual = conceitos.find((item) => item.id === selecionado);

  if (atual) {
    const PaginaConceito = atual.Componente;
    return (
      <main className="page detail-page">
        <button className="back-button" onClick={() => setSelecionado(null)}>
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
          <button className="concept-card" key={id} onClick={() => setSelecionado(id)}>
            <span className="number">{numero}</span>
            <span className="card-title">{titulo}</span>
            <span className="card-description">{descricao}</span>
            <span className="card-action">Explorar conceito <span aria-hidden="true">→</span></span>
          </button>
        ))}
      </section>
    </main>
  );
}
