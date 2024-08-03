document.addEventListener('DOMContentLoaded', () => {
    console.log('Hola')
    const urlParams = getUrlParams();
    getFails(urlParams.group_id, urlParams.module_id, urlParams.period)
    container.appendChild(card);
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
            console.log(response)
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
                        <p class="card-text"><strong>justificada:</strong> ${data.justificada === 0 ? 'no' : 'sí'}</p>
                        <p class="card-text"><strong>aprobada:</strong> ${data.aprobada === 0 ? 'no' : 'sí'}</p>
                        <p class="card-text"><strong>Período:</strong> ${data.periodo}</p>
                        <button class="btn btn-success">Aprobar justificacion</button>
                        <button class="btn btn-info">Ver Justificante</button>
                    </div>
                </div>
            `;

                container.appendChild(card);
            })
        })
}
