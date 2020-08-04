import React, { useState, useEffect } from "react";
import api from './services/api'
import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([])

  useEffect(() => {
    api.get('/repositories').then(response => setRepositories(response.data))
  }, [])

  async function handleAddRepository() {
    const response = await api.post('/repositories', {
      title: `Repository ${Date.now()}`,
      techs: [ 'Angular1','VueJS1','Java1' ]
    })

    const repository = response.data
    setRepositories([...repositories, repository])
  }

  async function handleRemoveRepository(id) {
    const findIndex = repositories.findIndex(item => item.id === id)
    const repository = repositories.splice(findIndex, 1)
    setRepositories([...repositories])
    api.delete(`/repositories/${id}`)
  }

  return (
    <div>
      <button onClick={handleAddRepository}>Adicionar</button>
      <ul data-testid="repository-list">
        { repositories.map(repository => <li key={repository.id}> {repository.title} <button onClick={()=>handleRemoveRepository(repository.id)}>Remover</button></li>) }
      </ul>
    </div>
  );
}

export default App;
