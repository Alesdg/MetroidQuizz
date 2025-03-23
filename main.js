//quizz Metroidvania pregúntame, pregúntame
/*pido perdón porque me da error de todas las maneras posibles
la instalación de tailwind y te preguntaré por privado como resolverlo
lo tuve que hacer con boostrap pero quería hacrlo con tailwind*/

//Aquí van las preguntas, se repite el procedimiento en las 10 preguns
const questions = [
    {
        tema: 'METROID ZERO MISSION',
        //pregunta
        question: '¿En qué planeta se desarrolla la historia?',
        //repuestas
        posiblesRespuestas:["Chozodia", "Zebes", "Kraid"],
        //la correcta
        correct: 1,
    },
    {
        tema: 'METROID',
        question: '¿Cómo se llama el personaje con el que juegas?',
        posiblesRespuestas:["Samus", "Metroid", "Ridley"],
        correct: 0,
    },
    {
        tema: 'METROID FUSSION',
        question: '¿De quién huyes casi toda la historia?',
        posiblesRespuestas:["Metroid", "Tu propio traje", "Mother brain"],
        correct: 1,
    },
    {
        tema: 'METROID ZERO MISSION',
        question: '¿Qué civilización crió al protagonista?',
        posiblesRespuestas:["Zebes", "Piratas Espaciales", "Chozo"],
        correct: 2,
    },
    {
        tema: 'METROID',
        question: '¿Cuál es la profesión del protagonista?',
        posiblesRespuestas:["Pirata", "Cazarrecompensas", "Policía intergaláctico"],
        correct: 1,
    },
    {
        tema: 'METROID',
        question: 'Al morir descubres que el protagonista es:',
        posiblesRespuestas:["Hombre", "Robot", "Alien", "Mujer"],
        correct: 3,
    },
    {
        tema: 'METROID ZERO MISSION',
        question: '¿Cuál es el arma que utilizas dentro de la nave pirata?',
        posiblesRespuestas:["Power Suit", "Traje Gravitacional", "Pistola Paralizadora"],
        correct: 2,
    },
    {
        tema: 'METROID FUSSION',
        question: '¿Con qué te contagias al inicio de la historia?',
        posiblesRespuestas:["Metroid virus", "Parásito X", "M-virus"],
        correct: 1,
    },
    {
        tema: 'METROID',
        question: '¿Cuántas entregas tiene la saga?',
        posiblesRespuestas:["10", "17", "19", "14"],
        correct: 3,
    },
    {
        tema: 'Bonus',
        question: 'Al terminar el juego con todos los coleccionables,¿aparece un final diferente? ',
        posiblesRespuestas:["Verdadero", "Falso"],
        correct: 0,
    },
];
const questionElement = document.getElementById("question");
const respuestas = document.getElementById("respuestas");
const siguientePregunta = document.getElementById("next");

//Variables de progreso
let puntuacion = 0;
let preguntaActualIndex = 0;

//Para arrancar el quiz cuando carga la página, se inician los contadores en 0
function empezarQuizz(){
    preguntaActualIndex = 0;
    puntuacion = 0;
    siguientePregunta.innerHTML = "Siguiente";
    siguientePregunta.style.display = "none";
    mostrarQuestion();
}

function mostrarQuestion() {
    resetState();
    let preguntaActual = questions[preguntaActualIndex];
    questionElement.innerHTML = preguntaActual.question;

    preguntaActual.posiblesRespuestas.forEach((respuesta, index) => {
        const button = document.createElement("button");
        button.innerHTML = respuesta;
        button.classList.add("btn", "btn-outline-warning", "w-100");
        button.addEventListener("click", () => seleccionarRespuesta(index, button));
        respuestas.appendChild(button);
    });
}

//resetea las preguntas para que no vaya arrastrando las respuestas
function resetState() {
    respuestas.innerHTML = "";
    siguientePregunta.style.display = "none"; 
}

// estados de las respuestas que selecciona el user
function seleccionarRespuesta(index, button) {
    let preguntaActual = questions[preguntaActualIndex];
    button.classList.remove("btn-outline-warning");
    if (index === preguntaActual.correct) {
        // aumenta la puntuación en caso de ser correcta
        puntuacion++;
        button.classList.add("btn-success");
    } else {
        button.classList.add("btn-danger");
    }

    Array.from(respuestas.children).forEach(btn => {
        btn.disabled = true;
    });

    siguientePregunta.style.display = "block"; 
}

function siguiente() {
    //Siguiente pregunta
    preguntaActualIndex++;

    if (preguntaActualIndex < questions.length) {
        mostrarQuestion();
    } else {
        mostrarResultado();
    }
}

// si desapruebas muestra una imagen y un mensaje y si apruebas otro
function mostrarResultado() {
    let mensaje = "";
    let claseMensaje = "text-danger";
    let body = document.getElementById("body2")

    if (puntuacion < 5) {
        body.style.backgroundImage = "url('perdiste.jpg')"
        mensaje = "No has superado esta prueba";
        claseMensaje = "text-danger";
    } else {
        body.style.backgroundImage = "url('ganaste.jpg')"
        mensaje = "Enhorabuena, eres del fandom";
        claseMensaje = "text-success";
    }
    // se muestra la puntuacion y el largo del array de las preguntas
    questionElement.innerHTML = `
    <div class="card bg-dark text-light p-4 text-center border border-warning">
        <p>Obtuviste <strong>${puntuacion}</strong> de ${questions.length} puntos.</p>
        <p class="${claseMensaje}">${mensaje}</p>
        <button id="reiniciar" class="btn btn-warning mt-3">🔄 Volver a intentarlo</button>
    </div>
`;

// botón para reiniciar el quizz
setTimeout(() => {
    document.getElementById("reiniciar").addEventListener("click", empezarQuizz);
}, 100); 
}

siguientePregunta.addEventListener("click", siguiente);
document.addEventListener("DOMContentLoaded", empezarQuizz);