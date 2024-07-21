document.addEventListener('DOMContentLoaded', () => {
    const url = new URL(window.location.href);

    const params = new URLSearchParams(url.search);

    const groupId = params.get('group_id');
    const moduleId = params.get('module_id');
    const period = params.get('period');

    const _url = `${config.baseUrl}/students/get-student-attendances-by-group?group_id=${groupId}&module_id=${moduleId}&period=${period}`
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
});




