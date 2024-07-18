/* Calculadora de BMI (Body mass Index/indice de masa corporal)

La calculadora de masa corporal (en inglés, "Body Mass Index calculator" o "BMI calculator")
Es una herramienta que se utiliza para estimar si una persona tiene un peso saludable en relación con su altura.
El índice de masa corporal (IMC o BMI por sus siglas en inglés) se calcula utilizando la siguiente fórmula:

BMI = m(kg)/a(m)² */

/* Pasos para calcular el IMC:

        Medir el peso: Pesar a la persona en kilogramos (kg).
        Medir la altura: Medir la altura de la persona en metros (m).
        Aplicar la fórmula: Dividir el peso de la persona por el cuadrado de su altura. */


/* Interpretación de los valores del IMC:
        Bajo peso: IMC menor de 18.5
        Peso normal: IMC entre 18.5 y 24.9
        Sobrepeso: IMC entre 25 y 29.9
        Obesidad: IMC de 30 o más  */





/* Funcionamiento de los botones principales para ir a las secciones */
document.getElementById('btnCalculadora').addEventListener('click', function () {
    document.getElementById('calculadoraBMI').scrollIntoView({ behavior: 'smooth' });
});
/* 
document.getElementById('goToRecipes').addEventListener('click', function () {
    document.getElementById('recipes').scrollIntoView({ behavior: 'smooth' });
}); */


/* Clase PersonaObj para almacenar datos de persona */
class PersonaObj {
    constructor(nombre, masa, altura, bmi) {
        this.nombre = nombre;
        this.masa = masa;
        this.altura = altura;
        this.bmi = bmi;
    }
}

/* Array para almacenar objetos PersonaObj */
let personasArray = [];

/* Función para calcular el BMI */
function calculadoraBMI(masa, altura) {
    return masa / (altura * altura);
}

/* Función para interpretar el BMI y mostrar resultado */
function interpretacionBMI(bmi, nombre) {
    if (bmi < 18.5)
        return `Hola ${nombre}, tu BMI es ${bmi.toFixed(2)} lo que indica que tienes bajo peso`;
    else if (bmi >= 18.5 && bmi <= 24.9)
        return `Hola ${nombre}, tu BMI es ${bmi.toFixed(2)} lo que indica que tienes un peso normal`;
    else if (bmi >= 25 && bmi <= 29.9)
        return `Hola ${nombre}, tu BMI es ${bmi.toFixed(2)} lo que indica que tienes sobrepeso`;
    else if (bmi >= 30)
        return `Hola ${nombre}, tu BMI es ${bmi.toFixed(2)} lo que indica que tienes obesidad`;
}



/* Evento clic del botón "Calcular BMI" */
let boton = document.getElementById("boton");
boton.onclick = function () {
    let nombre = document.getElementById("nombre").value;
    let masa = parseFloat(document.getElementById("masa").value);
    let altura = parseFloat(document.getElementById("altura").value);

    let valid = true;

    document.getElementById("error-nombre").innerText = "";
    document.getElementById("error-masa").innerText = "";
    document.getElementById("error-altura").innerText = "";

    /* Operador Ternario */
    document.getElementById("error-nombre").innerText = nombre.trim() === "" ? "Por favor, ingrese su nombre." : ""; 
    valid = nombre.trim() === "" ? false : valid; 

    document.getElementById("error-masa").innerText = isNaN(masa) || masa <= 0 ? "Por favor, ingrese un número válido para el peso." : ""; 
    valid = isNaN(masa) || masa <= 0 ? false : valid;

    document.getElementById("error-altura").innerText = isNaN(altura) || altura <= 0 ? "Por favor, ingrese un número válido para la altura." : "";
    valid = isNaN(altura) || altura <= 0 ? false : valid;

    if (valid) {
        let bmi = calculadoraBMI(masa, altura);
        let interpretacion = interpretacionBMI(bmi, nombre);
        document.getElementById('resultado').innerText = interpretacion;

        let datosBmi = new PersonaObj(nombre, masa, altura, bmi);
        personasArray.push(datosBmi);
        guardarEnLocalStorage(datosBmi);
        tablaResultados();
    }
};

/* Función para mostrar los resultados en la tabla */
function tablaResultados() {
    let tabla = document.getElementById("resultados");
    tabla.innerHTML = ``;

    personasArray.forEach(datosBmi => {
        tabla.innerHTML += `
            <div class="tabla_resultados">
                <p><strong>Nombre:</strong> ${datosBmi.nombre}</p>
                <p><strong>Masa (kg):</strong> ${datosBmi.masa}</p>
                <p><strong>Altura (m):</strong> ${datosBmi.altura}</p>
                <p><strong>BMI:</strong> ${datosBmi.bmi.toFixed(2)}</p>
            </div>
        `;
    });
}

/* Función para almacenar datos en localStorage */
function guardarEnLocalStorage(datosBmi) {
    let personasGuardadas = JSON.parse(localStorage.getItem('personas')) || [];
    personasGuardadas.push(datosBmi);
    localStorage.setItem('personas', JSON.stringify(personasGuardadas));
}


/* Función para realizar búsqueda por nombre */
function buscarPorNombre(nombreBuscado) {
    let resultados = personasArray.filter(persona => persona.nombre.toLowerCase().includes(nombreBuscado.toLowerCase()));
    mostrarResultadosBusqueda(resultados);
}

/* Función para mostrar los resultados de la búsqueda */
function mostrarResultadosBusqueda(resultados) {
    let tabla = document.getElementById("resultados");
    tabla.innerHTML = ``;

    resultados.forEach(datosBmi => {
        tabla.innerHTML += `
            <div class="tabla_resultados">
                <p><strong>Nombre:</strong> ${datosBmi.nombre}</p>
                <p><strong>Masa (kg):</strong> ${datosBmi.masa}</p>
                <p><strong>Altura (m):</strong> ${datosBmi.altura}</p>
                <p><strong>BMI:</strong> ${datosBmi.bmi.toFixed(2)}</p>
            </div>
        `;
    });
}

/* Evento para búsqueda por nombre */
let inputBuscar = document.getElementById("buscarNombre");
inputBuscar.addEventListener('input', function () {
    let nombreBuscado = inputBuscar.value.trim();
    if (nombreBuscado === "") {
        tablaResultados();
    } else {
        buscarPorNombre(nombreBuscado);
    }
});

/* Función para cargar datos desde localStorage al array personasArray */
function cargarDesdeLocalStorage() {
    let personasGuardadas = JSON.parse(localStorage.getItem('personas')) || [];
    personasArray = personasGuardadas.map(persona => new PersonaObj(persona.nombre, persona.masa, persona.altura, persona.bmi));
}

/* Cargar datos desde localStorage al cargar la página */
window.onload = function () {
    cargarDesdeLocalStorage();
    tablaResultados();
};