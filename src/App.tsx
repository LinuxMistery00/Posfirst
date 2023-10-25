import React, { useState, useEffect, ChangeEvent } from 'react';

function App() {
  const [nome, setNome] = useState<string>(''); // Especifique o tipo 'string' para 'nome'
  const [email, setEmail] = useState<string>(''); // Especifique o tipo 'string' para 'email'
  const [pessoas, setPessoas] = useState<any[]>([]);

  const handleSubmit = async () => {
    try {
      const response = await fetch('http://localhost:3001/pessoas', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nome, email }),
      });
      const data = await response.json();
      console.log('Pessoa adicionada com o ID: ' + data.id);
      setNome('');
      setEmail('');
      fetchData();
    } catch (error) {
      console.error('Erro ao adicionar pessoa: ', error);
    }
  };

  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:3001/pessoas');
      const data = await response.json();
      setPessoas(data);
    } catch (error) {
      console.error('Erro ao buscar pessoas: ', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <input
        type="text"
        placeholder="Nome"
        value={nome}
        onChange={(e: ChangeEvent<HTMLInputElement>) => setNome(e.target.value)}
      />
      <input
        type="text"
        placeholder="E-mail"
        value={email}
        onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
      />
      <button onClick={handleSubmit}>Adicionar Pessoa</button>

      <h2>Pessoas</h2>
      <ul>
        {pessoas.map((pessoa) => (
          <li key={pessoa.id}>{pessoa.nome} - {pessoa.email}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
