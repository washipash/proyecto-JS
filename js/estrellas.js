
const universo = document.getElementById('universo');

function createStar(x, y) {
    const star = document.createElement('div');
    star.classList.add('star');

    // Obtener el rectángulo de la sección para obtener sus límites
    const rect = universo.getBoundingClientRect();
    
    // Ajustamos las coordenadas para que las estrellas estén dentro de los límites de la sección
    const relativeX = x - rect.left;  // Coordenada X relativa a la sección
    const relativeY = y - rect.top;   // Coordenada Y relativa a la sección

    // Asegúrate de que las estrellas no salgan de los límites de la sección
    if (relativeX >= 0 && relativeX <= rect.width && relativeY >= 0 && relativeY <= rect.height) {
        star.style.top = `${relativeY}px`;
        star.style.left = `${relativeX}px`;
        universo.appendChild(star);

        // Eliminar la estrella después de 8 segundos
        setTimeout(() => {
            star.remove();
        }, 8000);
    }
}

// Crear una estrella cuando se hace clic dentro de la sección
universo.addEventListener('click', (e) => {
    createStar(e.clientX, e.clientY);
});

// Generar estrellas aleatorias dentro de los límites de la sección cada 500 ms
setInterval(() => {
    const rect = universo.getBoundingClientRect();
    const x = Math.random() * rect.width + rect.left;  // Coordenada X dentro de la sección
    const y = Math.random() * rect.height + rect.top; // Coordenada Y dentro de la sección
    createStar(x, y);
}, 500);
