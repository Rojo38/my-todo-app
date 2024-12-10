import React, {useState} from 'react';
import './App.css';
import '../node_modules/bulma/css/bulma.min.css'
import Header from './Components/Header/Header.js'
import Card from './Components/Card/Card.js'

function App() {

  const [myList, setList] = useState([
    {task: "Apprendre React", text: "Components, StateManagements, ContextAPI"},
    {task: "Creer un BD", text: "PostgreSQL"}
  ])

  const [myTask, setTask] = useState()
  const [myText, setText] = useState()

  function  creationCard(e) {
    e.preventDefault()
    const newList = [...myList, {task: myTask, text: myText}]
    setList(newList)
    setTask('')
    setText('')
  }

  function supprCard(index) {
    const filteredList = [...myList]
    setList(filteredList.filter(item => filteredList.indexOf(item) !== filteredList.indexOf(filteredList[index])))
  }

  return (
    <div>
      <Header />
      

      <div className="container p-2">
        <h2 className="title is-5">Entrez vos tâches à faire</h2>

        <form onSubmit={creationCard}>
            <div className="field">
                <label htmlFor="tache" className="label">Tâche</label>
                <div className="control">
                    <input id='task' type="text" className="input is-medium" placeholder='Tâches à faire' onChange={e => setTask(e.target.value)} value={myTask} />
                </div>
            </div>

            <div className="field">
                <label htmlFor="contenu" className="label">Contenu de la tâche</label>
                <textarea id='text' className='textarea is-medium' name="contenu" id="contenu" placeholder='Description' onChange={e => setText(e.target.value)} value={myText}></textarea>
            </div>

            <div className="field">
                <div className="control">
                    <button className="button is-link">Créer une tâche</button>
                </div>
            </div>
        </form>
      </div>


      {
        myList.map( (todo, index) => (
          <Card key={index} index={index} task={todo.task} supprCard={supprCard} text={todo.text} />
         ) )
      }
    </div>
  );
  
  
}

export default App;
