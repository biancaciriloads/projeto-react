
import { useEffect, useState } from "react";

export default function ConsumoAPIs() {
  const [publicacoes, setPublicacoes] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");
  const [tentativa, setTentativa] = useState(0);

  useEffect(() => {
    const controlador = new AbortController();

    async function carregar() {
      setCarregando(true);
      setErro("");

      try {
        const resposta = await fetch(
          "https://jsonplaceholder.typicode.com/posts?_limit=5",
          { signal: controlador.signal }
        );

        if (!resposta.ok) {
          throw new Error("Não foi possível carregar as publicações.");
        }

        const dados = await resposta.json();
        setPublicacoes(dados);
      } catch (erroRecebido) {
        if (erroRecebido.name !== "AbortError") {
          setErro("Falha ao consultar a API. Tente novamente.");
        }
      } finally {
        if (!controlador.signal.aborted) {
          setCarregando(false);
        }
      }
    }

    carregar();

    return () => controlador.abort();
  }, [tentativa]);

  return (
    <article className="concept">
      <span className="number">09</span>
      <h2>Consumo de APIs</h2>

      <p>
        Uma API permite que aplicações troquem informações.
        Com fetch, podemos buscar dados externos e apresentá-los
        na interface React.
      </p>

      <h3>1. Fazendo uma requisição</h3>

      <pre><code>{`const resposta = await fetch(url);

if (!resposta.ok) {
  throw new Error("Falha na consulta");
}

const dados = await resposta.json();`}</code></pre>

      <h3>2. Publicações da API</h3>

      <button
        type="button"
        onClick={() => setTentativa((valor) => valor + 1)}
        disabled={carregando}
      >
        {carregando ? "Carregando..." : "Buscar publicações"}
      </button>

      {carregando && (
        <p role="status">Carregando publicações...</p>
      )}

      {erro && (
        <p className="example-output" role="alert">
          {erro}
        </p>
      )}

      {!carregando && !erro && publicacoes.length === 0 && (
        <p>Nenhuma publicação encontrada.</p>
      )}

      {!carregando && !erro && (
        <ul>
          {publicacoes.map((publicacao) => (
            <li key={publicacao.id}>
              <strong>{publicacao.id}. </strong>
              {publicacao.title}
            </li>
          ))}
        </ul>
      )}

      <h3>3. Estados da interface</h3>

      <ul>
        <li>Carregando: a consulta ainda está em andamento.</li>
        <li>Sucesso: os dados foram recebidos.</li>
        <li>Erro: a consulta não pôde ser concluída.</li>
        <li>Vazio: a consulta não retornou registros.</li>
      </ul>

      <p className="note">
        Este exemplo depende de conexão com a internet e da
        disponibilidade da API pública.
      </p>

      <h3>Desafio</h3>
      <p>
        Adicione um campo de pesquisa para filtrar as publicações
        carregadas pelo título.
      </p>
    </article>
  );
}
