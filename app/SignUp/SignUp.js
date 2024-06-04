// Selecciona el formulario y los campos de entrada del DOM
const form = document.querySelector("form");
const nameUser = document.querySelector("#name");
const lastName = document.querySelector("#lastName");
const email = document.querySelector("#email");
const password = document.querySelector("#password");
const confirmPassword = document.querySelector("#confirmPassword");

// URL del endpoint de la API para los usuarios
const url = "http://localhost:3000/users";

// Función para validar si las contraseñas coinciden
function validatePassword(password, confirmPassword) {
    // Compara las contraseñas
    if (password.value == confirmPassword.value) {
        return true;
    } else {
        // Muestra una alerta si las contraseñas no coinciden
        alert("Las contraseñas no son iguales");
        return false;
    }
}

// Función asíncrona para validar si el correo electrónico ya está registrado
async function validateEmail(email) {
    // Realiza una solicitud a la API filtrando por correo electrónico
    const response = await fetch(`${url}?email=${email.value}`);
    // Convierte la respuesta en formato JSON
    const data = await response.json();

    // Si no se encuentra un usuario con el correo electrónico, retorna verdadero
    if (data.length == 0) {
        return true;
    } else {
        // Muestra una alerta si el correo ya está registrado
        alert("El correo ya se encuentra registrado");
        return false;
    }
}

// Función asíncrona para crear un nuevo usuario
async function createUser(nameUser, lastName, email, password) {
    // Crea un objeto con los datos del nuevo usuario
    const newUser = {
        nameUser: nameUser.value,
        lastName: lastName.value,
        email: email.value,
        password: password.value
    };

    // Realiza una solicitud POST a la API para crear el usuario
    await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newUser)
    });
}

// Añade un evento de escucha para el evento 'submit' del formulario
form.addEventListener("submit", async (event) => {
    // Previene el comportamiento por defecto del formulario (recargar la página)
    event.preventDefault();

    // Valida el correo electrónico y las contraseñas
    const checkEmail = await validateEmail(email);
    const checkPassword = validatePassword(password, confirmPassword);

    // Si el correo es válido y las contraseñas coinciden, crea el usuario
    if (checkEmail && checkPassword) {
        await createUser(nameUser, lastName, email, password);
        // Resetea el formulario
        form.reset();
        // Muestra una alerta indicando que el usuario se creó exitosamente
        alert("Se crea usuario exitosamente");
        // Redirige a la página de inicio de sesión
        window.location.href = "/app/Login/Login.html";
    }
});
