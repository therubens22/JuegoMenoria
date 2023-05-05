//inicio//

let cajasVistas = 0;
let tarjeta1 = null;
let tarjeta2 = null;
let primerResultado = null;
let segundoResultado = null;
let movimiento = 0;
let acierto = 0;
let temporizador = false;
let tiempo = 30;
let tiempoRestante = 30;
let tiempoRegresivo = null;


const cajas = document.querySelector(".caja");
let mostraMovimientos = document.querySelector(".movimientos");
let mostraAcierto = document.querySelector(".acierto");
let mostrarTiempo = document.querySelector(".tiempo-restante");

//Numero aleatorios//
let numeros = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8];
numeros = numeros.sort(() => {
    return Math.random() - 0.5
})
console.log(numeros);


function contarTiempo(params) {
    tiempoRegresivo = setInterval(() => {
        tiempo--;
        mostrarTiempo.innerHTML = `Tiempo: ${tiempo} Seg`;

        if (tiempo == 0) {
            clearInterval(tiempoRegresivo);
            bloquearTarjeta();
        }
    }, 1000)
};

function bloquearTarjeta() {

    for (let i = 0; i <= 15; i++) {
        let tarjetaBloqueada = document.getElementById(i);
        tarjetaBloqueada.innerHTML = numeros[i];
        tarjetaBloqueada.disabled = true;

    }
}


//funcion principal//

function abrir(id) {

    if (temporizador == false) {
        contarTiempo();
        temporizador = true;
    }


    cajasVistas++;
    console.log(cajasVistas);

    if (cajasVistas == 1) {
        //mostrar el primer numero//
        tarjeta1 = document.getElementById(id);
        primerResultado = numeros[id];
        tarjeta1.innerHTML = primerResultado;

        //desabilitar el primer boton//
        tarjeta1.disabled = true;
    } else if (cajasVistas == 2) {
        //mostrar el segundo numero//
        tarjeta2 = document.getElementById(id);
        segundoResultado = numeros[id];
        tarjeta2.innerHTML = segundoResultado;

        //desabilitar el segundo boton//
        tarjeta2.disabled = true;

        //incrementar el movimiento//
        movimiento++;
        mostraMovimientos.innerHTML = `Movimientos: ${movimiento}`;

        if (primerResultado == segundoResultado) {
            cajasVistas = 0;

            //aumentar aciertos//
            acierto++;
            mostraAcierto.innerHTML = `Acierto: ${acierto}`;

            if (acierto == 8) {
                clearInterval(tiempoRegresivo);
                mostraAcierto.innerHTML = `Acierto: ${acierto} FELICITACIONES`;
                mostrarTiempo.innerHTML = `Buenisimo te demoraste solo ${tiempoRestante - tiempoRegresivo} Seg en terminar`
                mostraMovimientos.innerHTML = `Movimientos: ${movimiento} TERMINASTE EL JUEGO`;
            }
        } else {
            //mostrar y volver a ocultar numeros//
            setTimeout(() => {

                tarjeta1.innerHTML = ``;
                tarjeta2.innerHTML = ``;
                tarjeta1.disabled = false;
                tarjeta2.disabled = false;
                cajasVistas = 0;
            }, 800);
        }
    }
}