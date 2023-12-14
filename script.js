const botonSubmit = document.querySelector("#guess-button");
const campoTexto = document.querySelector("#guess-input");
const GRID = document.getElementById("grid");
let contenedor = document.getElementById("guesses");

//Si no se consigue la palabra del endPoint, se utiliza el diccionario por defecto
let diccionario = [
  "APPLE",
  "HURLS",
  "WINGS",
  "YOUTH",
  "FLOWER",
  "HORSE",
  "GRASS",
  "FRUIT",
  "WATER",
  "GREEN",
];

//Guardamos la respuesta del endPoint
let palabra;

//Intentos restantes
let intentos = 6;

//Obtenemos la respuesta del endPoint
const endPoint = "https://random-word-api.herokuapp.com/word?length=5";
fetch(endPoint)
  .then((response) => response.json())
  .then((response) => {
    palabra = response[0].toUpperCase();
    console.log(palabra);
  })
  .catch((err) => {
    console.log("Error usando diccionario");
    //Obtenemos una palabra random
    palabra = diccionario[Math.floor(Math.random() * diccionario.length)];
    console.log(palabra);
  });

//Funcionalidad
botonSubmit.addEventListener("click", worlde);

//Funcion para ver el worddle
function worlde() {
  //Almacenamos el valor que ingreso el usuario
  const userInput = leerPalabra();

  //Verificamos que no este vacio el input, asi como que tambien la longitud sea de 5 caracteres
  if (userInput === "" || userInput.length !== 5) {
    alert("Ingrese una palabra de 5 letras");
    return;
  }

  const ROW = document.createElement("div");
  ROW.className = "row";
  for (const i in userInput) {
    //Creamos el span
    const SPAN = document.createElement("span");
    //Le agregamos la propiedad class
    SPAN.className = "letter";

    //Si el caracter en la misma posicion que el caracter de la palabra a adiviar, mostramos verde
    if (userInput[i] === palabra[i]) {
      SPAN.innerHTML = userInput[i];
      SPAN.style.backgroundColor = "#79b851"; //Verde

      //Si la palabra generada random, contiene algun caracter de la palabra que ingreso el usuario, mostramos amarillo
    } else if (palabra.includes(userInput[i])) {
      SPAN.innerHTML = userInput[i];
      SPAN.style.backgroundColor = "#f3c237"; //Amarillo

      //Si no contiene ningun carcater igual o no se encuentran en la misma posicion, mostramos gris
    } else {
      SPAN.innerHTML = userInput[i];
      SPAN.style.backgroundColor = "#a4aec4"; //Gris
    }
    ROW.appendChild(SPAN);
  }
  GRID.appendChild(ROW);

  //Decrementamos los intentos restantes
  --intentos;

  //Si la palabra que ingreso el usuario es igual a la palabra random, gana
  if (palabra === userInput) {
    terminar("<h1>GANASTE!😀</h1>");
    return;
  }

  //Si los intentos llegan a 0, pierde
  if (intentos === 0) {
    terminar("<h1>PERDISTE!😖</h1>");
    return;
  }
}

//Leemos la palabra del usuario, obtenemos el valor y lo devolvemos en mayusculas
function leerPalabra() {
  let word = campoTexto.value;
  return word.toUpperCase();
}

//Funcion para hacer una inyeccion html
function terminar(mensaje) {
  campoTexto.disabled = true;
  botonSubmit.disabled = true;
  contenedor.innerHTML = mensaje;
}
