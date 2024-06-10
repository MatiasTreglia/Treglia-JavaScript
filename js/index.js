// Calculadora de BMI (Body mass Index/indice de masa corporal)

// La calculadora de masa corporal (en inglés, "Body Mass Index calculator" o "BMI calculator")
// Es una herramienta que se utiliza para estimar si una persona tiene un peso saludable en relación con su altura.
// El índice de masa corporal (IMC o BMI por sus siglas en inglés) se calcula utilizando la siguiente fórmula:

// BMI = m(kg)/a(m)²

/* Pasos para calcular el IMC:

        Medir el peso: Pesar a la persona en kilogramos (kg).
        Medir la altura: Medir la altura de la persona en metros (m).
        Aplicar la fórmula: Dividir el peso de la persona por el cuadrado de su altura. */


/* Interpretación de los valores del IMC:
        Bajo peso: IMC menor de 18.5
        Peso normal: IMC entre 18.5 y 24.9
        Sobrepeso: IMC entre 25 y 29.9
        Obesidad: IMC de 30 o más  */



//Se crea el objeto personasobj        
class PersonaObj {
    constructor(nombre, masa, altura, bmi) {
        this.nombre = nombre;
        this.masa = masa;
        this.altura = altura;
        this.bmi = bmi;
    }
}

//Declaracion de array guardar la informacion del objeto personasobj con los datos de la personas.

let personasArray = [];

//Funcion de toma de datos

function principal() {
    let masa
    let altura
    let nombre = document.getElementById("nombre").value;

    do {
        masa = parseFloat(document.getElementById("masa").value);
        if (isNaN(masa) || masa <= 0) {
            alert(`Por favor, ingresar un numero valido para el peso`);
            break
        }
    } while (isNaN(masa) || masa <= 0);

    do {
        altura = parseFloat(document.getElementById("altura").value);
        if (isNaN(altura) || altura <= 0) {
            alert(`Por favor, ingresar un numero valido para la altura`);
            break
        }
    } while (isNaN(altura) || altura <= 0);

    let bmi = calculadoraBMI(masa, altura);
    interpretacionBMI(bmi, nombre);

    let datosbmi = new PersonaObj(nombre, masa, altura, bmi);
    
    personasArray.push(datosbmi);
    tablaResultados();
}

//Funcion para calcular el BMI

function calculadoraBMI(masa, altura) {
    return masa / (altura * altura);
}

//Funcion para interpretar el BMI

function interpretacionBMI(bmi, nombre) {
    if (bmi < 18.5)
        document.getElementById('resultado').innerText = `Hola ${nombre}, tu BMI es ${bmi.toFixed(2)} lo que indica que tiene un bajo peso`;
    else if (bmi >= 18.5 && bmi <= 24.9)
        document.getElementById('resultado').innerText = `Hola ${nombre}, tu BMI es ${bmi.toFixed(2)} lo que indica que tiene un peso normal`;
    else if (bmi >= 25 && bmi <= 29.9)
        document.getElementById('resultado').innerText = `Hola ${nombre}, tu BMI es ${bmi.toFixed(2)} lo que indica que tiene sobrepeso`;
    else if (bmi >= 30)
        document.getElementById('resultado').innerText = `Hola ${nombre}, tu BMI es ${bmi.toFixed(2)} lo que indica que tiene un obesidad`;
}

//Funcion para mostrar los resultados dentro de una table

function tablaResultados(){
    let tabla = document.getElementById("resultados");
    tabla.innerHTML = ``;

    personasArray.forEach(datosbmi => {
        tabla.innerHTML +=`
        <div class="tabla_resultados">
                <p><strong>Nombre:</strong> ${datosbmi.nombre}</p>
                <p><strong>Masa (kg):</strong> ${datosbmi.masa}</p>
                <p><strong>Altura (m):</strong> ${datosbmi.altura}</p>
                <p><strong>BMI:</strong> ${datosbmi.bmi.toFixed(2)}</p>
            </div>
        `;
    });
}


