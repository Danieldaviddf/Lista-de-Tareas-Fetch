import React, { useState, useEffect } from "react";

//include images into your bundle
import rigoImage from "../../img/rigo-baby.jpg";

//create your first component
const Home = () => {
  const [tarea, setTarea] = useState("");
  const [ul, setUl] = useState([]);

  const handleKeyDown = (e) => {
    let nuevoValor = e.target.value;
    if (e.key === "Enter" && nuevoValor !== "") {
      postInfo(nuevoValor);
      setTarea("");
    }
  };

  	

const postInfo = (label) => {
    fetch("https://playground.4geeks.com/todo/todos/danieldf", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ label: label, is_done: false }),
    })
      .then((response) => response.json())
      .then((data) => {console.log(data); nuevaTarea()})
      .catch((error) => console.log(error))
	  
  };

  const eliminar = (id) => {
    fetch(`https://playground.4geeks.com/todo/todos/${id}`, {
      method: "DELETE",
    })
      .then(() => nuevaTarea())
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    nuevaTarea()
  }, []);

  const nuevaTarea = () => {
    fetch("https://playground.4geeks.com/todo/users/danieldf", { method: "GET" })
      .then((response) => response.json())
      .then((data) => setUl(data.todos))
      .catch((error) => console.log(error))
  };

  

  return (
    <div className="container text-center">
      <div className="col-10 form-floating mb-3 text-center">
        <input
          type="text"
          className="form-control text-center"
          id="floatingInput"
          placeholder="METETUTAREA"
          onChange={(e) => {
            setTarea(e.target.value);
          }}
          onKeyDown={handleKeyDown}
          value={tarea}
        />
        <label htmlFor="floatingInput">METETUTAREA:</label>
        <ul className="list-group">
          {ul.map((item) => (
            <li
              className="list-group-item text-center display-flex space-between"
              key={item.id}
            >
              {item.label}{" "}
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => eliminar(item.id)}
              >
                x
              </button>
            </li>
          ))}
        </ul>
        <p>{ul.length}: Item Left.</p>
      </div>
    </div>
  );
};

export default Home;
