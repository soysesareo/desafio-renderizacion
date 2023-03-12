import { useState } from 'react'
import BaseColaboradores from './BaseColaboradores';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import './App.css'

//Profesor, el desafío tiene un detalle con el filtro de búsqueda, al usar las constantes que explicó en clases para renderizar nuevamente los datos de la base se bloquea la renderización de nuevos colaboradores (aunque sí se veían por consola), por eso dejé comentada la linea 11 en el App.jsx.

function App() {
  const [workers, setWorkers] = useState(BaseColaboradores);
  /* const [filteredCoWorkers, setFilteredCoWorkers] = useState(BaseColaboradores); */
  const color = "red";
  
  const [nameWorker, setNameWorker] = useState("");
  const handleNameChange = (e) => {
    setNameWorker(e.target.value);
  };

  const [emailWorker, setEmailWorker] = useState("");
  const handleEmailChange = (e) => {
    setEmailWorker(e.target.value);
  };

  //Agregar colaborador
  const addCoWorker = (e) => {
    e.preventDefault()
    const newCoWorker = {
      id: Date.now(),
      nombre: nameWorker,
      correo: emailWorker
    }
    setWorkers([...workers, newCoWorker]);
    setNameWorker("");
    setEmailWorker("");
  };

  //Buscador
  const searchWorkers = (search) => {
    const filteredWorkers = workers.filter(worker => {
      return (
        worker.nombre.includes(search) ||
        worker.correo.includes(search)
      );
    });
    setWorkers([...filteredWorkers]);
  }

  return (
    <div className="App">
      <div className="container">
        <h5>Desafío Renderización</h5>
        <br />
        <Form>
          <p>Buscador de colaboradores</p>
          <Form.Group
            className="mb-3"
            controlId="formBasicEmail">
            <Form.Control
              type="text"
              placeholder="Buscar colaboradores"
              style={{ width: "50%" }}
              onChange={(e) => { searchWorkers(e.target.value) }}
            />
            
          </Form.Group>
          <Form.Group
            className="mb-3"
            controlId="formBasicEmail">
            <Form.Label>Nombre del Colaborador</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ingrese un nombre"
              style={{ width: "50%" }}
              value={nameWorker}
              onChange={handleNameChange}
            />
          </Form.Group>
          
          <Form.Group
            className="mb-3"
            controlId="formBasicPassword">
            <Form.Label>Correo Electrónico</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ingrese un correo electrónico"
              style={{ width: "50%" }}
              value={emailWorker}
              onChange={handleEmailChange}
            />
          </Form.Group>
          
          <Button
            variant="dark"
            type="submit"
            onClick={addCoWorker}
          >
            Agregar Colaborador
          </Button>
        </Form>
        <br />
        <hr style={{ width: "50%", color: "red" }} />
        <h6
          className="lista"
          style={{ color }}
        >
          Listado de Colaboradores</h6>
        <ul>
          {workers.map(({ id, nombre, correo }) => (
            <li key={id}>
              {nombre}, {correo}
            </li>
          ))}
        </ul>
      </div>

    </div>
  )
}

export default App