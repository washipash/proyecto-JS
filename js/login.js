// Función para guardar cookies con una expiración de 2 horas
function setCookie(name, value) {
    const expires = new Date();
    expires.setTime(expires.getTime() + 2 * 60 * 60 * 1000); // 2 horas
    document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires.toUTCString()}; path=/`;
}

// Función para obtener cookies
function getCookie(name) {
    const nameEQ = name + "=";
    const ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i].trim();
        if (c.indexOf(nameEQ) === 0) return decodeURIComponent(c.substring(nameEQ.length, c.length));
    }
    return null;
}

// Función para eliminar cookies
function deleteCookie(name) {
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
}

// Crear usuario administrador si no existe
const adminUser = {
    nombre: "osmel",
    correo: "admin@correo.com",
    contrasena: "Admin24.",
    role: "admin"
};

document.addEventListener("DOMContentLoaded", () => {
    // Verificar si ya hay un usuario autenticado
    const usuario = JSON.parse(localStorage.getItem("usuario")) || getCookie("usuario");
    if (usuario) {
        window.location.href = "home.html"; // Redirigir al home si ya hay sesión activa
        return;
    }

    // Crear usuario administrador si no existe
    if (!localStorage.getItem("admin")) {
        localStorage.setItem("admin", JSON.stringify(adminUser));
        console.log("Usuario administrador creado:", adminUser);
    }
});

// Función de validación del login
function validar() {
    const nombreCorreo = document.getElementById("nombre").value.trim(); // Nombre o correo
    const contrasena = document.getElementById("contraseña").value.trim();

    // Verificar campos vacíos
    if (!nombreCorreo || !contrasena) {
        alert("Por favor, ingresa tu nombre o correo y contraseña.");
        return;
    }

    // Obtener usuarios del localStorage
    const adminData = JSON.parse(localStorage.getItem("admin"));
    const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

    // Verificar credenciales del administrador (por nombre o correo)
    if ((nombreCorreo === adminData.nombre || nombreCorreo === adminData.correo) && contrasena === adminData.contrasena) {
        // Guardar sesión en localStorage y en cookies
        localStorage.setItem("usuario", JSON.stringify(adminData));
        setCookie("usuario", JSON.stringify(adminData)); // Guardar en cookie
        alert("Login exitoso. Bienvenido, Administrador.");
        window.location.href = "home.html"; // Redirigir al home
        return;
    }

    // Verificar credenciales de usuarios comunes (por nombre o correo)
    const usuarioValido = usuarios.find(user => 
        (user.nombre === nombreCorreo || user.correo === nombreCorreo) && user.contrasena === contrasena
    );

    if (usuarioValido) {
        // Guardar sesión en localStorage y en cookies
        localStorage.setItem("usuario", JSON.stringify(usuarioValido));
        setCookie("usuario", JSON.stringify(usuarioValido)); // Guardar en cookie
        alert(`Login exitoso. Bienvenido, ${usuarioValido.nombre}`);
        window.location.href = "home.html"; // Redirigir al home
        return;
    }

    // Si no se encuentra el usuario o la contraseña no coincide
    alert("Nombre, correo o contraseña incorrectos. Por favor, inténtalo nuevamente.");
}

// Opcional: Limpiar sesión automáticamente después de 2 horas
setTimeout(() => {
    deleteCookie("usuario");
    localStorage.removeItem("usuario");
    console.log("Sesión eliminada automáticamente después de 2 horas.");
}, 7200000); // 2 horas
