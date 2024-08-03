document.addEventListener('DOMContentLoaded', () => {
    console.log('Hola')
    const urlParams = getUrlParams();
    getFails(urlParams.group_id, urlParams.module_id, urlParams.period)
});

const getUrlParams = () => {
    const url = new URL(window.location.href);

    const params = new URLSearchParams(url.search);

    const groupId = params.get('group_id');
    const moduleId = params.get('module_id');
    const period = params.get('period');

    const data = {
        'group_id': groupId,
        'module_id': moduleId,
        'period': period
    };

    return data;
}

const getFails = (groupId, moduleId, period) => {
    const url = `${config.baseUrl}/teachers/get-fails-by-group?group_id=${groupId}&module_id=${moduleId}&period=${period}`;
    request('GET', url)
        .then(response => {
            console.log(response);
            const container = document.getElementById('card-container');
            response.forEach(data => {
                const card = document.createElement('div');
                card.className = 'col-md-4 mb-3';

                card.innerHTML = `
                <div class="card">
                    <div class="card-header bg-primary text-white">
                        Información de la inasistencia
                    </div>
                    <div class="card-body">
                        <h5 class="card-title">Nombre: ${data.nombres}</h5>
                        <p class="card-text"><strong>Apellido:</strong> ${data.apellidos}</p>
                        <p class="card-text"><strong>Fecha:</strong> ${data.fecha}</p>
                        <p class="card-text"><strong>ID Estudiante:</strong> ${data.id_estudiante}</p>
                        <p class="card-text"><strong>ID Grupo:</strong> ${data.id_grupo}</p>
                        <p class="card-text"><strong>ID Módulo:</strong> ${data.id_modulo}</p>
                        <p class="card-text"><strong>Justificada:</strong> ${data.justificada === 0 ? 'no' : 'sí'}</p>
                        <p class="card-text"><strong>Aprobada:</strong> ${data.aprobada === 0 ? 'no' : 'sí'}</p>
                        <p class="card-text"><strong>Período:</strong> ${data.periodo}</p>
                        <button class="btn btn-success" onclick="approveJustification(${data.id_estudiante}, '${data.id_grupo}', '${data.id_modulo}', '${data.periodo}', '${data.fecha}')">Aprobar justificación</button>
                        <button class="btn btn-info" onclick = "getJustificationUrl(${data.id_estudiante}, '${data.id_grupo}', '${data.id_modulo}', '${data.periodo}', '${data.fecha}')">Ver Justificante</button>
                    </div>
                </div>
            `;

                container.appendChild(card);
            });
        });
}


const approveJustification = (studentId,groupId,moduleId,period,date) => {
    console.log(studentId,groupId,moduleId,period,date)
    const url = `${config.baseUrl}/teachers/approve-justification`

    const groupInfo = {
        'student_id':studentId,
        'group_id':groupId,
        'module_id':moduleId,
        'period':period,
        'date':date
    }

    request('POST',url,groupInfo)
    .then(response => {
        alert(response.response)
        window.location.reload()
    })
}
const getJustificationUrl = (studentId,groupId,moduleId,period,date) => {

    const url = `${config.baseUrl}/teachers/get-justification-url?student_id=${studentId}&group_id=${groupId}&module_id=${moduleId}&period=${period}&date=${date}`;

    console.log(url)

    request('GET',url)
    .then(response => {
        console.log(response)
        
        const path = response.url;
        
        const modifiedPath = path.slice(1);
        console.log(modifiedPath)
        
        downloadFile(modifiedPath) 
        //downloadFile('1235,SIN_G3,COM25,2024-2,2024-07-31.jpeg');
    
    })


    //const url = `${config.baseUrl}/download/${filename}`;
    //window.location.href = url;  // Redirige al usuario para descargar el archivo
}

const downloadFile = async (filename) => {
    try {
        const token = localStorage.getItem('access_token')
        const url = `${config.baseUrl}/teachers/download/${filename}`;
        
        // Realiza la solicitud de descarga
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const blob = await response.blob();

        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = filename;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
    }
};