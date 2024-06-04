// Obtener el usuario de localStorage
const user = localStorage.getItem("user");

// Obtener el botón de cerrar sesión del DOM
const logOut = document.querySelector("#log-out");

// Redirigir a la página principal si no hay un usuario en localStorage
if (user == null) {
    window.location.href = "/"
};

// Añadir evento de click al botón de cerrar sesión para limpiar el localStorage y redirigir a la página principal
logOut.addEventListener("click", () => {
    localStorage.clear();
    window.location.href = "/";
})

// Obtener el elemento 'main' del DOM
const main = document.querySelector("main");

// URL de la API
const url = "http://localhost:3000/cars";

// Función asíncrona para mostrar tarjetas de carros
async function showCards() {
    // Hacer una solicitud a la API y obtener los datos en formato JSON
    const response = await fetch(url);
    const data = await response.json();

    // Iterar sobre los datos obtenidos y generar tarjetas para cada carro activo
    data.forEach(element => {
        if (element.isActive) {
            main.innerHTML += `
            <div class="card" style="width: 18rem;">
                <img src=${element.image} class="card-img-top" alt="${element.id}">
                <div class="card-body">
                    <h5 class="card-title">${element.brand} ${element.model}</h5>
                    <p class="card-text">${element.year}</p>
                    <p class="card-text">$ ${element.price}</p>
                    <a href="/app/Login/Login.html" class="btn btn-primary">Ver mas</a>
                </div>
            </div>
            `
        }
    });

    return main;
}

// Llamar a la función para mostrar las tarjetas de carros
await showCards();
