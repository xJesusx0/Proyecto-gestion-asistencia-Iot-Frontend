document.addEventListener('DOMContentLoaded', () => {
    const url = new URL(window.location.href);

    const params = new URLSearchParams(url.search);

    const groupId = params.get('group_id');
    const moduleId = params.get('module_id');
    const period = params.get('period');

    getGroupInfo(groupId,moduleId,period);
    getStudents(groupId,moduleId,period);
}); 

const getGroupInfo = (groupId,moduleId,period) => {
    const url = `${config.baseUrl}/teachers/get-group-details?group_id=${groupId}&module_id=${moduleId}&period=${period}`

    request('GET',url)
    .then(data => {
        console.log(data)
        document.querySelector('#info-clase .card-body').innerHTML = `
                <p><strong>Nombre:</strong> ${data.nombre}</p>
                <p><strong>Día de la semana:</strong> ${data.dia_semana.charAt(0).toUpperCase() + data.dia_semana.slice(1)}</p>
                <p><strong>Hora de inicio:</strong> ${data.hora_inicio}</p>
                <p><strong>Hora de fin:</strong> ${data.hora_fin}</p>
            `;

            // Datos del Grupo
            document.querySelector('#datos-grupo .card-body').innerHTML = `
                <p><strong>ID del grupo:</strong> ${data.id_grupo}</p>
                <p><strong>ID del módulo:</strong> ${data.id_modulo}</p>
                <p><strong>ID del profesor:</strong> ${data.id_profesor}</p>
            `;

            // Información Adicional
            document.querySelector('#info-adicional .card-body').innerHTML = `
                <p><strong>ID del salón:</strong> ${data.id_salon}</p>
                <p><strong>Nombre del salón:</strong> ${data['salones.nombre']}</p>
                <p><strong>Sede:</strong> ${data.sede.charAt(0).toUpperCase() + data.sede.slice(1)}</p>
                <p><strong>Período:</strong> ${data.periodo}</p>
            `;
    })
}

const getStudents = (groupId,moduleId,period) => {
    const url = `${config.baseUrl}/teachers/get-students-by-group?group_id=${groupId}&module_id=${moduleId}&period=${period}`
    request('GET',url)
    .then(response => {
        console.log(response)

        const table = document.getElementById('table-body');

        response.forEach(user => {
            console.log(user);
            const tableRow = document.createElement('tr');

            const idCell = document.createElement('td');
            idCell.innerHTML = user.id_usuario;
            tableRow.appendChild(idCell);

            const namesCell = document.createElement('td');
            namesCell.innerHTML = user.nombres;
            tableRow.appendChild(namesCell);

            const lastnamesCell = document.createElement('td');
            lastnamesCell.innerHTML = user.apellidos;
            tableRow.appendChild(lastnamesCell);

            const emailCell = document.createElement('td');
            emailCell.innerHTML = user.correo;
            tableRow.appendChild(emailCell);

            const button = document.createElement('a');
            button.href = `history.html?student_id=${user.id_usuario}&group_id=${groupId}&module_id=${moduleId}&period=${period}`;
            button.classList.add('btn', 'btn-secondary');
            button.textContent = 'Ver asistencias';
            button.setAttribute('role', 'button'); 
            tableRow.appendChild(button);
            

            table.appendChild(tableRow);
        });
    });
}