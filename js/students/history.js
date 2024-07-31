document.addEventListener('DOMContentLoaded', () => {
    const url = new URL(window.location.href);

    const params = new URLSearchParams(url.search);

    const groupId = params.get('group_id');
    const moduleId = params.get('module_id');
    const period = params.get('period');
    const studentId = params.get('student_id')

    getGroupInfo(groupId,moduleId,period);
    getAttendances(studentId,groupId,moduleId,period)
    getFails(studentId,groupId,moduleId,period);

    console.log(studentId)
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

const getAttendances = (studentId,groupId,moduleId,period) => {

    const _url = `${config.baseUrl}/students/get-student-attendances-by-group?student_id=${studentId}&group_id=${groupId}&module_id=${moduleId}&period=${period}`
    request('GET',_url)
    .then(response => {
        console.log(response)
        const tableBody = document.getElementById('table-body')
        response.forEach(attendance => {
            const row = document.createElement('tr')
    
            const groupCell = document.createElement('td')
            groupCell.textContent = groupId
            row.appendChild(groupCell)
    
            const courseCell = document.createElement('td')
            courseCell.textContent = attendance.id_modulo
            row.appendChild(courseCell)
    
            const dateCell = document.createElement('td')
            dateCell.textContent = attendance.fecha
            row.appendChild(dateCell)
    
            const timeCell = document.createElement('td')
            timeCell.textContent = attendance.hora_llegada
            row.appendChild(timeCell)
    
            tableBody.appendChild(row)
        });
    })
}

const getFails = (studentId,groupId,moduleId,period) =>{
    const url = `${config.baseUrl}/students/get-student-fails-by-group?student_id=${studentId}&group_id=${groupId}&module_id=${moduleId}&period=${period}`

    request('GET',url)
    .then(response => {

        const failsTableBody = document.getElementById('fails-table-body');

        response.forEach(fail => {
            const row = document.createElement('tr')
            const groupCell = document.createElement('td')
            groupCell.textContent = fail.id_grupo
            row.appendChild(groupCell)
    
            const courseCell = document.createElement('td')
            courseCell.textContent = fail.id_modulo
            row.appendChild(courseCell)
    
            const dateCell = document.createElement('td')
            dateCell.textContent = fail.fecha
            row.appendChild(dateCell)
            console.log(fail)
            failsTableBody.appendChild(row)
        })
    })
}