
import { useState } from "react";

export default function VirtualDOM() {
  const [nomeReal, setNomeReal] = useState("Ana");
  const [nomeNovo, setNomeNovo] = useState("Ana");
  const [atualizado, setAtualizado] = useState(false);

  function editarNome(valor) {
    setNomeNovo(valor);
    setAtualizado(false);
  }

  function aplicarMudancas() {
    setNomeReal(nomeNovo);
    setAtualizado(true);
  }

  return (
    <article className="concept">
      <style>{`
        .trees { display:grid; grid-template-columns:1fr 1fr; gap:12px; margin:20px 0; }
        .tree { border:1px solid #ddd; border-radius:12px; padding:14px; text-align:center; }
        .node { padding:10px; margin:8px 0; border-radius:8px; background:#f1f1f8; }
        .new { background:#fff0bd; border:1px solid #d8a52b; }
        .real { background:#dff6e5; border:1px solid #51a66b; }
        .tree input { width:90%; min-width:0; }
        @keyframes pulse { from { transform:scale(.94); } to { transform:scale(1); } }
        .real { animation:pulse .35s ease; }
        @media(max-width:520px) { .trees { grid-template-columns:1fr; } }
      `}</style>

      <span className="number">04</span>
      <h2>Virtual DOM</h2>
      <p>
        Edite o nome abaixo. O Virtual DOM simulado muda primeiro;
        o DOM real permanece igual até você aplicar as mudanças.
      </p>

      <label>Editar nome:</label>
      <input
        value={nomeNovo}
        onChange={(e) => editarNome(e.target.value)}
        placeholder="Digite um nome"
      />

      <div className="trees">
        <section className="tree">
          <h3>Virtual DOM</h3>
          <div className="node">App</div>
          <div className="node">Perfil</div>
          <div className="node new">
            Nome: {nomeNovo || "(vazio)"}
          </div>
          <small>Nova representação</small>
        </section>

        <section className="tree">
          <h3>DOM real</h3>
          <div className="node">App</div>
          <div className="node">Perfil</div>
          <div className="node real">
            Nome: {nomeReal || "(vazio)"}
          </div>
          <small>Interface exibida</small>
        </section>
      </div>

      <button onClick={aplicarMudancas} disabled={nomeNovo === nomeReal}>
        Aplicar mudanças
      </button>

      {atualizado && (
        <p className="note">
          Mudanças aplicadas! O DOM real agora exibe o novo nome.
        </p>
      )}
    </article>
  );
}
