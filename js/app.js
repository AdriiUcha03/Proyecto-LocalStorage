//Selectores
const cajatexto = document.querySelector("#mensaje");
const mensajes = document.querySelector("#lista-mensajes");
const boton = document.querySelector("#formulario input");
//En la declaración del array comprobamos si existe una variable local storage y en base a eso pasamos el array vacio,
// o con el contenido de la variable en LocalStorage
let listaparrafos = [];
if (localStorage.getItem("array") !== null) {
    listaparrafos = JSON.parse(localStorage.getItem("array"));
}

// Hacemos un listener del submit del formulario
formulario.addEventListener("submit", agregarParrafo);

//Listener para los botones X con el parrafo
// Agrega un controlador de eventos para los botones "X"
mensajes.addEventListener("click", (e) => {
  if (e.target.classList.contains("borrar-curso")) {
      const index = e.target.getAttribute("data-index");
      listaparrafos.splice(index, 1); // Elimina el elemento del array
      localStorage.setItem("array", JSON.stringify(listaparrafos)); // Actualiza LocalStorage
      limpiarHTML(); // Limpia el contenedor
      mostrarParrafos();
  }
});

// Función con la que metemos el párrafo en el array y lo mostramos agregado
function agregarParrafo(e) {
    e.preventDefault(); // Paramos la acción por defecto (así no se refresca la página).
    const parrafo = cajatexto.value; // Para recoger el valor del texto.
    //Vaciamos el text area.
    cajatexto.value = '';
    // Agregar el párrafo a la lista de mensajes u otra lógica que desees realizar
    listaparrafos.push(parrafo);
    console.log(listaparrafos);
    //Limpiamos antes de mostrar para que el array no se repita mientras se va rellenando
    limpiarHTML();
    //Mostramos los valores agregados al array
    listaparrafos.forEach((parrafo, indice) => {
        const parrafoHTML = document.createElement("p");
        //Agregamos junto al parrafo un boton en el que agregamos el indice en el que se encuentra del array para posicionarlos
        parrafoHTML.innerHTML = `
        <li> 
          ${parrafo} 
          <button class="borrar-curso" data-index="${indice}">X</button>  
        </li>
        `;
        mensajes.appendChild(parrafoHTML);
      });
    // Agregamos el array al LocalStorage para guardar los mensajes parseandolo a JSON ya que no puede almacenar el array como tal.
    localStorage.setItem("array", JSON.stringify(listaparrafos))
}
//Limpieza del contenedor que lleva los mensajes
function limpiarHTML() {
    // limpiar los resultados anteriores
    while (mensajes.firstChild) {
      mensajes.removeChild(mensajes.firstChild);
    }
  }

  //Funcion para mostrar los Parrafos
  function mostrarParrafos() {
    listaparrafos.forEach((parrafo) => {
      const parrafoHTML = document.createElement("p");
      parrafoHTML.innerHTML = `<li> ${parrafo} </li>`;
      mensajes.appendChild(parrafoHTML);
    });
  }


//Tenemos que hacer un bucle foreach para mostrar una vez cargado el DOM el contenido de LocalStorage
document.addEventListener("DOMContentLoaded", () => {
    mostrarParrafos();
  });