import React, { useState, useEffect } from "react";

import "./styles.css";
import api from './services/api';

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get('repositories').then(response => {
      setRepositories(response.data);
    })
  }, []);

  async function handleAddRepository() {
    const repository = await api.post('repositories', {
      title: 'Awesome stuff!',
      url: 'localhost:3232/test',
      techs: ['tech1', 'tech2', 'tech3']
    });

    setRepositories([...repositories, repository.data]);
  }

  async function handleRemoveRepository(id) {
    await api.delete(`repositories/${id}`);
    const response = repositories.filter(repository => repository.id !== id);
    setRepositories(response);
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {
          repositories.map(repository => (
            <li key={repository.id}>
              {repository.title} - {repository.id}
              <button onClick={() => handleRemoveRepository(repository.id)}>Remover</button>
            </li>
          ))
        }
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
