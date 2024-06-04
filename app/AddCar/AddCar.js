// Obtiene el usuario almacenado en localStorage y el botón de cierre de sesión
const user = localStorage.getItem("user");
const logOut = document.querySelector("#log-out");

// Si no hay usuario en localStorage, redirige a la página de inicio
if (user == null) {
    window.location.href = "/";
}

// Agrega un event listener al botón de cierre de sesión para limpiar localStorage y redirigir a la página de inicio
logOut.addEventListener("click", () => {
    localStorage.clear();
    window.location.href = "/";
});

// Obtiene referencias a los elementos del formulario y la tabla
const form = document.querySelector("form");
const brand = document.querySelector("#brand");
const model = document.querySelector("#model");
const year = document.querySelector("#year");
const price = document.querySelector("#price");
const image = document.querySelector("#image");
const tbody = document.querySelector("tbody");

let id; // Variable para almacenar el ID del coche a editar

const url = "http://localhost:3000/cars";

// Función para crear un nuevo coche
async function createCar(brand, model, year, price, image) {
    const newCar = {
        brand: brand.value,
        model: model.value,
        year: year.value,
        price: price.value,
        image: image.value,
        isActive: true
    };

    await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newCar)
    });
}

// Event listener para el envío del formulario
form.addEventListener("submit", async (event) => {
    event.preventDefault();
    if (id == null) {
        await createCar(brand, model, year, price, image);
        alert("Se agregó el carro exitosamente");
        window.location.href = "/app/Dashboard/Dashboard.html";
    } else {
        await update(id);
        alert("Actualizado exitosamente");
        window.location.href = "/app/Dashboard/Dashboard.html";
    }
});

// Función para poblar la tabla con los datos de los coches
async function table() {
    const response = await fetch(url);
    const data = await response.json();

    tbody.innerHTML = ``;

    data.forEach(car => {
        if (car.isActive) {
            tbody.innerHTML += `
                <tr>
                    <th scope="row">${car.id}</th>
                    <td>${car.brand}</td>
                    <td>${car.model}</td>
                    <td>
                        <button class="btn btn-primary" data-id=${car.id}>Editar</button>
                        <button class="btn btn-warning" data-id=${car.id}>Deshabilitar</button>
                        <button class="btn btn-danger" data-id=${car.id}>Eliminar</button>
                    </td>
                </tr>
            `;
        }
    });
}

await table();

// Función para encontrar un coche por su ID
async function find(id) {
    const response = await fetch(`${url}?id=${id}`);
    const data = await response.json();
    return data[0];
}

// Función para actualizar un coche existente
async function update(id) {
    const updateCar = {
        brand: brand.value,
        model: model.value,
        year: year.value,
        price: price.value,
        image: image.value,
        isActive: true
    };

    await fetch(`${url}/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(updateCar)
    });
    form.reset();
    id = undefined;
}

// Función para eliminar un coche
async function deleteCar(id) {
    await fetch(`${url}/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    });
}

// Función para deshabilitar un coche
async function disable(id) {
    await fetch(`${url}/${id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ isActive: false })
    });
}

// Event listener para manejar clics en la tabla
tbody.addEventListener("click", async (event) => {
    if (event.target.classList.contains("btn-primary")) {
        id = event.target.getAttribute("data-id");
        const car = await find(id);

        // Llena el formulario con los datos del coche a editar
        brand.value = car.brand;
        model.value = car.model;
        year.value = car.year;
        price.value = car.price;
        image.value = car.image;
    } else if (event.target.classList.contains("btn-danger")) {
        const idDelete = event.target.getAttribute("data-id");
        await deleteCar(idDelete);
        alert("Carro eliminado");
        await table();
    } else if (event.target.classList.contains("btn-warning")) {
        const idDisable = event.target.getAttribute("data-id");
        await disable(idDisable);
        alert("Carro deshabilitado");
        await table();
    }
});
