const getUrlParams = () => {
    const url = new URL(window.location.href);
    const params = new URLSearchParams(url.search);

    const groupId = params.get('group_id');
    const moduleId = params.get('module_id');
    const period = params.get('period');

    const data = {
        'groupId':groupId,
        'moduleId':moduleId,
        'period':period
    }
    return data;
}


const addStudentsToGroup = () => {
    const urlParams =getUrlParams()

    const selectedStudents = [];
    const checkboxes = document.querySelectorAll('#cards-container input[type="checkbox"]:checked');
    checkboxes.forEach(checkbox => {
        selectedStudents.push(checkbox.value);
    });

    console.log(selectedStudents)
    
    const data = {
        'group_info':urlParams,
        'students':selectedStudents
    }

    const url = `${config.baseUrl}/admin/add-students-to-group`;
    request('POST',url,data)
    .then(response => {
        if (response.success){
            alert('Operacion realizada correctamente');
            window.location.href = 'groups.html'
        }
        console.log(response)
    })

};

const getStudentsNotInGroup = () => {
    const urlParams =getUrlParams()
    
    const groupId = urlParams.groupId;
    const moduleId = urlParams.moduleId;
    const period = urlParams.period;

    console.log("Group ID:", groupId);
    console.log("Module ID:", moduleId);
    console.log("Period:", period);

    const _url = `${config.baseUrl}/admin/get-students-not-in-group?group_id=${groupId}&module_id=${moduleId}&period=${period}`;

    return request('GET', _url)
            .then(response => {
                return response;
            })
};

const generateCards = (data) => {
    const container = document.getElementById('cards-container');
    container.innerHTML = '';

    data.forEach(item => {
        
        const card = document.createElement('div');
        card.className = 'col-md-4 mb-4';
        card.innerHTML = `
                    <div class="card">
                        <div class="card-body">
                            <h5 class="card-title">${item.nombres} ${item.apellidos}</h5>
                            <p class="card-text">ID: ${item.id_estudiante}</p>
                            <div class="form-check card-checkbox">
                                <input class="form-check-input" value="${item.id_estudiante}" type="checkbox" id="check-${item.id_estudiante}">
                                <label class="form-check-label" for="check-${item.id_estudiante}">
                                    Agregar al grupo
                                </label>
                            </div>
                        </div>
                    </div>
                `;
        container.appendChild(card);
    });
}

document.addEventListener("DOMContentLoaded", () => {
    getStudentsNotInGroup().then(response => {
        console.log(response);
        generateCards(response)
    });
});
