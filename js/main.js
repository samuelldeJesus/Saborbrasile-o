const headerNavegador = document.querySelector(".header_navegador");
const seccionesOscuras = document.querySelectorAll(".seccion-oscura");

const observer = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                headerNavegador.classList.add("header-oscuro");
            } else {
                headerNavegador.classList.remove("header-oscuro");
            }
        });
    },
    {
        threshold: 0.5
    }
);

seccionesOscuras.forEach((seccion) => {
    observer.observe(seccion);
});


//* HEADER *

const header = document.querySelector(".header_inicio");

let ultimaPosicionScroll = window.scrollY;

window.addEventListener("scroll", () => {

    const posicionActual = window.scrollY;

    if (posicionActual > ultimaPosicionScroll) {
        //* ↓ Scroll hacia abajo
        header.classList.add("header-oculto");

    } else if (posicionActual < ultimaPosicionScroll) {
        //* ↑ Scroll hacia arriba
        header.classList.remove("header-oculto");
    }

    ultimaPosicionScroll = posicionActual;
});


//* -----------------------------------------------*
//* ---------- archivo temporal (aviso)------------*
//* -----------------------------------------------*

const redesSociales = document.querySelectorAll(".avisos");

const aviso = document.querySelector(".aviso");
const avisoCerrar = document.querySelector(".aviso_cerrar");

redesSociales.forEach((red) => {

    red.addEventListener("click", (event) => {

        event.preventDefault();

        aviso.style.display = "flex";

    });

});

avisoCerrar.addEventListener("click", () => {

    aviso.style.display = "none";

});


//* ---------------------------------------------*
//* ------- animacion de secciones -------------*
//* ---------------------------------------------*

const seccionesAnimadas = document.querySelectorAll(".seccion-animada");

const observerAnimaciones = new IntersectionObserver((entries) => {

    entries.forEach((entry) => {

        if (entry.isIntersecting) {

            entry.target.classList.add("visible");

        } else {

            entry.target.classList.remove("visible");

        }

    });

}, {
    threshold: 0.3
});

seccionesAnimadas.forEach((seccion) => {

    observerAnimaciones.observe(seccion);

});


//* ---------------------------------------------*
//* -------- CARRUSEL INFINITO ------------------*
//* ---------------------------------------------*

const pista = document.querySelector(".carrusel_pista");

const tarjetasOriginales = Array.from(
    document.querySelectorAll(".tarjeta")
);

const botonAnterior = document.querySelector(".carrusel_anterior");
const botonSiguiente = document.querySelector(".carrusel_siguiente");

const cantidadTarjetas = tarjetasOriginales.length;

const anchoTarjeta = 310;

let posicion = cantidadTarjetas;


//* ---------------------------------------------*
//* -------- CREAR CLONES -----------------------*
//* ---------------------------------------------*

// Clones para la izquierda

tarjetasOriginales.forEach((tarjeta) => {

    const clon = tarjeta.cloneNode(true);

    pista.insertBefore(clon, pista.firstChild);

});


// Clones para la derecha

tarjetasOriginales.forEach((tarjeta) => {

    const clon = tarjeta.cloneNode(true);

    pista.appendChild(clon);

});


// Colocamos el carrusel en las tarjetas originales

pista.style.transform =
    `translateX(-${posicion * anchoTarjeta}px)`;


//* ---------------------------------------------*
//* -------- FUNCIÓN PARA MOVER ----------------*
//* ---------------------------------------------*

function moverCarrusel() {

    pista.style.transform =
        `translateX(-${posicion * anchoTarjeta}px)`;

}


//* ---------------------------------------------*
//* -------- BOTÓN SIGUIENTE --------------------*
//* ---------------------------------------------*

botonSiguiente.addEventListener("click", () => {

    posicion++;

    moverCarrusel();

});


//* ---------------------------------------------*
//* -------- BOTÓN ANTERIOR ---------------------*
//* ---------------------------------------------*

botonAnterior.addEventListener("click", () => {

    posicion--;

    moverCarrusel();

});


//* ---------------------------------------------*
//* -------- REINICIO INFINITO ------------------*
//* ---------------------------------------------*

pista.addEventListener("transitionend", () => {

    // Si hemos llegado a los clones de la derecha

    if (posicion >= cantidadTarjetas * 2) {

        pista.style.transition = "none";

        posicion = cantidadTarjetas;

        pista.style.transform =
            `translateX(-${posicion * anchoTarjeta}px)`;

        pista.offsetHeight;

        pista.style.transition =
            "transform 0.5s ease";
    }


    // Si hemos llegado a los clones de la izquierda

    if (posicion < 1) {

        pista.style.transition = "none";

        posicion = cantidadTarjetas;

        pista.style.transform =
            `translateX(-${posicion * anchoTarjeta}px)`;

        pista.offsetHeight;

        pista.style.transition =
            "transform 0.5s ease";
    }

});