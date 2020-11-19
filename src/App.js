import React, { useState, useEffect } from "react";
import api from "./services/api";

import "./styles.css";


function App() {
  const [repositories, setRepositories] = useState([]);

  async function handleAddRepository() {
    const repository = {
      title: `Projeto Pessoal #${(Math.random() * 32).toFixed(0)} `,
      url: 'https://github.com/andremoreirafocus/reactbasicapp',
      techs: ["ReactJS",  "Javascript"],
    };

    const response = api.post('repositories', repository);
    if (response.status === 201) {
      console.log('Repository created!');
      setRepositories([...repositories, repository]);
    }
  }

  async function handleRemoveRepository(id) {
    api.delete(`repositories/${id}`).then(response => {
      console.log(response);
      if (response.status === 204 ) {
        console.log('Removido com sucesso!');
        setRepositories(repositories.filter(repository => repository.id !== id));
      }
    })
  }

  useEffect(() => {
    api.get('repositories').then(response => {
      setRepositories(response.data);
    });
  }, [repositories]);

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repository => {
          return (
          <li key={repository.id}> {repository.title}
            <button onClick={() => handleRemoveRepository(repository.id)}>Remover</button>
          </li> )
        })}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
