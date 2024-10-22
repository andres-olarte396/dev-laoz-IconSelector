let iconsData = {}; 
loadIcons();
document.getElementById('searchIconBtn').addEventListener('click', function() {
    const searchTerm = document.getElementById('iconSearchInput').value.toLowerCase();
    const iconSet = document.getElementById('iconSetSelect').value;
    const iconResults = document.getElementById('iconResults');

    iconResults.innerHTML = '';

    if (searchTerm.trim() === '') {
        alert('Por favor, ingresa un término de búsqueda.');
        return;
    }
    searchIcons(searchTerm, iconSet);
});

// Función para cargar los íconos desde el archivo JSON
function loadIcons() {
    fetch('icons.json')
        .then(response => response.json())
        .then(data => {
            iconsData = data;
            displayAllIcons(); // Mostrar todos los íconos una vez cargados
        })
        .catch(error => console.error('Error al cargar los íconos:', error));
}

function searchIcons(searchTerm, iconSet) {
    const faIcons = iconsData[iconSet]; // Lista simplificada de ejemplos

    const filteredIcons = faIcons.filter(icon => icon.includes(searchTerm));
    displayIcons(filteredIcons, iconSet);
}

function displayIcons(icons, iconSet) {
    const iconResults = document.getElementById('iconResults');

    if (icons.length === 0) {
        iconResults.innerHTML = '<p>No se encontraron iconos.</p>';
        return;
    }

    icons.forEach(icon => {
        const iconPreview = document.createElement('div');
        iconPreview.className = 'icon-preview';

        if (iconSet === 'fontAwesome5' || iconSet === 'fontAwesome4' || iconSet === 'bootstrap') {
            iconPreview.innerHTML = `<i class="${icon}"></i>
            <span class="icon-code">&lt;i class="${icon}"&gt;&lt;/i&gt;</span>`;
        } else if (iconSet === 'materialDesign') {
            iconPreview.innerHTML = `<i class="material-icons">${icon}</i>
            <span class="icon-code">&lt;i class="material-icons"&gt;${icon}&lt;/i&gt;</span>`;
        }

        iconResults.appendChild(iconPreview);
    });
}
