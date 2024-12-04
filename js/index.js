// Manejo de LocalStorage
const storage = {
    save(key, value) {
        localStorage.setItem(key, JSON.stringify(value));
    },
    load(key) {
        return JSON.parse(localStorage.getItem(key)) || [];
    },
    remove(key) {
        localStorage.removeItem(key);
    }
};

if (!localStorage.getItem("usuario")) {
    localStorage.setItem("usuario", JSON.stringify(adminUser)); // Solo "usuario"
    console.log("Usuario administrador creado:", adminUser);
}

// Función para guardar cookies con una expiración de 2 horas
function setCookie(name, value) {
    const expires = new Date();
    expires.setTime(expires.getTime() + 2 * 60 * 60 * 1000); // 2 horas
    document.cookie = `${name}=${value}; expires=${expires.toUTCString()}; path=/`;
}

// Función para obtener cookies
function getCookie(name) {
    const nameEQ = name + "=";
    const cookiesArray = document.cookie.split(';');
    for (let c of cookiesArray) {
        c = c.trim();
        if (c.indexOf(nameEQ) === 0) {
            return c.substring(nameEQ.length, c.length);
        }
    }
    return null;
}

// Función para eliminar cookies
function deleteCookie(name) {
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/`;
}

// Función de logout
function logout() {
    localStorage.removeItem("usuario"); // Eliminar del localStorage
    deleteCookie("usuario"); // Eliminar la cookie
    window.location.href = "login.html"; // Redirigir al login
}

// Modo Oscuro
document.addEventListener("DOMContentLoaded", () => {
    const modoBtn = document.getElementById("modo");
    const body = document.body;

    if (modoBtn) {
        modoBtn.addEventListener("click", () => {
            body.classList.toggle("dark-mode");
        });
    }

    // Obtener datos del usuario desde localStorage
    const usuario = JSON.parse(localStorage.getItem("usuario"));
    console.log("Usuario cargado:", usuario);

    // Mostrar o esconder el botón de administrar según el rol
    const adminBtn = document.getElementById("admin_btn");
    if (usuario?.role === "admin" && adminBtn) {
        adminBtn.style.display = "block"; // Mostrar botón solo para admin
    } else if (adminBtn) {
        adminBtn.style.display = "none"; // Esconder el botón si no es admin
    }
});

// Asociar el botón de logout al evento
document.getElementById('salir')?.addEventListener('click', logout);

console.log("Archivo index.js cargado correctamente.");


// Funciones para manejar el LocalStorage
function saveToLocalStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
}

function getFromLocalStorage(key) {
    return JSON.parse(localStorage.getItem(key)) || [];
}

function renderUsuarios() {
    const usuarios = getFromLocalStorage("usuarios");
    const container = document.getElementById("usuarios-container");

    // Limpiar el contenedor
    container.innerHTML = "";

    usuarios.forEach(user => {
        const userCard = document.createElement("div");
        userCard.className = `card ${user.role === 'admin' ? 'admin-card' : 'user-card'} flex flex-col items-stretch p-4 shadow-lg border rounded-lg`;

        userCard.innerHTML = `
            <div class="card-content">
                <div class="flex items-center mb-4">
                    <img src="./img/iconos/${user.icono}.png" alt="${user.icono}" class="w-16 h-16 rounded-full mr-4" />
                    <div class="card-info">
                        <p class="font-bold text-xl">${user.nombre}</p>
                        <p class="text-gray-600 text-sm">${user.correo}</p>
                        <p class="text-gray-500 text-sm">Rol: ${user.role}</p>
                    </div>
                </div>
                <div class="card-buttons flex space-x-2">
                    <!-- Botón Editar con imagen -->
                    <button onclick="editarUsuario('${user.correo}')" class="px-4 py-2 bg-orange-500 text-white rounded-md flex items-center">
                        <img src="./img/edit.png" alt="Editar" class="w-5 h-5 mr-2" />
                        Editar
                    </button>

                    <!-- Botón Eliminar con imagen -->
                    <button onclick="eliminarUsuario('${user.correo}')" class="px-4 py-2 bg-red-500 text-white rounded-md flex items-center">
                        <img src="./img/delete.png" alt="Eliminar" class="w-5 h-5 mr-2" />
                        Eliminar
                    </button>
                </div>
            </div>
        `;

        container.appendChild(userCard);
    });
}



function editarUsuario(correo) {
    const usuarios = getFromLocalStorage("usuarios");
    const usuario = usuarios.find(user => user.correo === correo);

    if (usuario) {
        // Mostrar el modal y cargar los datos
        document.getElementById("editModal").classList.remove("hidden");
        document.getElementById("editNombre").value = usuario.nombre;
        document.getElementById("editCorreo").value = usuario.correo;
        document.getElementById("editRole").value = usuario.role;

        // Manejar la cancelación
        document.getElementById("cancelEdit").onclick = () => {
            document.getElementById("editModal").classList.add("hidden");
        };

        // Guardar cambios
        document.getElementById("editForm").onsubmit = (event) => {
            event.preventDefault();

            usuario.nombre = document.getElementById("editNombre").value;
            usuario.role = document.getElementById("editRole").value;

            saveToLocalStorage("usuarios", usuarios);
            renderUsuarios(); // Actualizar la lista
            document.getElementById("editModal").classList.add("hidden");
            alert("Usuario actualizado correctamente.");
        };
    }
}

// Función para eliminar un usuario
function eliminarUsuario(correo) {
    let usuarios = getFromLocalStorage("usuarios");
    usuarios = usuarios.filter(user => user.correo !== correo);

    saveToLocalStorage("usuarios", usuarios);
    renderUsuarios(); // Vuelve a renderizar los usuarios
    alert(`Usuario con correo ${correo} eliminado.`);
}

// Inicializar la página y cargar los usuarios
document.addEventListener("DOMContentLoaded", () => {
    renderUsuarios(); // Cargar y mostrar los usuarios registrados
});

//juego de 3 en rayas

document.addEventListener("DOMContentLoaded", function() {
    const cells = document.querySelectorAll(".cell");
    const mensaje = document.getElementById("mensaje");
    const reiniciar = document.getElementById("reiniciar");

    let turno = "X";
    let juegoActivo = true;
    let tablero = Array(9).fill(null);

    // Función para manejar el clic en una celda
    cells.forEach(cell => {
        cell.addEventListener("click", () => {
            const index = cell.dataset.index;
            if (tablero[index] || !juegoActivo || turno === "O") return; // No hacer nada si ya está ocupada, si el juego terminó o si es turno de la computadora
            tablero[index] = turno;
            cell.textContent = turno;
            if (verificarGanador()) {
                mensaje.textContent = `${turno} ha ganado!`;
                juegoActivo = false;
            } else if (tablero.every(celda => celda !== null)) {
                mensaje.textContent = "¡Empate!";
                juegoActivo = false;
            } else {
                turno = "O"; // Cambiar turno a la computadora
                computadoraJuega(); // La computadora realiza su jugada
            }
        });
    });

    // Función para la computadora juegue su turno
    function computadoraJuega() {
        if (!juegoActivo) return;

        // La computadora selecciona una celda vacía al azar
        const celdasVacias = tablero
            .map((valor, index) => valor === null ? index : null)
            .filter(index => index !== null);

        const movimientoComputadora = celdasVacias[Math.floor(Math.random() * celdasVacias.length)];

        // Realiza el movimiento
        tablero[movimientoComputadora] = "O";
        cells[movimientoComputadora].textContent = "O";

        if (verificarGanador()) {
            mensaje.textContent = "¡La computadora ha ganado!";
            juegoActivo = false;
        } else if (tablero.every(celda => celda !== null)) {
            mensaje.textContent = "¡Empate!";
            juegoActivo = false;
        } else {
            turno = "X"; // Cambiar turno al jugador
        }
    }

    // Función para verificar si hay un ganador
    function verificarGanador() {
        const combinacionesGanadoras = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ];

        return combinacionesGanadoras.some(combinacion => {
            const [a, b, c] = combinacion;
            return tablero[a] && tablero[a] === tablero[b] && tablero[a] === tablero[c];
        });
    }

    // Función para reiniciar el juego
    reiniciar.addEventListener("click", () => {
        tablero = Array(9).fill(null);
        cells.forEach(cell => {
            cell.textContent = "";
        });
        mensaje.textContent = "";
        turno = "X";
        juegoActivo = true;
    });
});



