const getUrlParams = () => {
    const url = new URL(window.location.href);

    const params = new URLSearchParams(url.search);

    const groupId = params.get('group_id');
    const moduleId = params.get('module_id');
    const period = params.get('period');

    const data = {
        'group_id':groupId,
        'module_id':moduleId,
        'period':period
    };

    return data;
}


document.addEventListener('DOMContentLoaded', () => {
    const urlParams = getUrlParams();

    getStudents(urlParams.group_id,urlParams.module_id,urlParams.period);
}); 


const getStudents = (groupId,moduleId,period) => {
    const url = `${config.baseUrl}/teachers/get-students-by-group?group_id=${groupId}&module_id=${moduleId}&period=${period}`
    request('GET',url)
    .then(response => {
        console.log(response)

        const container = document.getElementById('students-container');

        response.forEach(student => {
            const studentContainer = document.createElement('div');
            studentContainer.classList.add('student-item');
    
            const fullname = document.createElement('div');
            fullname.innerHTML = `${student.nombres} ${student.apellidos}`;
            studentContainer.appendChild(fullname);
    
            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.value = student.id_estudiante; 
    
            const label = document.createElement('label');
            label.setAttribute('for', checkbox.id);
            label.innerHTML = 'Seleccionar';
    
            studentContainer.appendChild(checkbox);
            studentContainer.appendChild(label);
    
            container.appendChild(studentContainer);
        }); 
   });
}

const setAttendance = () =>{
    const selectedStudents = Array.from(document.querySelectorAll('.student-item input[type="checkbox"]:checked'))
    .map(checkbox => checkbox.value);
    
    const urlParams = getUrlParams();
    const url = `${config.baseUrl}/teachers/set-group-attendance`
    const data = {
        'group_info':urlParams,
        'students':selectedStudents
    }
    request('POST',url,data)
    .then(response => {
       alert('Operacion realizada correctamente') 
    })

}

