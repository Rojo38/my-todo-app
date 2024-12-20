import React, { useState , useEffect } from 'react';
import './App.css';
import '../node_modules/bulma/css/bulma.min.css';
import Header from './Components/Header/Header.js';
import Card from './Components/Card/Card.js';

function App() {

  // const API_URL = 'http://backend:5000';
  // const API_URL = 'http://backend-service.default.svc.cluster.local:5000';
  const API_URL = '34.118.236.60:5000';

  const [updateTheTask, setUpdateTheTask]  = useState(false);
  const [idToBeUpdated, setIdToBeUpdated] = useState('');

  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [allTasks, setAllTasks] = useState([]);

  // Fonction pour récupérer les tâches depuis le backend
  const fetchTasks = async () => {
    try {
      const response = await fetch(API_URL+'/tasks');
      if (!response.ok) {
        throw new Error(`Erreur : ${response.status}`);
      }
      let tasks = await response.json();
      setAllTasks(tasks);
    } catch(error){} // catch (err) {
      // console.error(`Échec de récupération des tâches : ${err.message}`);
    //}
  };

  // useEffect(()=>{fetchTasks();}, []); // [] pour exécuter l'effet uniquement lors du premier rendu
  useEffect(()=>{fetchTasks();},[]);


  function creationTask(e) {
    e.preventDefault();
    if (!updateTheTask) {
      fetch(API_URL+'/tasks', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({title: newTitle, description: newDescription, completed: false, createdAt: new Date()})
      })
      .then((response) => JSON.parse(response))
      .then(data => {setAllTasks(data)})
      .catch(error => {console.log(error)});

      setNewTitle("");
      setNewDescription("");

      fetchTasks();
    }
    else updateTask(idToBeUpdated);
  }

  function updateTask(id) {
    fetch(API_URL+'/tasks/'+id, {
      method: 'PUT',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({title: newTitle, description: newDescription})
    })
    
    setUpdateTheTask(false);
    setNewTitle("");
    setNewDescription("");

    fetchTasks();
  }

  function displayTaskForUpdate(id,t,d) {
    setNewTitle(t);
    setNewDescription(d);

    setUpdateTheTask(true);
    setIdToBeUpdated(id);
  }

  function annulerUpdate() {
    setNewTitle("");
    setNewDescription("");
    setUpdateTheTask(false);
  }
  
  function deleteTask(id) {
    fetch(API_URL+'/tasks/'+id, {
      method: 'DELETE',

    }).catch(error=>{console.error(error)});

    fetchTasks();
  }
  

  return (
    <div>
      <Header />

      <div className="container p-2">
        <h2 className="title is-5">Entrez vos tâches à faire</h2>


        <form onSubmit={creationTask}>
          <div className="field">
            <label htmlFor="task" className='label'>Tâche</label>
            <div className="control">
              <input type="text" id="task" className="input is-medium" placeholder='Tâches à faire' onChange={e => setNewTitle(e.target.value)} value={newTitle} required />
            </div>
          </div>

          <div className="field">
            <label htmlFor="contenu">Contenu de la tâche</label>
            <textarea name="contenu" id="contenu" className='textarea is-medium' placeholder='Description' onChange={e => setNewDescription(e.target.value)} value={newDescription}></textarea>
          </div>

          <div className="field is-grouped">

            {updateTheTask ? (
              <div className="control">
                <button className="button is-link" type='submit'>Modifier la tâche</button>
              </div>
            ) : null}


            {updateTheTask ? (
              <div className="control">
                <button className="button is-danger" type='reset' onClick={annulerUpdate}>Annuler</button>
              </div>
            ) : null}

            {!updateTheTask ? (
              <div className="control">
                <button className="button is-link" type='submit'>Créer une tâche</button>
              </div>
            ) : null}

          </div>

        </form>

      </div>

      {allTasks.map(task => (
        <Card key={task._id} id={task._id} title={task.title} description={task.description} date={task.createdAt} displayTaskForUpdate={displayTaskForUpdate} deleteTask={deleteTask} />
      ))}
      
    </div>
  );
}

export default App;
