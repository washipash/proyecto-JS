// Función para obtener campeones
const championsContainer = document.getElementById("champions");
let currentPage = 0;

async function fetchChampions(page = 0) {
    const response = await fetch("https://ddragon.leagueoflegends.com/cdn/13.10.1/data/en_US/champion.json");
    const data = await response.json();
    const champions = Object.values(data.data);
    const perPage = 8; // Campeones por página

    championsContainer.innerHTML = "";
    const start = page * perPage;
    const end = start + perPage;

    champions.slice(start, end).forEach((champ) => {
        const champCard = `
            <div class="bg-white p-4 rounded-lg shadow-lg text-center">
                <img src="https://ddragon.leagueoflegends.com/cdn/13.10.1/img/champion/${champ.image.full}" alt="${champ.name}" class="w-16 h-16 mx-auto">
                <p class="mt-2 font-bold">${champ.name}</p>
            </div>`;
        championsContainer.innerHTML += champCard;
    });
}

// Navegación de páginas
document.getElementById("prevPage").addEventListener("click", () => {
    if (currentPage > 0) {
        currentPage--;
        fetchChampions(currentPage);
    }
});
document.getElementById("nextPage").addEventListener("click", () => {
    currentPage++;
    fetchChampions(currentPage);
});

// Cargar campeones al inicio
fetchChampions();