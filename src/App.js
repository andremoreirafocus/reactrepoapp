import React, { useState, useEffect } from "react";
import api from "./services/api";

import "./styles.css";


function App() {
  const [repositories, setRepositories] = useState([]);

  async function handleAddRepository() {

    const response = await api.post('repositories', {
      title: `Projeto Pessoal #${(Math.random() * 972).toFixed(0)} `,
      url: 'https://github.com/andremoreirafocus/reactbasicapp',
      techs: ["React",  "Javascript"],
    });

     if (response.status === 200) {
      console.log('Repository created!');
      const repository = response.data;
      setRepositories([...repositories, repository]);
     }
  }

  async function handleRemoveRepository(id) {
    const response = await api.delete(`repositories/${id}`)
    console.log(response);
    if (response.status === 204 ) {
      console.log('Repository removed!');
      setRepositories(repositories.filter(repository => repository.id !== id));
    }
  }

  useEffect(() => {
    api.get('repositories').then(response => {
      setRepositories(response.data);
    });
  }, []);

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
