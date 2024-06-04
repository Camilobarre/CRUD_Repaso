// Selecciona el formulario, el campo de correo electrónico y el campo de contraseña del DOM
const form = document.querySelector("form");
const email = document.querySelector("#email");
const password = document.querySelector("#password");

// URL del endpoint de la API para los usuarios
const url = "http://localhost:3000/users";

// Función asíncrona para validar si el correo electrónico existe en la base de datos
async function validateEmail(email) {
    // Realiza una solicitud a la API filtrando por correo electrónico y espera la respuesta
    const response = await fetch(`${url}?email=${email.value}`);
    // Convierte la respuesta en formato JSON
    const data = await response.json();

    // Si se encuentra un usuario con el correo electrónico, retorna el primer usuario encontrado
    if(data.length > 0) {
        return data[0];
    }
};

// Añade un evento de escucha para el evento 'submit' del formulario
form.addEventListener("submit", async(event) => {
    // Previene el comportamiento por defecto del formulario (recargar la página)
    event.preventDefault();
    // Valida el correo electrónico ingresado por el usuario
    const user = await validateEmail(email);

    // Si no se encuentra un usuario con el correo electrónico proporcionado
    if(user == null) {
        alert("Correo no se encuentra registrado");
    } else {
        // Si la contraseña ingresada coincide con la almacenada en la base de datos
        if(user.password == password.value) {
            // Almacena la información del usuario en el almacenamiento local del navegador
            localStorage.setItem("user", JSON.stringify(user));
            // Redirige al usuario al dashboard
            window.location.href = "/app/Dashboard/Dashboard.html";
        } else {
            // Muestra un mensaje de alerta si la contraseña es incorrecta
            alert("Contraseña invalida");
        }
    }
});
