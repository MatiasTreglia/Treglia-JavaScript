// Calculadora de BMI (Body mass Index/indice de masa corporal)

// Claro, la calculadora de masa corporal (en inglés, "Body Mass Index calculator" o "BMI calculator")
// es una herramienta que se utiliza para estimar si una persona tiene un peso saludable en relación con su altura.
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




function calculadoraBMI (masa,altura){
    return masa / (altura * altura);
}

function InterpretacionBMI(bmi){
    if (bmi < 18.5)
        return(`Su Indice de masa corporal es: ${bmi.toFixed(2)} lo que indica que tiene un bajo peso.`)
    else if (bmi >= 18.5 && bmi <=24.9)
        return(`Su Indice de masa corporal es: ${bmi.toFixed(2)} lo que indica que tiene un peso normal.`)
    else if (bmi >=25 && bmi <=29.9)
        return(`Su Indice de masa corporal es: ${bmi.toFixed(2)} lo que indica que tiene sobrepeso.`)
    else if (bmi >=30)
        return(`Su Indice de masa corporal es: ${bmi.toFixed(2)} lo que indica que tiene obesidad.`)
}

function principal(){
    let masa
    let altura
    do {
        masa = parseFloat(prompt("Ingrese su peso en kg (utilice el punto como separador decimal):"));
        if (isNaN(masa) || masa <=0){
            alert(`Por favor, ingresar un numero valido`);
        }
    } while (isNaN(masa) || masa <=0);

    do {
        altura = parseFloat(prompt("Ingrese su altura en metros (utilice el punto como separador decimal):"));
        if (isNaN(altura) || altura <=0){
            alert(`Por favor, ingresar un numero valido`);
        }
    } while (isNaN(altura) || altura <=0);

    let bmi = calculadoraBMI(masa,altura);
    let interpretacion = InterpretacionBMI(bmi);

    alert(`tu BMI es: ${bmi.toFixed(2)}`);
    alert(`${interpretacion}`);

}

principal();