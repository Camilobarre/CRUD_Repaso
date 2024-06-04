// Selecciona el elemento <main> del DOM donde se añadirán las tarjetas (cards)
const main = document.querySelector("main");

// URL del endpoint de la API que proporciona los datos de los carros
const url = "http://localhost:3000/cars";

// Función asíncrona para mostrar las tarjetas de los carros
async function showCards() {
    // Realiza una solicitud a la API y espera la respuesta
    const response = await fetch(url);

    // Convierte la respuesta en formato JSON
    const data = await response.json();

    // Itera sobre cada elemento de los datos obtenidos
    data.forEach(element => {
        // Verifica si el carro está activo
        if (element.isActive) {
            // Añade una tarjeta (card) al elemento <main> con la información del carro
            main.innerHTML += `
            <div class="card" style="width: 18rem;">
                <img src=${element.image} class="card-img-top" alt="${element.id}">
                <div class="card-body">
                    <h5 class="card-title">${element.brand} ${element.model}</h5>
                    <p class="card-text">${element.year}</p>
                    <p class="card-text">$ ${element.price}</p>
                    <a href="/app/Login/Login.html" class="btn btn-primary">Ver más</a>
                </div>
            </div>
            `;
        }
    });

    // Retorna el elemento <main> actualizado con las tarjetas añadidas
    return main;
}

// Llama a la función showCards y espera a que se complete
await showCards();
