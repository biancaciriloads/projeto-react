
import { useEffect, useState } from "react";

export default function UseEffect() {
  const [agora, setAgora] = useState(new Date());

  useEffect(() => {
    const intervalo = setInterval(() => {
      setAgora(new Date());
    }, 1000);

    return () => clearInterval(intervalo);
  }, []);

  return (
    <article className="concept">
      <span className="number">08</span>
      <h2>useEffect</h2>

      <p>
        O useEffect permite sincronizar um componente com
        sistemas externos, como temporizadores, eventos
        do navegador e APIs.
      </p>

      <h3>1. Criando um efeito</h3>

      <pre><code>{`useEffect(() => {
  // Executa o efeito.

  return () => {
    // Limpa o efeito.
  };
}, []);`}</code></pre>

      <p>
        A lista de dependências determina quando o efeito
        precisa ser executado novamente.
      </p>

      <h3>2. Exemplo: relógio</h3>

      <div className="example-output">
        <p>Horário atual:</p>
        <h2>{agora.toLocaleTimeString("pt-BR")}</h2>
      </div>

      <pre><code>{`useEffect(() => {
  const intervalo = setInterval(() => {
    setAgora(new Date());
  }, 1000);

  return () => clearInterval(intervalo);
}, []);`}</code></pre>

      <h3>3. Entendendo as dependências</h3>

      <ul>
        <li>
          <code>useEffect(() =&gt; ...)</code>: executa após
          cada renderização confirmada.
        </li>
        <li>
          <code>useEffect(() =&gt; ..., [])</code>: não depende
          de valores reativos do componente.
        </li>
        <li>
          <code>useEffect(() =&gt; ..., [valor])</code>:
          acompanha mudanças em valor.
        </li>
      </ul>

      <p className="note">
        No desenvolvimento com Strict Mode, o React pode
        executar um ciclo adicional de configuração e limpeza.
      </p>


    </article>
  );
}
