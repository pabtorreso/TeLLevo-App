document.addEventListener("DOMContentLoaded", function () {
    // Hacer una solicitud a la API
    fetch("http://localhost:5000/medicos")
        .then(response => response.json())
        .then(data => {
            const medicosTableBody = document.getElementById("medicos-table-body");
            
            // Recorre los datos de los médicos y crea las filas de la tabla
            data.medicos.forEach(medico => {
                const row = document.createElement("tr");
                row.innerHTML = `
                    <td>${medico.id}</td>
                    <td>${medico.name}</td>
                    <td>${medico.available ? "Disponible" : "No Disponible"}</td>
                    <td>${medico.especialidad}</td>
                `;
                medicosTableBody.appendChild(row);
            });
        })
        .catch(error => {
            console.error("Error al obtener los datos de la API:", error);
        });
});
