import React, { useState, useEffect } from "react";

import "./styles.css";
import "./App.css";

import api from './services/api';

function App() {
  const [repositories, setRepositories] = useState([]);
  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');
  const [techs, setTechs] = useState([]);

  useEffect(() => {
    loadRepositories();
  }, [])

  async function loadRepositories() {
    const response = await api.get('repositories');

    setRepositories(response.data);
  }

  async function handleAddRepository() {
    const response = await api.post('repositories', {
      title,
      url,
      techs
    });

    setRepositories([...repositories, response.data]);

    setTitle('');
    setUrl('');
    setTechs('');
  }

  async function handleRemoveRepository(id) {
    await api.delete(`repositories/${id}`);
    
    setRepositories(repositories.filter(repo => repo.id !== id));
  }

  return (
    <div className="container"> 
      <form className="form">
        <input 
          value={title} 
          onChange={e => setTitle(e.target.value)} 
          className="add-input" 
          placeholder="Title" 
        />
        <input 
          value={url} 
          onChange={e => setUrl(e.target.value)} 
          className="add-input" 
          placeholder="Github URL" 
        />
        <input 
          value={techs} 
          onChange={e => setTechs(e.target.value)} 
          className="add-input" 
          placeholder="ReactJS, Nodejs..." 
        />
        <button 
          type="button" 
          className="add-button" 
          onClick={handleAddRepository}>ADICIONAR</button>
      </form>

      <ul className="repo-list" data-testid="repository-list">
       {repositories?.map(repo => (
          <li key={repo.id}>
            <p>{repo.title}</p>

            <button onClick={() => handleRemoveRepository(repo.id)}>
              REMOVER
            </button>
          </li>
       ))}
      </ul>
    </div>
  );
}

export default App;
