
import { useState } from "react";

export default function Formularios() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [aceitou, setAceitou] = useState(false);
  const [mensagem, setMensagem] = useState("");

  function enviar(evento) {
    evento.preventDefault();

    if (!aceitou) {
      setMensagem("Aceite a opção para continuar.");
      return;
    }

    setMensagem(`Cadastro realizado para ${nome}!`);
  }

  return (
    <article className="concept">
      <span className="number">07</span>
      <h2>Formulários em React</h2>

      <p>
        Formulários permitem receber informações dos usuários.
        Em React, podemos controlar os campos com useState,
        tratar o envio e validar os dados.
      </p>

      <h3>1. Campo controlado</h3>

      <pre><code>{`const [nome, setNome] = useState("");

<input
  value={nome}
  onChange={(evento) =>
    setNome(evento.target.value)
  }
/>`}</code></pre>

      <p>
        O valor do campo é controlado pelo estado React,
        atualizado a cada alteração.
      </p>

      <h3>2. Experimente o formulário</h3>

      <form onSubmit={enviar}>
        <label htmlFor="nome">Nome</label>
        <input
          id="nome"
          name="nome"
          value={nome}
          onChange={(evento) => setNome(evento.target.value)}
          required
          minLength={2}
        />

        <label htmlFor="email">E-mail</label>
        <input
          id="email"
          name="email"
          type="email"
          value={email}
          onChange={(evento) => setEmail(evento.target.value)}
          required
        />

        <label>
          <input
            type="checkbox"
            checked={aceitou}
            onChange={(evento) => setAceitou(evento.target.checked)}
          />
          Aceito continuar com o cadastro
        </label>

        <button type="submit">Enviar formulário</button>
      </form>

      {mensagem && (
        <p className="example-output" role="status">
          {mensagem}
        </p>
      )}

      <h3>3. Como funciona o envio?</h3>

      <pre><code>{`function enviar(evento) {
  evento.preventDefault();
  // Validar e processar os dados.
}`}</code></pre>

      <p className="note">
        O exemplo simula um cadastro no navegador.
        Em uma aplicação real, o servidor também deve validar
        os dados recebidos.
      </p>


    </article>
  );
}
